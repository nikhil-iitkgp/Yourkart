import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchData
}) => {
    const [editProduct,setEditProduct] = useState(false)
    return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40 h-56'>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage?.[0]} alt={data?.productName} className='object-fill mx-auto h-full'></img>
            </div>
           
            <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
            <div>
                <p className='font-semibold '>
                    {displayINRCurrency(data?.sellingPrice)}
                </p>
                <div className='w-fit ml-auto p-2 rounded-full bg-green-200 hover:bg-green-600 hover:text-white cursor-pointer ' onClick={()=>setEditProduct(true)}>
                   <MdModeEdit/>
                </div>
            </div>
            
        </div>
        <div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose = {()=>setEditProduct(false)} fetchData={fetchData}/>
                )
            }
        </div>
    </div>
  )
}

export default AdminProductCard