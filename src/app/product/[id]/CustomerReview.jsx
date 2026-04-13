'use client'


import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Comments from './CommentsBox';

export default function CustomerReview( {product} ){
   
const ratingtowords = [
    {ratestar : 5, label: "Excellent Rating"}, 
    {ratestar : 4, label: "Good Rating"},
    {ratestar : 3, label: "Excellent Rating"},
    {ratestar : 2, label: "Bad Rating"},
    {ratestar : 1, label: "Very Bad Rating"},
]    
    
const ratinglabel = 
    ratingtowords.find(r => r.ratestar === product.ratestar).label

return(
<div className='px-1 flex flex-col'>
 
<div className='flex gap-2 items-center'>
<p className='text-6xl font-black text-[#e1166e]'>{product.ratestar}.0</p>   
<div className='flex flex-col gap-1'>
<p className='text-[12px]'>{ratinglabel}</p>
<div className='flex md:items-center flex-col md:gap-2'>
    <div>
        <Rating
          name="product-rating"
          value={parseFloat(product.ratestar) || 0}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </div>
    <div className='flex text-gray-400 text-[12px]'>
    (
        <p>0 Review &</p>
        <p>0 Ratings</p>
    )
    </div>
</div>
</div>

</div>



<div className='flex gap-2 mt-2 items-center'>
<p className='text-3xl text-blue-700 font-bold'>99.99%</p>
<div className='flex gap-2 text-[12px] md:text-[14px]'>
    <p>Recommended</p>
    <p className='text-gray-400'>(2 of 3)</p>
</div>
</div>




<div className="">
  <div className="flex items-center mt-3">
    <span className="text-[12px] font-medium">
        <Rating
          name="product-rating"
          value={5}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </span>
    <div className="w-1/2 h-2 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#E2136E] rounded-full"
        style={{ width: "80%" }}
      />
    </div>
    <span className="text-sm font-bold">80%</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-[12px] font-medium">
         <Rating
          name="product-rating"
          value={4}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </span>
    <div className="w-1/2 h-2 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" 
      style={{ width: "10%" }} />
    </div>
    <span className="text-sm font-bold">10%</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-sm font-medium">
         <Rating
          name="product-rating"
          value={3}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </span>
    <div className="w-1/2 h-2 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" 
      style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-bold">0%</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-[12px] font-medium">
         <Rating
          name="product-rating"
          value={2}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </span>
    <div className="w-1/2 h-2 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-bold">0%</span>
  </div>

  <div className="flex items-center mt-1">
    <span className="text-[12px] font-medium">
         <Rating
          name="product-rating"
          value={1}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
    </span>
    <div className="w-1/2 h-2 mx-4 bg-[#F9C6DC] rounded-full overflow-hidden">
      <div className="h-full bg-[#E2136E] rounded-full" style={{ width: "0%" }} />
    </div>
    <span className="text-sm font-bold">0%</span>
  </div>
</div>


<div>
    <Comments />
</div>



</div>
)
}