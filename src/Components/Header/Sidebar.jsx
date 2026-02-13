"use client";


import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({sidebarcl,setsidebarcl, sideDropdown, setsideDropdown, toggleDropdown, setCategory}){



return(
  
<div>

 <AnimatePresence>
      {sidebarcl && (
        <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring",  damping: 20 }}
         onClick={(e)=> {
          if(e.target === e.currentTarget){
            setsidebarcl(false)
            setsideDropdown(null)
          }
        }}
        className=" fixed inset-0 transition-opacity duration-300 h-full" style={{zIndex: "9999999"}}>
            <div className={`flex flex-col fixed left-0 top-0 h-full bg-white w-56 text-black md:w-80
                transform transition-transform duration-300 ${sidebarcl ? "translate-x-0" : "-translate-x-full"} `}>
                <p className="md:text-[20px] text-[#E2136E] p-2 font-bold text-[20px]">kคຟŞคrŞh໐p</p>
                <div className="flex p-2 items-center justify-between">
                    <p className="text-[17px] font-semibold text-[#E2136E]">Shop By Categories</p>
                    <FontAwesomeIcon icon={faXmark} className="cursor-pointer hover:text-[#E2136E]" onClick={()=> {setsidebarcl(false); setsideDropdown(null)}}/>
                </div>

<div className="flex flex-col">
<div className="flex flex-col justify-between p-2 gap-3">


<ul className="flex flex-col gap-4 font-semibold mt-3">


<li className="flex flex-col">
   
   <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   onClick={() => toggleDropdown("fashion")}
   style={{ userSelect: "none" }}
   >
 <div>Fashion</div>
  <div className="w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold">{sideDropdown === "fashion" ? "-" : "+"}</span>
    </div>

   </div>

 {sideDropdown === "fashion" && (
          <div className="flex flex-col pl-5 pt-2">
            <Link href={`/products`} onClick={()=> setCategory("FashionWomen")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Women</Link>
            <Link href={`/products`} onClick={()=> setCategory("FashionMan")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Men</Link>
          </div>
        )}

</li>



<li className="flex flex-col">
   
   <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   onClick={() => toggleDropdown("electro")}
   style={{ userSelect: "none" }}
   >
 <div>Electronics</div>
  <div className="w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold">{sideDropdown === "electro" ? "-" : "+"}</span>
    </div>

   </div>

 {sideDropdown === "electro" && (
          <div className="flex flex-col pl-5 pt-2">
            <Link href={`/products`} onClick={()=> setCategory("Mobile")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Mobile</Link>
            <Link href={`/products`} onClick={()=> setCategory("leptop")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Leptop</Link>
            <Link href={`/products`} onClick={()=> setCategory("OthersElectronics")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Gadegt</Link>
          </div>
        )}

</li>



<li className="flex flex-col">
   
   <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   onClick={() => toggleDropdown("bag")}
   style={{ userSelect: "none" }}
   >
 <div>Bags</div>
  <div className="w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold">{sideDropdown === "bag" ? "-" : "+"}</span>
    </div>

   </div>

 {sideDropdown === "bag" && (
          <div className="flex flex-col pl-5 pt-2">
            <Link href={`/products`} onClick={()=> setCategory("BagMen")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Men Bags</Link>
            <Link href={`/products`} onClick={()=> setCategory("WomenBags")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Women Bags</Link>
          </div>
        )}

</li>



<li className="flex flex-col">
   
   <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   onClick={() => toggleDropdown("footw")}
   style={{ userSelect: "none" }}
   >
 <div>Footwear</div>
  <div className="w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold">{sideDropdown === "footw" ? "-" : "+"}</span>
    </div>

   </div>

 {sideDropdown === "footw" && (
          <div className="flex flex-col pl-5 pt-2">
            <Link href={`/products`} onClick={()=> setCategory("FootwearMen")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Men Footwear</Link>
            <Link href={`/products`} onClick={()=> setCategory("FootwearWomen")} className="p-2 hover:bg-blue-50 hover:rounded-lg transition-all duration-300">Women Footwear</Link>
          </div>
        )}

</li>


<li>
    <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   style={{ userSelect: "none" }}
   >
 <Link href={`/products`} onClick={()=> setCategory("Groceries")}>Groceries</Link>
  <div className="w-5 h-5 flex items-center justify-center  border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold"> + </span>
    </div>

   </div>
</li>



<li>
    <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   style={{ userSelect: "none" }}
   >
 <Link href={`/products`} onClick={()=> setCategory("Beauty")}>Beauty</Link>
  <div className="w-5 h-5 flex items-center justify-center  border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold"> + </span>
    </div>

   </div>
</li>



<li>
    <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   style={{ userSelect: "none" }}
   >
 <Link href={`/products`} onClick={()=> setCategory("Wellness")}>Wellness</Link>
  <div className="w-5 h-5 flex items-center justify-center  border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold"> + </span>
    </div>

   </div>
</li>


<li>
    <div  className="flex flex-row cursor-pointer w-full justify-between items-center"
   style={{ userSelect: "none" }}
   >
 <Link href={`/products`} onClick={()=> setCategory("Jewellery")}>Jewellery</Link>
  <div className="w-5 h-5 flex items-center justify-center border-2 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition">
  <span className="text-xs font-bold"> + </span>
    </div>

   </div>
</li>


<button className="cursor-pointer xl:hidden hover:bg-black  bg-[#BC105C] text-white p-2 rounded-lg">
    <Link href={`/login`}>Login</Link>
</button>

</ul>
</div>
</div>
            </div>
        </motion.div>
       )}
       
    </AnimatePresence>  
</div>
)}