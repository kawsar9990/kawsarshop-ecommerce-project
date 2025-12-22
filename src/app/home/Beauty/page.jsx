import Link from "next/link"

import BeautyProduct from "./Products"


export default function BeautyPage(){

    return(
        <div className="bg-white pt-20">

<div className="flex flex-col">

<div className="p-5 flex justify-between">
    <p className="font-semibold text-lg md:text-xl">Beauty Products</p>
    <Link href={``} className="bg-gray-100 font-bold p-2 rounded-lg ">
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
<BeautyProduct />
</div>


</div>


        </div>
    )
}