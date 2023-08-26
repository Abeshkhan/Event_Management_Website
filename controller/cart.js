const express = require('express')
const Cart = require('../model/cart')
const Product = require('../model/product')

let router = express.Router()

router.get('/cart', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')

  const cart = await Cart.find({ is_checked: false, created_by: req.session.username })

  res.render('cart', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    cart,
  })
})

router.post('/cart', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const { id, name, price, quantity = 1 } = req.body

  const doesExist = await Cart.exists({ product_id: id, is_checked: false, created_by: req.session.username })

  if (doesExist) {
    await Cart.findOneAndUpdate(
      { product_id: id, is_checked: false, created_by: req.session.username },
      { $inc: { quantity } }
    )
  } else {
    const cart = new Cart({ product_id: id, name, price, quantity, created_by: req.session.username })

    await cart.save()
  }

  return true
})

router.post('/cart/clear', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const cart = await Cart.find({ is_checked: false })

  cart.map(async ({ id }) => {
    await Cart.findByIdAndRemove(id)
  })

  return res.render('cart', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    cart     : await Cart.find({ is_checked: false }),
  })
})

router.post('/cart/confirm', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (req.session.is_admin) return res.redirect('/home')
  const cart = await Cart.find({ is_checked: false })

  cart.map(async ({ id }) => {
    await Cart.findByIdAndUpdate(id, { $set: { is_checked: true } })
  })

  return res.render('cart', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    cart     : await Cart.find({ is_checked: false }),
  })
})
module.exports = router
