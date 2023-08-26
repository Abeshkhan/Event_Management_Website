const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  product_id   : {
    type     : mongoose.Types.ObjectId,
    required : true,
  },
  quantity     : {
    type     : Number,
    default  : 1,
    required : true,
  },
  name         : {
    type     : String,
    required : true,
  },
  price        : {
    type     : Number,
    default  : 0,
    required : true,
  },
  created_by   : {
    type     : String,
    default  : false,
    required : true,
  },
  is_checked   : {
    type     : Boolean,
    default  : false,
    required : true,
  },
  is_confirmed : {
    type     : Boolean,
    default  : false,
    required : true,
  },
  is_rejected  : {
    type     : Boolean,
    default  : false,
    required : true,
  },
})

const cart = mongoose.model('cart', cartSchema)
module.exports = cart
