'use client'

import { useState } from "react"


export default function Header({
  selected,setSelected,titlestyle,
  setTitleStyle,list,setList,filterData
}){

const sizeoption = [
"Deafult",
"Name, A To Z",
"Name, Z To A",
"Price, Low To High",
"Price, High To Low",
];


const [open,setOpen] = useState(false);
const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
}


return(
   <div className="sticky top-28 xl:top-35 w-full lg:mt-3 z-20 bg-gray-200  text-black rounded-lg shadow-md p-3 mb-3">
<div className="flex justify-between items-center">

<div className="flex gap-2 items-center ">
  <p className={`hover:text-red-500 cursor-pointer ${list ? "bg-gray-300 rounded-full p-2 font-bold text-red-500" : "bg-gray-200 text-black"}`}
    onClick={()=> {setList(true); setTitleStyle(false)}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
  </p>
  <p className={`hover:text-red-500 cursor-pointer ${titlestyle ? "bg-gray-300 rounded-full p-2 font-bold text-red-500" : "bg-gray-200 text-black"}`}
    onClick={()=> {setTitleStyle(true); setList(false)}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
  </p>
 <p className="hidden md:flex">
        There Are {filterData.length} Products
    </p> 
</div>


<div className="flex gap-2 items-center ">
    <p>Sort By </p>
    <div>
    <div className="relative inline-block text-black">
<div className="px-3 py-2 w-38 bg-white font-semibold text-[13px] rounded-md cursor-pointer shadow"
onClick={()=> setOpen(!open)}>
<p>{selected}</p>
</div>

{open && (
<div className="absolute w-30 mt-1 text-[11px] bg-white  rounded-md shadow-lg z-20">
{sizeoption.map((i)=> (
  <p
key={i}
className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
onClick={() => handleSelect(i)}
>
{i}
</p>  
))}
</div>
)}
    </div>
    </div>
</div>
</div>      
</div>
  )
}