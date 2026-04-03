'use client'

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useFetauredProducts } from "../../../hooks/useFeaturedProducts";
import SliderSkeleton from "../../../Components/ui/Skeletons/SliderSkeleton";
import useProductSlider from "../../../Components/ui/Slider/useProductSlider";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlarmClock} from "@fortawesome/free-solid-svg-icons";

export default function FeaturedProducts(){
const { products, dataloading } = useFetauredProducts();
const sliderRef = useProductSlider(products)


    return(
    <div className="relative p-5">

{dataloading ? (
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
   <SliderSkeleton/>
 </div>
) : (
 <div ref={sliderRef} key={products.length} className="keen-slider">
 {
products.map( (item) => (
 <div
  key={item._id}
  className="keen-slider__slide group bg-white mb-5 rounded-lg cursor-not-allowed shadow-lg flex flex-col justify-between"
>
  <div>
    <div className="overflow-hidden relative">


  <Image
  src={item.image}
  alt={item.name}
  width={300}
  height={200}
  className="w-full h-[180px] object-cover rounded transition-all duration-500 group-hover:scale-110"
/>


   <div className="absolute text-white top-1 left-1 rounded-lg font-bold p-1 bg-red-600">
     {item.discountPercent}
   </div>

    </div>


  <div className="p-2 flex flex-col gap-1 flex-grow">
      <div className="text-gray-400 text-[10px]">{item.catetitle}</div>
      <div className="text-gray-900 font-semibold md:text-base line-clamp-2 h-[32px] truncate">
        {item.name}
      </div>

      <div className="flex flex-row gap-3">
       <Rating
          name="product-rating"
          value={parseFloat(item.ratestar) || 0}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
        <p className="text-[13px] text-gray-500">({item.ratestar}.0)</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="line-through text-gray-400">${item.oldprice}</p>
        <p className="text-[#E2136E] font-semibold">${item.price}</p>
      </div>
    </div>

  </div>


  <div className="p-2 mb-2">
    <button className="bg-transparent text-gray-400 outline-2 text-center rounded-md cursor-not-allowed p-1 w-full">
      <div className="flex flex-row gap-3 justify-center items-center">
        <p>
          <FontAwesomeIcon icon={faAlarmClock} />
        </p>
        <p className='text-[13px]'>Comming Soon</p>
      </div>
    </button>
  </div>
</div>
))  
 } 
  </div>
)}


</div>
    )
}