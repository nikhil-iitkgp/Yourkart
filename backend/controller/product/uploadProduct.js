const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function uploadProductController(req,res) {
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = uploadProduct.save()

        res.status(201).json({
            message: "Product uploaded successfully",
            data: saveProduct,
            success : true,
            error : false
        })

        
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProductController