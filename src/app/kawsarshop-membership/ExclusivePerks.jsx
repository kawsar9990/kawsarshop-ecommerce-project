'use client'

import { Wallet, Rocket, Clock, ArrowUpRight, UserCheck, RefreshCw } from 'lucide-react';

export default function ExclusivePerk() {

  const perks = [
    {
      title: "Saving & Discounts",
      desc: "10% Cashback on the final product prices at KawsarShop",
      icon: Wallet,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Expedited Shipping",
      desc: "Fast shipping at standard shipping rates for members",
      icon: Rocket,
      bgColor: "bg-red-100",
      iconColor: "text-red-400",
    },
    {
      title: "Product Warranties",
      desc: "Exclusive warranty coverage on your purchases",
      icon: Clock,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      title: "Combine & Save",
      desc: "Merge membership perks with existing KawsarShop discounts",
      icon: ArrowUpRight,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      title: "Priority Support",
      desc: "Dedicated 24/7 priority support for premium members",
      icon: UserCheck,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-400",
    },
    {
      title: "Returns & Refunds",
      desc: "Extended return and refund windows of up to 14 days", 
      icon: RefreshCw,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-400",
    },
  ];

return (
<div className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
<div className="max-w-6xl mx-auto">

<h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 tracking-tight">
  Exclusive Perks
</h2>
        
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
{perks.map((perk, index) => {
const IconComponent = perk.icon;
return (
<div 
key={index} 
className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col items-start transition-all duration-300 hover:shadow-md hover:border-gray-200"
>
<div className={`p-3.5 md:p-4 rounded-xl md:rounded-2xl ${perk.bgColor} mb-4 flex items-center justify-center`}>
  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${perk.iconColor}`} strokeWidth={2.5} />
</div>

<h3 className="font-bold text-gray-800 text-base md:text-lg mb-2">
  {perk.title}
</h3>
<p className="text-gray-500 text-xs md:text-sm leading-relaxed">
  {perk.desc}
</p>
</div>
);
})}
</div>

</div>
</div>
);
}