"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SearchPage(){
    const [text,setText]= useState("")
    const rounter = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if(!text.trim()) return;

        rounter.push(`/searchresult?search=${text}`)
    }

    return(
<div>
 <div className="w-full  bg-white flex justify-center items-center p-5">

      <form 
        onSubmit={handleSearch}
        className="max-w-lg w-full"
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="size-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3a7.5 7.5 0 015.93 12.11l4.2 4.2a1 1 0 01-1.41 1.41l-4.2-4.2A7.5 7.5 0 1110.5 3z" />
            </svg>
          </div> 
          <input
            type="search"
            className="block w-full p-4 ps-12 text-sm border border-gray-300 rounded-lg bg-gray-200 text-black focus:outline-0"
            placeholder="Search For Products...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>

        </div>
      </form>
    </div>
</div>
    )
}