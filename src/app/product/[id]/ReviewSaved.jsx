'use client'

import { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';



export default function ReviewSaved(){

return(
    <div className="pt-5 w-full flex flex-col gap-3">

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
<div className='flex gap-1 text-[10px] md:text-[15px]'>
<p>by</p>
<div>user</div>
<p>on March 20, 2026</p>
</div>




{/* review  */}
<div>
    <p>So Beautifully</p>
</div>
{/* review  */}

</div>


</div>    





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
<div className='flex gap-1 text-[10px] md:text-[15px]'>
<p>by</p>
<div>user</div>
<p>on March 20, 2026</p>
</div>




{/* review  */}
<div>
    <p>So Beautifully</p>
</div>
{/* review  */}

</div>


</div>    


    </div>



)
}