"use client";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FirstBannerSkeleton() {
  return (

    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:items-center items-start p-2'>
      
  
      <div className='w-full'>
        <div className="p-5"> 
          <div className="w-full h-[200px] lg:h-[300px] p-3 md:p-10 flex items-center flex-row justify-between rounded-md bg-gray-200/50 shadow-xl border border-gray-100">
            
  
            <div className="w-[120px] sm:w-[160px]">
               <Skeleton height={140} width="100%" borderRadius={10} />
            </div>

       
            <div className="flex flex-col items-end gap-2 w-1/2">
               <Skeleton width="100%" height={25} /> 
               <Skeleton width="60%" height={20} /> 
               <div className="mt-5">
                 <Skeleton width={110} height={45} borderRadius={8} /> 
               </div>
            </div>
          </div>
        </div>
      </div>


      <div className='p-3 flex flex-col md:flex-row lg:flex-col justify-around xl:justify-between md:gap-3 w-full'>
        

        <div className='bg-[#CFE9F6]/50 rounded-lg mb-5 md:mb-0 w-full'>
          <div className='p-3 h-[100px] lg:h-[140px] flex items-center'>
            <div className='flex w-full justify-between items-center'>
              <div className='w-1/2 flex justify-center'>
                <Skeleton circle height={70} width={70} /> 
              </div>
              <div className='w-1/2 space-y-2'>
                <Skeleton width="90%" height={15} />
                <Skeleton width="40%" height={12} />
                <Skeleton width="60%" height={15} />
              </div>
            </div>
          </div>
        </div>

  
        <div className='bg-[#DCDDF2]/50 rounded-lg w-full'>
          <div className='p-3 h-[100px] lg:h-[140px] flex items-center'>
            <div className='flex w-full justify-between items-center'>
              <div className='w-1/2 flex justify-center'>
                <Skeleton circle height={70} width={70} />
              </div>
              <div className='w-1/2 space-y-2'>
                <Skeleton width="90%" height={15} />
                <Skeleton width="40%" height={12} />
                <Skeleton width="60%" height={15} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}