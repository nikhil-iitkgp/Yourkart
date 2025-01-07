import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdCloseCircleOutline } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const ChangUserRole = ({
    name,
    email,
    userId,
    role,
    onClose,
    callFunc
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
    }

    const updateUserRole =async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method: 'POST',
            credentials : 'include',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })
        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        console.log("responseData",responseData)
    }


  return (
    <div className='fixed w-full top-0 bottom-0 left-0 right-0 h-full flex z-10 justify-between items-center'>
        <div className='mx-auto w-full max-w-sm bg-white shadow-md p-4'>
            <button className='text-2xl text-red-500 block ml-auto' onClick={onClose}>
                <IoMdCloseCircleOutline  />
            </button>

            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <div className='flex items-center justify-between py-4'>
                <p>Role : </p>
                <select className='border px-2' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>
            <p className='w-fit block mx-auto px-4 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 cursor-pointer' onClick={updateUserRole}>Change Role</p>
        </div>
    </div>
  )
}

export default ChangUserRole