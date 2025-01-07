import React, {useContext, useState} from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data,setdata]=useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const {fetchUserDetails ,fetchUserAddToCart}= useContext(Context)

    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setdata((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        console.log("Status:", dataResponse.status);
        const dataApi = await dataResponse.json();
        console.log("dataApi", dataApi);

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        } else {
            toast.error(dataApi.message);
        }
    } catch (error) {
        console.error("Request error:", error);
        toast.error("An error occurred, please try again.");
    }
};

    console.log("data login",data);
  return (
    <section id="login">
        <div className='mx-auto container p-5'>
            <div className='bg-white p-4 w-full max-w-sm mx-auto '>
               <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt='login icons'/>
               </div>
               <form className='pt-5 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                   <div className='grid'>
                      <label>Email: </label>
                      <div className='bg-slate-100 p-2'>
                        <input
                         type='email' 
                         name='email' 
                         value={data.email}
                         onChange={handleOnChange}
                         placeholder='Enter your email' 
                         className='w-full h-full outline-none bg-transparent '/>
                      </div>
                  </div>
                  <div>
                      <label>Password: </label>
                      <div className='bg-slate-100 p-2 flex'>
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' 
                        value={data.password}
                        onChange={handleOnChange}
                        placeholder='Enter your password' 
                        className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                             <span>
                                {showPassword ? <FaEyeSlash /> : <FaEye />} 
                            </span>
                        </div>
                      </div>
                      <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                        Forgot password?
                      </Link>
                      </div>
                  <button className='bg-red-600 hover:bg-red-700 px-4 py-2 mx-auto mt-5 w-full max-w-[150px] block rounded-full hover:scale-110 hover:transition-all'>Login</button>
               </form>
               <p className='mt-4'>New Customer? <Link to={'/sign-up'} className='hover:text-red-700 hover:underline text-blue-600'>Sign Up</Link></p> 
               
            </div>
        </div>
    </section>
  )
}

export default Login