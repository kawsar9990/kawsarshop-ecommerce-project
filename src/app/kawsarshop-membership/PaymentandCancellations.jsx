'use client'




export default function PaymentAndCancel() {
  
  
return (
<div className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-8">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start relative">
        
<div className="w-full md:w-1/2 space-y-12 md:pr-4">     

<section className="space-y-4">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
    Payment and Cancellations
  </h2>
  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
    The annual membership fee will be automatically billed after the first 7-day trial period to the chosen payment method on an annual recurring basis - as authorized upon membership registration. KawsarShop is not responsible for any additional charges or fees incurred by the customer's bank or credit card. The membership fee is non-refundable.
  </p>
</section>

<section className="space-y-6">
<h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
  Renewal & Cancellations
</h3>

<div className="space-y-6">
<div className="flex items-start gap-4">
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 font-bold text-sm shrink-0 mt-0.5">
    ✓
  </span>
  <div>
    <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">Unless the customer cancels</h4>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
      their membership plan 30 days prior to the end of the applicable membership period, KawsarShop will automatically renew the membership at the end of the applicable membership period - as agreed upon registration - through the chosen payment method.
    </p>
  </div>
</div>


<div className="flex items-start gap-4">
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 font-bold text-sm shrink-0 mt-0.5">
    ✓
  </span>
  <div>
    <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">If renewal fails</h4>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
      due to issues in the customer's payment method or expired credentials and the customer does not provide a new eligible payment method, the membership plan will be automatically canceled. If the customer provides a new payment method other than the original payment method provided during the registration stage and the renewal is successful, the new membership period will be based on the original membership date.
    </p>
  </div>
</div>


<div className="flex items-start gap-4">
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 font-bold text-sm shrink-0 mt-0.5">
    ✓
  </span>
  <div>
    <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">If the customer cancels auto-renewal</h4>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
      the cancelation will take effect a day after the last day of the current membership period.
    </p>
  </div>
</div>

 <div className="flex items-start gap-4">
   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 font-bold text-sm shrink-0 mt-0.5">
     ✓
   </span>
   <div>
     <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">Trial members</h4>
     <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
       may at any time choose to cancel their membership during the seven (7) days trial period and cancelation will take effect immediately. Log in to your account and navigate to the membership section to complete the cancellation process.
     </p>
   </div>
 </div>
</div>
</section>
</div>

<div className="w-full md:w-1/2 w-full flex justify-center md:sticky md:top-24 z-10">
<div className="w-full max-w-[400px] p-6">
<div className="text-center space-y-2">
  <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1780112675/cancel-paymnet-icon_vtcn3v.gif" alt="" />
</div>
</div>
</div>

</div>
</div>
);
}