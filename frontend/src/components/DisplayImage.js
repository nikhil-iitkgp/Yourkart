import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    console.log("imgUrl",imgUrl)
  return (
    <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white mx-auto rounded shadow-lg max-w-5xl p-3'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
                    <IoMdCloseCircleOutline/>
            </div>
            <div className='flex justify-center max-w-[80vh] max-h-[80vh] p-4'>
                <img src={imgUrl} className='w-full h-full'/>
            </div>  
        </div>
    </div>
    
    
  )
}

export default DisplayImage