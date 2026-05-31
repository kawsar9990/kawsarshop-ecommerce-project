'use client'

import Link from 'next/link';

export default function Refund({ onActivateClick, user }) {
const isPremium = user?.isPremium;

const refundCards = [
  {
    imgSrc: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112661/refunds-returns-1.png_pler3q.webp", 
    altText: "Partial Refunds",
    desc: "KawsarShop will not provide partial refunds or credit for any partial subscription periods except for what's stated in these terms.",
  },
  {
    imgSrc: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112658/refunds-returns-2.png_uq0ajq.webp",
    altText: "Canceled Orders",
    desc: "If an order is canceled or returned, cashback will not be offered for that order.",
  },
  {
    imgSrc: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112659/refunds-returns-3.png_wshwid.webp",
    altText: "Partially Canceled Orders",
    desc: "If an order is partially canceled or returned, cashback will not be offered for that order.",
  }
];


return (
<div className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 md:px-8">
<div className="max-w-5xl mx-auto flex flex-col items-center">
        
<h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-14 tracking-tight">
  Refunds & returns
</h2>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full">
{refundCards.map((card, index) => (
<div key={index} className="flex flex-col items-center text-center px-2">
              
<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-42 md:h-42 rounded-md bg-gray-50 flex items-center justify-center  mb-5 overflow-hidden relative">
{card.imgSrc ? (
<img 
  src={card.imgSrc} 
  alt={card.altText} 
  className="w-full h-full object-contain"
/>
) : (
<div className="flex flex-col items-center justify-center text-center p-2">
  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
    [ GIF {index + 1} ]
  </span>
  <span className="text-[8px] text-gray-300 mt-1 block">Put src here</span>
</div>
)}
</div>
<p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium max-w-[260px]">
  {card.desc}
</p>
</div>
))}
</div>

<div className="mt-12 md:mt-16">
{isPremium ? (
<Link href={`/profile/account`}
className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs md:text-sm py-2.5 px-6 rounded-md shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap">
Back to Dashboard
</Link>
): (
<button 
onClick={onActivateClick}
className="bg-[#FFAA00] hover:bg-[#e69900] text-gray-900 font-bold text-xs md:text-sm py-2.5 px-6 rounded-md shadow-md shadow-orange-200/60 transition-all active:scale-95 cursor-pointer"
>
  Activate Now
</button>
)}
</div>
</div>
</div>
);
}