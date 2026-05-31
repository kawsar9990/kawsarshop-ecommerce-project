'use client'

import Link from "next/link";

export default function Footer({ onActivateClick, user  }) {
const isPremium = user?.isPremium;
const terms = [
  "By signing up for membership, the customer agrees to receive promotional emails and communication related to the membership.",
  "KawsarShop reserves the right to accept or reject membership at our sole discretion.",
  "KawsarShop reserves the right to cancel a customer's membership at our sole discretion without prior notice in case we determine that the customer violated our terms and conditions and was involved in fraudulent activity.",
  "KawsarShop has the right to remove or add benefits to the membership plan at any time and will communicate the same to the customer."
];

const additionalTermsImgSrc = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112660/additional-terms-conditions.jpg_yi4laz.webp";

return (
<div className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        
<div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
  Additional Terms & Conditions
</h2>
          
<ol className="space-y-4">
{terms.map((term, index) => (
  <li key={index} className="flex items-start text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
    <span className="font-bold text-gray-900 mr-2 shrink-0">
      0{index + 1}.
    </span>
    <p>{term}</p>
  </li>
))}

<li className="flex items-start text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
  <span className="font-bold text-gray-900 mr-2 shrink-0">05.</span>
  <p>
    Read more about the{" "}
    <Link href={`/termspage`} className="font-bold text-gray-900 underline hover:text-orange-500 transition-colors">
      Terms and Conditions
    </Link>.
  </p>
</li>
</ol>

<div className="pt-4">
{isPremium ? (
<button disabled 
className="bg-black text-white font-bold text-xs md:text-sm py-2.5 px-6 rounded-md shadow-md shadow-orange-200/60 transition-all active:scale-95 cursor-pointer">
  Activated
</button>
) : (
  <button 
    onClick={onActivateClick} 
    className="bg-[#FFAA00] hover:bg-[#e69900] text-gray-900 font-bold text-xs md:text-sm py-2.5 px-6 rounded-md shadow-md shadow-orange-200/60 transition-all active:scale-95 cursor-pointer"
  >
    Activate Now
  </button>
)}
</div>
</div>

<div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
  <div className="w-full max-w-[450px] aspect-[4/3] bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden">
    {additionalTermsImgSrc ? (
      <img 
        src={additionalTermsImgSrc} 
        alt="Additional Terms and Conditions" 
        className="w-full h-full object-contain"
      />
    ) : (
      <div className="text-center p-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          [ Additional Terms Image / .gif Here ]
        </span>
      </div>
    )}
    <div className="absolute inset-4 border border-gray-100 rounded-2xl pointer-events-none"></div>
  </div>
</div>

</div>
</div>
);
}