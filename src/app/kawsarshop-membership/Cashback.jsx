'use client'

export default function CashBack() {
const rules = [
  "Cashback will be given for 10% of the non-discounted physical product price (subtotal), excluding shipping, customs, and all other charges.",
  "You will receive your cashback in your account within 24-48 hours of order confirmation, and the cashback status will be pending. The cashback will be credited to the customer's wallet 14 days after the order is delivered.",
  "If an order is canceled or returned, cashback will not be offered for that order.",
  "If you cancel your membership before the trial period ends, any cashback credited to your account will remain valid only during the 7-day trial period and will expire once the trial ends, even if your order delivery occurs afterward.",
  "Once the cashback is credited, the amount will be available for use within 30 days – the customer will be able to see the expire date and days left to expire."
];

return (
<div className="w-full bg-white py-10 md:py-14 px-4 sm:px-6 md:px-8">
<div className="max-w-4xl mx-auto flex flex-col items-center">     

<h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 tracking-tight">
  Cashback
</h2>

<div className="w-full bg-[#FFFDF0] border border-orange-100/70 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm">
<ul className="space-y-4 md:space-y-5">
{rules.map((rule, index) => (
<li key={index} className="flex items-start gap-2.5 sm:gap-3 text-gray-600">

<span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 mt-2 shrink-0"></span>
            
<p className="text-xs sm:text-sm leading-relaxed font-medium">
{rule}
</p>
</li>
))}
</ul>
</div>
</div>
</div>
);
}