import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addtoCart'
import Context from '../context'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(12).fill(null)

    const [srcoll,setScroll] = useState(0)
    const scrollElement = useRef()

    const {fetchUserAddToCart}= useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
        // console.log("horizontal data", categoryProduct?.data)   
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -=300
    }
    const scrollRight = ()=>{
        scrollElement.current.scrollLeft +=300
    }
  return (
    <div className='container mx-auto px-4 mt-6 relative'>

        <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>

            <FaAngleLeft className='bg-white shadow-md rounded-full p-1 absolute left-0  text-2xl hidden md:block' onClick={scrollLeft}/>
            <FaAngleRight className='bg-white shadow-md rounded-full p-1 absolute right-0 text-2xl hidden md:block' onClick={scrollRight}/>
            {
                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm h-36 shadow' key={index}>
                                <div className='h-full p-4 min-w-[120px] md:min-w-[145px] max-w-[120px] md:max-w-[145px] bg-slate-200 '>
                                    <img src={product?.productImage[0]} alt={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-3 w-full grid gap-2'>
                                    <h2 className=' bg-slate-200 w-full rounded-full p-1 animate-pulse'></h2>
                                    <p className=' bg-slate-200 w-full rounded-full p-1 animate-pulse'></p>
                                    <div className='flex justify-between gap-1 w-full '>
                                        <p className=' bg-slate-200 w-full rounded-full p-1 animate-pulse'></p>
                                        <p className=' bg-slate-200 w-full rounded-full p-1 animate-pulse'></p>
                                    </div>
                                    <button className=' bg-slate-200 w-full rounded-full p-1 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data?.map((product,index)=>{
                        return(
                            <Link to={"/product/" + product?._id} className='flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm h-36 shadow' key={product?._id}>
                                <div className='h-full p-4 min-w-[120px] md:min-w-[145px] max-w-[120px] md:max-w-[145px] bg-slate-200 '>
                                    <img src={product?.productImage[0]} alt={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-3 grid gap-1'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-2 '>
                                        <p className='text-red-600'>{displayINRCurrency(product?.price)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 text-white font-medium ' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
        
    </div>
  )
}

export default HorizontalCardProduct