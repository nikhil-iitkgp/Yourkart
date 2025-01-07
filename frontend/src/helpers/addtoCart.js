import SummaryApi from "../common";
import {toast} from "react-toastify"

const addToCart = async(e,id)=>{
    e?.preventDefault();
    e?.stopPropagation();
    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method: SummaryApi.addToCartProduct.method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(
            {productId:id}
        )
    })
    const responseData = await response.json();
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData

}
export default addToCart