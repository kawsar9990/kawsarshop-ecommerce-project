'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function DetailsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
      
    
      <div className="lg:sticky lg:top-40">
        
   
        <div className="hidden lg:flex flex-row gap-3">
        
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={100} height={100} borderRadius={8} />
            ))}
          </div>
        
          <div className="relative">
            <Skeleton width={400} height={440} borderRadius={12} /> 
          </div>
        </div>

 
        <div className="flex flex-col gap-4 lg:hidden items-center">
          <div className="w-full max-w-[520px]">
            <Skeleton height={350} borderRadius={12} />
          </div>
          <div className="flex flex-row gap-2 md:gap-10 justify-between w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1">
                <Skeleton height={100} borderRadius={8} />
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="flex flex-col gap-5">
        

        <Skeleton height={40} width="85%" />


        <div className="flex justify-between w-full items-center">
          <Skeleton width={140} height={35} borderRadius={8} />
          <Skeleton circle width={35} height={35} />
        </div>


        <div className="flex gap-7 items-center">
          <Skeleton width={50} height={20} />
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={20} />
        </div>

  
        <Skeleton width="90%" height={22} />


        <div className="flex gap-3 items-end">
          <Skeleton width={110} height={45} />
          <Skeleton width={70} height={30} />
          <Skeleton width={120} height={30} />
        </div>


        <div className="flex gap-3 items-center mt-2">
          <Skeleton width={80} height={25} />
          <div className="flex gap-3">
            <Skeleton width={40} height={40} borderRadius={8} />
            <Skeleton width={40} height={40} borderRadius={8} />
            <Skeleton width={40} height={40} borderRadius={8} />
          </div>
        </div>


        <div className="flex w-full gap-3 mt-4">
          <Skeleton height={48} containerClassName="flex-1" borderRadius={8} />
          <Skeleton height={48} containerClassName="flex-1" borderRadius={8} />
          <Skeleton height={48} width={55} borderRadius={8} />
        </div>


        <Skeleton width="65%" height={25} style={{ marginTop: '10px' }} />


        <div className="flex justify-between w-full mt-4 flex-wrap gap-4">
          <div className="space-y-3 min-w-[200px]">
            <Skeleton width="80%" height={20} />
            <Skeleton width="85%" height={20} />
            <Skeleton width="75%" height={20} />
            <Skeleton width="80%" height={20} />
          </div>

          <Skeleton width={160} height={80} borderRadius={10} />
        </div>


        <div className="grid grid-cols-[1fr_2fr] items-center gap-6 mt-6 p-4 border border-gray-100 rounded-xl bg-white/50">
          <div className="flex flex-col items-center gap-2">
            <Skeleton width={100} height={20} />
            <Skeleton width={70} height={45} />
            <Skeleton width={110} height={12} />
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={10} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}