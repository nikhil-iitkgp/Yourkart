const  mongoose = require('mongoose')


const addToCart = new mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
    },
    userId : String,
    quantity : Number,
},{
    timestamps : true
})

const addToCartModel = mongoose.model('addToCart',addToCart)


module.exports = addToCartModel