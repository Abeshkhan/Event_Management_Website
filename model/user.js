const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username : {
    type     : String,
    unique   : true,
    trim     : true,
    required : true,
  },
  name     : {
    type     : String,
    trim     : true,
    required : true,
  },
  email    : {
    type     : String,
    trim     : true,
    required : true,
  },
  password : {
    type     : String,
    required : true,
  },
  address    : {
    type     : String,
    default     : '',
    trim     : true,
  },
  phone    : {
    type     : Number,
    required : true,
  },
  is_admin : {
    type     : Boolean,
    default  : false,
    required : true,
  },
})

const user = mongoose.model('user', userSchema)
module.exports = user
