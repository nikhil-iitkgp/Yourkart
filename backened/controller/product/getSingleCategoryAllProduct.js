const productModel = require("../../models/productModel")

const getSingleCategoryAllProduct = async(req,res)=>{
    try {
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})

        res.json({
            message: 'All products of the given category is fetched successfully',
            data: product,
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

module.exports = getSingleCategoryAllProduct