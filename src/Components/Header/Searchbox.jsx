"use client";

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function SearchBar(){
   const router = useRouter();
   const [text,setText]= useState("")
    const handleSearch = (e) => {
      e.preventDefault();
      if(!text.trim()) return;
      router.push(`/searchresult?search=${text}`)
    }
  

    return(
  <div className="w-full">
        <form className="max-w-md mx-auto"  onSubmit={handleSearch}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
 <path
  strokeLinecap="round" strokeLinejoin="round" d="M10.5 3a7.5 7.5 0 015.93 12.11l4.2 4.2a1 1 0 01-1.41 1.41l-4.2-4.2A7.5 7.5 0 1110.5 3z"
/>
</svg>
        </div>
        <input type="search" id="default-search" value={text} onChange={(e)=> setText(e.target.value)} className="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-200  text-black focus:outline-0" placeholder="Search For Products...." required />
        <button type="submit" className="text-white absolute cursor-pointer end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
    </div>
</form>
    </div>
    )
}