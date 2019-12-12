var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true,useUnifiedTopology: true })

var products = [
    new Product({
    imagePath:'../public/images/samsung.jpg',
    title:'Samsung Galaxy s10',
    description:'Imagine the amazing things we can build.',
    price:20000 
}),
new Product({
    imagePath:'../public/images/oneplus.jpg',
    title:'OnePlus 7t Pro',
    description:'Never Settle',
    price:33000
}),
new Product({
    imagePath:'../public/images/iphone.jpg',
    title:'Iphone 11 pro',
    description:'By Innovation Only.',
    price:41000
}),
new Product({
    imagePath:'../public/images/nokia.jpg',
    title:'Nokia 5.1 plus',
    description:'Connecting People',
    price:15000
}),
new Product({
    imagePath:'../public/images/motto.jpg',
    title:'Motto G Plus',
    description:'Innovation Never Stands Still',
    price:21000
}),
new Product({
    imagePath:'../public/images/vivo.jpg',
    title:'Vivo U10',
    description:'Unstoppable U',
    price:11000
})
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