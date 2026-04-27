'use client'

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, removeVoucher, applyVoucher, fetchCartFromServer } from "@/src/redux/slices/cartSlice";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Truck } from "lucide-react";
import notify from '@/src/utils/toast';
import { verifyVoucherAPI } from "@/src/services/orderServics";
import { syncCartAPI } from "@/src/services/cartServices";
import { useAuth } from "@/src/context/AuthContext";
import { useLoader } from "@/src/context/ItemLoaderContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {user} = useAuth()
  let router = useRouter();
  const dispatch = useDispatch();
  const { totalQuantity, cartItems, totalSavings, totalAmount, subtotal, appliedVoucher, discount, cashback, voucherDetails } = useSelector((state) => state.cart);
  const {showLoader, hideLoader} = useLoader();
  const [couponInput, setCouponInput] = useState("");
  const shippingThreshold = 5000; 
  const amountToFreeShipping = Math.max(0, shippingThreshold - totalAmount);
  const progressPercentage = Math.min(100, (totalAmount / shippingThreshold) * 100);
  const [loading, setLoading] = useState(false);
  const [changedItems, setChangedItems] = useState({});
  const [localLoading, setLocalLoading] = useState(true);

  const userId = useMemo(() => user?._id || user?.id || null, [user]);

 useEffect(() => {
    if (userId) {
      dispatch(fetchCartFromServer(userId));
    }
}, [userId, dispatch]);

  useEffect(() => {
  setLocalLoading(true); 
  const timer = setTimeout(() => {
    setLocalLoading(false); 
  }, 3000);

  return () => clearTimeout(timer);
}, []);


useEffect(()=> {
window.scrollTo(0, 0);
},[localLoading])


useEffect(() => {
  const userId = user?._id || user?.id; 
  if (userId && cartItems.length > 0) {
    const timer = setTimeout(() => {

    const vValue = voucherDetails?.value || 0;
    const vType = voucherDetails?.type || "percentage";

      syncCartAPI(userId, cartItems, appliedVoucher, vValue, vType)
        .catch((err) => {});
    }, 2000); 
    return () => clearTimeout(timer);
  }
}, [cartItems, appliedVoucher, voucherDetails, userId]); 



const handleRemoveItem = async (itemId) => {
  dispatch(removeFromCart(itemId));
  if(userId){
  try{
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    await syncCartAPI(userId, updatedCart, appliedVoucher);
    notify.success("Item removed from Successfully");
  }catch(err){
    notify.error("Sorry Please Try Again");
  }
  }
}



const handleQuantityChange = (itemId, action) => {
  if (action === 'increment') {
    dispatch(incrementQuantity(itemId));
  } else{
    dispatch(decrementQuantity(itemId));
  }
  setChangedItems(prev => ({...prev, [itemId]: true}))
}


const handleUpdateItem = async (itemId) => {
if (!userId) {
  setChangedItems(prev => ({ ...prev, [itemId]: false }));
  return; 
}
try{
setLoading(true);
showLoader();
await syncCartAPI(userId, cartItems, appliedVoucher);
notify.success("Cart updated in database!");
setChangedItems(prev => ({ ...prev, [itemId]: false }));
}catch(err){
notify.error("Failed to update database. Try again.");
}finally{
hideLoader();
setLoading(false); 
}
}



  const handleApplyCoupon = async () => {
    if (!couponInput) return notify.warning("Please enter a coupon code!");


    if (subtotal < 100) {
     return notify.error("Minimum order amount for vouchers is 100 TK");
    }

    setLoading(true);
    try{
      const data = await verifyVoucherAPI(couponInput, subtotal);

      if(data.success){
        dispatch(applyVoucher(data.voucher));

       if (userId){
        await syncCartAPI(userId, cartItems, data.voucher.code, data.voucher.value, data.voucher.type);
       } 

        notify.success("Coupon applied successfully!");
        setCouponInput("");
      }
    }catch(err){
      notify.error(err.message || "Something went wrong")
      dispatch(removeVoucher());
    }finally {
      setLoading(false);
    }
  }


  const handleRemoveVoucher = async () => {
    dispatch(removeVoucher());

    if (userId){
      try{
        await syncCartAPI(userId, cartItems, null); 
        notify.info("Voucher removed successfully"); 
      }catch(err){
        throw err;
      }
    }
  }


  
