var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

var csrfProtection = csrf();
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
  res.render('user/signup',{csrfToken:req.csrfToken()})
})

router.post('/user/signup',(req,res)=>{
  res.redirect('/')
})
module.exports = router;
 