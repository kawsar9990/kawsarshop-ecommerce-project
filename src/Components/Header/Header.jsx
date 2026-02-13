'use client'

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBagShopping, faBars, faBarsStaggered, faChevronDown, faHeart, faHouse, faInbox, faMagnifyingGlass, faPhone, faTruck, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
library.add(faBarsStaggered,faChevronDown,faBars,faXmark,faHouse,faMagnifyingGlass,faBagShopping,faUser, faHeart,faInbox,faPhone,faTruck)

import Sidebar from "./Sidebar"
import SearchBar from "./Searchbox"
import { useState, useRef , useEffect} from "react"
import { useMainProduct } from "../../context/ProductRender"


import Getapp from "./Getapp"


export default function Header(){

   const {setCategory} = useMainProduct();

   const [getapp,setGetapp] = useState(false)


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


  const toggleDropdown = (menu) => {
    if (sideDropdown === menu) {
      setsideDropdown(null);
      } else{
        setsideDropdown(menu)
      }
    }
   




 const [showSmall, setShowSmall] = useState(true);
 const lastScroll = useRef(0);
 useEffect(()=> {
 const handleScroll = () => {
   const current = window.scrollY;
   if(current === 0){
      setShowSmall(true);
   }
  else if(current > lastScroll.current){
   setShowSmall(false);
 }
 else if(current <= lastScroll.current){
  setShowSmall(false)
 }
 lastScroll.current = current;   
 }
  window.addEventListener("scroll",handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
},[])






return(
   <div className={`antialiased  xl:pb-40 ${!showSmall ? "xl:pb-0" : ""}`} style={{userSelect: "none", zIndex: "99999"}}>

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



{/* small header  */}
<div className={`fixed hidden items-center xl:block top-0 left-0 w-full h-10 bg-[#E2136E] border-b border-b-gray-300  px-5 transition-transform duration-300 ${
    showSmall ? "translate-y-0" : "-translate-y-full"
 }`} style={{zIndex: "99999"}}>
          
 <div className="flex pt-3 justify-between uppercase p-2 text-[12px] flex-row items-center">
 <div className="flex flex-row gap-3 items-center">
<a href={``} className="flex text-white gap-1"><p><FontAwesomeIcon icon={faPhone} /></p><p>+8801602084187</p></a>
<a href={``} className="flex text-white gap-1 lowercase"><p><FontAwesomeIcon icon={faInbox} /></p><p>kawsar158464@gmail.com</p></a>
</div>
<div className="flex items-center gap-2">

<div className={`text-white cursor-pointer ${getapp ? "text-blue-800" : "text-black"}`}
onClick={()=> setGetapp(!getapp)}
>Get App Details</div>
{
    getapp && <Getapp />
}


<Link href={`/helpcenter`} className="text-white">Help Center</Link>
<Link href={`/ordertracking`} className="text-white">Order Tracking</Link>
</div>
</div>
</div>
{/* small header  */}



{/* dekstop  header   */}
  <div className={`fixed w-full xl:flex-col bg-[#BC105C] text-white shadow-md hidden xl:block px-5 transition-transform duration-300 ${
          showSmall ? "translate-y-10" : "translate-y-0"}`} style={{zIndex: "99998"}}>

{/* dekstop searbarnav */}
<div className={`w-full transition-all duration-300 bg-[#BC105C]`}>
<div className="flex p-3 w-full text-white bg-[#BC105C] justify-between items-center">

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

    <div className="flex justify-between gap-3">
        <Link href={`/login`} className="font-bold text-white">Login</Link>
        <p> | </p>
        <Link href={`/register`} className="font-bold text-white">Register</Link>
        <Link href={``} className="text-white font-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
        </Link>
        <Link href={``} className="text-white font-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        </Link>
    </div>

</div>
</div>
<hr className="text-gray-300"/>
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

<Link href={`/`} className=" cursor-pointer">Home</Link>

<div className="relative group"
onMouseEnter={()=> {
 if(fashionTimer.current) clearTimeout(fashionTimer.current)
  setFashionOpen(true)
}}
onMouseLeave={()=> {
fashionTimer.current = setTimeout(()=> setFashionOpen(false), 100)
}}>
   <Link href={`/products`} onClick={()=> setCategory("Fashion") } className="cursor-pointer">Fashion</Link>
   
{FashionOpen && (
   <ul 
    className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link href={`/products`} onClick={()=> setCategory("FashionWomen")} className="text-black hover:text-[#E2136E] cursor-pointer">Women</Link>
        <Link href={`/products`} onClick={()=> setCategory("FashionMan")} className="text-black hover:text-[#E2136E] cursor-pointer">Men</Link>
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
        <Link href={`/products`} onClick={()=> setCategory("leptop")}  className=" text-black hover:text-[#E2136E] cursor-pointer">Leptop</Link>
        <Link  href={`/products`} onClick={()=> setCategory("OthersElectronics")} className="text-black hover:text-[#E2136E] cursor-pointer">Gadegt</Link>
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
  <Link  href={`/products`} onClick={()=> setCategory("Bag")} className="cursor-pointer">Bags</Link>
  
{BagOpen && (
     
    <ul 
     className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link  href={`/products`} onClick={()=> setCategory("BagMen")} className="text-black hover:text-[#E2136E] cursor-pointer">Men Bags</Link>
        <Link  href={`/products`} onClick={()=> setCategory("WomenBags")} className="text-black hover:text-[#E2136E] cursor-pointer">Women Bags</Link>
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
   <Link href={`/products`} onClick={()=> setCategory("Footwear")} className="cursor-pointer"> Footwear</Link>
   
{footOpen && (
     <ul 
    className="absolute top-full left-0 min-w-[180px] bg-white shadow-lg rounded-lg flex flex-col items-start gap-2 py-3 pl-3 mt-1 z-50">
        <Link  href={`/products`} onClick={()=> setCategory("FootwearMen")} className="text-black hover:text-[#E2136E] cursor-pointer">Men Footwear</Link>
        <Link  href={`/products`} onClick={()=> setCategory("FootwearWomen")} className="text-black hover:text-[#E2136E] cursor-pointer">Women Footwear</Link>
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

<div className="bg-[#BC105C] text-white flex justify-between w-full items-center">
  <div>
        <button className="cursor-pointer" onClick={()=> setsidebarcl(!sidebarcl)}>
            <FontAwesomeIcon icon={faBars} />
        </button>
    </div>
         
    <Link href={``} className="md:text-[15px] font-black">kคຟŞคrŞh໐p</Link>
    <div>
        <button className="cursor-pointer font-black">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        </button>
    </div>
</div>

<hr className="text-gray-300"/>


<div className="w-full overflow-x-auto scrollbar-hide" style={{userSelect: "text"}}>
    <div className="flex flex-row justify-between p-2 gap-3">
     <Link href={`/`} className="cursor-pointer">Home</Link>
     <Link href={`/products`} onClick={()=> setCategory("Fashion")} className="cursor-pointer">Fashion</Link>
     <Link href={`/products`} onClick={()=> setCategory("Electronics")} className="cursor-pointer">Electronics</Link>
     <Link href={`/products`} onClick={()=> setCategory("Bag")} className="cursor-pointer">Bags</Link>
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

<Link href={``} className="flex  flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faHouse} />
<p>Home</p>
</Link>


<Link href={`/searchpage`} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faMagnifyingGlass} />
<p>Search</p>
</Link>


<Link href={``} className="flex flex-col items-center active:text-red-600">
<button className="cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</button>
<p>Wishlist</p>
</Link>


<Link href={``} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faBagShopping} />
<p>Orders</p>
</Link>


<Link href={`/login`} className="flex flex-col items-center active:text-red-600">
<FontAwesomeIcon icon={faUser} />
<p>Account</p>
</Link>

</ul>
</div>
</div>
{/* responsive menu  */}


</div>
{/* main box  */}


    </div>
)}