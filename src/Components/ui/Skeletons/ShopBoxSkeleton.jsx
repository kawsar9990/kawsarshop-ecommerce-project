'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ShopBoxSkeleton() {
  return (
    <div className="pt-10 xl:pt-2">
      <div className="px-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        
      
        <div className="block xl:pr-5">
           <SkeletonCard />
        </div>

        
        <div className="hidden md:block xl:pr-5">
           <SkeletonCard />
        </div>

        
        <div className="hidden md:block xl:pr-5">
           <SkeletonCard />
        </div>

       
        <div className="hidden xl:block xl:pr-5">
           <SkeletonCard />
        </div>

      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="p-2 h-40 bg-gray-200/40 rounded-lg border border-gray-100 shadow-sm">
      <div className='flex items-center justify-center px-5 py-5 h-full'>
        <div className='w-1/2 flex justify-center'>
           <Skeleton circle height={75} width={75} />
        </div>
        <div className='w-1/2 space-y-2'>
           <Skeleton width="100%" height={15} />
           <Skeleton width="50%" height={12} />
           <div className="pt-3">
              <Skeleton width="70%" height={10} />
           </div>
        </div>
      </div>
    </div>
  )
}