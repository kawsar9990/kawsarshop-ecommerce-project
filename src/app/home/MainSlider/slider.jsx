"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from 'react';
import { useLoader } from '../../../context/ItemLoaderContext'


export default function Slider(){
  
   const product = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904332/d3_e7xsgf.png",
      name: "New Trend Men T-Shirt",
      price: 1500,
      bg: "from-purple-700 to-indigo-600"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904352/e5_ohz2ps.png",
      name: "Apple iPhone 16 Pro Max",
      price: 200000,
      bg: "from-orange-500 to-red-600"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904029/pngwing.com_dpaifj.png",
      name: "New Trend Women Router",
      price: 4000,
      bg: "from-pink-500 to-rose-600"
    }
   ]
  



const {showLoader, hideLoader} = useLoader()
 const handleLoading  = (id) => {
     showLoader();
     setTimeout(() => {
        hideLoader()  
        navigate.push(`/home/Blog/${id}`)
     }, 300);
   }




const [currentSlide, setCurrentSlide] = useState(0);
const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { 
      perView: 1
    },

    slideChanged(slider){
      setCurrentSlide(slider.track.details.rel)
    },

    created(sl){
  const interval = setInterval(() => {
      sl.next()
    }, 4000);
    sl.on("destroyed", ()=> {
      clearInterval(interval)
    })
    }
  });

 
  
return(
<div className='overflow-hidden'>


{/* box  */}
<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:items-center  items-start'>

{/* MAIN BOX */}
<div className=''>
<div ref={sliderRef} className='keen-slider'>
{product.map(i => (
  <div key={i.id} className="keen-slider__slide p-5">
  
<div className={`w-full h-[200px] lg:h-[300px] overflow-hidden p-3 md:p-10 flex items-center flex-row justify-between rounded-md shadow-xl bg-gradient-to-r ${i.bg}`}>
  
 <motion.img 
 key={`${i.id}-img-${currentSlide}`}
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
 src={i.image}
 className='object-cover w-30 sm:w-40'
 /> 


<motion.div
key={`${i.id}-text-${currentSlide}`}
className='text-white'
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
>
   <h2 className="font-bold text-black">{i.name}</h2>
 <p className="text-white font-bold pb-5">Price:  ₹{i.price}</p>
<Link href={``} onClick={()=> handleLoading(i.id)} className="bg-white text-black  px-5 py-2 rounded-lg font-bold">
 Buy Now
</Link>
</motion.div>
</div>
  </div>
))}
 </div>
</div>
{/* MAIN BOX */}


{/* second full box */}
<div className='p-3 flex flex-col md:flex-row lg:flex-col justify-between md:gap-3'>
{/* second box */}
<div className='bg-[#CFE9F6] rounded-lg mb-5 md:mb-0'>
<div className='p-3'>
<div className='flex w-full justify-between items-center'>
  <div className='w-1/2'>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904394/Pngtree_black_smartwatch_with_colorful_display_23258636_ldcnsg.png"
     alt="" className='w-30'/>
  </div>
  <div className='w-1/2'>
    <div className='text-black font-semibold'>By The Men Smart England Watch</div>
    <div className='font-bold text-orange-600'>₹5000</div>
    <Link href={``}  onClick={handleLoading}
    className='uppercase font-bold hover:text-orange-600' style={{textDecoration: "underline"}}>Shop now</Link>
  </div>
</div>
</div>
</div>
{/* second box */}



{/* third box */}
<div className='bg-[#DCDDF2] rounded-lg '>
<div className='p-3'>
<div className='flex w-full justify-between items-center'>
  <div className='w-1/2'>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904419/68e67c8e585f9_dftgqk.png"
     alt="" className='w-30'/>
  </div>
  <div className='w-1/2'>
    <div className='text-black font-semibold'>By The Men Smart England Watch</div>
    <div className='font-bold text-orange-600'>₹5000</div>
    <Link href={``}  onClick={handleLoading}
    className='uppercase font-bold hover:text-orange-600' style={{textDecoration: "underline"}}>Shop now</Link>
  </div>
</div>
</div>
</div>
{/* third box */}

</div>
{/* second full box */}




</div>
{/* box  */}


</div>
  )
}