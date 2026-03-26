'use client'

import Image from "next/image";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import { useState,useEffect } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Quickview({product, onClose}){
 
const [selectedSize, setSelectedSize] = useState(null);  
useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
}, [product]);

const HeartRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff3d47',
  },
});


if (!product) return null;

return(
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
    

  <button className="cursor-pointer">
<HeartRating
      name="customized-heart"
      defaultValue={1}
      max={1}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
    />
    </button>

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


<div>
  <p className="text-gray-400 font-semibold">Quantity :</p>
  <div>

  </div>
</div>



<div className="justify-between flex items-center gap-4">
<button className="uppercase hover:bg-gray-600 cursor-pointer rounded-md font-black text-[20px] bg-gray-500  h-15 text-white p-1 w-full">Add to cart</button>
<button className="uppercase hover:bg-gray-600 cursor-pointer rounded-md font-black text-[20px] bg-[#E2136E] h-15  text-white p-1 w-full">buy now</button>
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
)

}