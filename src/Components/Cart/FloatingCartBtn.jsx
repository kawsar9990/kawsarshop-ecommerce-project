'use client'

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@/src/context/AuthContext';
import LoginPopup from '@/src/features/auth/Login';
import { ShoppingBasket } from "lucide-react"
import { usePathname } from 'next/navigation';
import CartSidebar from './Sidebar';



export default function FloatingCart(){

const { user } = useAuth();
const pathname = usePathname();
const { totalQuantity, totalAmount } = useSelector((state) => state.cart);
const [cartSidebar, setCartSidebar] = useState(false)
const [openLogin, setOpenLogin] = useState(false);

const hiddenPages = ['/login', '/register', '/not-found', '/searchpage'];
const isHidden = hiddenPages.includes(pathname);
if (isHidden) return null;


const handleCartOpen = () => {
  if(!user){
    setOpenLogin(true);
  }else{
    setCartSidebar(true);
  }
}


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

<div className="bg-orange-600 cursor-pointer hover:bg-orange-700 transition-all duration-300 rounded-lg shadow-2xl flex flex-col items-stretch overflow-hidden border border-orange-500/50 group w-24">


<div className="bg-orange-500 px-3 py-2 flex items-center justify-center border-b border-orange-400/30 group-hover:bg-orange-600 transition-colors">
<span className="text-white flex  flex-col justify-center items-center gap-2 font-bold text-sm tracking-wide">
  <ShoppingBasket />
  <div className="flex gap-1">
    <p>{totalQuantity}</p>
    <p>item</p>
  </div>
</span>
</div>

<div className="bg-black px-2 py-2 flex items-center justify-center">
<span className="text-white font-medium text-xs flex items-center gap-0.5 truncate max-w-full">
  <span>$</span>
  <span className="truncate">{totalAmount}</span>
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