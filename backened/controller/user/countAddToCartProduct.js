const addToCartModel = require("../../models/cartProduct")


const countAddToCartProduct = async(req,res)=>{
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId: userId
        })
        res.json({
            data: {
                count : count
            },
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

module.exports = countAddToCartProduct