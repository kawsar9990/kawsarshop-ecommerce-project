'use client'

import { useState,useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function PopularSkeleton({ count }){
const [skeletonCount, setSkeletonCount] = useState(0);

useEffect(()=> {
const updateCount = () => {
    if(count) {
        setSkeletonCount(count)
        return;
    }
   const width = window.innerWidth;
   if (width >= 1280) setSkeletonCount(6); 
   else if (width >= 1024) setSkeletonCount(4);
   else if (width >= 768) setSkeletonCount(4);
   else if (width >= 640) setSkeletonCount(3);
   else setSkeletonCount(2);
}
updateCount();
window.addEventListener("resize", updateCount);
return () => window.removeEventListener("resize", updateCount); 
},[count])

return(
    <>
    {[...Array(skeletonCount)].map((_, index) => (
   <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-100 mb-5" style={{userSelect: "none"}}>

  <div className="relative overflow-hidden">
     <Skeleton height={180} borderRadius={8} />
 </div>
 
 <div className="mt-3">
  <Skeleton width="30%" height={10} style={{ marginBottom: '8px' }} />   
  <Skeleton height={20} width="90%" style={{ marginBottom: '10px' }} />
 
 <div className="flex justify-between items-center mt-4">
     <Skeleton width={60} height={15} />
     <Skeleton width={50} height={20} />
 </div>
 
 
 <div className="mt-4">
    <Skeleton height={35} borderRadius={6} />
 </div>
 
 </div>

   </div>     
    ))}
    
    </>
)
}