import React, { useEffect, useState } from 'react'
import desktopImage1 from '../assest/banner/img1.webp'
import desktopImage2 from '../assest/banner/img2.webp'
import desktopImage3 from '../assest/banner/img3.jpg'
import desktopImage4 from '../assest/banner/img4.jpg'
import desktopImage5 from '../assest/banner/img5.webp'
import mobileImage1 from '../assest/banner/img1_mobile.jpg'
import mobileImage2 from '../assest/banner/img2_mobile.webp'
import mobileImage3 from '../assest/banner/img3_mobile.jpg'
import mobileImage4 from '../assest/banner/img4_mobile.jpg'
import mobileImage5 from '../assest/banner/img5_mobile.png'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";


const BannerProduct = () => {
    const desktopImages = [
        desktopImage1, desktopImage2, desktopImage3, desktopImage4, desktopImage5
    ]
    const mobileImages = [
        mobileImage1, mobileImage2, mobileImage3, mobileImage4, mobileImage5
    ]

    const [currentImage,setCurrentimage] = useState(3)
    const nextImage = () =>{
        if(desktopImages.length-1>currentImage){
            setCurrentimage(currentImage+1)
        }
    }
    const prevImage = () =>{
        if(currentImage){
            setCurrentimage(currentImage-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(() => {
            if(desktopImages.length-1>currentImage){
                nextImage()
            }else{
                setCurrentimage(0)
            }
        },5000)
        return () => clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto rounded px-4'>
        <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 w-full h-full md:flex items-center justify-center hidden'>
                <div className='flex justify-between items-center w-full text-2xl '>
                    <FaAngleLeft onClick={prevImage} className='bg-white shadow-md rounded-full p-1'/>
                    <FaAngleRight onClick={nextImage} className='bg-white shadow-md rounded-full p-1'/>
                </div>
            </div>

            {/**Tablet Version */}
            <div className='hidden md:flex w-full h-full overflow-hidden'>
                { 
                    desktopImages.map((imageUrl,index)=>{
                        return(
                            <div className='h-full w-full min-h-full min-w-full transition-all translate' key={imageUrl} style={{transform: `translateX(-${currentImage*100}%)`}}>
                                 <img src={imageUrl} className='h-full w-full'></img>
                            </div>
                        )
                    })
                }
            </div>

            {/**Mobile Version */}
            <div className='flex w-full h-full overflow-hidden md:hidden'>
                { 
                    mobileImages.map((imageUrl,index)=>{
                        return(
                            <div className='h-full w-full min-h-full min-w-full transition-all translate' key={imageUrl} style={{transform: `translateX(-${currentImage*100}%)`}}>
                                 <img src={imageUrl} className='h-full w-full '></img>
                            </div>
                        )
                    })
                }
            </div>

                
        </div>
    </div>
  )
}

export default BannerProduct