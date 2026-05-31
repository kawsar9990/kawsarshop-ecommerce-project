'use client'


import { useState, useEffect, useRef } from 'react';
import { CreditCard } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import notify from '@/src/utils/toast';
import { activateMembershipAPI } from '@/src/services/api';

export default function BuyMembershipPage(){
const router = useRouter();
const { user, updateUser } = useAuth(); 
const params = useParams();
const encodedData = params?.encodedData;
const [isPageLoading, setIsPageLoading] = useState(false);
const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

const [userData, setUserData] = useState({ customer_id: '', plan: 'one-year' });
const [cardModalOpen, setCardModalOpen] = useState(false);
const [cardNumber, setCardNumber] = useState('');
const [expiryDate, setExpiryDate] = useState('');
const [activeField, setActiveField] = useState('');
const [cvc, setCvc] = useState('');

const cardInputRef = useRef(null);
const expiryInputRef = useRef(null);
const cvcInputRef = useRef(null);



const VALID_TEST_CARDS = {
  "7878787878787878": { status: "success", message: "Success" },
  "4242424242424242": { status: "success", message: "Success" },
  "9898989898989898": { status: "success", message: "Success" },
  "1111222233334444": { status: "success", message: "Success" },
  "7575757575757575": { status: "success", message: "Success" },
  "1111222233334444": { status: "failed", message: "Insufficient funds in your card!" },
  "5555666677778888": { status: "failed", message: "Your card has expired!" },
  "9999888877776666": { status: "failed", message: "Stolen card! Transaction blocked." },
  "1234567812345678": { status: "success", message: "Success" },
  "1111111111111111": { status: "success", message: "Success" },
  "9999999999999999": { status: "success", message: "Success" },
  "2222222222222222": { status: "failed", message: "Card restricted for international purchases." },
  "1020304050607080": { status: "success", message: "Success" },
  "3333333333333333": { status: "failed", message: "Transaction declined due to suspected fraud." },
  "4444444444444444": { status: "success", message: "Success" },
  "8787878787878787": { status: "success", message: "Success" },
};


const handleProceedToPay = () =>{
 setIsPageLoading(true);
 
 setTimeout(() => {
    setIsPageLoading(false);
    setCardModalOpen(true);
 }, 2000);
}


useEffect(() => {
if(cardModalOpen){
setTimeout(() => {
  cardInputRef.current?.focus();  
}, 50);
}
}, [cardModalOpen])



const handleCloseModal = () => {
  setCardModalOpen(false);
  setCardNumber('');
  setExpiryDate('');
  setCvc('');
  setActiveField('');
};



const handleCardNumberChange = (e) =>{

const inputVal = e.target.value.replace(/\D/g, '');
const limitedVal = inputVal.substring(0, 16);

const formattedVal = limitedVal.match(/.{1,4}/g)?.join(' ') || '';
setCardNumber(formattedVal);
};


const handleExpiryChange = (e) =>{
const inputVal = e.target.value.replace(/\D/g, '');
const limitedVal = inputVal.substring(0, 4);

if(limitedVal.length > 2){
  setExpiryDate(`${limitedVal.substring(0, 2)} / ${limitedVal.substring(2)}`);  
} else{
    setExpiryDate(limitedVal);
}
};


const handleCvcChange = (e) =>{
const inputVal = e.target.value.replace(/\D/g, '');
const limitedVal = inputVal.substring(0, 4);
setCvc(limitedVal);
};


const handleKeyDown = (e, nextRef) =>{
if(e.key === 'Enter'){
e.preventDefault();

if(nextRef && nextRef.current){
nextRef.current.focus();
} else{
    handleSubmit(e)
}
}
};


useEffect(() => {
  if (cardModalOpen || isPageLoading || isPaymentProcessing) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [cardModalOpen, isPageLoading, isPaymentProcessing]);


useEffect(()=> {
let currentEncodedData = encodedData;

if(!currentEncodedData && typeof window !== "undefined"){
const pathParts = window.location.pathname.split('/');
currentEncodedData = pathParts[pathParts.length - 1];
}

if(currentEncodedData){
try{
let safeEncodedData = currentEncodedData.replace(/-/g, '+').replace(/_/g, '/');
while(safeEncodedData.length % 4){
safeEncodedData += '=';
}
const decoded = JSON.parse(atob(safeEncodedData));
setUserData(decoded);
}catch(error){
console.error("Failed to decode URL string data:", error);  
}
}
}, [encodedData])


const handleSubmit = (e) =>{
if (e) e.preventDefault();

if (!cardNumber.trim()) {
  notify.error("Please enter your card number.");
  cardInputRef.current?.focus();
  return;
}
if (!expiryDate.trim()) {
  notify.error("Please enter expiry date.");
  expiryInputRef.current?.focus();
  return;
}
if (!cvc.trim()) {
  notify.error("Please enter CVC number.");
  cvcInputRef.current?.focus();
  return;
}

if (cardNumber.length < 19) {
  notify.error("Your card number is invalid.");
  cardInputRef.current?.focus();
  return;
}
if (expiryDate.length < 7) {
  notify.error("Your card’s expiry year is invalid.");
  expiryInputRef.current?.focus();
  return;
};

if (cvc.length < 3) {
  notify.error("Your CVC number is invalid.");
  cvcInputRef.current?.focus();
  return;
}


setIsPaymentProcessing(true);

setTimeout(async () => {

const cleanCardNumber = cardNumber.replace(/\s/g, '');
const matchedCard = VALID_TEST_CARDS[cleanCardNumber];
if(!matchedCard){
notify.error("Invalid card identifier or insufficient funds!");
cardInputRef.current?.focus();
setIsPaymentProcessing(false);
return;
};

if (matchedCard.status !== "success") {
 notify.error(matchedCard.message);
 setIsPaymentProcessing(false);
 return;
}

try{
const data = await activateMembershipAPI(userData.customer_id, userData.plan);

if(data.success){
updateUser(data.user, data.token)
  notify.success(`Membership activated!`);
  notify.success(`Welcome to KawsarShop+`)
  setCardModalOpen(false);
  setCardNumber('');
  setExpiryDate('');
  setCvc('');
  router.push('/profile/account');
}else {
notify.error(data.message || "Activation failed!");
}
}
catch(error){
notify.error(error.message || "Server error! Please try again.");
}
finally{
setIsPaymentProcessing(false);    
}
}, 2000);
}


const isTrial = userData.plan === 'trial';
const priceDisplay = isTrial ? "$5" : "$11000";
const planName = isTrial ? "Trial" : "Standard";

return(
<div className='pt-30 md:pt-30 xl:pt-0' style={{userSelect: "none"}}>
<div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center py-10 px-4 sm:px-6">

<div className="mb-6">
  <h1 className="text-2xl font-black tracking-wider text-gray-800 uppercase">
    KAWSARSHOP<span className="text-amber-500">+</span>
  </h1>
</div>

<div className="w-full max-w-[500px] space-y-4">
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div>
  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{priceDisplay}</h2>
  <span className="inline-block mt-1.5 bg-[#FFC107] text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
    Awaiting payment confirmation
  </span>
</div>

<div className="relative cursor-pointer">
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1780140567/invoice-icon_fp5w3v.png" 
alt="ks" 
className='w-20 md:w-30'/>
</div>
</div>

<div className="space-y-3 text-xs md:text-sm border-t border-gray-50 pt-4 font-medium">
<div className="flex flex-col md:flex-row gap-2 md:gap-0">
<span className="w-16 text-gray-400 text-[10px] md:text-[12px]">To</span>

<span className="text-gray-700 text-[10px] md:text-[12px]">
  {user ? `${user.username || user.name} (${user.email})` : "Loading User..."}
</span>
</div> 
<div className="flex flex-col md:flex-row gap-2 md:gap-0">
  <span className="w-16 text-gray-400 text-[10px] md:text-[12px]">From</span>
  <span className="text-gray-700 text-[10px] md:text-[12px]">KawsarShop</span>
</div> 
<div className="flex flex-col md:flex-row gap-2 md:gap-0">
  <span className="w-16 text-gray-400 text-[10px] md:text-[12px]">Plan</span>
  <span className="text-gray-700 font-bold text-[10px] md:text-[12px]">{planName}</span>
</div>
{userData.customer_id && (
  <div className="flex flex-col md:flex-row gap-2 md:gap-0">
    <span className="w-16 text-gray-400 text-[10px] md:text-[12px]">User ID</span>
    <span className="text-gray-500 font-mono text-[10px] md:text-[12px]">{userData.customer_id}</span>
  </div>
)}
</div>
</div>

<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
<h3 className="text-gray-800 font-bold text-base tracking-tight">Payment Options</h3>

<label className="flex items-center gap-3 p-3 border border-amber-200 rounded-lg bg-amber-50/30 cursor-pointer select-none">
<input 
  type="radio" 
  name="payment-method"
  defaultChecked
  className="sr-only"
/>
<div className="border-2 p-1 border-gray-100 flex items-center justify-center w-2.5 h-2.5 rounded-full bg-amber-500 transition-all">
</div>
  <div className="flex items-center gap-2">
   <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1780140569/icon-169624838146_bvjrkk.gif" 
   alt="kawsar" 
   className='w-5 md:w-10'/>
    <span className="text-xs md:text-sm font-semibold text-gray-700">Visa/Mastercard/Amex</span>
  </div>
</label>
<div className="bg-gray-50 rounded-lg p-4 space-y-2.5 border border-gray-100">
  <h4 className="text-red-600 font-extrabold text-xs tracking-wide">*Important Note:-</h4>
  <ol className="list-decimal pl-4 text-[10px] md:text-[11px] text-gray-600 space-y-2 leading-relaxed">
    <li>As your amount will get deduct in USD so International transaction service should be active on your Card.</li>
    <li>Due to international currency conversion/transaction or bank fees , you may got charged for additional amount apart from your order amount. That amount would be taken by your bank as we did not reserve that amount from our side.</li>
  </ol>
</div>
<button 
  onClick={handleProceedToPay}
  disabled={isPageLoading}
  className={`w-full bg-[#FFAA00] hover:bg-[#e69900] text-white font-black text-xs md:text-sm py-3.5 rounded-lg shadow-md shadow-orange-200/60 transition-all active:scale-[0.98] text-center capitalize tracking-wider ${
    isPageLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
  }`}
>
  {isPageLoading ? 'Processing...' : 'Proceed to Pay'}
</button>
</div>

<div className="text-center pt-4 space-y-2">
  <p className="text-[11px] text-gray-400">© 2026 KawsarShop</p>
  <div className="flex justify-center gap-3 text-[10px] font-bold text-gray-500">
    <Link href="/contact" className="hover:underline">Contact Us</Link>
    <span>|</span>
    <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
    <span>|</span>
    <Link href="/termspage" className="hover:underline">Terms & Conditions</Link>
  </div>
</div>
</div>





{cardModalOpen && (
<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4" style={{zIndex: "999999"}}>
<div className="bg-white w-full max-w-[420px] rounded-xl shadow-2xl overflow-hidden border border-gray-100">
<div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
<h3 className="font-bold text-gray-800 text-sm md:text-base">Payment Form</h3>
<button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer">✕</button>
</div>
            
<div className="p-5 space-y-4">
<label className="block space-y-1.5">
  <span className="text-xs font-bold text-gray-600 block">Enter your card details:</span>
  <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white focus-within:border-amber-500 transition-colors">
    <input 
      type="text" 
      inputMode="numeric"
      ref={cardInputRef}
      value={cardNumber}
      onChange={handleCardNumberChange}
      onFocus={() => setActiveField('card')}
      onKeyDown={(e) => handleKeyDown(e, expiryInputRef)}
      placeholder="1234 1234 1234 1234" 
      className={`w-full py-2.5 text-sm outline-none transition-colors ${
      cardNumber.length === 19 ? 'text-red-500 font-medium' : 'text-gray-800'
        }`}
    />
    <CreditCard className="w-5 h-5 text-gray-400 shrink-0" />
  </div>
</label>

<div className="grid grid-cols-2 gap-4">
  <label className="block space-y-1.5">
  <div className={`border rounded-lg px-3 bg-white transition-colors ${
    expiryDate.length === 7 && activeField === 'expiry' ? 'border-red-500' : 'border-gray-300 focus-within:border-amber-500'
  }`}>
    <input 
      type="text" 
      inputMode="numeric"
      ref={expiryInputRef}
      placeholder="MM / YY" 
      value={expiryDate}
      onChange={handleExpiryChange}
      onKeyDown={(e) => handleKeyDown(e, cvcInputRef)}
      onFocus={() => setActiveField('expiry')}
      className={`w-full py-2.5 text-sm outline-none text-center transition-colors ${
        expiryDate.length === 7 && activeField === 'expiry' ? 'text-red-500 font-medium' : 'text-gray-800'
      }`}
    />
  </div>
</label>
 <label className="block space-y-1.5">
  <div className="border border-gray-300 rounded-lg px-3 bg-white focus-within:border-amber-500">
    <input 
      type="text" 
      inputMode="numeric"
      ref={cvcInputRef}
      placeholder="CVC" 
      value={cvc}
      onChange={handleCvcChange}
      onKeyDown={(e) => handleKeyDown(e, null)}
      className="w-full py-2.5 text-sm text-gray-800 outline-none text-center" 
    />
  </div>
</label>
</div>

    <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-500 leading-normal">
      <span className="text-green-600 font-bold shrink-0">🔒</span>
      <p>Your card details are protected using PCI DSS v3.2 security standards.</p>
    </div>
    {cardNumber.length === 19 && activeField === 'card' && (
    <div className="mt-3 p-3 border border-dashed border-red-400 bg-red-50/30 rounded-lg text-center transition-all">
    <p className="text-red-500 font-semibold text-sm md:text-base tracking-wide">
      Your card number is invalid.
    </p>
    </div>
    )}
    {expiryDate.length === 7 && activeField === 'expiry' && (
    <div className="mt-2 p-3 border border-dashed border-red-400 bg-red-50/30 rounded-lg text-center transition-all">
    <p className="text-red-500 font-semibold text-sm md:text-base tracking-wide">
      Your card’s expiry year is invalid.
    </p>
    </div>
    )}

    <button 
      onClick={handleSubmit}
      className="w-full bg-[#FFAA00] hover:bg-[#e69900] text-white
       font-bold text-xs md:text-sm py-3 rounded-md shadow-md mt-2 cursor-pointer"
    >
      Place Order
    </button>
  </div>
</div>
</div>
)}


{isPageLoading && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center" style={{ zIndex: "9999999" }}>
    <div className="p-6 rounded-2xl flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
    </div>
  </div>
)}

{isPaymentProcessing && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center" style={{ zIndex: "9999999" }}>
    <div className="p-6 rounded-2xl flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
    </div>
  </div>
)}

</div>
</div>
)
}