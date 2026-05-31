'use client'

import { useState, useEffect } from "react";
import notify from "@/src/utils/toast";
import { useAuth } from "../../../context/AuthContext"
import { Loader2,CheckCircle2, Crown, X } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { cancelMembershipAPI } from "@/src/services/api";
import { getAddressesAPI } from "@/src/services/addressService";
import { getOrdersByUserIdAPI } from "@/src/services/ordersServics";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, IconButton } from '@mui/material';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90%', bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 4, outline: 'none', maxWidth: '450px'
};

export default function page(){

const { user, loading, token, updateUser } = useAuth();
const [orders, setOrders] = useState([]);
const [defaultAddress, setDefaultAddress] = useState(null);
const [addressLoading, setAddressLoading] = useState(true);
const defaultAvatar = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg";
const [cancelling, setCancelling] = useState(false);

const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
const [cancelReason, setCancelReason] = useState('');
const [cancelDescription, setCancelDescription] = useState('');

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
console.error("Address fetch error:", error);
}
finally{
setAddressLoading(false);
}}};
fetchAddress()
},[user])


useEffect(()=> {
const fetchOrders = async () => {
const userId = user?.id || user?._id;
if (userId && token){
try{
const res = await getOrdersByUserIdAPI(userId, token);
if (res.success){
const orderData = Array.isArray(res.data) ? res.data : (Array.isArray(res.orders) ? res.orders : []);
setOrders(orderData.slice(0, 3));
}
}
catch(error){
console.error("Order fetch error:", error);
}}
};
fetchOrders()
},[user, token])



const handleCancelMembership = async () => {
  if (!cancelReason) return notify.warning("Please select a reason to cancel!");
  setCancelling(true);
  try {
    const userId = user?.id || user?._id;
    const data = await cancelMembershipAPI(userId);
    if (data.success) {
      updateUser(data.user, data.token);
      closeCancelModal();
    }
  } catch (error) {
    console.error("Cancellation error:", error);
    notify.error(error.message || "Failed to cancel!");
  } finally {
    setCancelling(false);
  }
};


const openCancelModal = () => {
  setIsCancelModalOpen(true);
};

const closeCancelModal = () => {
  setIsCancelModalOpen(false);
  setCancelReason('');
  setCancelDescription('');
};


const [currentSlide, setCurrentSlide] = useState(0); 
const [sliderRef, instanceRef] = useKeenSlider({
   initial: 0,
   loop: false,
   mode: "free-snap",
   slideChanged(slider){
    setCurrentSlide(slider.track.details.rel)
   },
    slides: {
      perView: 1,
      spacing: 15,
    } });


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





<div className="pt-5 pb-5">
<h1 className="font-bold pt-3 flex items-center gap-1.5">
    <Crown className={user?.isPremium ? "text-amber-500 fill-amber-500 animate-bounce" : "text-gray-400"} size={18} />
    Membership
</h1>

<div className={`mt-2 rounded-xl p-5 border relative overflow-hidden transition-all duration-500 ${
    user?.isPremium 
      ? 'border-amber-400 bg-gradient-to-br from-amber-50/60 via-amber-100/30 to-amber-200/40 shadow-xl shadow-amber-100/80 backdrop-blur-sm' 
      : 'mt-2 bg-white shadow-md rounded-sm p-4 border border-gray-100'
}`}>

{user?.isPremium && (
<div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
  <Crown size={120} className="text-amber-600 fill-amber-500" />
</div>
)}

<h2 className="text-[14px] font-bold text-gray-900 mb-1">Membership Plan</h2>

