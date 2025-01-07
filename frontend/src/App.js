import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch =useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json() 


    if(dataApi.success){
       dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url,{
      method: SummaryApi.countAddToCartProduct.method,
      credentials : 'include'
    })
    const dataApi = await dataResponse.json() 
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    //User details
   fetchUserDetails()
   //User cart details
   fetchUserAddToCart()
  }, [])
  
  
  return (
    <> 
      <Context.Provider value={{
         fetchUserDetails,   //fetch current user detail
         cartProductCount,  //current user addToCart count
         fetchUserAddToCart
      }}>
        <ToastContainer
           position = 'top-center' 
        />
        <Header/>
         <main className='min-h-[calc(100vh-115px)] pt-16'>
           <Outlet/>
         </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
