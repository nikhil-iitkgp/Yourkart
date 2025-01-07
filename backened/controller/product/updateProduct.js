const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req,res) {
        try {

            const sessionUserId = req.userId
            console.log(sessionUserId)
            if(!uploadProductPermission(sessionUserId)){
                throw new Error("Permission denied")
            }

            const {_id, ...resBody} = req.body

            const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
            console.log("updated product",updateProduct)

            res.json({
                message : "Product Updated Successfully",
                data : updateProduct,
                success : true,
                error : false
            })

        } catch (err) {
            res.status(400).json({
                message : err.messsage || err,
                error : true,
                success : false
            })
        }
}

module.exports = updateProductController