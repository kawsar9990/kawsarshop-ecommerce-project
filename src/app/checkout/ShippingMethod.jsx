'use client'

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

export default function ShippingMethod(){

const [isOpen, setIsOpen] = useState(true);
const [selectedMethod, setSelectedMethod] = useState("standard");

  const methods = [
    {
      id: "express",
      title: "Express Shipping",
      days: "(3-6 Business days)",
      note: "Customs delay might occur",
      price: "13.00",
      oldPrice: "15.00",
    },
    {
      id: "standard",
      title: "Standard Shipping",
      days: "(5-9 Business days)",
      note: "Customs delay might occur",
      price: "13.00",
      oldPrice: null,
    },
  ];

return(
<div>
<div className="max-w-4xl mx-auto mt-5 bg-white border border-gray-100 rounded-sm shadow-sm">
<div 
  className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
  onClick={() => setIsOpen(!isOpen)}
>
  <div className="flex items-center gap-2">
    <h3 className="font-semibold text-gray-800">Shipping Method</h3>
    <Info size={18} className="text-slate-600" />
  </div>
  <ChevronDown 
    className={`text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
  />
</div>

<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
<div className="p-2 pt-0 space-y-1">
{methods.map((method) => (
<div 
  key={method.id}
  className={`flex items-start justify-between px-2 py-2 rounded-xl cursor-pointer transition-all ${selectedMethod === method.id ? "bg-white" : "bg-white"}`}
  onClick={() => setSelectedMethod(method.id)}
>
<div className="flex gap-4">
<div className="mt-1">
  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? "border-orange-500" : "border-slate-300"}`}>
    {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
  </div>
</div>

  <div>
    <h4 className="text-[15px] text-slate-800">{method.title}</h4>
    <p className="text-[12px] text-slate-500">{method.days}</p>
    <p className="text-[12px] text-slate-400 mt-1">{method.note}</p>
  </div>
</div>

  <div className="text-right">
    <div className="flex items-center gap-2 justify-end">
      <span className="font-semibold text-slate-900">${method.price}</span>
      {method.oldPrice && (
        <span className="text-sm text-slate-400 line-through">{method.oldPrice}</span>
      )}
    </div>
  </div>
</div>
))}
</div>
</div>
</div>
</div>
)
}