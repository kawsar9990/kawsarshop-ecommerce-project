'use client'

import Link from "next/link"

import WellnessProduct from "./Products"
import { useMainProduct } from "../../../context/ProductRender"
import { useLoader } from "../../../context/ItemLoaderContext"


export default function WellnessPage(){
const {setCategory} = useMainProduct()
const {showLoader, hideLoader} = useLoader()
   const handleLoading = (item, callback) => {
    showLoader()
    setTimeout(() => {
      hideLoader();
      if(callback) callback();
    }, 300);
}



return(
        <div className="bg-[#FFF2F8]">

<div className="flex flex-col">

<div className="p-5 flex justify-between">
    <p className="font-semibold text-lg md:text-xl">Wellness Products</p>
    <Link href={`/products`} scroll={false} 
    onClick={()=> { 
    handleLoading();
    sessionStorage.setItem("fromViewAll", "true");
    setCategory("Wellness")}}
    className="bg-gray-100 font-bold p-2 rounded-lg">
   <div className="flex gap-2">
     <p>View All</p>
    <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
</p>
   </div>
    </Link>
</div>

<div>
<WellnessProduct />
</div>


</div>


        </div>
    )
}