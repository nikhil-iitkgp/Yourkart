const productModel = require("../../models/productModel")

const getEachCategorySingleProduct = async(req,res) =>{
    try {
        const productCategory = await productModel.distinct("category")
        
        console.log("product category", productCategory)

        //array to store one product from each category
        const productByCategory = []
        for(const category of productCategory){
            const product = await productModel.findOne({category:category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message : "Each category single product fetched successfully",
            data : productByCategory,
            sucess : true,
            error : false
        })
    }catch (err) {
        res.status(400).json({
            messsage : err.messsage || err,
            error : true,
            success : false
        })
    }
}

module.exports = getEachCategorySingleProduct