import React, { useContext, useState } from 'react'
// import Logo from './Logo'
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import YourkartLogo from "../assest/YourKartLogo1.png"
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {

    const user = useSelector(state => state?.user?.user)
    // console.log("user-header",user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay]=useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const handleLogout = async()=> {
        const fetchData= await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })

        const data = await fetchData.json()
        console.log("logout-data",data)
        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
            console.log('User details set to null')
            navigate("/")
        }
        if(data.error){
            toast.error(data.error)
        }

    }
    // console.log("header add to cart count",context)
    const handleSearch = (e)=>{
        const {value} = e.target
        setSearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate(`search`)
        }
    }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'> 
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className='h-16 hover:scale-105'> 
                <Link to={"/"}><img src={YourkartLogo} alt="YourKart Logo" width="200"/></Link>
            </div>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3'>
                <input type='text' placeholder='Search items here...  ' className='w-full outline-none' onChange={handleSearch} value={search}></input>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                    <CgSearch/>
                </div>
            </div> 
            <div className='flex items-center gap-4'>
                <div className='relative flex justify-center'>
                    {
                        user?._id && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !(prev))}>
                        {
                            user?.profilePic?(
                                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user.name}/>
                            ):(
                                    <FaRegCircleUser/>
                            )
                        }
                
                        </div>
                        )
                    }

                    {
                        menuDisplay &&  user?.role === ROLE.ADMIN &&  (
                            <div className=' absolute top-11 bottom-0 h-fit bg-white shadow-lg p-2 rounded'>
                                <nav>
                                    {
                                        user?.role === ROLE.ADMIN && (
                                            <Link to = {"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !(prev))}>Admin panel</Link>
                                        )

                                    }
                                </nav>
                            </div>
                        )

                    }
                </div>
               
                {
                    user?._id && (
                        <Link to={"/addToCart"} className='text-3xl cursor-pointer relative'>
                            <span><FaShoppingCart/></span>
                            <div className='bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-2'>
                                <p className='text-sm'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )
                }
                <div>
                    {
                        user?._id ?(
                            <button onClick={handleLogout} className='bg-red-600 text-white  px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer'>Logout</button>
                        ) : (
                            <Link to={"/login"} className='bg-red-600 text-white  px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer'>Login</Link>
                        )
                    }
                    
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header