import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/verticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addtoCart';
import Context from '../context';

const ProductDetails = () => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice: ""
    })
    const params = useParams()
    console.log("product id",params)
    const [loading,setLoading]=useState(false)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage,setActiveImage] = useState("")

    const {fetchUserAddToCart}= useContext(Context)
    const navigate = useNavigate()

    const [zoomImageCordinate,setZoomImageCordinate] = useState({
        x:0,
        y:0
    })
    const [zoomImageVisible,setZoomImageVisible] = useState(false)

    const fetchProductDetails = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url,{
            method:SummaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId:params.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setData(dataResponse?.data)
        setActiveImage(dataResponse.data.productImage[0])
    }
    console.log("data",data)
    useEffect(() => {
      fetchProductDetails()
    },[params])

    const handleMouseEnterProduct = (imgUrl)=>{
        setActiveImage(imgUrl)
    }

    const handleZoomImage = useCallback((e)=>{
        setZoomImageVisible(true)
        const {left, top, width, height } = e.target.getBoundingClientRect()
        console.log("Coordinates", left, top, width, height)
        const x = (e.clientX-left)/width
        const y = (e.clientY-top)/height
        setZoomImageCordinate({
            x:x,
            y:y
        })
    },[zoomImageCordinate])

    const handleLeaveImageZoom = ()=>{
        setZoomImageVisible(false)
    }

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
        navigate("/AddToCart")
    }
    
  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
            {/**product image */}
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                    <img src={activeImage} alt={data.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                    {/**product zoom */}
                    {
                        zoomImageVisible && (
                        <div className='hidden lg:block absolute overflow-hidden min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                            <div 
                            className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-150'
                            style={{
                                backgroundImage : `url(${activeImage})`,
                                backgroundRepeat : 'no-repeat',
                                backgroundPosition : `${zoomImageCordinate.x*100}% ${zoomImageCordinate.y*100}%`
                            }}
                            >

                            </div>
                        </div>
                    )
                    }
                </div>
                <div className='h-full'>
                    {
                        loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                    productImageListLoading.map((el,index)=>{
                                        return(
                                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                    data?.productImage?.map((imgUrl,index)=>{
                                        return(
                                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgUrl}>
                                                <img src={imgUrl} alt={imgUrl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgUrl)} onClick={()=>handleMouseEnterProduct(imgUrl)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    } 
                </div>
            </div>
            {/**product details */}
            {
                loading ? (
                    <div className='flex flex-col gap-3 w-full mr-80'>
                        <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>
                        <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>
                        <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>  
                        <div className='flex text-red-600 items-center gap-1'>
                        </div>
                        <div className='flex items-center gap-6 text-2xl lg:text-3xl my-1 font-medium'>
                            <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>
                            <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>
                        </div>
                        <div className='flex gap-3 my-2'>
                            <button className='border-2  px-3 py-1 min-w-[100px] bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></button>
                            <button className='border-2  px-3 py-1 min-w-[100px] bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></button>
                        </div>
                        <div className='flex flex-col gap-3 '>
                            <p className='text-slate-600 font-medium bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-8'></p>
                            <p className='bg-slate-200 rounded-full w-full animate-pulse h-6 lg:h-12'></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit inline-block'>{data.brandName}</p>
                        <p className='text-2xl lg:text-4xl font-medium'>{data.productName}</p>
                        <p className='capitalize text-slate-400'>{data.category}</p>
                        <div className='flex text-red-600 items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl my-1 font-medium'>
                            <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                            <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                        </div>
                        <div className='flex gap-3 my-2'>
                            <button className='border-2 border-red-600 px-3 py-1 min-w-[100px] rounded text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                            <button className='border-2 border-red-600 px-3 py-1 min-w-[100px] rounded text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium'>Description</p>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
        {
            data.category &&(
                <CategoryWiseProductDisplay category={data?.category} heading="Recommended Products:"/>
            )
        }
        
    </div>
  )
}

export default ProductDetails