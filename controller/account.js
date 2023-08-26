const router = require('express')()
const User = require('../model/user')

router.get('/account', async (req, res) => {
  if (!req.session.username) return res.redirect('/')

  const user = await User.findOne({
    username : req.session.username,
    is_admin : req.session.is_admin,
  })

  return res.render('account', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    user,
  })
})
router.post('/account', async (req, res) => {
  if (!req.session.username) return res.redirect('/')

  const { name, address, email, password } = req.body

  const user = await User.find({ username: req.session.username })

  if (password !== '') await User.findOneAndUpdate({ username: req.session.username }, { $set: { password } })

  if (name !== '') {
    await User.findOneAndUpdate({ username: req.session.username }, { $set: { name } })
    req.session.name = name
  }

  if (address !== '') {
    await User.findOneAndUpdate({ username: req.session.username }, { $set: { address } })
    req.session.name = name
  }

  if (email !== '') await User.findOneAndUpdate({ username: req.session.username }, { $set: { email } })

  return res.redirect('/account')
})

module.exports = router
