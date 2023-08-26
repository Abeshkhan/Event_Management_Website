const express = require('express')
const Cart = require('../model/cart')

let router = express.Router()

router.get('/order/admin', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (!req.session.is_admin) return res.redirect('/home')

  const cart = await Cart.find({ is_checked: true, is_confirmed: false, is_rejected: false })
  const customers = cart
    .map(customer => customer.created_by)
    .filter((value, index, self) => self.indexOf(value) === index)

  res.render('orderAdmin', {
    name      : req.session.name,
    is_admin  : req.session.is_admin,
    customers,
    cart,
  })
})

router.post('/order/admin/reject', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (!req.session.is_admin) return res.redirect('/home')

  const { username } = req.body

  const order = await Cart.find({ is_checked: true, created_by: username })

  order.map(async ({ id }) => {
    await Cart.findByIdAndUpdate(id, { $set: { is_rejected: true } })
  })

  return res.redirect('/')
})

router.post('/order/admin/confirm', async (req, res) => {
  if (!req.session.username) return res.redirect('/signin')
  if (!req.session.is_admin) return res.redirect('/home')

  const { username } = req.body

  const order = await Cart.find({ is_checked: true, created_by: username })

  order.map(async ({ id }) => {
    await Cart.findByIdAndUpdate(id, { $set: { is_confirmed: true } })
  })

  return res.redirect('/')
})
module.exports = router
