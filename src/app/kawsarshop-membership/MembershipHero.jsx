'use client'

import { Crown, CheckCircle2 } from 'lucide-react';

export default function MemberShipHero({ onActivateClick, user }) {
const isPremium = user?.isPremium;

return (
<div className="w-full bg-[#FFFDF0] py-12 md:py-20 lg:py-24 flex flex-col items-center justify-center text-center border-b border-orange-100/50 relative overflow-hidden px-4">
      
<div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 border border-gray-100/70 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
<div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 border border-gray-100/70 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

<div className="max-w-2xl flex flex-col items-center z-10 w-full">
        

<div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
  <Crown className={`w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-amber-500 ${isPremium ? 'animate-bounce' : 'animate-pulse'}`} />
  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-gray-800 uppercase flex items-center">
    KAWSARSHOP 
    <span className="text-amber-500 ml-1 md:ml-1.5 font-black text-2xl sm:text-3xl md:text-4xl leading-none relative -top-0.5">+</span>
  </h1>
</div>

<div className="mb-6 md:mb-8">
  {isPremium ? (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-300 rounded-full px-5 py-2 shadow-sm animate-fade-in">
      <span className="font-black text-[11px] sm:text-xs md:text-sm text-amber-600 tracking-wide uppercase">
       KawsarShop Plus+ Premium Active
      </span>
    </div>
  ) : (
    <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium max-w-xs sm:max-w-sm md:max-w-md leading-relaxed">
      Explore the exclusive benefits and details of the <br className="hidden sm:inline" />
      KawsarShop membership plan.
    </p>
  )}
</div>

{isPremium ? (
  <div className="flex flex-col items-center gap-2 bg-white border border-amber-100 p-4 rounded-xl shadow-md min-w-[260px] sm:min-w-[300px]">
    <div className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
      <CheckCircle2 size={16} className="fill-green-600 text-white" />
      <span>You are a Verified Premium Member</span>
    </div>
    {user?.premiumExpiresAt && (
      <p className="text-gray-400 text-[10px] sm:text-[11px]">
        Next Renewal: <span className="font-bold text-gray-600">{new Date(user.premiumExpiresAt).toLocaleDateString('en-GB')}</span>
      </p>
    )}
  </div>
) : (
  <button 
    onClick={onActivateClick}
    className="bg-[#FFAA00] hover:bg-[#e69900] text-gray-900 font-bold text-[11px] sm:text-xs md:text-sm py-2 px-5 sm:py-2.5 sm:px-6 rounded-md shadow-md shadow-orange-200/60 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
  >
    Activate Now
  </button>
)}

</div>
</div>
);
}