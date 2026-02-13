'use client'

import { CategoryProvider } from "../../../context/CategoryContext";
import Item from "./Tabs";
import ItemConnect from "./Products";

export default function HomePopularProduct(){
    return(
       <CategoryProvider>
 <div className="">
<div className="p-5">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">       
 <div className="md:w-1/3">
   <p className="font-semibold text-lg md:text-xl">Popular Products</p>
   <p className="text-gray-600 text-sm">
     Do not miss the current offers until the end of March.
   </p>
 </div>

   <div className="md:w-2/3">
     <Item />
   </div> 
 </div>

      <div className="w-full pt-10">
      <ItemConnect />
      </div>
</div>
   </div>
       </CategoryProvider>
    )
}