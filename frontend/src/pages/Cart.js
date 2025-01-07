import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';


const AddToCart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async()=>{
        const response = await fetch(SummaryApi.viewAddToCartProduct.url,{
            method: SummaryApi.viewAddToCartProduct.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseData = await response.json()
        if(responseData.success){
            setData(responseData.data)
        }
    }
    
    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                'content-Type' : 'application/json',
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty + 1
            })

        })
        const responseData = await response.json()
        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty)=>{
        if(qty > 1){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method: SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    'content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    _id : id,
                    quantity : qty - 1
                })

            })
            const responseData = await response.json()
            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method: SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                'content-Type' : 'application/json',
            },
            body : JSON.stringify({
                _id : id,
            })

        })
        const responseData = await response.json()
        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async()=>{
        //console.log('process.env.REACT_APP_STRIPE_PUBLIC_KEY',process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await fetch(SummaryApi.payment.url,{
            method: SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                'content-Type' : 'application/json',
            },
            body : JSON.stringify({
                cartItems: data
            }),
        })
        const responseData = await response.json()
        console.log('PaymentResponse',responseData)
        if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId : responseData.id})
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity ,0)
    const totalPrice = data.reduce((previousValue,currentValue)=>previousValue + (currentValue.quantity*currentValue?.productId?.sellingPrice) ,0)

    const handleloading = async()=>{
        await fetchData()
    }
    useEffect(()=>{
        setLoading(true)
        handleloading()
        setLoading(false)
    },[])

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length===0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/**view addToCart products */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((el,index)=>{
                            return(
                                <div className='w-full bg-slate-200 rounded p-2 h-32 my-2 border-slate-300 animate-pulse' key={index + "AddToCart"}>
                                </div>
                            )
                        })
                            
                    ) : (
                        data.map((product,index)=>{
                            return(
                                <div className='w-full bg-white rounded  h-32 my-2 border-slate-300 grid grid-cols-[128px,1fr]' key={index}>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} alt="product image" className='w-full h-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='py-2 px-4 relative'>
                                        {/**delete product from cart */}
                                        <div className='absolute right-0 p-2 cursor-pointer text-red-600 rounded-full hover:text-white hover:bg-red-600' onClick={()=>deleteProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg font-semibold lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2> 
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-medium text-lg text-red-600'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='font-semibold text-slate-500 text-lg'>{displayINRCurrency(product?.productId?.sellingPrice*product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt'>
                                            <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center  items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                            <span className='text-lg font-bold'>{product?.quantity}</span>
                                            <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center  items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/**view summary of addToCart products */}
            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                              
                            </div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-slate-600 text-lg'>
                                <p>Total Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-slate-600 text-lg'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-blue-600 p-2 mt-2 w-full text-white ' onClick={handlePayment}>Payment</button>
                        </div>
                    )
                }
                    </div>
                    )
            }
            
        </div>
    </div>
  )
}

export default AddToCart