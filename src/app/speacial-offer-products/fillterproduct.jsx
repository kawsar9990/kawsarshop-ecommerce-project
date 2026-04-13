'use client'

import { useState } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import ProductQuickView from "../../Components/Product/ProductQuickView";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistAction } from "@/src/redux/slices/wishlistSlice";
import notify from "@/src/utils/toast";
import { useAuth } from "@/src/context/AuthContext";
import { useLoader } from "@/src/context/ItemLoaderContext";
import LoginPopup from "@/src/features/auth/Login";

export default function FillterProduct({handleLoading,filterData,titlestyle}){
const dispatch = useDispatch();
const { user } = useAuth();
const { wishlistItems } = useSelector((state) => state.wishlist);
const [openLogin, setOpenLogin] = useState(false);
const [quickProduct, setQuickProduct] = useState(null); 
const products = filterData; 
const {showLoader, hideLoader} = useLoader()
if(!products) return <p>No Products Found</p>;



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


return(
<div>

<LoginPopup open={openLogin} setOpen={setOpenLogin} />

{quickProduct && (
  <ProductQuickView 
product={quickProduct}
onClose={()=> setQuickProduct(null)}

/>
)}


{
  titlestyle ? (   
<div className="grid md:grid-cols-4 grid-cols-2 xl:grid-cols-4 gap-3">
{products.map((item,index) => (
 <div
   key={`${item.id}-${index}`}
   className="group mb-5 bg-white rounded-lg cursor-pointer shadow-lg flex flex-col justify-between">
  <div>
    <div className="overflow-hidden relative">
   
<Link href={`/product/${item._id}`}
scroll={false}
onClick={()=> handleLoading(item.id)}
className="h-full"
>
<img 
    src={item.image} 
    alt={item.name} 
    className="w-full h-[220] object-cover transition-transform duration-500 group-hover:scale-110"
  /> 
</Link>
 
   <div className="absolute text-white top-1 left-1 rounded-lg font-bold p-1 bg-red-600">
     {item.discountPercent}
   </div>


<div className={`absolute top-2 right-3 transition-all duration-500 opacity-0 group-hover:opacity-100`}>
<div className="hidden xl:flex flex-col gap-1">

  <div className="bg-white rounded-full hover:text-white hover:bg-red-600 font-black p-1 flex justify-center items-center">
    <button className="cursor-pointer"
       onClick={()=>{
       handleLoading(item, () =>   
       setQuickProduct(item))   
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
    </button>
  </div>


<div className="bg-white hover:text-white hover:bg-red-600 rounded-full font-black p-1 flex justify-center items-center">
<button 
  className="cursor-pointer"
  onClick={() => handleWishlistToggle(item)}
>
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill={wishlistItems.some((w) => w._id === item._id) ? "#ef4444" : "none"}
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke={wishlistItems.some((w) => w._id === item._id) ? "#ef4444" : "currentColor"} 
  className="size-4"
>
<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</button>
</div>

</div>
</div>

  </div>

<hr className="text-gray-200"/> 

<Link href={`/product/${item._id}`}
scroll={false}
onClick={()=> handleLoading(item._id)}
>
    <div className="p-2 flex flex-col gap-1 flex-grow">
      <div className="text-gray-400 text-[10px]">{item.catetitle}</div>
      <div className="text-gray-900 font-semibold md:text-base line-clamp-2 h-[32px] truncate">
        {item.name}
      </div>

        <div className="flex flex-row gap-3">
       <Rating
          name="product-rating"
          value={parseFloat(item.ratestar) || 0}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
        <p className="text-[13px] text-gray-500">({item.ratestar}.0)</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="line-through text-gray-400">${item.oldprice}</p>
        <p className="text-[#E2136E] font-semibold">${item.price}</p>
      </div>
    </div>
</Link>

  </div>



<Link href={`/product/${item._id}`}
scroll={false}
onClick={()=> handleLoading(item._id)}
>
  <div className="p-2 mb-2">
    <button className="bg-transparent hover:bg-black hover:text-white hover:outline-0 outline-2 text-center rounded-md text-[#E2136E] cursor-pointer outline-red-600  p-1 w-full">
      <div className="flex flex-row gap-3 justify-center">
        <p>
          <FontAwesomeIcon icon={faCartShopping} />
        </p>
        <p>Add To Cart</p>
      </div>
    </button>
  </div>
</Link>
</div>
))}
</div>
  )
   :
  (
<div className="grid grid-cols-1 w-full gap-3 lg:gap-5">
{products.map((item, index) => (
 <div
      key={`${item.id}-${index}`}
      className="bg-white w-full p-3 flex-col lg:gap-10 lg:p-5 flex lg:flex-row items-center h-full group rounded-lg cursor-pointer shadow-lg overflow-hidden">


<div className="relative w-full lg:w-[250px] shrink-0 overflow-hidden bg-gray-100 rounded">
<div className="relative aspect-square w-full h-[200px] lg:h-[250px]">
<Link 
  href={`/product/${item._id}`} 
  scroll={false} 
  onClick={() => handleLoading(item._id)}
>
  <img 
    src={item.image} 
    alt={item.name} 
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  /> 
</Link>
</div>
 <div className="absolute text-white top-1 left-1 rounded-lg font-bold p-1 bg-red-600">
     {item.discountPercent}
  </div>

  <div className="absolute top-2 right-3 transition-all duration-500 opacity-0 group-hover:opacity-100">
<div className="hidden xl:flex flex-col gap-1">

  <div className="bg-white rounded-full hover:text-white hover:bg-red-600 font-black p-1 flex justify-center items-center">
    <button className="cursor-pointer"
       onClick={()=>{
       handleLoading(item, () =>   
       setQuickProduct(item))   
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>
    </button>
  </div>



  

<div className="bg-white hover:text-white hover:bg-red-600 rounded-full font-black p-1 flex justify-center items-center">
<button 
  className="cursor-pointer"
  onClick={() => handleWishlistToggle(item)}
>
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill={wishlistItems.some((w) => w._id === item._id) ? "#ef4444" : "none"}
  viewBox="0 0 24 24" 
  strokeWidth={1.5} 
  stroke={wishlistItems.some((w) => w._id === item._id) ? "#ef4444" : "currentColor"} 
  className="size-4"
>
<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</button>
</div>


</div>
</div>
</div>


<Link href={`/product/${item._id}`}
scroll={false}
onClick={()=> handleLoading(item._id)}
className="w-full"
>
 <div className="flex flex-col items-start justify-between lg:justify-center p-3 w-full">
      <div className="flex flex-col gap-5">
        <div className="text-gray-400 text-[15px]">{item.catetitle}</div>
        <div className="text-black text-[17px] line-clamp-2 font-semibold">{item.name}</div>
         <div className="text-gray-500 line-clamp-2 leading-tight text-[15px] ">{item.title}</div>
         
        <div className="flex flex-row gap-3">
       <Rating
          name="product-rating"
          value={parseFloat(item.ratestar) || 0}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
        <p className="text-[13px] text-gray-500">({item.ratestar}.0)</p>
      </div>

        <div className="flex items-center gap-5 font-bold">
          <p className="line-through text-gray-400">${item.oldprice}</p>
          <p className="text-[#E2136E] font-bold">${item.price}</p>
        </div>
      <button className="bg-transparent  outline-2 text-center rounded-md hover:bg-black hover:text-white hover:outline-0 text-[#E2136E] cursor-pointer outline-red-600 p-1 w-50">
    <div className="flex flex-row gap-3 justify-center">
            <p>
              <FontAwesomeIcon icon={faCartShopping} />
            </p>
            <p>Add To Cart</p>
          </div>
        </button>
      </div>   
    </div>  
  </Link>

</div>
))}
</div>
  )
}

    </div>
  )
}