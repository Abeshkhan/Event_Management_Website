const express = require('express')
const Cart = require('../model/cart')

let router = express.Router()

router.get('/order/status', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')

  const pending = await Cart.find({
    is_checked   : true,
    is_confirmed : false,
    is_rejected  : false,
    created_by   : req.session.username,
  })
  const confirmed = await Cart.find({ is_confirmed: true, created_by: req.session.username })
  const rejected = await Cart.find({ is_rejected: true, created_by: req.session.username })

  res.render('orderStatus', {
    name      : req.session.name,
    is_admin  : req.session.is_admin,
    pending,
    confirmed,
    rejected,
  })
})

module.exports = router
