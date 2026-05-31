'use client'

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@/src/context/AuthContext';
import LoginPopup from '@/src/features/auth/Login';
import { ShoppingBasket, Crown } from "lucide-react";
import { usePathname } from 'next/navigation';
import CartSidebar from './Sidebar';



export default function FloatingCart(){

const { user } = useAuth();
const pathname = usePathname();
const { totalQuantity, totalAmount, subtotal } = useSelector((state) => state.cart);
const [cartSidebar, setCartSidebar] = useState(false)
const [openLogin, setOpenLogin] = useState(false);

const allowedPages = 
[
'/', '/home', '/', '/searchresult', 
'/product', '/products', '/speacial-offer-products'
]
const isAllowed = allowedPages.includes(pathname);
if (!isAllowed) return null;


const handleCartOpen = () => {
  if(!user){
    setOpenLogin(true);
  }else{
    setCartSidebar(true);
  }
}

const isPremiumActive = useMemo(() => {
  return user?.isPremium === true && new Date(user?.premiumExpiresAt?.$date || user?.premiumExpiresAt) > new Date();
}, [user]);


return(
<div>

{/* CartSidebar xl  */}
<div className="">
<CartSidebar 
cartSidebar={cartSidebar}
setCartSidebar={setCartSidebar}
/>
</div>
{/* CartSidebar xl  */}


<div onClick={handleCartOpen} className="fixed hidden md:flex right-0 md:top-[40%] xl:top-1/2 -translate-y-1/2 z-[99]">

<div className={`cursor-pointer transition-all duration-300 rounded-lg shadow-2xl flex flex-col items-stretch overflow-hidden border group w-24
  ${isPremiumActive 
    ? 'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-400/50 hover:from-amber-600 hover:to-amber-700' 
    : 'bg-orange-600 border-orange-500/50 hover:bg-orange-700'
  }`}
>

<div className={`px-3 py-2 flex items-center justify-center border-b border-white/10 transition-colors relative
  ${isPremiumActive ? 'bg-amber-400/20 group-hover:bg-amber-400/40' : 'bg-orange-500 group-hover:bg-orange-600'}`}
>
<span className="text-white flex  flex-col justify-center items-center gap-2 font-bold text-sm tracking-wide">
{isPremiumActive ? (
<Crown className="text-amber-200 animate-pulse" />
) : (
  <ShoppingBasket  />
)}
 <div className="flex gap-1">
    <p>{totalQuantity}</p>
    <p>{totalQuantity > 1 ? "items" : "item"}</p>
  </div>
</span>
</div>

<div className="bg-black px-2 py-2 flex items-center justify-center">
<span className={`font-black text-xs flex items-center gap-0.5 truncate max-w-full
  ${isPremiumActive ? 'text-amber-400' : 'text-white'}`}
>
  <span>$</span>
  <span className="truncate">{totalAmount.toLocaleString()}</span>
</span>
</div>

</div>  
</div>


<LoginPopup 
open={openLogin}
setOpen={setOpenLogin}/>

</div>
)
}