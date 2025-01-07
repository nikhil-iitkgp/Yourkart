const express = require('express')

const router = express.Router()


const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const authToken = require('../middleware/authtoken')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getEachCategorySingleProduct = require('../controller/product/getEachCategorySingleProduct')
const getSingleCategoryAllProduct = require('../controller/product/getSingleCategoryAllProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const viewAddToCartProduct = require('../controller/user/viewAddToCartProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel
router.get("/all-users", allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,uploadProductController)
router.get("/all-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-eachCategorySingleProduct",getEachCategorySingleProduct)
router.post("/get-singleCategoryAllProduct",getSingleCategoryAllProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/add-to-cart",authToken,addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/viewAddToCartProduct",authToken,viewAddToCartProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

// payment and order
router.post("/checkout", authToken,paymentController)
router.post('/webhook',authToken,webhooks) //api webhook

module.exports = router