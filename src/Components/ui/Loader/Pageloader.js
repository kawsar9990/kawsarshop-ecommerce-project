'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import gif from '../../../../public/loading/infinity-16570.gif'


export default function Loading(){
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
       const timer = setTimeout(() => {
        setIsLoading(false)
       }, 2000);

       return ()=> clearTimeout(timer)
    },[])

    if(!isLoading) return null;
   
   
    return(

        <div className='fixed w-full h-full inset-0  flex justify-center items-center min-h-screen bg-black z-[555000]'>
     <Image
        src={gif}
        alt="Loading..."
        width={150}
        height={150}
        className="animate-pulse"
        priority
      />       
        </div>

    )
}