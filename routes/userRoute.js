var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('user/profile');
})

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    res.redirect('/');
}) 

router.use('/',notLoggedIn,(req,res,next)=>{
    next();
})
router.get('/signup',(req,res)=>{
    var messages = req.flash('error')
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0})
  })
  
  router.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
  }));
  
  router.get('/signin',(req,res)=>{
    var messages = req.flash('error')
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0})
  })
  
  router.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/signin',
    failureFlash:true
  }));
  



 

  module.exports = router;

  function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
       return next();
   }
   res.redirect('/');
  }

  function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
   }