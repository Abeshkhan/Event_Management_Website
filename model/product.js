const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  service : {
    type     : String,
    required : true,
  },
  items    : [
    {
      image       : {
        type    : String,
        default : '',
      },
      name        : {
        type     : String,
        required : true,
      },
      price       : {
        type     : Number,
        default  : 0,
        required : true,
      },
      description : {
        type    : String,
        default : '',
      },
    },
  ],
})

productSchema.index({ "$**": "text" })
const product = mongoose.model('product', productSchema)
module.exports = product
