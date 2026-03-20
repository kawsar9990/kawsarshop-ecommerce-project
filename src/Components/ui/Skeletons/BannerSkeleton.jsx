import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function BannerSkeleton() {

return(
<div className="w-full h-50 lg:h-80">
      <Skeleton 
        height="100%" 
        width="100%" 
        borderRadius={12} 
        baseColor="#e0e0e0"       
        highlightColor="#f5f5f5"  
        duration={1.5}            
        enableAnimation={true}
      />
    </div>
)    
}