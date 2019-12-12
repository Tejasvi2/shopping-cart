var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();


var Product = require('../models/product');
var Cart = require('../models/cart');

 
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

router.get('/add-to-cart/:id',(req,res)=>{
var productId = req.params.id; // get id from nav params
var cart = new Cart(req.session.cart?req.session.cart :{})
Product.findById(productId,(err,product)=>{
  if(err){
    return res.redirect('/');
  }
  cart.add(product,product.id);
  req.session.cart = cart; // to save cart element to session
  console.log(req.session.cart,'cartt')
  res.redirect('/'); 
  
}) 

});


router.get('/shopping-cart',(req,res)=>{
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products:null});
  }
  var cart =  new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice})
});

module.exports = router;
 