{user?.isPremium ? (
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<div className="flex items-center gap-2 opacity-95 select-none">
<input 
  type="checkbox" 
  checked={true} 
  disabled={true} 
  className="w-3 h-3 md:h-4 md:w-4 accent-amber-500 rounded" 
/>
<span className="font-extrabold text-[10px] md:text-[13px] text-amber-700 tracking-wider flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(245,158,11,0.2)] animate-pulse">
  {user?.premiumPlan === 'trial' ? 'KAWSARSHOP PLUS+ TRIAL ACTIVE' : 'KAWSARSHOP PLUS+ PREMIUM ACTIVE'}
</span>
</div>
{user?.premiumExpiresAt && (
<p className="text-[9px] md:text-[12px] text-gray-500 mt-1">
Your premium benefits are active. Next renewal: {' '}
<span className="font-bold text-gray-700">
{new Date(user.premiumExpiresAt).toLocaleDateString('en-GB')}
</span>
</p>
)}
</div>
<button
  onClick={openCancelModal}
  className="text-[11px] cursor-pointer font-bold text-gray-400 hover:text-red-500 hover:underline self-start sm:self-center transition-all"
>
  Cancel Plan
</button>
</div>
) : (
<div className="text-[10px] md:text-[13px] text-gray-600">
You don't have an active membership plan. For more info{' '}
<Link
href={`/kawsarshop-membership`}
className="text-amber-500 font-bold hover:underline transition-all"
>
Click Here
</Link>
</div>    
)}
</div>
</div>





<div>
<h1 className="font-bold pt-3">Recent Orders</h1>
   
<div className="bg-white shadow-sm w-full rounded-md p-3">


{orders && orders.length > 0 ? (
<div>

<div className="hidden md:block overflow-x-auto">
<table className="w-full text-left border-collapse">
    <thead>
        <tr className="border-b border-gray-100">
            <th className="py-4 px-2 text-[13px] text-gray-700">Order No</th>
            <th className="py-4 px-2 text-[13px] text-gray-700">Order Date</th>
            <th className="py-4 px-2 text-[13px] text-gray-700">Shop Name</th>
            <th className="py-4 px-2 text-[13px] text-gray-700">Item(s)</th>
            <th className="py-4 px-2 text-[13px] text-gray-700">Amount</th>
            <th className="py-4 px-2 text-[13px] text-gray-700">Actions</th>
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-50">
        {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-2 text-[8px] text-blue-600 font-bold ">#{order._id.slice(-10)}</td>
                <td className="py-4 px-2 text-[8px] text-gray-600 font-medium">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                <td className="py-4 px-2 text-[8px] text-blue-600 font-bold">{order.catetitle || "KawsarShop"}</td>
                <td className="py-4 px-2">
                    <div className="w-10 h-10 border border-gray-100 rounded relative">
                        <Image src={order.orderItems?.[0].image} alt="item" fill className="object-contain p-1" />
                    </div>
                </td>
                <td className="py-4 px-2 font-black text-[10px]">${order.totalAmount}</td>
                <td className="py-4 px-2">
                    <Link href={`/profile/order-details/${order._id}`} className="text-blue-600 hover:underline font-bold text-[10px]">View Details</Link>
                </td>
            </tr>
        ))}
    </tbody>
</table>
</div>

<div className="md:hidden">
<div ref={sliderRef} className="keen-slider">
{orders.map((order) => (
<div key={order._id} className="keen-slider__slide bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
<div className="flex justify-between items-center border-b pb-2 mb-3">
<span className="text-[8px] font-bold text-gray-500 ">Order No: #{order._id}</span>
<Link href={`/profile/order-details/${order._id}`} className="text-blue-500 text-[8px] font-bold">View Details</Link>
</div>
        
<div className="flex gap-3">
    <div className="w-16 h-16 relative flex-shrink-0 border border-gray-200 rounded overflow-hidden">
        <Image src={order.orderItems?.[0].image} alt="item" fill className="object-cover" />
    </div>
<div className="flex-1">
    <h3 className="text-[10px] font-bold text-slate-800 line-clamp-1 leading-tight">
        {order.orderItems?.[0].name}
    </h3>
<p className="text-[10px] text-gray-400 mt-1">${order.orderItems?.[0]?.price} x {order.orderItems?.[0]?.quantity} (qty)</p>
<p className="text-[10px] font-black text-slate-900">${order.totalAmount}</p>
</div>
</div>
<div className="mt-4 flex justify-between items-center">
<p className="text-[11px] text-gray-500">Seller: <span className="text-blue-500 font-bold text-[10px]">{order.orderItems?.[0].catetitle || "KawsarShop"}</span></p>
  <span className={`py-1 px-1 rounded font-bold border ${
  order.orderStatus === 'Pending' ? 'bg-blue-50 text-[7px] text-blue-600 border-orange-100' : 
  order.orderStatus === 'Confirmed' ? 'bg-cyan-50 text-[7px] text-cyan-600 border-cyan-100' : 
  order.orderStatus === 'Processing' || order.orderStatus === 'To Ship' ? 'bg-purple-50 text-[7px] text-purple-600 border-purple-100' :
  order.orderStatus === 'Shipped' ? 'bg-orange-50 text-[7px] text-orange-500 border-blue-100' :
  order.orderStatus === 'Out for Delivery' ? 'bg-yellow-50 text-[5px] text-yellow-700 border-yellow-200' :
  order.orderStatus === 'Delivered' ? 'bg-green-50 text-[7px] text-green-600 border-green-100' :
  order.orderStatus === 'Cancelled' ? 'bg-pink-50 text-[7px] text-pink-500 border-rose-100' : 
  'bg-gray-50 text-gray-600'
}`}>
  {order.orderStatus}
</span>
</div>
</div>
    ))}
