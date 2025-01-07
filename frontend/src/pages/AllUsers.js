import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangUserRole from '../components/ChangUserRole';

const AllUsers = () => {
    const [allUsers,setAllUsers]=useState([])
    const [openUpdateRole,setOpenUpdateRole]=useState(false)
    const [updateUserDetail,setUpdateUserDetail]=useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    })
    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            
            if (!fetchData.ok) {
                throw new Error(`HTTP error! status: ${fetchData.status}`);
            }
            
            const dataResponse = await fetchData.json();
    
            if (dataResponse.success) {
                setAllUsers(dataResponse?.data);
            } else {
                toast.error(dataResponse?.message);
            }
            
            console.log("dataResponse", dataResponse);
        } catch (error) {
            console.error("Fetch failed:", error);
            toast.error("Failed to fetch users. Please check your server connection.");
        }
    };
    
    useEffect(()=>{
       fetchAllUsers() 
    },[])
    return (
        <div className='bg-white p-4 '>
            <table className='w-full userTable '>
                <thead className='bg-black text-white'>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => {
                        return (
                            <tr key={index+1+user?.name}>
                                <td>{index+1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.createdAt).format('ll')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetail(user)
                                        setOpenUpdateRole(true)
                                    }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangUserRole onClose={()=> setOpenUpdateRole(false)}
                    name={updateUserDetail.name}
                    email={updateUserDetail.email}
                    role={updateUserDetail.role}
                    userId = {updateUserDetail._id}
                    callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}

export default AllUsers