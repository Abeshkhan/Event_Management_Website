const app = require('./app')
const db = require('./db')
const mongoose = require('mongoose')

const server = async () => {
  db.on('open', () => {
    console.log('database connected')
  })

  app.listen(8080, () => {
    console.log('Server is running on Port 8080')
  })
}

server()
