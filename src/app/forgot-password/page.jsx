'use client'
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import notify from '../../utils/toast'
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, RefreshCw, CheckCircle2, ChevronDown } from "lucide-react";
import { getCaptcha, resetPasswordWithDOB } from "../../../src/api/apiService";


export default function ForgotPassword() {
   const [step, setStep] = useState(1);
   const [identifier, setIdentifier] = useState("");
   const [dob, setDob] = useState({ day: "", month: "", year: "" });
   const [captchaInput, setCaptchaInput] = useState("");
   const [captchaSvg, setCaptchaSvg] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [show, setShow] = useState(false)
   const router = useRouter();


    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 2026 - 1916 + 1 }, (_, i) => 2026 - i);

const fetchCaptcha = async () => {
    try{
        const data = await getCaptcha();
        setCaptchaSvg(data);
    }
    catch(err){
        console.error("The Real Error:", err);
      notify.error("Captcha load failed!");  
    }
}


useEffect(() => {
    fetchCaptcha();
}, []);


const handleStepProcess = async (e) => {
e.preventDefault();

if (step === 3 && newPassword !== confirmPassword) {
 return notify.warning("Passwords do not match!");
} 

setLoading(true);
const formattedDob = `${dob.day}-${dob.month}-${dob.year}`;

try{

const payload = { 
    identifier, 
    dob: formattedDob, 
    captchaInput, 
    newPassword, 
    confirmPassword, 
    step 
};
const res = await resetPasswordWithDOB(payload);

if (step === 1) {
    notify.success("User verified! Now select DOB.");
    setStep(2);
    setLoading(false);
} else if (step === 2) {
    notify.success("Identity matched! Set new password.");
    setStep(3);
    setLoading(false);
}else if (step === 3) {
notify.success("Password Updated! Redirecting...");
setTimeout(() => {
  setLoading(false);
   router.push("/"); 
}, 2500);
}

}
catch(err){
setLoading(false);
notify.error(err.message || "Something went wrong!");

if (step === 1){
setCaptchaInput("");
fetchCaptcha();
}
}}


