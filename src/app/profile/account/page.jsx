'use client'

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"
import { Loader2,CheckCircle2 } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { getAddressesAPI } from "@/src/services/addressService";

export default function page(){

const { user, loading } = useAuth();
const [orders, setOrders] = useState([]);
const [defaultAddress, setDefaultAddress] = useState(null);
const [addressLoading, setAddressLoading] = useState(true);
const defaultAvatar = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg";


useEffect(()=> {
const fetchAddress = async () => {
const userId = user?.id || user?._id;
if (userId){
try{
const res = await getAddressesAPI(userId);
if (res.success && res.data.length > 0){
const def = res.data.find(addr => addr.isDefault) || res.data[0];
setDefaultAddress(def);
}
}
catch(error){
throw error
}
finally{
setAddressLoading(false);
}}};
fetchAddress()
},[user])


if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#BC105C]" size={40} />
      </div>
    );
}

return(
<div className="py-5">
    
<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">


<div className="xl:col-span-7 space-y-6 xl:border-r p-2 xl:border-r-gray-400">
<div className="flex flex-col gap-3">

<div className="font-black">
    <h1>My Dashboard</h1>
</div>


<div className="bg-[#ffffff] hidden md:flex shadow-md rounded-sm p-3">
<div className="flex justify-between w-full">

<div className="flex gap-3 items-center">
<div>
<Image 
src={user?.profilePic || user?.image || user?.picture || user?.photoURL || defaultAvatar}
alt={user?.name || user?.username || "User"}
width={80}
height={80}
className="object-cover rounded-full"
/>
</div>
<div className="flex flex-col gap-2">
<div className="flex gap-2 font-black">
    <h1>Hello</h1>
    <h1>{user?.name || user?.username || "Guest"}!</h1>
</div>
<div className="flex items-center gap-2 flex-col md:flex-row">
<h1 className="text-[13px] font-bold">{user?.email}</h1>
<h1 className="flex items-center gap-1">
<CheckCircle2 size={14} className="fill-green-600 text-white" />
<p className="text-gray-400">(Verified)</p>
</h1>
</div>
</div>
</div>
<div className="flex justify-center items-center">
   <Link href={`/profile/account/edit`}
   className="bg-gray-200 w-15 text-center cursor-pointer p-2 rounded-lg text-black">Edit</Link> 
</div>
</div>
</div>




<div className="bg-[#ffffff] flex md:hidden shadow-md rounded-sm p-3">
<div className="flex justify-between w-full">

<div className="flex gap-3 items-center">
<div>
<Image 
src={user?.profilePic || user?.image || user?.picture || user?.photoURL || defaultAvatar}
alt={user?.name || user?.username || "User"}
width={60}
height={70}
className="object-cover rounded-full"
/>
</div>
<div className="flex flex-col gap-2">
<div className="flex gap-2 font-black">
    <h1>Hello</h1>
    <h1>{user?.name || user?.username || "Guest"}!</h1>
</div>
<div className="flex gap-2 flex-col">
<h1 className="text-[10px] font-bold">{user?.email}</h1>
<h1 className="flex items-center gap-1">
<CheckCircle2 size={14} className="fill-green-600 text-white" />
<p className="text-gray-400 text-[10px]">(Verified)</p>
</h1>
</div>
</div>
</div>
<div className="flex justify-center items-center">
   <Link href={`/profile/account/edit`}
   className="bg-gray-200 w-10 text-[10px] text-center cursor-pointer p-2 rounded-lg text-black">Edit</Link> 
</div>
</div>
</div>



<div>
    <h1 className="font-bold pt-3">Recent Orders</h1>
   
    <div className="bg-white shadow-sm w-full rounded-md p-3">

{orders.length > 0 ? (
    <div className="flex flex-col gap-3">
    <p>....</p>
    </div>
):(
<div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
<div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
   </svg>
</div>
<p className="text-gray-500 font-medium text-[15px]">
   You have placed no orders yet.
</p>
<Link href="/products" className="text-[#BC105C] text-sm font-bold hover:underline transition-all">
   Start Shopping Now
</Link>
</div>
)}
</div>
{orders.length > 0 && (
<Link href={`/`} className="block text-center mt-3 text-[13px] font-bold text-gray-400 hover:text-[#BC105C]">
View All Orders →
</Link>
)}
</div>


</div>
</div>


<div className="xl:col-span-4 space-y-4">
  <h1 className="font-bold pt-3">Default Address</h1>
  <div className="bg-white rounded-md shadow-lg p-3">
{defaultAddress ? (
<div className="space-y-2 text-gray-800">
<h3 className="font-bold text-[15px]">{defaultAddress.addressType}</h3>
<p className="text-[13px] text-gray-600 font-medium">{defaultAddress.fullName}</p>
<div className="text-[13px] text-gray-500 leading-relaxed">
    <p>{defaultAddress.houseNo} {defaultAddress.street}</p>
    <p>{defaultAddress.city}, {defaultAddress.state}, {defaultAddress.zip}, {defaultAddress.country}</p>
</div>
<p className="text-[13px] font-semibold text-gray-700 pt-1">{defaultAddress.phone}</p>
<div className="pt-3">
<Link 
href={`/profile/address/edit/${defaultAddress._id}`}
className="text-[13px] font-bold text-black border-b border-black hover:text-[#BC105C] hover:border-[#BC105C] transition-all">
Edit Address
</Link>
</div>
    </div>
): (
<div className="flex flex-col items-center gap-2">
  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
     </svg>
  </div>
  <p className="text-gray-400 text-[14px] font-medium">No default address set yet.</p>
</div>    
)}
  </div>
 <div className="w-full">
     <Link href={`/profile/address/new`}
  className="bg-amber-400 w-full block text-center p-2 rounded-md cursor-pointer shadow-lg font-bold hover:bg-amber-500 transition-colors text-[12px]">Add New Address</Link>
 </div>
</div>


</div>


</div>
)
}