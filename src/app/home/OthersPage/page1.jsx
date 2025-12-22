import CountUp from 'react-countup';

export default function Banner1(){
    return(
        <div className="pt-10 pb-10 bg-white">

<div>

<div className='p-2 flex flex-col md:flex-row md:justify-center justify-between items-center gap-5'>

<div className='flex justify-center text-center gap-5 items-center'>
    <div className='bg-gray-200 h-30 shadow-sm w-45 rounded-sm flex flex-col items-center justify-center p-2'>
<p className='font-bold text-green-600 text-[22px]'><CountUp end={999999999} start={1}/>+</p>
<p className='text-[12px]'> Orders Successfully </p>
</div>

<div className='bg-gray-200 h-30 shadow-sm w-45 rounded-sm p-2 flex flex-col items-center justify-center'>
<p className='font-bold text-green-600 text-[22px]'><CountUp end={100000000} start={1}/>+</p>
<p className='text-[12px]'>Happy Customers</p>
</div>

</div>

<div className='bg-gray-200 w-45 h-30 shadow-sm p-2 rounded-sm flex flex-col items-center justify-center'>
<p className='font-bold text-green-600 text-[22px]'>50/7</p>
<p className='text-[12px]'>Customer Support</p>
</div>



</div>





</div>
 

        </div>
    )
}