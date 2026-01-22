'use client'

import { useState } from "react"
import Link from "next/link"



export default function Login(){
     const [text, setText] = useState("")
     const [email, setemail] = useState("")
     const [password, setpasswpord] = useState("")
     const [login, setlogin] = useState(false)

     
     const loginclick = () => {

          if(email === ""){
               alert("Pleade Enter The Your Email")
          }

             if(password === ""){
               alert("Pleade Enter The Your Password")
          }



          setText("")
          setemail("")
          setpasswpord("")
     }




   
    return(
<div className="bg-[#F5F0F0]">

<div className="">

<div className=" w-full flex bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 justify-center items-center min-h-screen p-5">
               





<div className="bg-white shadow-lg w-100 rounded-2xl flex flex-col lg:flex-row overflow-hidden ">
<div className='w-full p-5'>
<div className="flex justify-between items-center w-full gap-5">
          <Link href={`/`} className='font-black text-purple-700'>KawsarShop</Link>
        
        <button 
         onClick={()=> setlogin(!login)}
        className='text-purple-600 cursor-pointer hover:text-pink-500 font-bold text-sm md:text-base'>
               {login ? "login" : "Create an account"}
        </button>
        
     
     </div>

     <div>
          <div className='flex flex-col'>
               <a href="#" className='text-center pt-5 font-black text-[20px] text-purple-800'>{login ? "Sign Up" : "login"}</a>          </div>
          
          <div className='pt-7 flex flex-col gap-5'>
              


{
     login && (
<div className='w-full'>
                    <label htmlFor="nam" className='text-purple-700 font-bold'>Username</label>
                    <div className='w-full'>
          <input 
          value={text}
           onChange={(e)=> setText(e.target.value)}
         placeholder='Enter Your Name'
          type="text" id='nam' name='nam' 
          className='w-full p-3 rounded-md border border-purple-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition'/>
                    </div>
               </div>
     )
}

            

               <div className='w-full'>
                    <label htmlFor="em" className='font-bold text-purple-700'>Email</label>
                    <div className='w-full'>
          <input     
          value={email}
          onChange={(e)=> setemail(e.target.value)}
          placeholder='Enter Your email'
          type="email" id='em' name='em' 
         className='w-full p-3 rounded-md border border-purple-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition'/>
                    </div>
               </div>


           <div className='w-full'>
                    <label htmlFor="pass" className='text-purple-700 font-bold'>Password</label>
                    <div className='w-full'>
          <input 
               value={password}
           onChange={(e)=> setpasswpord(e.target.value)}
         placeholder='Enter Your Password'
          type="password" id='pass' name='pass' 
          className='w-full p-3 rounded-md border border-purple-300 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition'/>
                    </div>
               </div>





<div className='text-right hover:text-decoration-underline font-bold hover:text-blue-500'>
     <a href=""className='text-purple-600 font-semibold hover:text-pink-500 hover:underline text-sm'>Forgot Your Password?</a>
</div>

<div className='pb-10'>
     <button
     onClick={loginclick}
     className='w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold hover:shadow-lg cursor-pointer transition-all duration-300'>
         {login ? "Sign Up" : "Login"}
     </button>
</div>

          </div>


     </div>

</div>





</div>






</div>
    
</div>

 

</div>

    )
}