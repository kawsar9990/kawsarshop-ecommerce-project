'use client'

import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowRightArrowLeft, faBasketShopping, faCartShopping, faPhone, faShareNodes } from "@fortawesome/free-solid-svg-icons"

library.add(faShareNodes,faCartShopping,faBasketShopping,faPhone,faArrowRightArrowLeft)



export default function PageDetails({product}){
    return(
<div className="flex flex-col gap-5">

<div className="font-bold lg:text-3xl capitalize">
{product.name}
</div>   

<div className="flex justify-between w-full items-center">
<div className="flex gap-3 flex-row shadow text-[10px] lg:text-[15px] shadow-[#ccc2c7] p-2 rounded-lg">
<div className="text-gray-500 font-semibold flex">Category: </div>
<Link href={`/products`} className="font-semibold">{product.category}</Link>
</div>
<div className="cursor-pointer text-[20px] hover:text-[#E2136E]">
   <button className="cursor-pointer">
    <FontAwesomeIcon icon={faShareNodes} />
   </button>
</div>
</div>

<div className="flex flex-row justify-between w-full">
<div className="flex items-center w-full gap-7 text-[13px] lg:text-[17px]">
<div>{product.ratestar}</div>
<div className="font-semibold">0 Reviews</div>
<p>|</p>
<div className="font-semibold">{product.catetitle}</div>
</div>
</div>


<div className="flex flex-row text-[13px] lg:text-[17px]">
<div className="flex gap-2 font-semibold">
<div>Stock</div>
<div className="text-[#E2136E] font-bold">N/A</div>
<p>|</p>
<div>SKU</div>
<div className="text-[#E2136E] font-bold">N/A</div>
<p>|</p>
<div>Seller</div>
<div className="text-[#E2136E] font-bold">Kawsar Ahmed</div>
</div>
</div>


<div className="flex gap-3 items-end ">
    <div className="text-3xl lg:text-4xl text-[#E2136E] font-black">${product.price}</div>
    <div className="lg:text-2xl line-through text-gray-400">${product.oldprice}</div>
    <div className="lg:text-2xl text-yellow-400 font-bold">({product.discountPercent} OFF)</div>
</div>


<div className="flex gap-3 items-center">
    <div className="font-semibold text-[20px]">Quantity</div>
    <div className="flex gap-3 h-10">
    <button className="shadow shadow-gray-400 w-10 cursor-pointer hover:bg-gray-100 rounded-lg">-</button>
    <div className="">
     <div className="shadow shadow-gray-400 h-10 flex justify-center items-center w-10 cursor-pointer hover:bg-gray-100 rounded-lg">0</div>
    </div>
    <button className="shadow shadow-gray-400 w-10 cursor-pointer hover:bg-gray-100 rounded-lg">+</button>
    </div>
</div>

<div className="flex w-full gap-3">
    <button className="flex gap-2 w-full font-semibold text-white bg-[#f18e37] hover:bg-[#cd772c] hover:scale-105 transition-transform duration-300 rounded-lg justify-center items-center p-2 cursor-pointer">
        <div><FontAwesomeIcon icon={faBasketShopping} /></div>
        <p>Buy Now</p>
    </button>
    <button className="flex w-full gap-2 font-semibold text-white bg-[#E2136E] hover:bg-[#ac0c51] hover:scale-105 transition-transform duration-300 rounded-lg justify-center items-center p-2 cursor-pointer">
        <div><FontAwesomeIcon icon={faCartShopping} /></div>
        <p>Add to Cart</p>
    </button>
    <button className="flex gap-2 font-semibold text-[#E4297B] hover:text-white bg-[#FFDEEE] hover:bg-[#E4297B] hover:scale-105 transition-transform duration-300 rounded-lg justify-center items-center p-2 cursor-pointer">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
 </button>
</div>




<div className="flex gap-3 font-semibold">
<div>Brand :</div>
<div className="text-[#E2136E]">{product.catetitle}</div>
</div>



<div className="flex">
<Link href={`http://wa.me/8801602084187`} target="_blank" className="flex gap-2 font-semibold text-[#E4297B]">
<p><FontAwesomeIcon icon={faPhone} /></p>
<p>Call For Order : </p>
<p>+8801602084187</p>
</Link>
</div>



<div className="flex justify-between w-full ">

<div className="flex flex-col">
<div className="flex flex-row gap-3 items-center text-[12px] lg:text-[18px]">
<p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>
</p>
    <p className="font-bold">Return : </p>
    <p className="text-[#E4297B] font-semibold">3 Days</p>
</div>
<div className="flex flex-row gap-3 items-center text-[12px] lg:text-[18px]">
    <p><FontAwesomeIcon icon={faArrowRightArrowLeft} /></p>
    <p className="font-bold">Exchange : </p>
    <p className="text-[#E4297B] font-semibold">3 Days</p>
</div>
<div className="flex flex-row gap-3 items-center text-[12px] lg:text-[18px]">
    <p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
    </p>
    <p className="font-bold">Delivery Time : </p>
    <p className="text-[#E4297B] font-semibold">3 Days</p>
</div>
<div className="flex flex-row gap-3 items-center text-[12px] lg:text-[18px]">
    <p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
    </p>
    <p className="font-bold">Payment : </p>
    <p className="text-[#E4297B] font-semibold">COD Available</p>
</div>
</div>

<div className="shadow-lg bg-white p-3 rounded-md w-40 h-20">
<Link href={``} className="flex gap-2 flex-col">
<div className="flex items-center gap-2 font-bold text-[#E2136E]">
<p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>
</p>
    <p>Shop</p>
</div>
<div className="flex items-center gap-2 font-black">
    <p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>
    </p>
    <p>{product.category}</p>
</div>
</Link>
</div>

</div>




<div className="grid p-3 lg:p-0 grid-cols-[1fr_2fr] items-center gap-6">

<div className="justify-center items-center flex flex-col gap-3">
<p className="font-bold text-[10px] lg:text-[20px]">Rating & Reviews</p> 
<div className="flex lg:justify-center font-black lg:text-5xl">
    <p>5.0</p> 
    <p>⭐</p>
</div>
<p className="text-[8px]">By Verified Kawsar Ahmed</p>
</div>

<div className="">
  <div className="flex items-center mt-3">
    <span className="text-sm font-medium">5 ⭐</span>
    <div className="w-1/2 h-3 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#E2136E] rounded-full"
        style={{ width: "50%" }}
      />
    </div>
    <span className="text-sm font-medium">5</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-sm font-medium">4 ⭐</span>
    <div className="w-1/2 h-3 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-medium">0</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-sm font-medium">3 ⭐</span>
    <div className="w-1/2 h-3 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-medium">0</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-sm font-medium">2 ⭐</span>
    <div className="w-1/2 h-3 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-medium">0</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-sm font-medium">1 ⭐</span>
    <div className="w-1/2 h-3 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-medium">0</span>
  </div>
</div>

</div>





</div>
    )
}