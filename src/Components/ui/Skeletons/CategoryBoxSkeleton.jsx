import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CategorySkeleton({ count = 8 }) {
  return (
    <div className="flex gap-2 overflow-hidden">
      {[...Array(count)].map((_, index) => (
        <div 
          key={index} 
          className="flex-shrink-0 w-[100px] md:w-[130px] lg:w-[150px] bg-white rounded-xl p-5 shadow-2xs border border-gray-50 flex flex-col items-center gap-3"
        >
          <div className="w-full aspect-square">
            <Skeleton circle={false} height="100%" borderRadius={12} />
          </div>
          <Skeleton width={60} height={12} />
        </div>
      ))}
    </div>
  )
}