'use client'

import { useEffect,useState,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoader } from "../../context/ItemLoaderContext";
import { signIn } from "next-auth/react";
import notify from "../../utils/toast";
import { loginUser } from "../../../src/api/apiService";


export default function Login(){
 
const router = useRouter();
const { showLoader, hideLoader } = useLoader();
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("")
const [password, setpasswpord] = useState("")
const [remember, setRemember] = useState(false)
const [show, setShow] = useState(false)
const [loading, setLoading] = useState(false)
const [agreed, setAgreed] = useState(false);


const emailRef = useRef(null)
const passwordRef = useRef(null)
const formRef = useRef(null)


useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}, [isLogin]);



const handleSocialLogin = async (platform, skipCheck = false) => {
if (!skipCheck && !agreed) {
notify.error("You should agree to our Terms of Use and Privacy Policy.");
window.scrollTo({ top: 0, behavior: "smooth" });
return;
}
if (platform === 'Google') {
showLoader();
try{
await signIn("google", { callbackUrl: "/?login=success", redirect: true },{prompt: "select_account"}); 
}
catch(err){
hideLoader()
}}}


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
const result = await loginUser(email, password);
notify.success(result.message || "Login Successful!");

const storage = remember ? localStorage : sessionStorage
storage.setItem("token", result.token)
storage.setItem("user", JSON.stringify(result.user))

setLoading(false);
showLoader();
setTimeout(() => {
hideLoader();
    router.push("/");
}, 3000);
}
catch(err){
setLoading(false);
notify.warning(err.message || "Login failed!");
window.scrollTo({ top: 0, behavior: "smooth" });
}}


return(
   <div className="bg-[#FFF2F8]" style={{userSelect: "none"}}>
      <div className="p-5">
   <div className="pt-30 pb-10 md:pt-35 xl:pt-10 flex justify-center items-center">
     <div className="bg-white w-[450px] md:w-[450px] rounded-md p-5 relative transition-all shadow-2xl duration-500">

{isLogin ? (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">

<div className="text-center font-semibold text-[20px] mb-5 mt-5">
   <p>Sign In</p> 
</div>


<div className='w-full'>
<label htmlFor="nam" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Email address *</label>
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
           type="email" id='nam' name='nam' spellCheck={true}
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
<FontAwesomeIcon icon={show ?  faEye : faEyeSlash} />
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
<Link href={`/forgot-password`} className="text-[12px] cursor-pointer hover:text-red-500 text-purple-600 hover:underline">
Forgot password?
</Link>
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


<div className="mt-5">
    <div className="flex flex-col justify-center items-center">
        <p className="text-gray-500 mb-3 text-[12px]">Or, login with</p>
        <button type="button" onClick={() => handleSocialLogin('Google', true)} className="flex gap-3 w-40 justify-center border-gray-300 text-gray-600 text-[14px] border p-2 rounded-full cursor-pointer">
           <div className="flex justify-center items-center gap-1 cursor-pointer">
           <div className="w-7">
            <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1773462672/download_e24kie.png" alt="" />
           </div>
            <p>Sign In</p>
           </div>
        </button>
    </div>
</div>


</form>
</div>
) : (
<div className="text-center py-7 animate-in fade-in slide-in-from-left-4 duration-500">
<div className="flex flex-col items-center gap-4">
<h2 className="text-2xl font-bold text-gray-800">Don’t have an account?</h2>
<p className="text-gray-500 text-[12px]"><i>Sign up today for free account</i></p>
<p className="text-gray-500 text-[12px] w-full">
 By creating an account on our website you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.
</p>



<div className="flex items-center md:items-start gap-2 bg-gray-50 p-3 rounded-md border border-gray-100">
<input 
type="checkbox" 
id="agreed" 
checked={agreed} 
onChange={(e) => setAgreed(e.target.checked)} 
className="mt-1 w-4 h-4 cursor-pointer accent-orange-500"
/>
<label htmlFor="agreed" className="text-[11px] text-gray-500 text-left leading-tight cursor-pointer">
        By creating and/or using your account, you agree to our 
<Link href="/termspage" className="text-orange-500 font-semibold mx-1 hover:underline">Terms of Use</Link> 
and 
<Link href="/privacy-policy" className="text-orange-500 font-semibold ml-1 hover:underline">Privacy Policy.</Link>
</label>
</div>




<Link 
href="/register" 
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

<div className="mt-5">
    <div className="flex flex-col justify-center items-center">
        <p className="text-gray-500 mb-3 text-[12px]">Or, login with</p>
        <button type="button" onClick={() => handleSocialLogin('Google')} className="flex gap-3 border-gray-300 text-gray-600 text-[14px] border p-2 w-40 justify-center rounded-full cursor-pointer">
           <div className="flex justify-center items-center gap-1 cursor-pointer">
           <div className="w-7">
            <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1773462672/download_e24kie.png" alt="" />
           </div>
            <p>Sign Up</p>
           </div>
        </button>
    </div>
</div>


  </div>
</div>
)}
    </div>
   </div>
    </div>
   </div>
    )
}