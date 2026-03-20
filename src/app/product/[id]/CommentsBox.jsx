'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import ReviewSaved from './ReviewSaved';



const labels = {
  1: 'Very Bad',
  2: 'Bad',
  3: 'Average',
  4: 'Satisfactory',
  5: 'Very Good',
};

export default function Comments(){

const [value, setValue] = React.useState(5);
const [hover, setHover] = React.useState(-1);

return(
<div className="pt-5">

<div>
    <p className="font-bold text-[17px]">Submit Your Review</p>
</div>



<div className='flex flex-col mt-3 gap-2'>
    <p className='text-[15px]'>Your Rating Of This Product :</p>
    <div  className='flex flex-row items-center'>

<div className=''>
<Rating
          name="hover-feedback"
          value={value}
          precision={1}
          sx={{ fontSize: "3rem" }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
</div>

<div className='text-[17px]'>
{value !== null && (
<Box sx={{ ml: 2, fontWeight: 'bold', color: 'text-gray-500' }}>
    {labels[hover !== -1 ? hover : value]}
</Box>   
)} 
</div>

    </div>



<div>
<textarea name="" id="" placeholder='Write Your Review Here.....'
className='border border-gray-400 rounded-md w-full h-40 p-3 outline-0'></textarea>

<button
className='bg-blue-500 mt-3 text-white p-3 rounded-md cursor-pointer hover:bg-orange-500'>
    SUBMIT REVIEW
</button>

</div>


</div>



<div className='mt-10'>
<p className='text-2xl'>Review :</p>

<div>
<ReviewSaved />
</div>

</div>




</div>
    )
}