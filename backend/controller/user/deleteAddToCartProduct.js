const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res)=>{
    try {
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id: addToCartProductId})
        
        res.json({
            message : "Product deleted successfully",
            data : updateProduct,
            error : false,
            success : true
        })
    } catch (err) {
        res.json({
            message : err?.message || err ,
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToCartProduct