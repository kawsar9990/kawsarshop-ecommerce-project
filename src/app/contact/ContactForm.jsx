"use client"

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { sendalert } from '../../lib/sweetAlert/requestAlert';
import { errorAlert } from '../../lib/sweetAlert/errorAlert';

export default function ContactFrom(){

const [from,setfrom] = useState({
 name:'',
 email:'',
 phone:'',
 message:'',
 title: ''
})
    
const handleChange = (e) => {
     setfrom({
          ...from,
          [e.target.name]:e.target.value
     })
}


const handleSubmit = async (e) => {
 e.preventDefault();

 try {
 await emailjs.send(
          "service_dhvkz26",
          "template_lakvp7i",
          from,
          {
               publicKey: "Ir1GMI9nwV_yOLoGG",
          }
     );
     sendalert("Sent")
     setfrom({name:'',email:'', phone:'', message:'',title: ''});
}
catch(err){
errorAlert("Sorry, Try Again!")
}
}

return(  
<div className="p-10">
     <div className='pt-10 flex flex-col gap-7'>
     <p className='font-black uppercase text-2xl'>Say hi, Don’t be shy!</p>
     <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5 items-start'>
         <div className='w-full shadow rounded-lg p-2 bg-white'>
               <input type="text" 
               name='name'
               value={from.name}
               onChange={handleChange}
               spellCheck={false}
               className='w-full border-0 outline-0'
               placeholder='Your Name' required/>
          </div>

          <div className='w-full shadow rounded-lg p-4 bg-white'>
               <input type="email" 
               name="email"
               value={from.email}
               onChange={handleChange}
               spellCheck={false}
               className='w-full border-0 outline-0'
               placeholder='Your Email' required/>
          </div>

          <div className='w-full shadow rounded-lg p-2 bg-white'>
               <input type="text" 
               name="phone"
               value={from.phone}
               onChange={handleChange}
               spellCheck={false}
               className='w-full border-0 p-2 outline-0'
               placeholder='Phone Number' required/>
          </div>

          <div className='w-full shadow rounded-lg p-2 bg-white'>
               <input type="text" 
               name="title"
               value={from.title}
               onChange={handleChange}
               spellCheck={false}
               className='w-full border-0 p-2 outline-0'
               placeholder='Subject' required/>
          </div>

          <div className='w-full shadow rounded-lg p-2 bg-white'>
              <textarea 
              name="message"
              value={from.message}
              onChange={handleChange}
              className='w-full border-0 outline-0'
              placeholder='Message' required/>
          </div>

          <button type='submit' className='flex gap-3 justify-end p-3 cursor-pointer items-end mt-2 bg-[#C83F46]  rounded-xl text-white font-black'>
               Submit
          </button>    
     </form>
</div>
</div>
    )
}