const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try {
        const {productId} = req.body
        const currentUser = req.userId

        const isProductAlreadyExist = await addToCartModel.findOne({productId ,userId : currentUser})
        // console.log("isProductAvailable",isProductAlreadyExist)
        if(isProductAlreadyExist){
            return(
                res.json({
                    message : "Product is already in your cart",
                    success : false,
                    error : true
                })
            )
        }
        
        const payload = {
            productId : productId,
            userId : currentUser,
            quantity : 1
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            message : "Product is added to your cart",
            data : saveProduct,
            success : true,
            error : false,
        })
    } catch (err) {
        res.status(400).json({
            messsage : err.messsage || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController