'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShippingConfram from './SubmitPage';
import { useAuth } from '@/src/context/AuthContext';

export default function PriceBox({ selectedMethod, shippingMethod, addresses }){
const { user, token } = useAuth();
const dispatch = useDispatch();
const { totalQuantity, cartItems, totalSavings, totalAmount, subtotal, appliedVoucher, discount, cashback, voucherDetails, walletBalance } = useSelector((state) => state.cart);
const [agreed, setAgreed] = useState(false);
const [useWallet, setUseWallet] = useState(false);

const shippingThreshold = 5000;
const baseDeliveryCharge = shippingMethod?.price ?? 13;
const totalDeliveryCharge = cartItems.reduce((acc, item) => {
  return acc + baseDeliveryCharge * item.quantity;
}, 0)
const deliveryCharge = totalAmount >= shippingThreshold ? 0 : totalDeliveryCharge;
const totalBillBeforeWallet = totalAmount + deliveryCharge;
const walletDeduction = useWallet ? Math.min(walletBalance, totalBillBeforeWallet) : 0;
const grandTotal = Math.max(0, totalBillBeforeWallet - walletDeduction);


return(
<div>
<div className="max-w-4xl mx-auto mt-5 bg-white border border-gray-100 rounded-sm shadow-sm">
<div>
<div className="w-full bg-white px-4 py-4 border border-gray-200 rounded-md shadow-sm font-sans">
        
<div className="space-y-4">
<div className="flex justify-between items-center py-1">
<span className="text-[13px] font-semibold text-gray-900">Subtotal</span>
<span className="text-[13px] font-black text-gray-900">${subtotal.toLocaleString()}</span>
</div>
<div className="flex justify-between items-center py-1">
<span className="text-[13px] font-semibold text-gray-900">Product Savings</span>
<span className="text-[13px] font-black text-gray-900">-${totalSavings.toLocaleString()}</span>
</div>
  <div>
    {discount > 0 && (
    <div className="flex justify-between items-center text-emerald-500">
      <span className="font-medium">Voucher Discount</span>
      <span className="font-black">-${discount.toLocaleString()}</span>
    </div>
  )}
  </div>
<div>
    {cashback > 0 && (
    <div className="flex justify-between items-center text-blue-500">
      <span className="font-medium">Cashback Reward</span>
      <span className="font-black">-${cashback.toLocaleString()}</span>
    </div>
  )}
</div>
<div className="flex justify-between text-[13px]">
 <span className="font-semibold text-gray-600">Shipping & Handling</span>
 <span className={`font-black ${deliveryCharge === 0 ? 'text-emerald-500' : 'text-gray-800'}`}>
   {deliveryCharge === 0 ? 'FREE' : `$${deliveryCharge.toLocaleString()}`}
 </span>
</div>
  <div className="flex justify-between text-[13px] text-gray-600">
    <span>Customs/import Duties, Taxes</span>
    <span className="text-amber-600 text-[13px] font-bold italic text-base">On Delivery</span>
  </div>



{walletBalance > 0 && (
<div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
<div className="flex justify-between items-center">
  <div>
    <p className="text-[13px] font-bold text-emerald-700">KawsarShop Wallet</p>
    <p className="text-[11px] text-emerald-600">Available: ${walletBalance.toLocaleString()}</p>
  </div>
  <label className="flex items-center gap-2 cursor-pointer">
    <input 
      type="checkbox"
      checked={useWallet}
      onChange={() => setUseWallet(!useWallet)}
      className="w-4 h-4 accent-emerald-500 cursor-pointer"
    />
    <span className="text-[12px] font-semibold text-emerald-700">Use</span>
  </label>
</div>
{useWallet && (
  <div className="flex justify-between items-center mt-2 text-emerald-600">
    <span className="text-[12px] font-medium">Wallet Deduction</span>
    <span className="text-[12px] font-black">-${walletDeduction.toLocaleString()}</span>
  </div>
)}
</div>
)}



</div>
<div className="h-[1px] bg-gray-200 w-full my-6"></div>


<div className="flex gap-3 items-start">
  <div className="">
    <input 
      type="checkbox" 
      id="agreement" 
      checked={agreed}
      onChange={() => setAgreed(!agreed)}
      className="w-3 h-4 rounded border-gray-300 text-green-400 focus:ring-green-500 accent-green-500 cursor-pointer"
    />
  </div>
  <label htmlFor="agreement" className="text-[13px] leading-snug text-gray-600 cursor-pointer">
    I agree that customs and import Duties & Taxes will be collected by the courier company at the time of delivery. 
    <Link href="/faq" className="underline ml-1 hover:text-yellow-300 transition-colors">For more information</Link>
  </label>
</div>

</div>
</div>

</div>

<div className="max-w-4xl mx-auto mt-2 bg-white border border-gray-100 rounded-sm shadow-sm">
<div className="flex justify-between items-center px-3 py-5">
<span className="text-[15px] font-black text-gray-900 leading-none">Grand Total</span>
<span className="text-[13px] md:text-[15px] font-black text-gray-900 leading-none tracking-tight">
${grandTotal.toLocaleString()}
</span>
</div>
</div>


<div>
<ShippingConfram 
agreed={agreed}
selectedMethod={selectedMethod}
addresses={addresses}
shippingMethod={shippingMethod}
walletUsed={walletDeduction}
deliveryCharge={deliveryCharge}
grandTotal={grandTotal}
/>
</div>

</div>
)
}