return(
<div className="bg-[#FFF2F8]" style={{userSelect: "none"}}>
 <div className="p-5">
<div className="pt-30 pb-10 md:pt-35 xl:pt-10 flex justify-center items-center">
<div className="bg-white w-[450px] md:w-[450px] rounded-md p-5 relative transition-all shadow-2xl duration-500">
<div className="text-center mb-8">
<h2 className="text-[15px] font-black text-gray-800 uppercase tracking-tight">Forgot Your Password?</h2>
</div>

<form onSubmit={handleStepProcess} className="space-y-5">

{step === 1 && (
<div className="flex flex-col gap-3">

<div>
    <label className="text-[12px] cursor-pointer font-bold text-orange-500 uppercase">Phone or Email*</label>
    <input 
        type="text" 
        className="w-full placeholder:text-[13px] p-3 mt-1 bg-white border border-orange-600 rounded-md outline-none focus:ring-2 focus:ring-orange-500 transition"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Enter Your Email Address / Phone Number"
        required
    />
</div>

<div className="">
    <label className="text-[12px] cursor-pointer font-bold text-orange-500 uppercase">Human Verification*</label>
    <div className="flex flex-col gap-3">
        <div dangerouslySetInnerHTML={{ __html: captchaSvg }} className="bg-white p-2 rounded cursor-pointer hover:opacity-80 transition" onClick={fetchCaptcha} title="Click to refresh" />
        <button type="button" onClick={fetchCaptcha} className="text-[10px] text-orange-500 flex items-center cursor-pointer gap-1 hover:underline"><RefreshCw size={12} /> Refresh Captcha</button>
        <input 
            type="text" 
            placeholder="TYPE CODE"
            className="w-full p-3 text-center text-xl font-bold tracking-[5px] border border-orange-600 rounded-md outline-none uppercase bg-white focus:ring-2 focus:ring-orange-500"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
        />
    </div>
</div>
</div>
)}

{step === 2 && (
 <div className="space-y-4">
    <div className="bg-green-50 text-green-700 p-3 rounded-md text-[11px] font-bold flex items-center gap-2 border border-green-100">
        <CheckCircle2 size={16} /> User found! Please verify with your Date of Birth.
    </div>
    
    <label className="text-[12px] font-bold text-orange-500 uppercase">Date of Birth*</label>
    <div className="flex gap-2">
        <div className="relative w-1/3">
            <select className="w-full p-3 appearance-none border border-orange-600 rounded-md bg-white text-[13px] outline-none cursor-pointer focus:ring-2 focus:ring-orange-500" value={dob.day} onChange={(e) => setDob({ ...dob, day: e.target.value })} required>
                <option value="">Day</option>
                {days.map(d => <option className="" key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative w-1/3">
            <select className="w-full p-3 appearance-none border border-orange-600 rounded-md bg-white text-[13px] outline-none cursor-pointer focus:ring-2 focus:ring-orange-500" value={dob.month} onChange={(e) => setDob({ ...dob, month: e.target.value })} required>
                <option value="">Month</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative w-1/3">
            <select className="w-full p-3 appearance-none border border-orange-600 rounded-md bg-white text-[13px] outline-none cursor-pointer focus:ring-2 focus:ring-orange-500" value={dob.year} onChange={(e) => setDob({ ...dob, year: e.target.value })} required>
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
    </div>
</div>
)}

{step === 3 && (
 <div className="space-y-4">
    <div className="bg-orange-50 text-orange-700 p-3 rounded-md text-[11px] font-bold flex items-center gap-2 border border-orange-100">
        <CheckCircle2 size={16} />Identity Confirmed. Choose a new password.
    </div>

  <div>
      <label className="text-[12px] font-bold text-orange-500 uppercase">New Password*</label>
      <div className="relative mt-1">
        <input
          type={show ? "text" : "password"}
          className="w-full placeholder:text-[13px] p-3 border border-orange-600 rounded-md outline-none focus:ring-2 focus:ring-orange-500 transition pr-10"
          value={newPassword}
          placeholder="Min. 6 characters"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
        >
          <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
        </button>
      </div>
    </div>

<div>
      <label className="text-[12px] font-bold text-orange-500 uppercase">Confirm Password*</label>
      <div className="relative mt-1">
        <input
          type={show ? "text" : "password"}
          className="w-full placeholder:text-[13px] p-3 border border-orange-600 rounded-md outline-none focus:ring-2 focus:ring-orange-500 transition pr-10"
          value={confirmPassword}
          placeholder="Retype password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition"
        >
          <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
        </button>
      </div>
    </div>
</div>
)}


<div className="flex flex-col gap-3 pt-4">
<button type="submit" 
disabled={loading}  
className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold p-3 rounded-md transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-orange-300 disabled:cursor-not-allowed active:scale-95">
    {loading ? (
        <>
        <Loader2 className="animate-spin" size={20} />
        {step === 3 ? "Updating..." : "Processing..."}
        </>
    ): (
    <>
    {step === 3 ? "Reset Password" : "Continue"} 
    </>
    )}
</button>

{step > 1 && !loading && (
<button type="button" onClick={() => setStep(step - 1)} className="text-gray-400 text-xs cursor-pointer font-bold hover:text-orange-500 flex items-center justify-center gap-1 py-1 transition">
    <ArrowLeft size={14} /> Back to Previous Step
</button>
)}
<button 
    type="button" 
    onClick={() => router.push("/login")} 
    className="text-[10px] cursor-pointer text-gray-400 uppercase font-black text-center mt-2 hover:text-orange-500 transition tracking-widest">
    Back to Login
</button>

</div>

</form>

</div>
</div>
 </div>
 </div>
)
}