'use client'

import { useState } from "react";
import { ChevronDown, CreditCard } from "lucide-react";

export default function PaymentMethod({ selectedMethod, setSelectedMethod }){

const [isOpen, setIsOpen] = useState(true);


return(
<div>
<div className="max-w-4xl mx-auto mt-5 bg-white border border-gray-100 rounded-sm shadow-sm">

<div 
className="flex items-center justify-between px-4 py-5 cursor-pointer hover:bg-slate-50 transition-colors"
onClick={() => setIsOpen(!isOpen)}
>
  <h3 className="font-semibold text-gray-800">Payment Method</h3>
  <ChevronDown 
    className={`text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
    size={20}
  />
</div>

<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
<div className="px-3 py-2 space-y-2">
<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("paypal")}
>
 <div className="flex items-center gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
       <span className="text-blue-600 font-bold text-xl italic">P</span>
    </div>
    <span className="font-semibold text-slate-700">PayPal Express Checkout</span>
 </div>
 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "paypal" ? "border-orange-500" : "border-slate-300"}`}>
    {selectedMethod === "paypal" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
 </div>
 </div>

{selectedMethod === "paypal" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ul className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>The amount will be deducted in USD.</li>
      <li>As you have selected the PayPal payment option, the customs duties & taxes checkbox has been marked by default.</li>
    </ul>
  </div>
)}




<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("crd")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
      <CreditCard size={24} />
   </div>
   </div>
   <span className="font-semibold text-slate-700">Creadit/Debit Card</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "crd" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "crd" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "crd" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>As your amount will get deduct in USD so International transaction service should be active on your Card.</li>
      <li>Due to international currency conversion/transaction or bank fees , you may got charged for additional amount apart from your order amount. That amount would be taken by your bank as we did not reserve that amount from our side.</li>
    </ol>
  </div>
)}




<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("bkash")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 p-2 text-orange-400">
      <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1777476184/download_u6xhr8.png" className="w-full h-full object-contain" />
   </div>
   <span className="font-semibold text-slate-700">Bkash</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "bkash" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "bkash" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "bkash" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>Ensure your bKash account is activated.</li>
      <li>Ensure that your bKash account has sufficient balance to cover the total cost of the order.</li>
      <li>Make sure you can receive your OTP on your registered mobile number and have your bKash PIN ready.</li>
      <li>*Please note that only one bKash account can be linked to a single Cartup account.</li>
    </ol>
  </div>
)}





<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("nagad")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
      <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1777476569/download_1_fkcofx.png" className="w-full h-full object-contain" />
   </div>
   <span className="font-semibold text-slate-700">Nagad</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "nagad" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "nagad" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "nagad" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>Your Nagad account is active and ready for use.</li>
      <li>Confirm that you can receive an OTP on your registered mobile number.</li>
      <li>Make sure your account has sufficient balance to complete the transaction.</li>
    </ol>
  </div>
)}




<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("rocket")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-[#93299f] rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
      <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1777476940/download_2_nvqps8.png" className="w-full h-full object-contain" />
   </div>
   <span className="font-semibold text-slate-700">Rocket</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "rocket" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "rocket" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "rocket" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>Your Rocket account is active and ready for use.</li>
      <li>Confirm that you can receive an OTP on your registered mobile number.</li>
      <li>Make sure your account has sufficient balance to complete the transaction.</li>
    </ol>
  </div>
)}





<div 
  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50"
  onClick={() => setSelectedMethod("cashin")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
      <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1777308481/cash-money-logo-design-template-digital-payment-logo-design-vector_ss81dt.jpg" className="w-full h-full object-contain" />
   </div>
   <span className="font-semibold text-slate-700">Cash on Delivery</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "cashin" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "cashin" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "cashin" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>Upon delivery to your address, you may pay in cash directly to our courier.</li>
      <li>Ensure your delivery status is marked as ‘Out for Delivery’ before agreeing to accept the parcel.</li>
      <li>Verify that the airway bill clearly indicates the parcel is from Cartup before receiving it.</li>
      <li>Before handing over payment to the courier, double-check the order number, sender information, and tracking number on the parcel for accuracy.</li>
    </ol>
  </div>
)}




</div>
</div>
</div>
</div>
)
}