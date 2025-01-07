import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'



const AdminEditProduct = ({
    productData,
    onClose,
    fetchData
}
) => {
    const [data,setData]=useState({
        ...productData,
        productName : productData?.productName,
        brandName : productData?.brandName,
        category : productData?.category,
        productImage : productData?.productImage,
        description : productData?.description,
        price : productData?.price,
        sellingPrice: productData?.sellingPrice
    })

    const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
    const [fullScreenImage,setFullScreenImage]=useState("")
    
    const handleOnChange =(e)=>{
        const {name,value}=e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const handleUploadImage = async(e)=>{
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        
        setData((prev)=>{
            return{
                ...prev,
                productImage : [...prev.productImage,uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = (index) => {
        setData((prev) => {
            const updatedImages = [...prev.productImage];
            updatedImages.splice(index, 1); 
            return {
                ...prev,
                productImage: updatedImages
            };
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(data)
        const response = await fetch(SummaryApi.updateProduct.url,{
            method: SummaryApi.updateProduct.method,
            credentials : 'include',
            headers :{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchData();
        } else {
            toast.error(responseData?.message);
        }
    }
    

  return (
    <div className='fixed h-full w-full opacity-90  bg-slate-200  top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>
                    Edit Product
                </h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
                    <IoMdCloseCircleOutline/>
                </div>
            </div>
            <form className='grid p-4 gap-3 overflow-y-scroll h-full p-b-5' onSubmit={handleSubmit}>
                <label htmlFor='productName'>Product Name :</label>
                <input 
                  type="text" 
                  id="productName" 
                  name="productName" 
                  placeholder= 'Enter product name' 
                  value={data.productName} 
                  onChange={handleOnChange}
                  className='p-2 border bg-slate-100 rounded' 
                  required
                  /> 
                  <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                  <input 
                    type="text" 
                    id="brandName" 
                    name="brandName" 
                    placeholder= 'Enter brand name' 
                    value={data.brandName} 
                    onChange={handleOnChange}
                    className='p-2 border bg-slate-100 rounded' 
                    required
                    />
                    <label htmlFor='category' className='mt-3'>Select Category :</label>
                    <select value={data.category} name="category" onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
                        <option value="">Select Category</option> 
                        {
                            productCategory.map((el,index)=>{
                                return(
                                    <option key={el.value+index} value={el.value}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput' className=''>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer '>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt/></span>
                                 <p className='text-sm'>Upload Product image</p>
                                 <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadImage}/>
                            </div>
                    </div>
                     </label>
                    <div>
                        {
                             data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data?.productImage.map((el,index)=>{
                                            return(
                                                <div key={index} className='relative group'>
                                                    <img 
                                                        src={el} 
                                                        alt={el}
                                                        width={80} 
                                                        height={80} 
                                                        className='bg-slate-100 border cursor-pointer' 
                                                        onClick={()=>{
                                                                setOpenFullScreenImage(true)
                                                                setFullScreenImage(el)
                                                            }
                                                        }
                                                   />
                                                   <div className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block' onClick={()=>{handleDeleteProductImage(index)}}>
                                                       <MdDelete/>
                                                   </div>
                                                </div>
                                                
                                            )
                                        })
                                    }
                                </div>
                               
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>
                     <label htmlFor='price'>Price:</label>
                        <input 
                        type="number"
                        id="price" 
                        name="price" 
                        placeholder= 'Enter price'
                        value={data.price} 
                        onChange={handleOnChange}
                        className='p-2 border bg-slate-100 rounded' 
                        required
                    />
                     <label htmlFor='sellingPrice'>Selling Price:</label>
                        <input 
                        type="number" 
                        id="sellingPrice" 
                        name="sellingPrice" 
                        placeholder= 'Enter product description'
                        value={data.sellingPrice} 
                        onChange={handleOnChange}
                        className='p-2 border bg-slate-100 rounded' 
                        required
                    />    
                    <label htmlFor='description '>Description :</label>
                        <textarea 
                        type="text" 
                        id="description" 
                        name="description" 
                        placeholder= 'Enter product description'
                        value={data.description} 
                        onChange={handleOnChange}
                        className='p-1 border h-28 resize-none bg-slate-100 ' 
                    />

                <button className='px-3 py-2 mb-10 bg-red-600 hover:bg-red-700 text-white'>Update Product</button>  
            </form>
        </div>
       {
             openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
             )
       }
    </div>
  )
}

export default AdminEditProduct