'use client'

import { useState } from "react"
import { AlertTriangle ,Info} from "lucide-react";

export default function page(){

const [error, seterror] = useState(null)
const [selected, setselected] = useState("")
 
const [orderId, setOrderId] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [zip, setZip] = useState("")
    


const handleContinue = () => {
  
const isError = !orderId || !lastName || (selected === "email" ? !email : !zip)

seterror(isError)

if(!isError) {
    setOrderId("")
    setLastName("")
    setEmail("")
    setZip("")
}
}


const handleEnter = (e) => {
  if (e.key === "Enter") {
    handleContinue(); 
  }
};

    
return(
<div className="pt-0 xl:pt-0">

<div className="bg-[#FFF2F8] text-gray-900">


<div className="cursor-pointer w-full pt-40 xl:pt-20">
  <div className="flex justify-center items-center">
    <p className="text-3xl lg:text-5xl font-semibold text-[#114]">Orders and Returns</p>
  </div>
</div>


<div className="pt-10">
{
error !== null && (
<div>
{error ? (
<div className="p-2 w-full rounded-md">
<div className="bg-[#FAE5E5] flex flex-row p-3 justify-center gap-5 text-[10px] lg:text-[15px] items-center text-black font-bold">
<AlertTriangle className="w-5 h-5 text-red-500"/>
<p>You entered incorrect data. Please try again.</p>
</div>
</div>
): (
<div className="p-2 w-full rounded-md">
<div className="bg-[#e4f9dc] flex flex-row p-3 justify-center gap-5 text-[10px] lg:text-[15px] items-center text-black font-bold">
<Info  className="w-5 h-5 text-green-600"/>
<p>All data looks good!</p>
</div>
</div>
)}
</div>
    )
}
</div>



<div className="pb-10">
<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-4">
  <h2 className="text-2xl font-bold mb-4 text-center uppercase">Order information</h2>


<div>
    <label className="block mb-1 font-semibold">Order ID *</label>
    <input
      type="text"
      value={orderId}
      onChange={(e) => setOrderId(e.target.value)}
      onKeyDown={handleEnter}
      placeholder="Enter your Order ID"
      spellCheck={false}
      required
      className='w-full p-3 rounded-md border border-orange-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'
    />
</div>


  <div>
    <label className="block mb-1 font-semibold">Billing Last Name *</label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      onKeyDown={handleEnter}
      placeholder="Enter your Last Name"
      spellCheck={false}
      required
      className='w-full p-3 rounded-md border border-orange-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'
    />
  </div>


  <div>
    <label className="block mb-1 font-semibold">Find Order By *</label>
    <select value={selected} 
    onChange={(e)=> {
    setselected(e.target.value)
    setEmail("")
    setZip("")  
    }}
    className='w-full p-3 rounded-md border border-orange-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'>
      <option value="email" className="cursor-pointer">Email</option>
      <option value="phone" className="cursor-pointer">Zip Code</option>
    </select>
  </div>


<div>
{selected === "email" ? (
 <div>
    <label className="block mb-1 font-semibold">Billing Email *</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={handleEnter}
      placeholder="Enter your Email"
      spellCheck={false}
      required
      className='w-full p-3 rounded-md border border-orange-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'
    />
  </div>
) : (
  <div>
    <label className="block mb-1 font-semibold">Billing Zip Code *</label>
    <input
      type="text"
      value={zip}
      onChange={(e)=> setZip(e.target.value)}
      onKeyDown={handleEnter}
      placeholder="Enter your Zip Code"
      spellCheck={false}
      required
      className='w-full p-3 rounded-md border border-orange-600 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'
    />
  </div>
)}
</div>


  <button 
  onClick={handleContinue}
  className='w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold hover:shadow-lg cursor-pointer transition-all duration-300'>
    Continue
  </button>
</div>
</div>


</div>
</div>
    )
}