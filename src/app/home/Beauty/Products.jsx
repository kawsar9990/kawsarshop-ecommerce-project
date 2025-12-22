'use client'

import { Beauty } from "../../../content/HomeProducts/Beauty";
import { useLoader } from "../../../context/ItemLoaderContext";
import useProductSlider from "../../../hooks/useProductSlider";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping ,faCodeCompare} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'


export default function BeautyProduct(){
const {showLoader, hideLoader} = useLoader()
const sliderRef = useProductSlider()

const handleLoading = (id) => {
    showLoader()
    setTimeout(() => hideLoader(), 300);
  };


   
    return(
       <div className="relative p-5">

 <div ref={sliderRef} className="keen-slider ">
{Beauty.map(item => (
 <div
  key={item.id}
  className="keen-slider__slide group mb-5 rounded-lg cursor-pointer shadow-lg flex flex-col justify-between"
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


<div className="absolute top-2 right-3 transition-all duration-500 opacity-0 group-hover:opacity-100">
<div className="flex flex-col gap-1">

  <div className="bg-white rounded-full hover:text-white hover:bg-red-600 font-black p-1 flex justify-center items-center">
    <button className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
    </button>
  </div>

  <div className="bg-white hover:text-white hover:bg-red-600 rounded-full font-black p-1 flex justify-center items-center">
    <button className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
    </button>
  </div>
  

<div className="bg-white hover:text-white hover:bg-red-600 rounded-full font-black p-1 flex justify-center items-center">
  <button className="cursor-pointer">
    <FontAwesomeIcon icon={faCodeCompare} />
  </button>
</div>


  <div className="bg-white hover:text-white hover:bg-red-600 rounded-full font-black p-1 flex justify-center items-center">
    <button className="cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
    </button>
  </div>

</div>
</div>

    </div>

    <div className="p-2 flex flex-col gap-1 flex-grow">
      <div className="text-gray-400 text-[10px]">{item.catetitle}</div>
      <div className="text-black text-[12px] line-clamp-2 h-[32px]">
        {item.name}
      </div>
      <div className="text-[13px]">{item.ratestar}</div>
      <div className="flex items-center justify-between">
        <p className="line-through text-gray-400">{item.oldprice}</p>
        <p className="text-red-600 font-semibold">{item.price}</p>
      </div>
    </div>

  </div>


  <div className="p-2 mb-2">
    <button onClick={()=> handleLoading(item.id)} className="bg-transparent hover:bg-black hover:text-white hover:outline-0 outline-2 text-center rounded-md text-red-500 cursor-pointer outline-red-600  p-1 w-full">
      <Link href={``} className="flex flex-row gap-3 justify-center">
        <p>
          <FontAwesomeIcon icon={faCartShopping} />
        </p>
        <p>Add To Cart</p>
      </Link>
    </button>
  </div>
</div>
))}

 </div>
        </div>
    )
}