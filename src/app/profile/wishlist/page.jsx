'use client'

import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistAction } from "@/src/redux/slices/wishlistSlice";
import notify from "@/src/utils/toast";
import { useLoader } from "@/src/context/ItemLoaderContext";
import WishListSkeleton from '@/src/Components/ui/Skeletons/WishlistSkeleton';
import { useAuth } from '@/src/context/AuthContext';

export default function page(){
const { user } = useAuth();
const dispatch = useDispatch();
const {showLoader, hideLoader} = useLoader();
const { wishlistItems } = useSelector((state) => state.wishlist);
const [loading, setLoading] = useState(true);


useEffect(()=> {
window.scrollTo(0, 0);
const timer = setTimeout(() => {
setLoading(false);    
}, 1000);
return () => clearTimeout(timer);
},[])


const handleLoading = (id) => {
 showLoader();
 setTimeout(() => {
    hideLoader();
 }, 2000);   
}

const handleRemove = async (product) => {
if (!user) return;
showLoader();
const currentUserId = user.id || user._id;
if(!currentUserId){
  notify.error("User ID missing. Please login again.");
  return;
}
try{
await dispatch(toggleWishlistAction ({
  userId: currentUserId,
  product: product
})).unwrap()
notify.error("Item removed from wishlist!");
}catch(error){
  notify.error("Failed to remove item");
}finally{
  hideLoader();
}
};

return(
<div className="md:pt-2" style={{userSelect: "none"}}>

<div className=''>

<p className="font-bold pt-2 md:pt-7 text-gray-700">My Wishlist</p>


{loading ? (
<div className="mt-5 grid md:grid-cols-3 grid-cols-2 xl:grid-cols-4 gap-4">
    <WishListSkeleton />
</div>
): 
wishlistItems.length > 0 ? (
<div className="mt-5 grid md:grid-cols-3 grid-cols-2 xl:grid-cols-4 gap-3">
{wishlistItems.map((item,index) => (
<div key={`${item._id}-${index}`}
className="group mb-5 rounded-lg bg-white cursor-pointer shadow-lg flex flex-col justify-between">
<div>
<div className="overflow-hidden relative">
<Link href={`/product/${item._id}`}
onClick={()=> {
  handleLoading(item._id)
}}
className="h-full"
>
<img 
    src={item.image} 
    alt={item.name} 
    className="w-full h-[200] object-cover transition-transform duration-500 group-hover:scale-110"
  /> 
</Link>
<div className="absolute text-white top-1 left-1 rounded-lg font-bold p-1 bg-red-600">
     {item.discountPercent}
</div>

<button 
onClick={() => handleRemove(item)}
className="absolute top-2 right-2 cursor-pointer bg-white/90 hover:bg-red-500 hover:text-white text-red-500 w-10 h-10 p-3 text-center flex justify-center items-center rounded-full transition-colors shadow-md z-10">
    <FontAwesomeIcon icon={faTrash} size="sm" />
</button>

</div>

<hr className="text-gray-200"/>

<Link href={`/product/${item._id}`}
  onClick={()=> {
  handleLoading(item._id)
}}
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
  onClick={()=> {
  handleLoading(item._id)
}}
>
  <div className="p-2 mb-2">
    <button className="bg-transparent hover:bg-black hover:text-white hover:outline-0 outline-2 text-center rounded-md text-[#E2136E] cursor-pointer outline-red-600  p-1 w-full">
      <div className="flex flex-row gap-3 text-[10px] md:text-[13px] justify-center">
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
): (
<div className='px-3 py-3'>
<div className="bg-white shadow-md rounded-md px-1 py-2 md:p-6 mt-5 border border-gray-100">
<div  className="p-5">
<p className="text-center text-[10px] md:text-[13px]">You have placed no Wishlist yet.</p>
</div>
</div>
</div>
)}
</div>
</div>
)
}