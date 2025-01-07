import SummaryApi from "../common"

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(SummaryApi.getSingleCategoryAllProduct.url,{
        method: SummaryApi.getSingleCategoryAllProduct.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({category:category})
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct
