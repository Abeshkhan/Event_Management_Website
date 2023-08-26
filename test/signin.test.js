const app = require('../app')
const db = require('../db_test')
const request = require('supertest')
const mongoose = require('mongoose')

const User = require('../model/user')

describe('GET /signin', () => {
  test('Should send 200', async () => {
    const res = await request(app).get('/signin')

    expect(res.statusCode).toBe(200)
  })
  test('Should Render signin', async () => {
    const res = await request(app).get('/signin')

    expect(res.text.includes('html')).toBe(true)
  })
})

describe('POST /signin', () => {
  beforeAll(async () => {
    db.on('open', () => {
      console.log('database connected')
    })
  })

  afterAll(async () => {
    await User.findOneAndDelete({ username: 'correct_username' })
    await mongoose.connection.close()
  })

  describe('When the Username and Password is sent', () => {
    test('Should send 200', async () => {
      const res = await request(app).post('/signin').send({
        username : 'wrong_username',
        password : 'wrong_password',
      })

      expect(res.statusCode).toBe(200)
    })
    test('Should send 302', async () => {
      await new User({
        username : 'correct_username',
        name     : 'correct_name',
        email    : 'correct_email@mail.com',
        password : 'correct_password',
        phone    : '015511',
      }).save()

      const res = await request(app).post('/signin').send({
        username : 'correct_username',
        password : 'correct_password',
      })

      expect(res.statusCode).toBe(302)
    })
    test('Should Render signin with Error', async () => {
      const res = await request(app).post('/signin').send({
        username : 'wrong_username',
        password : 'wrong_password',
      })

      expect(res.text.includes('Username/Password do not match')).toBe(true)
    })
  })

  describe('When the Username and Password is missing', () => {
    test('Should respond with 400 and Render signin', async () => {
      const bodyData = [ { username: 'wrong_username' }, { password: 'wrong_password' }, {} ]

      for (const body of bodyData) {
        const res = await request(app).post('/signin').send(body)
        expect(res.statusCode).toBe(400)
      }
    })
  })
})
