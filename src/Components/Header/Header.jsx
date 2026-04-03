'use client'

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBars, faBarsStaggered, faChevronDown, faHouse,faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { CircleUser,ChevronDown,Cuboid,Truck,Heart,LogOut } from "lucide-react"
import Sidebar from "./Sidebar"
import SearchBar from "./Searchbox"
import { useState, useRef, useEffect} from "react"
import { useMainProduct } from "../../context/ProductRender"
import LoginPopup from "../../features/auth/Login"
import Register from "../../features/auth/Register"
import { useAuth } from "../../context/AuthContext"


export default function Header(){

    const { user, logout } = useAuth();
    const {setCategory} = useMainProduct();
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)
    const [sidebarcl, setsidebarcl] = useState(false)
    const [sideDropdown, setsideDropdown] = useState(null);
    const [FashionOpen, setFashionOpen] = useState(false);
    const fashionTimer = useRef(null);
    const [ElecOpen, setElecOpen] = useState(false);
    const ElectronicsTimer = useRef(null);
    const [BagOpen, setBagOpen] = useState(false);
    const BagsTimer = useRef(null);
    const [footOpen, setfootOpen] = useState(false);
    const FootwearTimer = useRef(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    

    useEffect(()=> {
      setUserMenuOpen(false);
    },[user])

    const defaultAvatar = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg";

   const toggleDropdown = (menu) => {
     if (sideDropdown === menu) {
       setsideDropdown(null);
       } else{
         setsideDropdown(menu)
       }
     }

return(
   <div className={`antialiased xl:pb-30`} style={{userSelect: "none", zIndex: "9999999"}}>

{/* main box  */}
<div>

{/* dekstop header main box  */}
<div>

{/* main  */}
<div className="w-full">


{/* sidebar xl  */}
<div className="hidden xl:block">
<Sidebar 
sidebarcl={sidebarcl}
setsidebarcl={setsidebarcl}
sideDropdown={sideDropdown}
setsideDropdown={setsideDropdown}
toggleDropdown={toggleDropdown}
setCategory={setCategory} 
 />
</div>
{/* sidebar xl  */}



{/* dekstop  header   */}
  <div className={`fixed w-full xl:flex-col bg-[#BC105C] text-white shadow-md hidden xl:block px-5 transition-transform duration-300`} style={{zIndex: "99998"}}>

{/* dekstop searbarnav */}
<div className={`p-2 w-full transition-all duration-300 bg-[#BC105C]`}>
<div className="flex w-full text-white bg-[#BC105C] justify-between items-center">

    <div>
        <p className="font-black text-2xl">
            <Link href={`/`} className=" font-black" style={{fontFamily: "Poppins"}}>
            kคຟŞคrŞh໐p
            </Link>
        </p>
    </div>

{/* searchbar  */}
<div className="w-full xl:block hidden">
<SearchBar />
</div>
{/* searchbar  */}

<div className="flex items-center gap-3">
     {user ? (
     <div className="relative group w-full"
     onMouseEnter={() => setUserMenuOpen(true)}
     onMouseLeave={() => setUserMenuOpen(false)}>
        <div onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center w-full gap-2 cursor-pointer transition-all">
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <img 
            src={user?.profilePic || user?.image || user?.picture || user?.photoURL || defaultAvatar}
            alt="Profile" 
            className="w-full h-full object-cover rounded-full" 
            onError={(e) => e.target.src = defaultAvatar}
            />
        </div>
       <div className="flex items-center gap-1">
        <span className="font-semibold text-[14px] flex items-center gap-1">
        <div>Hi,</div>
        <p>{user?.name || user?.username}</p>
        </span>
       <ChevronDown className="w-4 h-4" />
       </div>
        </div>
   {userMenuOpen && (
    <div 
      className={`absolute right-0 top-full pt-2 z-[9999999999] transition-all duration-200 ${
        userMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
      }`}
    >        
 <div className="absolute top-0 left-0 w-full h-2 bg-transparent"></div>
   <div className="w-48 bg-white text-black shadow-md rounded overflow-hidden">  

<ul className="flex flex-col py-1">

 <li className="px-4 py-2 border-b border-b-gray-200">
 <p className="font-bold text-[13px]">Welcome</p>
 </li>

<li className="border-b border-b-gray-200">
  <Link href="/profile/account" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <CircleUser className="w-4 text-yellow-300"/>
    My Account
  </Link>
</li>

<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Cuboid  className="w-4 text-yellow-300"/>
    My Orders
  </Link>
</li>


<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Truck  className="w-4 text-yellow-300"/>
    Track Order
  </Link>
</li>

<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Heart  className="w-4 text-yellow-300"/>
    My Wishlist
  </Link>
</li>

<li>
  <button 
    onClick={logout}
    className="w-full cursor-pointer text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-semibold">
    <LogOut className="w-4 text-yellow-300"/>
    Logout
  </button>
</li>
    
  </ul>
</div>
</div>
   )}
    </div>
    ): (
    <div className="flex items-center gap-2">
        <button onClick={() => setOpenLogin(true)} className="font-semibold cursor-pointer text-[15px] w-15 text-white">Sign in</button>
        <p> | </p>
        <button onClick={() => setOpenRegister(true)} className="font-semibold cursor-pointer text-[15px] w-15 text-white">Sign Up</button> 
    </div>
    )}
           
        <Link href={``} className="text-white font-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
        </Link>
        <Link href={``} className="text-white font-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        </Link>
</div>

</div>
</div>
<hr className="border-t border-white/10" />
{/* dekstop searbarnav */}

{/* dekstop main header  */}
<div className="px-5">
<div className="flex justify-between items-center">

<div className="cursor-pointer">
    <button onClick={()=> setsidebarcl(!sidebarcl)} className="cursor-pointer flex items-center gap-3 p-2 transition-all duration-300">
        <FontAwesomeIcon icon={faBarsStaggered} />
        <div className="text-[15px]">
            <p>SHOP BY</p>
            <p>CATEGORIES</p>
        </div>
        <FontAwesomeIcon icon={faChevronDown} />
    </button>
</div>

{/* sidebar  */}
<div>

</div>
{/* sidebar  */}

<Link href={`/`} className="cursor-pointer">Home</Link>

<div className="relative group"
onMouseEnter={()=> {
 if(fashionTimer.current) clearTimeout(fashionTimer.current)
  setFashionOpen(true)
}}
onMouseLeave={()=> {
fashionTimer.current = setTimeout(()=> setFashionOpen(false), 100)
}}>
   <Link href={`/products`} onClick={()=> setCategory("Fashion")} className="cursor-pointer">Fashion</Link>
   
{FashionOpen && (
   <ul 
    className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link href={`/products`} onClick={()=> setCategory("Women")} className="text-black hover:text-[#E2136E] cursor-pointer">Women</Link>
        <Link href={`/products`} onClick={()=> setCategory("Men")} className="text-black hover:text-[#E2136E] cursor-pointer">Men</Link>
    </ul>
)}

</div>


<div className="relative group"
onMouseEnter={()=> {
 if(ElectronicsTimer.current) clearTimeout(ElectronicsTimer.current)
  setElecOpen(true)
}}
onMouseLeave={()=> {
ElectronicsTimer.current = setTimeout(()=> setElecOpen(false), 100)
}}>
   <Link  href={`/products`} onClick={()=> setCategory("Electronics")} className="cursor-pointer">Electronics</Link>
   
{ElecOpen && (
   <ul 
     className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link href={`/products`} onClick={()=> setCategory("Mobile")} className=" text-black hover:text-[#E2136E] cursor-pointer">Mobile</Link>
        <Link href={`/products`} onClick={()=> setCategory("Laptop")}  className=" text-black hover:text-[#E2136E] cursor-pointer">Laptop</Link>
        <Link  href={`/products`} onClick={()=> setCategory("OtherElectronics")} className="text-black hover:text-[#E2136E] cursor-pointer">Gadegt</Link>
    </ul>
)}

</div>



<div className="relative group"
onMouseEnter={()=> {
  if(BagsTimer.current) clearTimeout(BagsTimer.current)
  setBagOpen(true)
}}
onMouseLeave={()=> {
BagsTimer.current = setTimeout(()=> setBagOpen(false), 400)
}}>
  <Link  href={`/products`} onClick={()=> setCategory("Bags")} className="cursor-pointer">Bags</Link>
  
{BagOpen && (
     
    <ul 
     className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link  href={`/products`} onClick={()=> setCategory("BagMen")} className="text-black hover:text-[#E2136E] cursor-pointer">Men Bags</Link>
        <Link  href={`/products`} onClick={()=> setCategory("BagWomen")} className="text-black hover:text-[#E2136E] cursor-pointer">Women Bags</Link>
</ul>
)}

</div>



<div className="relative  group"
onMouseEnter={()=> {
 if(FootwearTimer.current) clearTimeout(FootwearTimer.current)
  setfootOpen(true)
}}
onMouseLeave={()=> {
FootwearTimer.current = setTimeout(()=> setfootOpen(false), 100)
}}>
   <Link href={`/products`} onClick={()=> setCategory("Footwear")} className="cursor-pointer">Footwear</Link>
   
{footOpen && (
     <ul 
    className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link  href={`/products`} onClick={()=> setCategory("ShoesMen")} className="text-black hover:text-[#E2136E] cursor-pointer">Men Footwear</Link>
        <Link  href={`/products`} onClick={()=> setCategory("ShoesWomen")} className="text-black hover:text-[#E2136E] cursor-pointer">Women Footwear</Link>
</ul>
)}
</div>


<Link   href={`/products`} onClick={()=> setCategory("Groceries")} className="cursor-pointer ">
Groceries
</Link>

<Link  href={`/products`} onClick={()=> setCategory("Beauty")} className="cursor-pointer">
Beauty
</Link>

<Link href={`/products`} onClick={()=> setCategory("Wellness")} className="cursor-pointer ">
Wellness
</Link>

<Link  href={`/products`} onClick={()=> setCategory("Jewellery")} className="cursor-pointer ">
Jewellery
</Link>

<div className="cursor-pointer">
    <div>
        <p>Free International</p>
        <p>Delivery</p>
    </div>
</div>

</div>
</div>
{/* dekstop main header  */}

</div>
{/* dekstop  header   */}

</div>
{/* main  */}


</div>
{/* dekstop header main box  */}



{/* responsive menu  */}
<div className="bg-[#BC105C] xl:hidden z-[99999] text-white shadow-lg p-2 fixed w-full flex flex-col gap-2">

<div className="bg-[#BC105C] text-white flex justify-between p-1 w-full items-center">
  
<div className="flex gap-5">
<div>
    <button className="cursor-pointer" onClick={()=> setsidebarcl(!sidebarcl)}>
        <FontAwesomeIcon icon={faBars} />
    </button>
</div>      
  <Link href={``} className="md:text-[15px] font-black">kคຟŞคrŞh໐p</Link> 
</div>


<div className="flex gap-5">


<div>
{user ? (
<div className="relative group w-full"
onMouseEnter={() => setUserMenuOpen(true)}
onMouseLeave={() => setUserMenuOpen(false)}>
 <div onClick={() => setUserMenuOpen(!userMenuOpen)}
className="flex items-center w-full gap-2 cursor-pointer transition-all">
<div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
<img 
src={user?.profilePic || user?.image || user?.picture || user?.photoURL || defaultAvatar}
alt="Profile" 
className="w-full h-full object-cover rounded-full" 
onError={(e) => e.target.src = defaultAvatar}
/>
</div>
    </div>
 {userMenuOpen && (
    <div 
      className={`absolute right-0 top-full pt-2 z-[9999999999] transition-all duration-200 ${
        userMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
      }`}
    >        
 <div className="absolute top-0 left-0 w-full h-2 bg-transparent"></div>
   <div className="w-48 bg-white text-black shadow-md rounded overflow-hidden">  

<ul className="flex flex-col py-1">

 <li className="px-4 py-2 border-b border-b-gray-200">
 <p className="font-bold text-[13px]">Welcome</p>
 </li>

<li className="border-b border-b-gray-200">
  <Link href="/profile/account" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <CircleUser className="w-4 text-yellow-300"/>
    My Account
  </Link>
</li>

<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Cuboid  className="w-4 text-yellow-300"/>
    My Orders
  </Link>
</li>


<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Truck  className="w-4 text-yellow-300"/>
    Track Order
  </Link>
</li>

<li className="border-b border-b-gray-200">
  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#BC105C] hover:text-white transition-colors text-sm">
   <Heart  className="w-4 text-yellow-300"/>
    My Wishlist
  </Link>
</li>

<li>
  <button 
    onClick={logout}
    className="w-full cursor-pointer text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-semibold">
    <LogOut className="w-4 text-yellow-300"/>
    Logout
  </button>
</li>
    
  </ul>
</div>
</div>
   )} 
</div>
): (
<div className="flex items-center gap-2">
<button onClick={() => setOpenLogin(true)} className="cursor-pointer active:text-red-600">
 <CircleUser />
</button>
</div>
    )}
</div>


<div>
<button className="cursor-pointer font-black">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
</button>
</div>

    </div>

</div>

<hr className="text-gray-200 opacity-20"/>


<div className="w-full overflow-x-auto scrollbar-hide" style={{userSelect: "text"}}>
    <div className="flex flex-row justify-between p-2 gap-3">
     <Link href={`/`} className="cursor-pointer">Home</Link>
     <Link href={`/products`} onClick={()=> setCategory("Fashion")} className="cursor-pointer">Fashion</Link>
     <Link href={`/products`} onClick={()=> setCategory("Electronics")} className="cursor-pointer">Electronics</Link>
     <Link href={`/products`} onClick={()=> setCategory("Bags")} className="cursor-pointer">Bags</Link>
     <Link href={`/products`} onClick={()=> setCategory("Footwear")} className="cursor-pointer">Footwear</Link>
      <Link href={`/products`} onClick={()=> setCategory("Groceries")} className="cursor-pointer">Groceries</Link>
      <Link href={`/products`} onClick={()=> setCategory("Beauty")} className="cursor-pointer">Beauty</Link>
      <Link href={`/products`} onClick={()=> setCategory("Wellness")} className="cursor-pointer">Wellness</Link>
      <Link href={`/products`} onClick={()=> setCategory("Jewellery")} className="cursor-pointer">Jewellery</Link>

</div>

</div>
{/* sidebar xl  */}
<div className="xl:hidden">
<Sidebar 
setCategory={setCategory}
sidebarcl={sidebarcl}
setsidebarcl={setsidebarcl}
sideDropdown={sideDropdown}
setsideDropdown={setsideDropdown}
toggleDropdown={toggleDropdown}
/>
</div>
{/* sidebar xl  */}
 
</div>


<div className="fixed text-[15px] xl:hidden z-[9999] bottom-0 bg-[#FFF2F8] w-full shadow-xl" >
    <div>

<ul className="flex justify-between items-center px-3 py-2">

<Link href={``} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faHouse} className="text-[15px]"/>
<p className="text-[12px]">Home</p>
</Link>


<Link href={`/searchpage`} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faMagnifyingGlass} />
<p className="text-[12px]">Search</p>
</Link>


<Link href={``} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faHeart} />
<p className="text-[12px]">Wishlist</p>
</Link>


<Link href={``} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faBagShopping} />
<p className="text-[12px]">Orders</p>
</Link>



{user ? (
<Link href="/profile/account" className="flex flex-col items-center active:text-red-600">
     <div className="w-5 h-5 rounded-full overflow-hidden">
        <img 
         src={user.profilePic || user.image || user.picture || user.photoURL || defaultAvatar} 
          className="w-full h-full object-cover" 
          alt="User"
        />
     </div>
     <p className="text-[12px]">Profile</p>
</Link>
): (
<button onClick={() => setOpenLogin(true)} className="flex cursor-pointer flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faUser} />
<p className="text-[12px]">Account</p>
</button>
)}



</ul>
</div>
</div>
{/* responsive menu  */}

  <div>
    <LoginPopup
        open={openLogin}
        setOpen={setOpenLogin}
      />
    </div>

 <div>
    <Register
        Registeropen={openRegister}
        setRegister={setOpenRegister}
      />
    </div>




</div>
{/* main box  */}


    </div>
)}