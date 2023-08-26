const router = require('express')()
const User = require('../model/user')

router.get('/registration', (req, res) => {
  if (req.session.username) return res.redirect('/')

  return res.render('registration', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
  })
})
router.post('/registration', async (req, res) => {
  if (req.session.username) return res.redirect('/')

  const { name, username, email, address, password, phone } = req.body

  const user = await User.findOne({ username })

  if (user !== null)
    return res.render('registration', {
      message  : 'User with that email already exists',
      type     : 'danger',
      name     : req.session.name,
      is_admin : req.session.is_admin,
    })

  try {
    const newUser = await new User({
      username,
      name,
      email,
      password,
      address,
      phone,
    }).save()

    return res.redirect('/signin')
  } catch (error) {
    return res.render('registration', {
      message  : 'Fill all fields',
      type     : 'danger',
      name     : req.session.name,
      is_admin : req.session.is_admin,
    })
  }
})

module.exports = router