</div>
<div className="flex justify-center gap-1.5 mt-4">
{orders.map((_, idx) => (
<button
    key={idx}
    onClick={() => instanceRef.current.moveToIdx(idx)}
    className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? "w-6 bg-[#BC105C]" : "w-2 bg-gray-300"}`}
></button>
))}
</div>
</div>
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


<Modal open={isCancelModalOpen} onClose={closeCancelModal} sx={{ zIndex: 99999 }}>
  <Box sx={modalStyle}>
    <div className="flex justify-end">
      <IconButton onClick={closeCancelModal} size="small">
        <X size={18} className="text-gray-500 hover:text-gray-800 transition-colors" />
      </IconButton>
    </div>
    
    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', mb: 1, trackingTight: true }}>
      Cancel Membership Plan <span className="text-red-500">*</span>
    </Typography>
    <Typography sx={{ fontSize: '13px', color: '#6b7280', mb: 3 }}>
      We are sorry to see you go. Please tell us the reason for cancelling your premium benefits.
    </Typography>
          
    <FormControl fullWidth sx={{ mb: 3 }}>
      <Select
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        displayEmpty
        sx={{ 
          borderRadius: '8px', 
          height: '45px',
          '& .MuiSelect-select': { fontSize: '14px', fontWeight: 500 }
        }}
        MenuProps={{ style: { zIndex: 1000000 } }}
      >
        <MenuItem value="" disabled>Select Reason</MenuItem>
        <MenuItem value="Too Expensive">Too Expensive / High Cost</MenuItem>
        <MenuItem value="Not Using It">Not Using the Benefits Frequently</MenuItem>
        <MenuItem value="Delivery Issues">Delivery Related Service Issues</MenuItem>
        <MenuItem value="Found Alternatives">Found Better Alternatives</MenuItem>
        <MenuItem value="Other">Other Reasons</MenuItem>
      </Select>
    </FormControl>

    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#374151', mb: 1 }}>
      Additional Description (Optional)
    </Typography>
    <TextField 
      fullWidth 
      multiline 
      rows={3} 
      placeholder="Tell us more about how we can improve..."
      value={cancelDescription}
      onChange={(e) => setCancelDescription(e.target.value)}
      sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '13px' } }}
    />

    <div className="flex gap-3">
      <Button 
        fullWidth 
        variant="outlined" 
        onClick={closeCancelModal}
        disabled={cancelling}
        sx={{ 
          textTransform: 'none', 
          color: '#4b5563', 
          borderColor: '#d1d5db',
          borderRadius: '8px',
          fontWeight: 'bold',
          '&:hover': { borderColor: '#9ca3af', bgcolor: '#f9fafb' }
        }}
      >
        Keep Plan
      </Button>
      <Button 
        fullWidth 
        variant="contained" 
        disabled={cancelling || !cancelReason}
        onClick={handleCancelMembership}
        sx={{ 
          bgcolor: '#d32f2f', 
          textTransform: 'none', 
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px -1px rgba(211, 47, 47, 0.2)',
          '&:hover': { bgcolor: '#b71c1c' },
          '&:disabled': { bgcolor: '#f3f4f6', color: '#9ca3af' }
        }}
      >
        {cancelling ? "Cancelling..." : "Confirm Cancel"}
      </Button>
    </div>
  </Box>
</Modal>

</div>
)
}