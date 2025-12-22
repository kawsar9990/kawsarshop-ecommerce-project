'use client'

import Image from 'next/image'
import { useState } from 'react'
import FsLightbox from 'fslightbox-react'

import dynamic from 'next/dynamic'
const Maps = dynamic(()=> import('../../Components/ui/Maps/Maps'),{
     ssr: false,
})


import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLocationDot, faPhone, } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
library.add(faPhone,faWhatsapp, faEnvelope, faLocationDot)

import { motion } from 'framer-motion'



export default function Contact(){
       const [toggler1, setToggler1] = useState(false);
          const lightbox = ["/img/2.jpeg"]

     return(
          <div className='bg-white'>

<div className='pt-20 xl:pt-0'>


<motion.div
initial={{opacity:0, y: -50}}
animate={{opacity:1, y:0}}
transition={{duration: 1}}
className='relative'>

<div className='bg-[#112] w-full h-80'>
 <div className="text-center flex flex-col justify-center">
   <div className='text-center pt-20 w-full items-center flex flex-col justify-center'>
     <Image src="/icon/contact_icon.png" alt="Contact Icon" width={24} height={24} />
          <p className='text-white font-black text-2xl '>Contact us</p>
          <p className='text-white text-3xl uppercase'>Get in touch with us</p>
     </div>
  </div>

</div>
 
     

</motion.div>





<motion.div
initial={{opacity: 0, y:50}}
whileInView={{opacity:1, y:0}}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className='p-10 flex flex-col lg:flex-row gap-20 xl:justify-center'
>

<motion.div
 whileHover={{ scale: 1.02 }}
onClick={()=> setToggler1(!toggler1)}
className='flex justify-center items-center shadow-lg shadow-blue-400 lg:w-150  rounded-lg' >

<img  src="/img/2.jpeg" alt="" className='rounded-lg flex justify-center items-center'/>
</motion.div>
<FsLightbox  toggler={toggler1} sources={lightbox}/> 


<div className="pt-20 flex flex-col gap-10">
{[
     {title: 'Call us', item: [
          {text: '+8801602084187', icon: faWhatsapp, href: 'https://wa.me/8801602084187'},
          {text: '+8801611236444', icon: faPhone, href: 'https://wa.me/8801611236444'},
     ]},
     {title: 'Email us', item: [
          {text: 'kawsar158464@gmail.com', icon: faEnvelope, href: "#" }]},

     {title: 'Find us', item: [
          {text: 'Kawsar Shop, Mirzapur, Tangail, Bangladesh', icon: faLocationDot }
     ]}
].map((section, index) => (
     <motion.div key={index}
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: index * 0.2 }}
viewport={{ once: true }}>

 <p className='font-black uppercase text-2xl'>{section.title}</p>
<div className='pb-5 flex flex-col gap-5'>
     {section.item.map((item, i)=>(
<a key={i} className='text-gray-500 font-bold hover:text-blue-500 flex items-center justify-between cursor-pointer' 
target='_blank' href={item.href || '#'} >
     {item.text} <FontAwesomeIcon icon={item.icon} />
</a>
     ))}
</div>
<hr className='my-5'/>
     </motion.div>
))
}
</div>




</motion.div>

<div className=''>
<div className='pt-20'>


<div className='p-10'>

<div className='pt-10 flex flex-col gap-7'>
     <p className='font-black uppercase text-2xl'>Say hi, Don’t be shy!</p>
     <div className='flex flex-col gap-5 items-start'>
          <div className='w-full shadow rounded-lg p-2'>
               <input type="text" 
               className='w-full border-0 outline-0'
               placeholder='Your Name'/>
          </div>

          <div className='w-full shadow rounded-lg p-4'>
               <input type="email" 
               className='w-full border-0 outline-0'
               placeholder='Your Email'/>
          </div>

          <div className='w-full shadow rounded-lg p-2'>
               <input type="text" 
               className='w-full border-0 p-2 outline-0'
               placeholder='Phone Number'/>
          </div>

          <div className='w-full shadow rounded-lg p-2'>
              <textarea 
              className='w-full border-0 outline-0'
              name="" id="" placeholder='Message'></textarea>
          </div>

          <button className='flex gap-3 justify-end items-end mt-2 bg-[#C83F46]  rounded-xl text-white font-black'>
               <Link href={``} className='flex justify-end p-2 items-end'>
               Submit
               </Link>
          </button>
     </div>
</div>


</div>


<div>
</div>

</div>




</div>





<div className='pt-20 z-0'>
<Maps />
</div>




</div>

          </div>
     )
}