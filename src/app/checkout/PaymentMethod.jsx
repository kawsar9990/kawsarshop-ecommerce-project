'use client'

import { useState } from "react";
import { ChevronDown, CreditCard } from "lucide-react";

export default function PaymentMethod(){

const [isOpen, setIsOpen] = useState(true);
const [selectedMethod, setSelectedMethod] = useState("card"); 


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
  onClick={() => setSelectedMethod("card")}
>
<div className="flex items-center gap-4">
   <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 text-orange-400">
      <CreditCard size={24} />
   </div>
   <span className="font-semibold text-slate-700">Visa/ MasterCard/ Amex</span>
</div>

  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "card" ? "border-orange-500" : "border-slate-300"}`}>
     {selectedMethod === "card" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

{selectedMethod === "card" && (
  <div className="bg-slate-50 space-y-1 px-3 py-2">
    <h4 className="text-red-500 font-semibold capitalize text-sm">* Important Note:-</h4>
    <ol className="text-[10px] text-slate-600 space-y-2 leading-relaxed">
      <li>As your amount will get deduct in USD so International transaction service should be active on your Card.</li>
      <li>Due to international currency conversion/transaction or bank fees, you may got charged for additional amount apart from your order amount. That amount would be taken by your bank as we did not reserve that amount from our side.</li>
    </ol>
  </div>
)}

</div>
</div>
</div>
</div>
)
}