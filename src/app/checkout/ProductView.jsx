'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Truck, ChevronDown, Trash2, ChevronUp, ArrowRight } from "lucide-react";
import { incrementQuantity, decrementQuantity } from "@/src/redux/slices/cartSlice";
import notify from '@/src/utils/toast';
import { syncCartAPI } from "@/src/services/cartServices";
import { useAuth } from "@/src/context/AuthContext";
import { useLoader } from "@/src/context/ItemLoaderContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function OrderReview() {
const { user } = useAuth();
const dispatch = useDispatch();
const { cartItems, totalQuantity, totalAmount, subtotal } = useSelector((state) => state.cart);
const [isOpen, setIsOpen] = useState(false);
const {showLoader, hideLoader} = useLoader()
const [loading, setLoading] = useState(true);
const [changedItems, setChangedItems] = useState({});


useEffect(()=> {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);
  return () => clearTimeout(timer);
},[])


const [sliderRef, instanceRef] = useKeenSlider({
   loop: false,
   mode: "free-snap",
    slides: {perView: 4,spacing: 8,},
    created(){setLoading(false)},
    breakpoints: {
    "(max-width: 1280px)": {
     slides: {perView: 4,spacing: 8,}},
    "(max-width: 1024px)": {
     slides: {perView: 6,spacing: 10,}},
    "(max-width: 540px)": {
     slides: {perView: 4,spacing: 2,}}
    }})


useEffect(() => {
if (instanceRef.current) {
  instanceRef.current.update();
}
setLoading(false);
}, [cartItems, instanceRef]);




const handleQuantityChange = (itemId, action) => {
  if (action === 'increment') {
    dispatch(incrementQuantity(itemId));
  } else{
    dispatch(decrementQuantity(itemId));
  }
  setChangedItems(prev => ({...prev, [itemId]: true}))
}


const handleUpdateItem = async (itemId) => {
const userId = user?._id || user?.id;
if (!userId){
 setChangedItems(prev => ({ ...prev, [itemId]: false }));
 return; 
}
try{
setLoading(true);
showLoader();
await syncCartAPI(userId, cartItems);
notify.success("Cart updated is Successfully!");
setChangedItems({});
}catch(err){
notify.error("Failed to update database. Try again.");
}finally{
hideLoader();
setLoading(false); 
}
}


return (
<div>
<div className="bg-white mt-5 rounded-md shadow-md border border-gray-100 overflow-hidden">
<div>

<div className="">

<div className="">

<div onClick={()=> setIsOpen(!isOpen)} className="cursor-pointer hover:bg-gray-50 transition-colors">
<div className="flex justify-between w-full px-3 py-3">
  <h2 className="text-[12px]">{cartItems.length} Items</h2>
  <div className="flex text-[12px] items-center cursor-pointer hover:text-orange-500">
    <p>Order Review</p>
   {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
  </div>
</div>
<div ref={sliderRef} className="keen-slider px-3 py-3 cursor-pointer">
{cartItems.map((item) => (
<div key={item._id} className="keen-slider__slide !overflow-visible">
<div className="relative border border-gray-200 p-2 rounded-md bg-white">
  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md" />
<span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
  {item.quantity}
</span>
</div>
</div>
))}
<div className="keen-slider__slide  invisible"></div>
</div>
</div>
{isOpen && (
<div className="border-t border-gray-100 bg-white p-4">
<div className="flex items-center justify-center text-[15px] gap-2 mb-4 text-[12px]">
  <span className="flex items-center gap-1">Ban</span>
  <span className="text-orange-400">•••• ✈️ ••••</span>
  <span className="flex items-center gap-1">Bangladesh</span>
</div>
{cartItems?.map((item) => (
<div key={item._id} className="mb-6 last:mb-0">
<div className="flex gap-4">
<div className="w-32 h-32 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-2 relative">
<img src={item.image} alt="" className="w-20 h-20 object-contain" />
<div className="mt-2 border rounded-md flex items-center px-1 py-1 gap-2 text-[12px] text-gray-600">
<button onClick={() => handleQuantityChange(item._id, 'decrement')}
className="hover:bg-gray-100 p-1 rounded cursor-pointer">
<Minus size={12} />
</button>
<span className="font-bold w-4 text-center">{item.quantity}</span>
<button onClick={() => handleQuantityChange(item._id, 'increment')}
className="hover:bg-gray-100 p-1 rounded cursor-pointer">
<Plus size={12} />
</button>
</div>
</div>

<div className="flex-1">
<h3 className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug">
{item.name}
</h3>

<div className="mt-2 space-y-1 text-[12px] text-gray-500">
  <p className="line-clamp-1">Title : <span className="text-gray-800">{item.catetitle}</span></p>
  <p className="line-clamp-1">Category : <span className="text-gray-800">{item.category}</span></p>
</div>
  <div className="mt-3 text-[14px]">
    Total Price : <span className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
  </div>
</div>
</div>
<div className="h-[2px] bg-orange-400 mt-2 w-full"></div>
</div>
))}
<div>
{cartItems.map((item) => (
<div key={item._id}>
{changedItems[item._id] ? (
<button onClick={() => handleUpdateItem(item._id)} disabled={loading}
className="mt-2 w-full bg-orange-400 text-white text-[10px] font-bold py-2 cursor-pointer hover:bg-orange-600 rounded shadow-sm"
>
   <span>{loading ? "Updating..." : "Update"}</span> 
  </button>
): (
<div className="flex justify-between text-[10px] md:text-[13px] font-semibold">
  <p>Shipping Charges ({cartItems.length} Item {totalQuantity.toLocaleString()} Qty)</p>
  <span>${totalAmount.toLocaleString()}</span>
</div>
)}
  </div>
))}
</div>
</div>
)}
</div>

</div>

</div>
</div>
</div>
);
}