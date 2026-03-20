'use client'

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faChevronDown, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation";
import { useLoader } from "../../context/ItemLoaderContext";
import notify from "../../utils/toast";


export default function Register(){

const API_BASE_URL = "https://kawsarshop-ecommerce-backend.onrender.com";

const router = useRouter();
const { showLoader, hideLoader } = useLoader();
const [loading, setLoading] = useState(false); 
const [number, setNumber] = useState("")
const [email, setemail] = useState("")
const [password, setpasswpord] = useState("")
const [confirmpassword, setconfirmpasswpord] = useState("")
const [gender, setGender] = useState("")
const [firstname, setFirstName] = useState("")
const [lastname, setLastName] = useState("")
const [newsletter, setNewsletter] = useState(false); 
const [dob, setDob] = useState({ day: "", month: "", year: "" });
const [show, setShow] = useState(false)
const [confrshow, setConfrShow] = useState(false)
const [errortext, setErrorText] = useState({});


const numberRef = useRef(null)
const emailRef = useRef(null)
const passwordRef = useRef(null)
const ConfrpasswordRef = useRef(null)
const firstNameRef = useRef(null)
const LastNameRef = useRef(null)
const genderRef = useRef(null);
const dobRef = useRef(null);

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const years = Array.from({ length: 2026 - 1916 + 1 }, (_,i) => 2026 - i)


useEffect(() => {
window.scrollTo({
    top: 0,
    behavior: "smooth" 
  });
},[]);


const handleSubmit = async (e) => {
    e.preventDefault()
    let newErrors = {};

    if (!number) newErrors.number = "Phone is required";
    if (!email) newErrors.email = "Email is required";
    if (!firstname) newErrors.firstname = "First Name is required";
    if (!lastname) newErrors.lastname = "Last Name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!dob.day || dob.day === "Day" || !dob.month || dob.month === "Month" || !dob.year || dob.year === "Year") {
        newErrors.dob = "Date of Birth is required";
    }
    if (!password) newErrors.password = "Password is required";
    if (confirmpassword !== password) {
        newErrors.confirmpassword = "Passwords do not match";
    } else if (!confirmpassword) {
        newErrors.confirmpassword = "Confirm Password is required";
    }

    setErrorText(newErrors)

if (Object.keys(newErrors).length > 0) {
        if (newErrors.number) numberRef.current.focus();
        else if (newErrors.email) emailRef.current.focus();
        else if (newErrors.gender) {
            genderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (newErrors.firstname) firstNameRef.current.focus();
        else if (newErrors.lastname) LastNameRef.current.focus();
        else if (newErrors.dob) {
            dobRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (newErrors.password) passwordRef.current.focus();
        else if (newErrors.confirmpassword) ConfrpasswordRef.current.focus();
        return;
}

    setLoading(true);

try{
const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
  phone: number,
  email,
  password,
  confirmPassword:confirmpassword,
  firstname,
  lastname,
  gender,
  dob,
  newsletter
}),
});
const result = await response.json();
if(response.ok){
  setLoading(false);
  if (result.token) localStorage.setItem("token", result.token);
  notify.success("Registration Successful! Welcome to KawsarShop.");
  showLoader(); 
  setTimeout(() => {
    hideLoader();
    router.push("/");
  }, 3000);

}else{
  setLoading(false);
  notify.error(result.message || "Registration failed!");
}
}
catch(err){
setLoading(false);
notify.warning("Connection Error. Please try again.");
}
};


 return(
<div className="bg-[#F5F0F0] min-h-screen" style={{userSelect: "none"}}>
<div className="pt-30 pb-10 md:pt-35 xl:pt-10 flex justify-center items-center">
<div className="p-4 md:px-10 lg:px-40 xl:px-70 w-full">

<AnimatePresence mode="wait">
<motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-md p-5 shadow-2xl">

<form onSubmit={handleSubmit} className="flex flex-col gap-3">
<div className="text-center font-semibold text-[20px] md:text-2xl mb-5 mt-5">
   <p>Register</p> 
</div>


<div className='w-full'>
<label htmlFor="num" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Phone*</label>
<div className='w-full'>
<input 
value={number}
ref={numberRef}
onChange={(e)=> setNumber(e.target.value)}
onKeyDown={(e)=> {
 if(e.key === "Enter"){
 e.preventDefault(
 emailRef.current.focus())}}}
placeholder='Please enter Your phone Number'
type="text" id='num' name='num' spellCheck={true}
className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
{errortext.number && <p className="text-red-500 text-[11px] mt-1">{errortext.number}</p>}
</div>
</div>


<div className='w-full'>
<label htmlFor="nam" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Email address (optional)</label>
<div className='w-full'>
<input 
 value={email}
 ref={emailRef}
 onChange={(e)=> setemail(e.target.value)}
 placeholder='Please enter Your Email'
 type="email" id='nam' name='nam' spellCheck={true}
 className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
{errortext.email && <p className="text-red-500 text-[11px] mt-1">{errortext.email}</p>}
</div>
</div>


<div className="w-full" ref={genderRef}>
        <div className='text-orange-500 text-[12px] font-bold'>Gender</div>
    <div className="flex gap-5 mt-1">
            <div className="flex items-center gap-2">
                <input type="radio" name="gender" id="male" onChange={() => setGender("male")} />
            <label htmlFor="male" className="cursor-pointer text-[12px]">Male</label>
        </div>
        <div className="flex items-center gap-2">
                <input type="radio" name="gender" id="female" onChange={() => setGender("female")} />
            <label htmlFor="female" className="cursor-pointer text-[12px]">Female</label>
        </div>
             <div className="flex items-center gap-2">
                <input type="radio" name="gender" id="others" onChange={() => setGender("others")} />
            <label htmlFor="others" className="cursor-pointer text-[12px]">Others</label>
        </div>
    </div>
     {errortext.gender && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.gender}</p>}
