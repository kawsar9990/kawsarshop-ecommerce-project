'use client'

import { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function ReviewSaved(){

const [likes, setLikes] = useState(0);
const [dislikes, setDislikes] = useState(0);

return(
    <div className="pt-5">

<div className='flex flex-row gap-2'>

<div>
<img 
src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg" alt="" 
className="rounded-full w-15 object-cover"/>   
</div>


<div className='flex flex-col gap-1'>
<div className='flex'>
        <Rating
          name="product-rating"
          value={5}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 3.55 }} fontSize="inherit" />}
          sx={{fontSize: "16px"}}
        />
</div>
<div className='flex gap-5 text-gray-500 text-sm'>
<div className='flex gap-1'>
    <p>by</p>
   <div>user</div>
   <p>on March 20, 2026</p>
</div>
<div className='flex'>
    <p>✅ Verified Purchase</p>
</div>

</div>


{/* review  */}
<div>
    <p>So Beautifully</p>
</div>
{/* review  */}



<div>
    <p className='text-[12px]'>Was this review helpful?</p>
</div>


<div className='flex gap-5'>

<Box sx={{ display: 'flex', gap: 2 }}>
      <Box 
        onClick={() => setLikes(likes + 1)}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          cursor: 'pointer', 
          color: likes > 0 ? 'primary.main' : 'gray',
          '&:hover': { opacity: 0.7 } 
        }}
      >
        <ThumbUpIcon sx={{ fontSize: 24 }} />
        <Typography variant="body1">{likes}</Typography>
      </Box>

      <Box 
        onClick={() => setDislikes(dislikes + 1)} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          cursor: 'pointer', 
          color: dislikes > 0 ? 'error.main' : 'gray',
          '&:hover': { opacity: 0.7 }
        }}
      >
        <ThumbDownIcon sx={{ fontSize: 24 }} />
        <Typography variant="body1">{dislikes}</Typography>
      </Box>

    </Box>

</div>
</div>


</div>    


    </div>
)
}