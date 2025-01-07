const backenedDomain = process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"

const SummaryApi = {
    signUp : {
        url : `${backenedDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backenedDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backenedDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url : `${backenedDomain}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backenedDomain}/api/all-users`,
        method : "get"
    },
    updateUser :{
        url : `${backenedDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct :{
        url : `${backenedDomain}/api/upload-product`,
        method : "post"
    },
    allProduct :{
        url : `${backenedDomain}/api/all-product`,
        method : "get"
    },
    updateProduct :{
        url : `${backenedDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct :{
        url : `${backenedDomain}/api/get-eachCategorySingleProduct`,
        method : "get"
    },
    getSingleCategoryAllProduct :{
        url : `${backenedDomain}/api/get-singleCategoryAllProduct`,
        method : "post"
    },
    productDetails :{
        url : `${backenedDomain}/api/product-details`,  
        method : "post"
    },
    addToCartProduct :{
        url : `${backenedDomain}/api/add-to-cart`,
        method : "post"
    },
    countAddToCartProduct :{
        url : `${backenedDomain}/api/countAddToCartProduct`,
        method : "get"
    },
    viewAddToCartProduct :{
        url : `${backenedDomain}/api/viewAddToCartProduct`,
        method : "get"
    },
    updateCartProduct :{
        url : `${backenedDomain}/api/update-cart-product`,
        method : "post"
    },
    deleteCartProduct :{
        url : `${backenedDomain}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct :{
        url : `${backenedDomain}/api/search`,
        method : "get"
    },
    filterProduct :{
        url : `${backenedDomain}/api/filter-product`,
        method : "post"
    },
    payment :{
        url : `${backenedDomain}/api/checkout`,
        method : "post"
    }

}

export default SummaryApi