</div>



<div className="flex flex-col md:flex-row gap-3">
    <div className='w-full'>
<label htmlFor="firnam" className='text-orange-500 text-[12px] cursor-pointer font-bold'>First Name*</label>
<div className='w-full'>
<input 
value={firstname}
ref={firstNameRef}
onChange={(e)=> setFirstName(e.target.value)}
placeholder='Please enter Your First Name'
type="text" id='firnam' name='firnam' spellCheck={true}
className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
 {errortext.firstname && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.firstname}</p>}
</div>
</div>


<div className='w-full'>
<label htmlFor="lastnam" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Last Name*</label>
<div className='w-full'>
<input 
value={lastname}
ref={LastNameRef}
onChange={(e)=> setLastName(e.target.value)}
placeholder='Please enter Your Last Name'
type="text" id='lastnam' name='lastnam' spellCheck={true}
className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
 {errortext.lastname && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.lastname}</p>}
</div>
</div>

</div>


<div className="w-full" ref={dobRef}>
  <label className='text-orange-500 text-[12px] cursor-pointer font-bold'>Date of birth:</label>
  <div className={`flex border font-semibold text-[13px] rounded-md bg-white ${errortext?.dob ? 'border-red-500' : 'border-gray-200'}`}>
  <div className="relative w-1/3 border-r border-gray-200">
      <select value={dob.day} className="w-full p-3 appearance-none outline-none bg-transparent cursor-pointer text-gray-700 pr-8"
      onChange={(e) => setDob({ ...dob, day: e.target.value })}>
        <option>Day</option>
        {days.map(d => <option key={d}>{d}</option>)}
      </select>
      <FontAwesomeIcon 
        icon={faChevronDown} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] pointer-events-none" 
      />
    </div>
    <div className="relative w-1/3 border-r border-gray-200">
      <select value={dob.month} className="w-full p-3 appearance-none outline-none bg-transparent cursor-pointer text-gray-700 pr-8"
      onChange={(e) => setDob({ ...dob, month: e.target.value })}>
        <option>Month</option>
        {months.map(m => <option key={m}>{m}</option>)}
      </select>
      <FontAwesomeIcon 
        icon={faChevronDown} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] pointer-events-none" 
      />
    </div>
    <div className="relative w-1/3">
      <select value={dob.year} className="w-full p-3 appearance-none outline-none bg-transparent cursor-pointer text-gray-700 pr-8"
      onChange={(e) => setDob({ ...dob, year: e.target.value })}>
        <option>Year</option>
        {years.map(y => <option key={y}>{y}</option>)}
      </select>
      <FontAwesomeIcon 
        icon={faChevronDown} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] pointer-events-none" 
      />
    </div>
  </div>
  {errortext.dob && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.dob}</p>}
</div>



<div className="flex gap-2">
    <input type="checkbox" id="newsl" name="newsl"
    className="w-4"/>
    <label htmlFor="newsl" className="text-[12px] cursor-pointer">Newsletter</label>
</div>


<div className='w-full'>
<label htmlFor="password" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Password *</label>
<div className='w-full relative'>
<input 
value={password}
ref={passwordRef}
onChange={(e)=> setpasswpord(e.target.value)}
placeholder='Please enter Your Password'
autoComplete="new-password"
data-lpignore="false"
type={show ? "text" : "password"} id='password' name='password' 
className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
<button
 type="button"
 onClick={() => setShow(!show)}
 className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600"
>
<FontAwesomeIcon icon={show ?  faEye : faEyeSlash} />
</button>
{errortext.password && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.password}</p>}
</div>
</div>



<div className='w-full'>
<label htmlFor="confram-password" className='text-orange-500 text-[12px] cursor-pointer font-bold'>Confirm password*</label>
<div className='w-full relative'>
<input 
value={confirmpassword}
ref={ConfrpasswordRef}
onChange={(e)=> setconfirmpasswpord(e.target.value)}
placeholder='Please enter Your Confirm Password'
autoComplete="new-password"
data-lpignore="false"
type={confrshow ? "text" : "password"} id='confram-password' name='confram-password' 
className='w-full p-3 rounded-md border border-orange-600 placeholder:text-[13px] placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition'/>
<button
 type="button"
 onClick={() => setConfrShow(!confrshow)}
 className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600"
>
<FontAwesomeIcon icon={confrshow ?  faEye : faEyeSlash} />
</button>
</div>
{errortext.confirmpassword && <p className="text-red-500 text-[11px] mt-1 font-bold">{errortext.confirmpassword}</p>}
</div>

<div className="flex justify-center items-center mt-6">
<button 
    type="submit" 
    disabled={loading}
    className="bg-orange-500 w-full md:w-48 hover:bg-orange-600 text-white cursor-pointer p-3 rounded-md font-bold transition flex items-center justify-center gap-2"
>
{loading ? (
    <>
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
        Register In...
    </>
) : (
  "Register"
 )}
</button>
</div>
</form>
</motion.div>    
</AnimatePresence>
</div>
</div>
</div>
 )    
}

