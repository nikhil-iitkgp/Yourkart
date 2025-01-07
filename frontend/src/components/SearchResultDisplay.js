import React, { useContext, useEffect, useRef, useState } from 'react'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addtoCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const SearchResultDisplay = ({loading , data = []}) => {

    const loadingList = new Array(12).fill(null)
    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] md:justify-between md:gap-4 justify-center overflow-scroll scrollbar-none'>
        {
            loading ? (
                loadingList.map((product,index)=>{
                return(
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                        <div className='h-56 flex justify-center items-center p-4 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-slate-200 '>
                            <img src={product?.productImage[0]} alt={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-3 grid gap-1'>
                            <h2 className='bg-slate-200 w-full rounded-full p-2 animate-pulse'>{product?.productName}</h2>
                            <p className='bg-slate-200 w-full rounded-full p-2 animate-pulse'>{product?.category}</p>
                            <div className='flex gap-1 '>
                                <p className='bg-slate-200 w-full rounded-full p-2 animate-pulse'></p>
                                <p className='bg-slate-200 w-full rounded-full p-2 animate-pulse'></p>
                            </div>
                            <button className='bg-slate-200 w-full rounded-full p-2 animate-pulse'></button>
                        </div>
                    </div>
                )
            })
            ) : (
                data.map((product,index)=>{
                return(
                    <Link to={"/product/" + product?._id}className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop} key={index}>
                        <div className='h-56 flex justify-center items-center p-4 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-slate-200 '>
                            <img src={product?.productImage[0]} alt={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-3 grid gap-1'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3 '>
                                <p className='text-red-600'>{displayINRCurrency(product?.price)}</p>
                                <p className='text-slate-500 line-through'>{displayINRCurrency(product?.sellingPrice)}</p>
                            </div>
                            <button className='text-sm bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 text-white font-medium' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                        </div>
                    </Link>
                )
            })
            )
            
        }
    </div>
  )
}

export default SearchResultDisplay