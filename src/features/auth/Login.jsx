'use client'

import { useEffect,useState,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faArrowRight, faCircleNotch  } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { useRouter } from "next/navigation";
import notify from "../../utils/toast";

export default function LoginPopup({ open, setOpen }){
 
const API_BASE_URL = "https://kawsarshop-ecommerce-backend.onrender.com";

const router = useRouter();
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("")
const [password, setpasswpord] = useState("")
const [remember, setRemember] = useState(false)
const [show, setShow] = useState(false)
const [loading, setLoading] = useState(false)


const emailRef = useRef(null)
const passwordRef = useRef(null)
const formRef = useRef(null)


const handleSubmit = async (e) => {
    e.preventDefault()


  if (!email) {
        emailRef.current.focus();
        return;
      }
    if (!password) {
      passwordRef.current.focus();
      return;
    }

    setLoading(true);

try{
const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ 
    email: email, 
    password: password 
}),  
})
const result = await response.json();
if (response.ok){
notify.success(result.message || "Login Successful!");
if (remember) {
localStorage.setItem("token", result.token);
localStorage.setItem("user", JSON.stringify(result.user));
}
else{
sessionStorage.setItem("token", result.token);
sessionStorage.setItem("user", JSON.stringify(result.user));   
}
 
setOpen(false);
setLoading(false);
router.push("/");
}
else{
  setLoading(false);
  notify.error(result.message || "User Not Match!");
}
}
catch(err){
setLoading(false);
 notify.warning("Server connection error. Please try again.");
}
}


useEffect(() => {
     if (open) {
       document.body.style.overflow = "hidden";
     }
     else{
        setIsLogin(true)
        setEmail("");
        setpasswpord("");
     }
     return () => {
       document.body.style.overflow = "auto";
     };
 }, [open]);
 if (!open) return null
 
 
return(
    <div className=" p-3 fixed inset-0 bg-black/40 flex items-center justify-center z-[999999] transition-all">
    <div className="bg-white w-[450px] rounded-md p-5 relative transition-all shadow-2xl duration-500">

    <button onClick={() => setOpen(false)}
    className="absolute cursor-pointer hover:text-red-500 right-3 top-2 text-xl font-bold">✕</button>


{isLogin ? (
<div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">

<div className="text-center font-semibold text-[20px] mb-5 mt-5">
   <p>Sign In</p> 
</div>


<div className='w-full'>
<label htmlFor="nam" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Phone or email address *</label>
<div className='w-full'>
          <input 
           value={email}
           ref={emailRef}
           onChange={(e)=> setEmail(e.target.value)}
           onKeyDown={(e)=> {
            if(e.key === "Enter"){
            e.preventDefault(
            passwordRef.current.focus())}}}
           placeholder='Please enter Your Email'
           type="text" id='nam' name='nam' spellCheck={true}
           className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
</div>
</div>


<div className='w-full'>
<label htmlFor="pass" className='text-orange-500 cursor-pointer font-bold'>Password *</label>
<div className='w-full relative'>
          <input 
           value={password}
           ref={passwordRef}
           onChange={(e)=> setpasswpord(e.target.value)}
           placeholder='Please enter Your Password'
           type={show ? "text" : "password"} id='pass' name='pass' 
           className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>

<button
 type="button"
 onClick={() => setShow(!show)}
 className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600"
>
<FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
</button>

</div>
</div>

<div className="flex items-center justify-between w-full">
<div className="flex items-center gap-2">
    <input
      type="checkbox"
      id="remember"
      checked={remember}
      onChange={(e)=> setRemember(e.target.checked)}
    />
<label htmlFor="remember"className="cursor-pointer text-[12px]">
 Remember me
</label>

</div>
<button type="button"
className="text-[12px] cursor-pointer hover:text-red-500 text-purple-600 hover:underline">
Forgot password?
</button>
</div>


<div>
<button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70">
{loading ? (
  <>
      <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
      Logging in...
  </>
) : "Login"}
</button>
</div>


<div className="text-[13px] flex justify-center">
    <div className="flex gap-1">
        <p className="text-gray-500">Don't have an account?</p>
        <button className="text-[12px] font-bold cursor-pointer hover:text-red-500 text-purple-600 hover:underline"
        type="button" onClick={()=> setIsLogin(false)}>Sign Up</button>
    </div>
</div>


<div className="flex justify-center items-center mt-5">
    <div className="flex flex-col justify-center items-center">
        <p className="text-gray-500 mb-3 text-[12px]">Or, login with</p>
        <div className="flex gap-3 text-gray-600 text-[14px]">
           <button className="flex justify-center items-center gap-1 cursor-pointer">
           <div className="w-7">
            <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1773462672/download_e24kie.png" alt="" />
           </div>
            <p>Google</p>
           </button>
           <button className="flex justify-center items-center gap-1 cursor-pointer">
           <div className="w-7">
             <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1773462672/download_1_n7r3ez.png" alt="" />
           </div>
            <p>Facebook</p>
           </button>
        </div>
    </div>
</div>

</form>
</div>
) : (
<div className="text-center py-10 animate-in fade-in slide-in-from-left-4 duration-500">
<div className="flex flex-col items-center gap-4">
<div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mb-2">
<FontAwesomeIcon icon={faArrowRight} className="text-orange-500 text-2xl" />
</div>
<h2 className="text-2xl font-bold text-gray-800">Don’t have an account?</h2>
<p className="text-gray-500 text-[12px]"><i>Sign up today for free account</i></p>
<p className="text-gray-500 text-[15px] max-w-[280px]">
 By creating an account on our website you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.
</p>
              
<Link 
href="/register" 
onClick={() => setOpen(false)}
className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold py-3 rounded-lg shadow-md transition-all mt-4 inline-block"
>
Create Account
</Link>

<div className="flex  items-center gap-1">
<button className="text-[13px] font-semibold text-gray-400 mt-2">Already have an account?</button>
<button 
onClick={() => setIsLogin(true)}
className="text-[13px] font-semibold text-blue-500 cursor-pointer hover:text-orange-500 hover:underline mt-2"
>
    Sign In
</button>
</div>
  </div>
</div>
)}


    </div>
    </div>
    )
}