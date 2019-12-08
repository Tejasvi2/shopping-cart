var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true,useUnifiedTopology: true })

var products = [
    new Product({
    imagePath:'../public/images/mobi1.jpg',
    title:'Mobile 1',
    description:'Random text to be used',
    price:1000
}),
new Product({
    imagePath:'../public/images/mobi2.jpg',
    title:'Mobile 2',
    description:'Random text to be used',
    price:33000
}),
new Product({
    imagePath:'../public/images/mobi3.jpg',
    title:'Mobile 3',
    description:'Random text to be used',
    price:41000
}),
new Product({
    imagePath:'../public/images/mobi4.jpg',
    title:'Mobile 4',
    description:'Random text to be used',
    price:15000
}),
new Product({
    imagePath:'../public/images/mobi5.jpg',
    title:'Mobile 5',
    description:'Random text to be used',
    price:21000
}),
]
 
var done=0
for(var i=0;i<products.length;i++){
    products[i].save((err,res)=>{
        done++;
        if(done === products.length){
            exit();
        }
    });

}

function exit(){
    mongoose.disconnect();

}