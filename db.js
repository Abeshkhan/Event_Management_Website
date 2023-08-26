const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/eventingo', {
  useNewUrlParser    : true,
})

module.exports = mongoose.connection
