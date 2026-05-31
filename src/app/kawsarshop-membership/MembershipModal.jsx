'use client'

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import notify from '@/src/utils/toast';

export default function MembershipModal({ isOpen, onClose }){
const router = useRouter();
const { user } = useAuth();
const [selectedPlan, setSelectedPlan] = useState('one-year');
const [agreed, setAgreed] = useState(false);


useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);


const handlePaymentRedirect = () =>{
if (!agreed) return;

if (!user) {
notify.warning("Please login first to purchase a membership!");
return;
}

const userId = user.id || user._id;

const paymentData = {
 customer_id: userId,
 plan: selectedPlan   
};

try{
const jsonString = JSON.stringify(paymentData);
let encodedData = btoa(jsonString);

onClose();

router.push(`/buy-membership/${encodedData}`);
}catch(error){
console.error("Encoding failed:", error);
}
}


if (!isOpen) return null;
return(
<div className='' style={{userSelect: "none"}}>
<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 " style={{zIndex: "9999999999"}}>

<div className="bg-white w-full max-w-[450px] rounded-xl shadow-2xl overflow-hidden relative border border-gray-100 flex flex-col max-h-[90vh]">

<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
<h2 className="text-gray-800 font-bold text-[10px] md:text-[13px] tracking-tight">
Membership Plans For You
</h2>
<button onClick={onClose}
className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
>
 <X className="w-5 h-5" />   
</button>
</div>


<div className="p-6 overflow-y-auto space-y-6 flex-1">
<label className="flex items-start gap-4 cursor-pointer group">

<div className="pt-1">
<input 
  type="radio" 
  name="membership-plan" 
  value="trial"
  checked={selectedPlan === 'trial'}
  onChange={() => setSelectedPlan('trial')}
  className="sr-only"
/>
<div className={`w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all ${
selectedPlan === 'trial' ? 'border-gray-300' : ''
}`}>
{selectedPlan === 'trial' && (
<div className="w-2.5 h-2.5 rounded-full bg-amber-500 transition-all" />
)}
</div>
</div>

<div className="flex-1 space-y-3">
<div className="inline-block border border-dashed border-gray-400 rounded px-3 py-1 bg-gray-50">
<span className="text-xs font-bold tracking-widest text-gray-700 uppercase">
  TRIAL MEMBERSHIP
</span>
</div>

<ul className="space-y-1.5 text-xs md:text-sm text-gray-600 font-medium pl-1">
<li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Get 10% cashback on every order.
</li>
<li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Get Free Delivery on all premium shipping orders.
</li>
<li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Shipping Method Express Shipping.
</li>
</ul>
<p className="text-[8px] md:text-[13px] font-bold text-gray-800">
  Expires after : 7 days
</p>
<div className="bg-[#EFFFF0] border border-green-100 rounded-lg p-1.5 text-[8px] md:text-[13px] text-green-700 font-medium leading-relaxed">
  You will be automatically charged $11000 at the end of free trial.
</div>
<p className="text-[8px] md:text-[13px] text-gray-600 leading-normal">
  <span className="font-bold text-gray-600">Note:</span> You will be charged $5 (Refundable) once for payment verification.
</p>
</div>
</label>
<hr className="border-gray-100" />

<label className="flex items-start gap-4 cursor-pointer group">

<div className="">
<input 
  type="radio" 
  name="membership-plan" 
  value="one-year"
  checked={selectedPlan === 'one-year'}
  onChange={() => setSelectedPlan('one-year')}
  className="sr-only"
/>
<div className={`w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all ${
selectedPlan === 'one-year' ? 'border-gray-300' : ''
}`}>
{selectedPlan === 'one-year' && (
<div className="w-2.5 h-2.5 rounded-full bg-amber-500 transition-all" />
)}
</div>
</div>

<div className="flex-1 space-y-3">
<div className="inline-block border border-dashed border-gray-400 rounded px-3 py-1 bg-gray-50">
  <span className="text-xs font-bold tracking-widest text-gray-700 uppercase">
    ONE YEAR MEMBERSHIP
  </span>
</div>

<ul className="space-y-1.5 text-xs md:text-sm text-gray-600 font-medium pl-1">
 <li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Get 10% cashback on every order.
</li>
<li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Get Free Delivery on all premium shipping orders.
</li>
<li className="flex items-center gap-2 text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
  Shipping Method Express Shipping.
</li>
<li className="flex items-center gap-2 text-amber-600 font-bold text-[10px] md:text-[13px]">
  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
  Auto-renewal enabled annually.
</li>   
</ul>
<p className="text-[8px] md:text-[13px] font-bold text-gray-800 pt-1">
  Expires after : One Year
</p>
</div>
</label>
</div>

<div className="border-t border-gray-200 flex flex-col">

<div className="px-6 py-3 bg-white flex items-center gap-2 border-b border-gray-200">
<input 
  type="checkbox" 
  id="terms-modal-check"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 accent-amber-500 cursor-pointer"
/>
<label htmlFor="terms-modal-check" className="text-[10px] md:text-[12px] font-bold text-gray-700 cursor-pointer select-none">
  I read and agree to the <Link href={`/termspage`} className="text-[#FFAA00] underline">Terms & Conditions</Link>
</label>
</div>

<div className="flex items-stretch h-16 w-full">
<div className="w-1/2 px-6 py-2 flex flex-col justify-center bg-white">

<span className="text-[10px] font-semibold text-gray-400 capitalize tracking-wider block">Selected Plan</span>
<h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight block">
  {selectedPlan === 'trial' ? '7-Day Trial' : 'One Year'}
</h3>
<p className="text-[11px] font-bold text-gray-500 block">
  {selectedPlan === 'trial' ? 'Free Trial' : '$11000'}
</p>
</div>
<button
disabled={!agreed}
onClick={handlePaymentRedirect}
className={`w-1/2 font-black text-xs md:text-sm uppercase tracking-wider flex items-center justify-center transition-all ${
  agreed 
    ? 'bg-[#FFAA00] hover:bg-[#e69900] text-white cursor-pointer' 
    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
}`}
>
Buy Now
</button>
</div>

</div>

</div>

</div>
</div>
)    
}