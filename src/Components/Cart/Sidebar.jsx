'use client'

import { useEffect, useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart} from "@/src/redux/slices/cartSlice";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoader } from "@/src/context/ItemLoaderContext";
import { syncCartAPI } from "@/src/services/cartServices";
import { useAuth } from "@/src/context/AuthContext";


export default function CartSidebar({ cartSidebar, setCartSidebar }) {

const { user } = useAuth();
const dispatch = useDispatch();
const { totalQuantity, cartItems, totalSavings, totalAmount} = useSelector((state) => state.cart);
let router = useRouter();
const {showLoader, hideLoader} = useLoader();
const [changedItems, setChangedItems] = useState({});
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (cartSidebar) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [cartSidebar]);


const handleQuantityChange = (itemId, action) => {
 if (action === 'increment') {
     dispatch(incrementQuantity(itemId));
 } else {
     dispatch(decrementQuantity(itemId));
 }
 setChangedItems(prev => ({ ...prev, [itemId]: true }));
};


const handleUpdateItem = async (itemId) => {
const userId = user?._id || user?.id;
if (!userId) {
    setChangedItems(prev => ({ ...prev, [itemId]: false }));
    return;
}
try {
    setLoading(true);
    await syncCartAPI(userId, cartItems);
    setChangedItems(prev => ({ ...prev, [itemId]: false }));
} catch (err) {
    throw err
} finally {
    setLoading(false);
}
};



const handlecheckout = () => {
  showLoader();
  setCartSidebar(false);
  router.push("/checkout");
  hideLoader()
}


return(
<div>
<div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[999999] ${
    cartSidebar ? "opacity-100 visible" : "opacity-0 invisible"
}`} onClick={() => setCartSidebar(false)}></div>
<div className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform duration-300 z-[1000000] 
     ${cartSidebar ? "translate-x-0" : "translate-x-full"} 
     w-full md:w-1/2 xl:w-90 flex flex-col`}>


<div className="flex items-center justify-between p-4 border-b bg-[#BC105C] text-white">
<div className="flex items-center gap-2">
    <div className="bg-blue-500 p-3 rounded-lg">
    <ShoppingBag className="w-5 text-white"/>
    </div>
    <div>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <p>{totalQuantity} {totalQuantity > 1 ? "items" : "item"}</p>
    </div>
</div>
<button onClick={() => setCartSidebar(false)}
className="p-1 hover:bg-white/20 font-bold cursor-pointer rounded-full transition-colors">
    <X className="w-6 h-6 font-bold" />
</button>
</div>



<div className="flex-1 py-3 overflow-y-auto custom-scrollbar">
{totalQuantity === 0 ? (
<div className="py-20 flex flex-col items-center justify-center text-center">
  <div className="animate-in fade-in zoom-in duration-300">
<div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
  <ShoppingBag className="w-12 h-12 text-gray-400 stroke-[1.5]" />
</div>
<h3 className="text-2xl font-bold text-gray-800 mb-2">
  Your cart is empty
</h3>
<p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">
  Discover amazing products and add them to your cart!
</p>
<Link href={`/products`}
onClick={() => setCartSidebar(false)}
className="bg-[#BC105C] hover:bg-[#ef1678] text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 inline-block active:scale-95"
>Start Shopping</Link>
</div>
</div>
): (
<div className="flex-1 overflow-y-auto px-4">
{cartItems.map((item) => (
<div key={item._id} className="relative flex gap-3 mb-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
<div className="relative w-24 h-24 flex-shrink-0">
<Link href={`/product/${item._id}`}>
<img 
src={item.image}
alt={item.name}
className="w-full h-full object-contain rounded-lg cursor-pointer"
/>
</Link>
{item.discountPercent && (
<div className="absolute top-0 left-0 bg-[#E2136E] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-lg">
    -{item.discountPercent}
</div>
)}
</div>
<div className="flex flex-col justify-between flex-1">
<div>
<Link href={`/product/${item._id}`}>
  <h4 className="text-[13px] font-semibold text-gray-800 leading-tight hover:text-[#E2136E] cursor-pointer truncate w-[150px] md:w-[200px]">
    {item.name}
  </h4>
</Link>
<div className="flex items-center gap-2 mt-1">
  <span className="text-[#E2136E] font-bold text-lg">${item.price}</span>
  {item.oldprice && (
    <span className="text-gray-400 line-through text-sm">${item.oldprice}</span>
  )}
</div>
</div>
<div className="flex items-center justify-between mt-2">
<div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8">
<button
onClick={() => handleQuantityChange(item._id, 'decrement')}
className="h-full px-3 bg-gray-50 cursor-pointer hover:bg-[#E2136E] hover:text-white transition-all flex items-center justify-center">
<Minus size={12} />
</button>
<span className="px-3 font-bold text-sm">{item.quantity}</span>
<button onClick={() => handleQuantityChange(item._id, 'increment')}
className="h-full px-3 bg-gray-50 cursor-pointer hover:bg-[#E2136E] hover:text-white transition-all flex items-center justify-center">
 <Plus size={12} /> 
</button>
</div>

{changedItems[item._id] ? (
<button onClick={() => handleUpdateItem(item._id)} disabled={loading}
className="flex items-center cursor-pointer gap-1 bg-orange-400 text-white px-2 py-2 rounded-md font-semibold text-xs md:text-[12px]">
 <span>{loading ? "Updating..." : "Update"}</span> 
</button>
): (
<button onClick={() => dispatch(removeFromCart(item._id))}
className="text-red-500 cursor-pointer hover:scale-110 transition-transform p-1">
 <Trash2 size={18} /> 
</button>
)}

</div>
</div>
</div> 
))}
</div>
)}  
</div>

{cartItems.length > 0 && (
<div className="border-t border-t-gray-200 p-5 bg-white space-y-3">
{totalSavings > 0 && (
  <div className="flex justify-between border-b border-b-gray-200 pb-3 items-center text-sm font-medium text-green-600">
  <span>Total Savings</span>
  <span>-${totalSavings.toFixed(0)}</span>
</div>
)}
<div className="flex justify-between items-center gap-4">
  <span className="text-xl font-bold flex-shrink-0">Total</span>
  <span className="text-2xl font-black text-[#E2136E] truncate max-w-[200px]" title={`$${totalAmount}`}>${totalAmount}</span>
</div>
<button onClick={handlecheckout} className="w-full cursor-pointer bg-[#E2136E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ac0c51] transition-all">
  Proceed to Checkout
  <ArrowRight size={20} />
</button>

<Link href={`/products`} onClick={()=> setCartSidebar(false)}
className="w-full py-2 cursor-pointer flex justify-center text-center text-gray-500 font-semibold text-sm hover:text-orange-500">
Continue Shopping
</Link>
</div> 
)}

</div>
</div>
)
}