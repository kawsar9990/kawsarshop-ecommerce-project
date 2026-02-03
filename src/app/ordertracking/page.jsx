'use client'

import { useState } from "react"
import Link from "next/link"



export default function page(){
   const [text, setText] = useState("")
   const [Num, setNum] = useState("")


   const loginclick = () => {

          if(text === ""){
               alert("Please Enter The Your Order Id")
          }

             if(Num === ""){
               alert("Please Enter The Your Phone Number")
          }



          setText("")
          setNum("")
     }



   
    return(
<div className="bg-[#F5F0F0]">
<div className="">
<div className=" w-full flex bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 justify-center items-center min-h-screen p-5">
<div className="bg-white shadow-lg w-100 rounded-2xl flex flex-col lg:flex-row overflow-hidden ">

<div className='w-full p-5'>

<div className="flex items-center justify-center text-[25px]">
   <Link href={`/`} className='font-black text-center text-purple-700'>KawsarShop</Link>       
</div> 


<div className="pt-5">
<div className="flex flex-col">
<p className="text-center font-black">Track Your Order</p>

<div className="flex flex-col  gap-5 pt-10">

<div>
<div className='w-full'>
<input 
value={text}
onChange={(e)=> setText(e.target.value)}
placeholder='Order Id'
type="text" id='nam' name='nam' 
className='w-full p-3 rounded-md border border-purple-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition'/>
</div>
</div>


<div>
<div className='w-full'>
<input 
value={Num}
onChange={(e)=> setNum(e.target.value)}
placeholder='Your Phone Number'
type="text" id='num' name='num' 
className='w-full p-3 rounded-md border border-purple-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition'/>
</div>  
</div>



<div className='pb-10'>
     <button
     onClick={loginclick}
     className='w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold hover:shadow-lg cursor-pointer transition-all duration-300'>
      Track Order
     </button>
</div>



</div>

</div> 
</div>

</div>

</div>
</div>
</div>
</div>
    )
}