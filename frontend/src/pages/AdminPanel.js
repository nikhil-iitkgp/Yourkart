import React, { useEffect } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate=useNavigate()

  useEffect(() => {
    if(user?.role!==ROLE.ADMIN) {
      navigate('/')
    }
 }, [user])
  

  return (
    <div className='min-h-[calc(100vh-115px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 mt-4 flex justify-center items-center flex-col'>
                <div className='text-3xl cursor-pointer relative flex justify-center' >
                    {
                        user?.profilePic?(
                            <img src={user?.profilePic} className='w-20 h-20  rounded-full' alt={user.name}/>
                        ):(
                                <FaRegCircleUser/>
                        )
                    }
              </div>
              <p className='capitalize text-lg font-semibold'>{user?.name}</p>
              <p>{user?.role}</p>
            </div>
            <div className=''>
              <nav className='grid p-4'>
                <Link to={"all-users"} className='px-2 py-2 hover:bg-slate-100'>All users</Link>
                <Link to={"all-products"} className='px-2 py-2 hover:bg-slate-100'>All products</Link>
              </nav>
            </div>
        </aside>
        <main className='w-full h-full p-4 '>
          <Outlet/>
        </main>
    </div>
    
  )
}

export default AdminPanel