'use client'

import { useState } from "react";
import { Box, Slider } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";


export default function FillterProduct({
  setPrice,price,categoryFilter,
  setCategoryFilter,rating,setRating
}){

const [categoopen, setcategoropen] = useState(false);

const catetitleckbox = [
    "Fashion","Electronics","Bag","Footwear","Groceries",
    "Beauty","Wellness","Jewellery"
];

const handleCategoryFilter = (cat) => {
setCategoryFilter((prev) => 
prev.includes(cat)
? prev.filter((r) => r !== cat)
: [...prev, cat]
)}



const RatingStar = [
  "⭐⭐⭐⭐⭐",
  "⭐⭐⭐⭐✰",
  "⭐⭐⭐✰✰",
  "⭐⭐✰✰✰",
  "⭐✰✰✰✰",
];

const handleratingfillter = (rat) => {
setRating((prev) => 
prev.includes(rat)
?prev.filter((r) => r !== rat)
:[...prev, rat]
);}


const handlePrice = (e, newValue) => {
  setPrice(newValue)
};

 
return(
<div className="hidden lg:block w-1/4 h-screen sticky top-42 p-5  border-r">
<div className="flex flex-col gap-5">

{/* Category Filter */} 
<div>
<div className="flex pb-5 items-center cursor-pointer justify-between"
 onClick={() => setcategoropen(!categoopen)}>
<div className="font-semibold">Shop By Category</div>
<div>{categoopen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</div>
</div> 
<div className={`overflow-scroll h-40 transition-all duration-1000 ease-in-out
                  ${categoopen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
  <div className="flex flex-col gap-1 text-gray-500 text-[15px] p-1">
    {catetitleckbox.map((item, index) => (
      <label key={index} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={categoryFilter.includes(item)}
          onChange={()=> handleCategoryFilter(item)}
          className="w-4 h-4 accent-orange-500"
        />
        <span>{item}</span>
      </label>
    ))}
  </div>
</div>
</div>
{/* Category Filter */}

{/* Price Filter */}
<div>
 <p className="font-semibold">Filter By Price</p>
<Box sx={{ color: "red" }}>
<Slider
    value={price}
    onChange={handlePrice}
    valueLabelDisplay="auto"
    min={2}
    max={5000}
    className="text-[#E2136E]"
  />
</Box> 
<div className="flex justify-between text-[10px]">
  <p>From: <b>Rs: {price[0]}</b></p>
  <p>To: <b>Rs: {price[1]}</b></p>
</div>
</div>
{/* Price Filter */}


{/* Rating Filter */}
 <div className="pt-3">
  <p className="font-semibold">Filter By Rating</p>
  <div className="flex flex-col gap-3 pt-3 text-gray-500 text-[15px] p-1">
    {RatingStar.map((item, index) => (
    <label key={index} className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox"
      className="w-4 h-4 accent-orange-500" 
      onChange={()=> handleratingfillter(item)}/>
      <span>{item}</span>
    </label>
    ))}
  </div>
</div>
{/* Rating Filter */}


</div> 
</div>
  )
}