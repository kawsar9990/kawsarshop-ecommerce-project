'use client'

import Link from 'next/link';

export default function page() {

const cashbackRules = [
  { minAmount: 180000, reward: 700, bgColor: "bg-[#e2f9e1]", textColor: "text-[#28a745]", borderColor: "border-[#28a745]" },
  { minAmount: 140000, reward: 650, bgColor: "bg-[#fff0e6]", textColor: "text-[#fd7e14]", borderColor: "border-[#fd7e14]" },
  { minAmount: 100000, reward: 500, bgColor: "bg-[#ffe6e9]", textColor: "text-[#dc3545]", borderColor: "border-[#dc3545]" },
  { minAmount: 80000, reward: 400, bgColor: "bg-[#f3e8ff]", textColor: "text-[#6f42c1]", borderColor: "border-[#6f42c1]" },
  { minAmount: 60000, reward: 300, bgColor: "bg-[#e1f5fe]", textColor: "text-[#03a9f4]", borderColor: "border-[#03a9f4]" },
  { minAmount: 40000, reward: 250, bgColor: "bg-[#e2f9e1]", textColor: "text-[#28a745]", borderColor: "border-[#28a745]" },
  { minAmount: 20000, reward: 120, bgColor: "bg-[#fff0e6]", textColor: "text-[#fd7e14]", borderColor: "border-[#fd7e14]" },
  { minAmount: 15000, reward: 110, bgColor: "bg-[#ffe6e9]", textColor: "text-[#dc3545]", borderColor: "border-[#dc3545]" },
  { minAmount: 10000, reward: 90, bgColor: "bg-[#f3e8ff]", textColor: "text-[#6f42c1]", borderColor: "border-[#6f42c1]" },
  { minAmount: 5000,  reward: 60, bgColor: "bg-[#e1f5fe]", textColor: "text-[#03a9f4]", borderColor: "border-[#03a9f4]" },
  { minAmount: 2000,  reward: 40, bgColor: "bg-[#e2f9e1]", textColor: "text-[#28a745]", borderColor: "border-[#28a745]" },
  { minAmount: 1000,  reward: 30, bgColor: "bg-[#fff0e6]", textColor: "text-[#fd7e14]", borderColor: "border-[#fd7e14]" },
  { minAmount: 500,   reward: 20, bgColor: "bg-[#ffe6e9]", textColor: "text-[#dc3545]", borderColor: "border-[#dc3545]" },
  { minAmount: 300,   reward: 15, bgColor: "bg-[#f3e8ff]", textColor: "text-[#6f42c1]", borderColor: "border-[#6f42c1]" },
  { minAmount: 100,   reward: 10, bgColor: "bg-[#e1f5fe]", textColor: "text-[#03a9f4]", borderColor: "border-[#03a9f4]" },
];


return (
<div className="min-h-screen bg-gray-50 p-4 lg:p-8" style={{ userSelect: "none" }}>
<div className="max-w-4xl mx-auto">
<h1 className="text-2xl font-black mb-6 text-gray-800 border-b pb-2">Special Offers</h1>
    
<div className="grid grid-cols-1 gap-4">
{cashbackRules.map((offer, index) => (
<Link 
key={index}
href={`/speacial-offer-products?min=${offer.minAmount}&max=500000&offer=${offer.reward}`}
className={`relative overflow-hidden group flex items-center p-4 rounded-xl shadow-sm border-l-8 ${offer.borderColor} ${offer.bgColor} hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>

<div className="flex-shrink-0 mr-4">
  <div className={`w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner ${offer.textColor}`}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.659A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
  </div>
</div>

<div className="flex-grow">
  <h2 className={`text-lg font-bold ${offer.textColor} flex items-center gap-1`}>
    Cashback 
    <span className="text-2xl">${offer.reward}</span>
  </h2>
  <p className="text-gray-600 font-medium">
    For purchasing above ${offer.minAmount}+
  </p>
</div>


<div className="hidden md:block">
  <div className="bg-white/50 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider text-gray-500 group-hover:bg-white group-hover:text-black transition-colors">
    View Products
  </div>
</div>
<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
</Link>
))}
</div>
</div>
</div>
  );
}