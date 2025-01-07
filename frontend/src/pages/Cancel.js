import React from 'react'
import CancelImage from '../assest/Cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-4 rounded '>
        <img 
            src={CancelImage} 
            alt="Cancel" 
            width={150}
            height={150}
            className='mix-blend-multiply'
        />
        <p className='text-red-600 font-bold text-xl'>Payment Aborted</p>
        <Link to = {'/AddToCart'} className='text-red-600 border-2 border-red-600  rounded mt-5 p-2 px-3 font-semibold hover:text-white hover:bg-red-600 '>Go to Cart</Link>
    </div>
  )
}

export default Cancel