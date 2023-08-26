const app = require('../app')
const request = require('supertest')

describe('GET /signout', () => {
  test('Should send 302', async () => {
    const res = await request(app).get('/signout')

    expect(res.statusCode).toBe(302)
  })
})
