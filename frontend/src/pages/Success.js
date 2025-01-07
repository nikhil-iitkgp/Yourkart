import React from 'react'
import SuccessImage from '../assest/Success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-4 rounded '>
        <img 
            src={SuccessImage} 
            alt="Success" 
            width={150}
            height={150}
        />
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        <Link to = {'/order'} className='text-green-600 border-2 border-green-600  rounded mt-5 p-2 px-3 font-semibold hover:text-white hover:bg-green-600 '>See Order</Link>
    </div>
  )
}

export default Success