'use client'

import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import notify from "@/src/utils/toast";
import { useAuth } from "@/src/context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/src/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import LoginPopup from "@/src/features/auth/Login";
import { toggleWishlistAction } from "@/src/redux/slices/wishlistSlice";
import { useLoader } from "@/src/context/ItemLoaderContext";
import { syncCartAPI } from "@/src/services/cartServices";

export default function Quickview({product, onClose}){
 
const dispatch = useDispatch();
const { user } = useAuth();
const router = useRouter();
const cartItems = useSelector((state) => state.cart.cartItems);
const { wishlistItems } = useSelector((state) => state.wishlist);
const {showLoader, hideLoader} = useLoader()
const [selectedSize, setSelectedSize] = useState(null);  
const [localQty, setLocalQty] = useState(1);
const [openLogin, setOpenLogin] = useState(false);



useEffect(() => {
  if (product || openLogin) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [product, openLogin]);


const handleWishlistToggle = async (item) => {
if (!user) {
    setOpenLogin(true);
    return;
} 
const currentUserId = user.id || user._id;
if(!currentUserId){
  notify.error("User ID missing. Please login again.");
  return;
}
const isLiked = wishlistItems.some((w) => w._id === item._id);
showLoader();
try{
 await dispatch(toggleWishlistAction({
  userId: currentUserId,
  product: item 
})).unwrap();
  if(!isLiked){
    notify.success(`Item added to wishlist!`);
  } else{
    notify.error(`Item removed from wishlist!`);
  }
} catch(error){
  notify.error("Something went wrong!");
}finally{
  hideLoader();
}
};


const handleAction = (callback) => {
  if(!user){
     setOpenLogin(true);
  }else{
    callback()
  }
}

const decrement = () => {
if (localQty > 1) {
    setLocalQty(prev => prev - 1);
} else {
    notify.warning("Keep a Minimum Of 1 QTY");
}
}

const increment = () => {
if (localQty < product.stock) {
    setLocalQty(prev => prev + 1);
} else {
    notify.warning("Sorry, No More Stock Available!");
}
}


const handleAddToCart = async () => {
  if (!product) return;

 if (product.size && Array.isArray(product.size) && product.size.length > 0) {
    if (!selectedSize) {
      notify.error("Please select a size first!");
      return;
    }
  }

  const isExist = cartItems?.find((item) => item._id === product._id);
  if (isExist) {
    notify.error("Already added to cart!");
    return;
  }

  const newItem = {
    ...product,
    quantity: localQty,
    selectedSize: selectedSize || null
  };

  dispatch(addToCart(newItem));
  const userId = user?.id || user?._id;
  if (userId) {
    try {
      const updatedCart = [...cartItems, newItem];
      await syncCartAPI(userId, updatedCart);
    } catch (err) {
      throw err
    }
  }

  notify.success("Item Added To Your Cart");
  setLocalQty(1);
  onClose();
};

if (!product) return null;

return(
<div>

{openLogin && (
<div style={{ zIndex: "99999999", position: "relative" }}>
    <LoginPopup open={openLogin} setOpen={setOpenLogin} />
</div>
)}

    <div className="hidden fixed p-3 inset-0 bg-black/50 xl:flex " style={{zIndex: "155555"}}>

<div className="bg-[#FFFFFF] p-5 w-full rounded-xl overflow-x-hidden overflow-y-auto ">

<div className="">


<div className="fixed left-7 bg-white h-15 right-7 top-3 pt-2 bottom-5" style={{zIndex: "155556"}}>
  <div className=" flex items-center justify-between w-full">
  <p className="font-semibold text-[20px]">Quick View</p>
  <button
  onClick={onClose}
  className="cursor-pointer bg-[#E2136E] rounded-md p-0.5 w-10 text-white font-black"
  >✕</button>
</div>
<hr className="text-gray-400 mt-2"/>
</div>



<div className="mt-4 p-5 flex flex-row justify-center gap-20 w-full" style={{zIndex: "0"}}>

<div className="flex flex-col gap-2">
<div className="">
 <Zoom >
<Image
src={product.image}
alt={product.name}
width={300}
height={200}
className="cursor-zoom-in w-full h-[500px] object-cover rounded-md transition-all duration-500 group-hover:scale-110"
/>
 </Zoom>
</div>
<div className="flex gap-3 justify-between">
  {Array.isArray(product?.categoryImg) && 
 product.categoryImg.slice(0,3).map((img,index) => (
 <div key={index} className="w-24 h-24">
<Image
  src={img}
  alt={product.name}
  width={120}
  height={120}
  className="w-full h-full object-cover rounded-md cursor-pointer border hover:border-[#1F5DA0] transition"
/>
</div>  
 ))
}
</div>
 </div>


<div className="w-1/2">

<div className="flex flex-col gap-2">
  <p className="text-2xl uppercase font-semibold">{product.name}</p>

<div className="flex justify-between">
<div className="flex gap-2">Brands : <p className="font-semibold text-[#BB105C]">{product.category}</p></div>
    
<div className="bg-[#f3dfe8] hover:bg-red-100 rounded-lg font-black p-2 flex justify-center items-center transition-all duration-300">
  <button 
    className="cursor-pointer flex items-center justify-center"
    onClick={() => handleWishlistToggle(product)}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill={wishlistItems.some((w) => w._id === product._id) ? "#ef4444" : "none"}
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke={wishlistItems.some((w) => w._id === product._id) ? "#ef4444" : "currentColor"} 
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  </button>
</div>

</div>

<hr className="text-gray-400 mt-2"/>


<div className="flex items-center justify-between">
  <div className="flex gap-1 pt-2">
<div className="border-l-[6] border-green-500"/>
<div className="flex gap-2">
  <p className="font-black text-[30px] text-[#E2136E]">${product.price}</p>
  <p className="text-gray-400 line-through">${product.oldprice}</p>
</div>
</div>

<div className="flex gap-2">
  <p className="text-gray-400">DiscountPrice :</p>
  <p className="font-bold text-yellow-400">{product.discountPercent}</p>
</div>
</div>


<div className="flex justify-between">
  
  <div className="flex gap-2">
    <p className="text-gray-400 font-semibold">SKU/Style :</p>
    <p className="text-[#E2136E]">{product.sku}</p>
  </div>

  <div className="flex gap-2">
    <p className="text-gray-400 font-semibold">Sold By :</p>
    <p className="font-bold flex gap-3">{product.catetitle}. <Link href={`/home`} className="text-[#E2136E]">(Visit Online Store)</Link></p>
  </div>
</div>

<div className="flex gap-2">
  <p className="text-gray-400 font-semibold">Color :</p>
  <p>N/A</p>
</div>

<div>
 <Image
src={product.image}
alt={`img`}
width={50}
height={200}
className="object-cover cursor-pointer rounded transition-all duration-500 group-hover:scale-110"
/>
</div>

<div> 
{product?.size && product.size.length> 0 ? (
 <div>
<p  className="text-gray-400 font-semibold">Size:</p>
<div className="flex flex-wrap-reverse gap-2 mt-1 cursor-pointer">
{product.size.map((sizes,index) => (
<button key={index}
onClick={() => setSelectedSize(sizes)}
className={`px-6 py-2 rounded-md font-semibold border cursor-pointer transition
   ${
     selectedSize === sizes
       ? "bg-[#1F5DA0] text-white border-[#1F5DA0]"
       : "bg-white text-black border-3 border-[#1F5DA0] hover:bg-[#1F5DA0] hover:text-white"
   }
  `}> {sizes}
  </button>
))}    
  </div>
 </div>
): (
<div className="flex items-center gap-3">
    <p className="text-gray-400 font-semibold">Size :</p>
    <p className="text-sm">N/A</p>
</div>
)}

</div>

<div className="flex gap-3">
  <p className="text-gray-400 font-semibold">In Stock : </p>
  <p className="text-[#E2136E]">{product.stock}</p>
</div>


<div className="flex gap-5 items-center" style={{userSelect: "none"}}>
<p className="text-gray-400 font-semibold">Quantity :</p>
<div className="flex items-center gap-3">
<button onClick={decrement} className="w-8 h-8 cursor-pointer border-2 border-gray-400 rounded-lg font-bold hover:bg-gray-100">-</button>
<span className="text-xl font-bold text-center">{localQty}</span>
<button onClick={increment} className="w-8 h-8 border-gray-400 cursor-pointer border-2 rounded-lg font-bold hover:bg-gray-100">+</button>
</div>
</div>



<div className="justify-between flex items-center gap-4">
<button onClick={() => handleAction(handleAddToCart)}
className="uppercase hover:bg-gray-600 cursor-pointer rounded-md font-black text-[20px] bg-gray-500  h-15 text-white p-1 w-full">Add to cart</button>
<button onClick={() => handleAction(() => { onClose(); router.push('/checkout'); })} 
className="uppercase hover:bg-gray-600 cursor-pointer rounded-md font-black text-[20px] bg-[#E2136E] h-15  text-white p-1 w-full">buy now</button>
</div>

<hr className="text-gray-400 mt-2"/>


<div className="flex justify-between flex-col">
   
<div className="flex justify-between">
  <div className="flex gap-3">
    <p className="text-gray-400 font-semibold">Seller :</p>
    <p className="text-[#E2136E]">Kawsar Ahmed</p>
  </div>
  <div>
    <p className="text-[#E2136E] font-semibold cursor-pointer">Share With Social Media</p>
  </div>
</div>  

<div className="flex justify-between">
  <div className="flex gap-3">
    <p className="text-gray-400 font-semibold">Category :</p>
    <p className="font-semibold text-[#E2136E]">{product.category}</p>
  </div>

  <div className="flex justify-between gap-1">
<Link href={`https://www.facebook.com/profile.php?id=61576560495361`} target="_blank" className="bg-[#E2136E] rounded-full w-10 text-center text-white font-black border-blue-800 px-2 py-2">
<FontAwesomeIcon icon={faFacebook} />
</Link>

<Link href={`https://t.me/8801602084187`} target="_blank" className="bg-[#E2136E] rounded-full w-10 text-center text-white font-black border-blue-800 px-2 py-2">
<FontAwesomeIcon icon={faTelegram} />
</Link>

<Link href={`https://wa.me/8801602084187`} target="_blank" className="bg-[#E2136E] rounded-full w-10 text-center text-white font-black border-blue-800 px-2 py-2">
<FontAwesomeIcon icon={faWhatsapp} />
</Link>
  </div>
</div>

</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
)

}