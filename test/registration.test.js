const app = require('../app')
const db = require('../db_test')
const request = require('supertest')
const mongoose = require('mongoose')

const User = require('../model/user')

describe('GET /registration', () => {
  test('Should send 200', async () => {
    const res = await request(app).get('/registration')

    expect(res.statusCode).toBe(200)
  })
  test('Should Render registration', async () => {
    const res = await request(app).get('/registration')

    expect(res.text.includes('html')).toBe(true)
  })
})

describe('POST /registration', () => {
  beforeAll(async () => {
    db.on('open', () => {
      console.log('database connected')
    })

    await User.findOneAndDelete({ username: 'correct_username' })
  })

  afterAll(async () => {
    await User.findOneAndDelete({ username: 'correct_username' })
    await mongoose.connection.close()
  })

  describe('When form data properly filled', () => {
    test('Should respond with a 200 meaning new user created', async () => {
      await request(app).post('/accountDetails').send({
        username : 'correct_username',
        name     : 'correct_name',
        email    : 'correct_email@mail.com',
        password : 'correct_password',
        phone    : '015511',
      })

      const res = await User.findOne({ username: 'correct_username' })

      expect(res).toBeDefined()
    })
  })
})
