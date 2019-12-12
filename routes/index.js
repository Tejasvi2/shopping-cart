var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');

var Product = require('../models/product');


router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find((err,docs)=>{
    var productChunk = [];
    var chunkSize = 3;
    for(var i=0;i<docs.length;i +=chunkSize){
      productChunk.push(docs.slice(i,i+chunkSize))
    }
    res.render('shop/index', { title: 'Express',products:productChunk });
  }); 
});

router.get('/user/signup',(req,res)=>{
  var messages = req.flash('error')
  res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0})
})

router.post('/user/signup',passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}));

router.get('/user/signin',(req,res)=>{
  var messages = req.flash('error')
  res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0})
})

router.post('/user/signin',passport.authenticate('local.signin',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true
}));

router.get('/user/profile',(req,res)=>{
  res.render('user/profile');
})
module.exports = router;
 