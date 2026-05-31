'use client'

import { AlertTriangle } from 'lucide-react';

export default function Shipping() {

const limitations = [
  "Certain products cannot be consolidated or shipped together due to international safety regulations, weight restrictions, or fragile material controls.",
  "Items requiring specific temperature controls or hazardous material handling (hazmat) will be shipped separately and may incur standard handling fees.",
  "Consolidation benefits only apply to orders processed within the same warehouse hub. Items from different regional hubs cannot be merged into a single package.",
  "KawsarShop reserves the right to cancel or refuse consolidation requests if the combined package exceeds the maximum allowable dimensions or weight limits set by our shipping partners."
];

const shippingImgSrc = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112659/shipping-consolidation.jpg_vvotoj.webp"; 

return (
<div className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        

<div className="w-full md:w-1/2 flex justify-center">
<div className="w-full max-w-[420px] aspect-square bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden group">
{shippingImgSrc ? (
<img 
  src={shippingImgSrc} 
  alt="Shipping and Consolidation Limitations" 
  className="w-full h-full object-contain rounded-2xl"
/>
) : (
  <div className="text-center space-y-2 p-6">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
      [ Shipping .gif / Img Here ]
    </span>
    <span className="text-[11px] text-gray-300 block">
      Put your src path inside shippingImgSrc variable
    </span>
  </div>
)}
            
<div className="absolute inset-4 border border-gray-100 rounded-2xl pointer-events-none"></div>
</div>
</div>

<div className="w-full md:w-1/2 space-y-6">
<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
  Shipping & Consolidation Limitations
</h2>
          
<p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed">
  Please review our standard policies regarding package merging, warehouse routing, and shipping restrictions for premium members.
</p>


<ul className="space-y-4 pt-2">
  {limitations.map((text, index) => (
    <li key={index} className="flex items-start gap-3 text-gray-600">
      <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0 mt-0.5" strokeWidth={2.5} />
      
      <p className="text-xs sm:text-sm leading-relaxed">
        {text}
      </p>
    </li>
  ))}
</ul>
</div>
</div>
</div>
);
}