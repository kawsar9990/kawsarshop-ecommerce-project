'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { createProductReview } from '@/src/services/reviewServics';
import notify from '@/src/utils/toast';


const labels = {
  1: 'Very Bad',
  2: 'Bad',
  3: 'Average',
  4: 'Satisfactory',
  5: 'Very Good',
};

export default function ReviewPage() {
const { id } = useParams();
const router = useRouter();
const [reviewItem, setReviewItem] = useState(null);
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [submitting, setSubmitting] = useState(false);
const [hover, setHover] = React.useState(-1);


useEffect(() => {
    window.scrollTo(0, 0);
    const data = localStorage.getItem('reviewItem');
    if (data) {
        setReviewItem(JSON.parse(data));
    }
}, []);

   
const handleSubmit = async () => {
if (comment.length < 5) return notify.info("Please write a bit more!");

const authData = localStorage.getItem('kawsarshop_auth');
let token = null;
if (authData) {
    token = JSON.parse(authData).token;
}

if (!token) return notify.info("Please login first!");

try {
setSubmitting(true);
    
const reviewData = {
    productId: id,
    orderId: reviewItem?.orderId,
    rating,
    comment
};

const result = await createProductReview(reviewData, token);
if (result.success) {
    notify.success("Review submitted successfully!");
    localStorage.removeItem('reviewItem');
    router.push('/profile/review');
}
} catch (error) {
notify.error("Failed to submit review.");
} finally {
setSubmitting(false);
}
};


if (!reviewItem) {
return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
    </div>
);
}

return (
<div className='md:px-5 md:py-5'>
    <div className="px-5 py-5 shadow-lg rounded-md">
<div className="px-2 py-3">
<h1 className="text-[15px] md:text-2xl font-semibold text-[#111111] mb-6">Create Review</h1>


<div>
<div className="flex gap-4 items-start pb-6 border-b border-gray-200 mb-6">
    <img
        src={reviewItem.image}
        alt={reviewItem.name}
        className="w-16 h-16 object-contain border border-gray-200 rounded-md p-1 bg-white shadow"
    />
  <div className='flex flex-col gap-1'>
      <p className="text-[14px] text-gray-500 font-medium leading-5 line-clamp-1">{reviewItem.name}</p>
    <p className="text-[14px] text-[#111111] font-bold leading-5 line-clamp-1">${reviewItem.price.toFixed(2)}</p>
  </div>
</div>

<div>

</div>

</div>
             



<div>
    <p className="font-bold text-[17px]">Submit Your Review</p>
</div>



<div className='flex flex-col mt-3 gap-2'>
    <p className='text-[15px]'>Your Rating Of This Product :</p>
    <div  className='flex flex-row items-center'>

<div>
<Rating
name="hover-feedback"
value={rating}
precision={1}
onChange={(event, newValue) => setRating(newValue)}
sx={{ fontSize: { xs: "28px", sm: "34px", md: "40px" }, color: "#E2136E" }}
emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
/>
</div>

<div className='text-[10px] md:text-[17px]'>
{rating !== null && (
<Box sx={{ ml: 2, fontWeight: 'bold', color: 'text-gray-500' }}>
    {labels[hover !== -1 ? hover : rating]}
</Box>   
)} 
</div>
</div>



<div>
<textarea 
value={comment}
onChange={(e) => setComment(e.target.value)}
maxLength={500}
rows={5}
name="" id="" placeholder='Write Your Review Here.....'
className='border border-gray-400 rounded-md w-full h-40 p-3 outline-0'></textarea>

<button onClick={handleSubmit}
disabled={comment.length < 5 || submitting}
className='bg-blue-500 mt-3 text-white p-3 rounded-md cursor-pointer hover:bg-orange-500'>
  {submitting ? "SUBMITTING..." : "SUBMIT MY REVIEW"}
</button>

</div>


</div>

            </div>
        </div>
</div>
);
}