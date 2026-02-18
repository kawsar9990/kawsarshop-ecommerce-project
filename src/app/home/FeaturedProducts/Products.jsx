'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Featureds } from "../../../content/Featuredproduct/FeaturedProduct";
import useProductSlider from "../../../hooks/useProductSlider";
import Image from "next/image";


export default function FeaturedProducts(){
const sliderRef = useProductSlider()


    return(
       <div className="relative p-5">



 <div ref={sliderRef} className="keen-slider cursor-not-allowed">
{Featureds.map(item => (
 <div
  key={item.id}
  className="keen-slider__slide bg-white group mb-5 rounded-lg cursor-not-allowed shadow-lg flex flex-col justify-between"
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
      <div className="text-[13px]">{item.ratestar}</div>
      <div className="flex items-center justify-between">
        <p className="line-through text-gray-400">${item.oldprice}</p>
        <p className="text-[#E2136E] font-semibold">${item.price}</p>
      </div>
    </div>

  </div>


  <div className="p-2 mb-2">
    <button className="bg-transparen outline-2 text-center rounded-md text-[#E2136E] cursor-not-allowed outline-red-600  p-1 w-full">
      <div className="flex flex-row gap-3 justify-center">
        <p>
          <FontAwesomeIcon icon={faCartShopping} />
        </p>
        <p>Add To Cart</p>
      </div>
    </button>
  </div>
</div>
))}

 </div>
        </div>
    )
}