const addToCartModel = require("../../models/cartProduct")


const viewAddToCartProduct = async(req,res)=>{
    try {
        const  currentUser = req.userId
        const addToCartProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")
        res.json({
            data: addToCartProduct,
            message: "Ok",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            messsage : err.messsage || err,
            error : true,
            success : false
        })
    }
}

module.exports = viewAddToCartProduct