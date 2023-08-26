const express = require('express')
const Cart = require('../model/cart')
const Product = require('../model/product')

let router = express.Router()

router.get('/order', async(req, res) => {
    if (!req.session.username) return res.redirect('/signin')
    if (!req.session.is_admin) return res.redirect('/home')

    const cart = await Cart.find({ is_checked: false })

    res.render('order', {
        name: req.session.name,
        cart,
    })
})

router.post('/order', async(req, res) => {
    if (!req.session.username) return res.redirect('/signin')
    if (req.session.is_admin) return res.redirect('/home')
    const { id, name, price, quantity = 1 } = req.body

    const doesExist = await Cart.exists({ product_id: id, is_checked: false })

    if (doesExist) {
        await Cart.findOneAndUpdate({ product_id: id, is_checked: false }, { $inc: { quantity: quantity } })
    } else {
        const cart = new Cart({ product_id: id, name, price })

        await cart.save()
    }

    return true
})

router.post('/orderClear', async(req, res) => {
    if (!req.session.username) return res.redirect('/signin')
    if (req.session.is_admin) return res.redirect('/home')
    const order = await Cart.find({ is_checked: false })

    order.map(async({ id }) => {
        await Cart.findByIdAndRemove(id)
    })

    return res.render('order', {
        name: req.session.name,
        order: await Cart.find({ is_checked: false }),
    })
})

router.post('/orderConfirm', async(req, res) => {
    if (!req.session.username) return res.redirect('/signin')
    if (req.session.is_admin) return res.redirect('/home')
    const order = await Cart.find({ is_checked: false })

    order.map(async({ id }) => {
        await Cart.findByIdAndUpdate(id, { $set: { is_checked: true } })
    })

    return res.render('order', {
        name: req.session.name,
        order: await Cart.find({ is_checked: false }),
    })
})
module.exports = router