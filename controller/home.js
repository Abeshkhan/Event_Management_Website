const router = require('express')()
const Product = require('../model/product')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/home', async (req, res) => {
  if (req.session.is_admin) return res.redirect('/order/admin')
  if (!req.session.username) return res.redirect('/signin')

  const product = await Product.find()
  console.log(product)
  res.render('home', {
    name     : req.session.name,
    is_admin : req.session.is_admin,
    store    : product,
  })
})
router.post("/search", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  Product
    .find({ $text: { $search: req.body.searchText }})
    .exec(function(err, docs){
      console.log(docs)
      res.render("home", {
        name     : req.session.name,
        is_admin : req.session.is_admin,
        store    : docs,
      
      })
    })
      
      
   
})


router.post("/filter-gp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  Product
    .find({ $text: { $search: "burger" }})
    .exec(function(err, docs){
      console.log(docs)
      res.render("home", {
        name     : req.session.name,
        is_admin : req.session.is_admin,
        store    : docs,
      
      })
    })
      
      
   
})
router.post("/filter-sp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  Product
    .find({ $text: { $search: "pizza" }})
    .exec(function(err, docs){
      console.log(docs)
      res.render("home", {
        name     : req.session.name,
        is_admin : req.session.is_admin,
        store    : docs,
      
      })
    })
      
      
   
})
router.post("/filter-tp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  Product
    .find({ $text: { $search: "steak" }})
    .exec(function(err, docs){
      console.log(docs)
      res.render("home", {
        name     : req.session.name,
        is_admin : req.session.is_admin,
        store    : docs,
      
      })
    })
      
      
   
})
module.exports = router