const handlecheckout = () => {
  showLoader();
  router.push("/checkout");
  hideLoader()
}


if (localLoading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-[#BC105C] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-bold animate-pulse">Loading cart items...</p>
    </div>
  );
}



  if (totalQuantity === 0) {
    return (
      <div className="md:min-h-[60vh] flex flex-col items-center justify-center text-center pt-35 pb-20 md:pt-0 px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
        <Link href="/products" className="bg-[#BC105C] text-white px-8 py-3 rounded-xl font-bold mt-4">
          Start Shopping
        </Link>
      </div>
    );
  }

return(
<div className="bg-[#F8F9FA] min-h-screen py-8 md:py-10">
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    
<div className="pt-30 md:px-5 md:pt-30 xl:pt-0 flex justify-between items-center mb-8">
<h1 className="text-3xl font-bold text-slate-800">
    Shopping Cart <span className="text-sm font-normal text-slate-500 block">{cartItems.length} items in your cart</span>
</h1>
<Link href="/products" className="hidden md:flex text-[#BC105C] hover:underline font-semibold flex items-center gap-1 text-sm">
    Continue Shopping <ArrowRight size={16} />
</Link>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<div className="lg:col-span-8 space-y-4">
{cartItems.map((item) => (
<div key={item._id} className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-slate-100 flex gap-4 md:gap-6 md:items-center">

<div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center">
  <Link href={`/product/${item._id}`} title={item.name}>
  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-contain"/>
  {item.discountPercent && (
    <span className="absolute top-2 left-2 bg-[#E2136E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
      -{item.discountPercent}
    </span>
  )}
  </Link>
</div>

<div className="flex-1 min-w-0 flex flex-col justify-center">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-4">
<div className="flex-1 min-w-0 w-full">
<h4 className="font-bold text-slate-700 text-[14px] md:text-lg leading-snug hover:text-[#E2136E] truncate block w-full">
  <Link href={`/product/${item._id}`} title={item.name}>
    {item.name}
  </Link>
</h4>
<div className="flex items-center gap-2 mt-0.5 md:mt-1">
    <span className="text-[#ea3f8c] font-bold text-base md:text-xl">${item.price.toLocaleString()}</span>
    {item.oldprice && (
      <span className="text-slate-300 line-through text-xs md:text-sm">${item.oldprice.toLocaleString()}</span>
    )}
  </div>
</div>
<div className="hidden md:block text-right self-center">
     <span className="text-lg font-black text-slate-800">${(item.price * item.quantity).toLocaleString()}</span>
     {item.quantity > 1 && <p className="text-[10px] text-slate-400">${item.price} each</p>}
</div>
</div>

<div className="flex items-center justify-between md:justify-start gap-4 mt-3">
<div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-0.5 md:p-1">
<button onClick={() => handleQuantityChange(item._id, 'decrement')} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 cursor-pointer">
  <Minus size={14} />
</button>
<span className="px-2 md:px-4 font-bold text-slate-700 text-sm w-8 md:w-10 text-center">{item.quantity}</span>
<button onClick={() => handleQuantityChange(item._id, 'increment')} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 cursor-pointer">
    <Plus size={14} />
</button>
</div>

{changedItems[item._id] ? (
<button onClick={() => handleUpdateItem(item._id)} disabled={loading}
className="flex items-center cursor-pointer gap-1 bg-orange-400 text-white px-2 py-2 rounded-md font-semibold text-xs md:text-sm">
 <span>{loading ? "Updating..." : "Update"}</span> 
</button>
): (
<button onClick={() => handleRemoveItem(item._id)} className="flex items-center cursor-pointer gap-1 text-red-400 hover:text-red-600 font-semibold text-xs md:text-sm">
    <Trash2 size={16} /> <span className="hidden xs:inline">Remove</span>
</button>
)}

</div>
<div className="md:hidden mt-2 text-right border-t border-slate-50 pt-1">
   <span className="text-xs text-slate-400">Total: </span>
   <span className="text-sm font-bold text-slate-800">${(item.price * item.quantity).toLocaleString()}</span>
</div>
</div>
</div>
))}
</div>

<div className="lg:col-span-4 w-full sticky top-24">
<div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-8">
<h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
<ShoppingBag className="text-[#E2136E]" size={18} />
</div> 
  Order Summary
</h2>


<div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
<div className="flex md:items-center gap-3 mb-4">
<Truck size={22} className="text-[#E2136E]" />
<p className="text-[10px] md:text-sm font-bold text-slate-600">
{amountToFreeShipping > 0 
  ? <span className="text-slate-500">Add <span className="text-[#E2136E]">${amountToFreeShipping.toLocaleString()}</span> more for FREE shipping</span>
  : <span className="text-[#E2136E]">FREE shipping applied!</span>}
</p>
</div>
<div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
<div className={`h-full transition-all duration-1000 ${amountToFreeShipping === 0 ? 'bg-emerald-500' : 'bg-[#E2136E]'}`} style={{ width: `${progressPercentage}%` }}></div>
</div>
<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
    <span className={totalAmount > 0 ? "text-[#E2136E]" : ""}>
      ${totalAmount.toLocaleString()}
    </span>
    <span>$5,000.00</span>
  </div>
</div>

 <div className="space-y-3">
   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Have a coupon code?</p>
   <div className="flex gap-2 flex-col xl:flex-row items-stretch">
     <input type="text" 
     value={couponInput}
     onChange={(e) => setCouponInput(e.target.value)}
     placeholder="ENTER CODE" 
     className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
     <button onClick={handleApplyCoupon} disabled={loading}
     className="bg-gray-500 text-white px-8 py-4 md:py-0 cursor-pointer rounded-2xl font-bold text-xs hover:bg-gray-600 transition-colors uppercase min-h-[54px] xl:min-h-full">{loading ? "..." : "Apply"}</button>
   </div>
   {appliedVoucher && (
    <div className="flex justify-between items-center bg-green-50 p-2 px-4 rounded-xl border border-green-100 mt-2">
      <div className="text-green-700 text-xs font-bold flex items-center gap-2">
    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
         <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-3 h-3"
         >
            <polyline points="20 6 9 17 4 12"></polyline>
         </svg>
      </div>
      <div>
        Cupon Applieds
      </div>
   </div>
      <button 
        onClick={handleRemoveVoucher}
        className="text-red-500 cursor-pointer text-xs font-bold hover:underline"
      >
        Remove
      </button>
    </div>
  )}
 </div>

<div className="space-y-4 pt-4">
  <div className="flex justify-between items-center text-slate-500">
    <span className="font-medium">Subtotal</span>
    <span className="font-black text-slate-800 text-lg">${subtotal.toLocaleString()}</span>
  </div>
  <div className="flex justify-between items-center text-[#E2136E]">
    <span className="font-medium">Product Savings</span>
    <span className="font-black">-${totalSavings.toLocaleString()}</span>
  </div>
  <div className="flex justify-between items-center text-emerald-500 border-t border-dashed pt-4">
    <span className="font-medium text-sm">Total Savings</span>
    <span className="font-black">-${totalSavings.toLocaleString()}</span>
  </div>
   <div className="flex justify-between items-center text-emerald-500 border-t border-dashed pt-4">
    <span className="font-medium text-sm">Shipping Fee</span>
    <span className="font-black text-[12px]">Calculating at checkout</span>
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
<div className="pt-6 border-t border-slate-100">
    <div className="mb-3 flex flex-col gap-3">
        <div className='flex justify-between items-center'>
            <span className="text-2xl font-black text-slate-800">Total</span>
            <span className="text-2xl font-black text-[#E2136E]">
            ${totalAmount.toLocaleString()}
            </span>
        </div>
         <p className="text-[10px] text-center text-slate-400 italic">Tax calculated at checkout</p>
    </div>
    <button onClick={handlecheckout} className="w-full bg-[#BC105C] text-white cursor-pointer py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#ac0c51] shadow-xl shadow-[#bc105c33] transition-all hover:-translate-y-1">
        Proceed to Checkout <ArrowRight size={20} />
    </button>
    
    <Link href="/products" className="block text-center mt-6 text-sm font-bold text-[#E2136E] hover:text-[#960644]">
        Continue Shopping
    </Link>
</div>
</div>
</div>
</div>

</div>
</div>
</div>
  );
}