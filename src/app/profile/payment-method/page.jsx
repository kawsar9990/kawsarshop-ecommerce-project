'use client'

import notify from "@/src/utils/toast";
import { useState, useRef } from "react";


export default function PaymentMethodsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [formData, setFormData] = useState({
    cardType: "",
    cardNumber: "",
    expMonth: "01 - January",
    expYear: "2026",
    cvv: "",
    saveCard: true
  });

  const [errors, setErrors] = useState({});
  const cardTypeRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cvvRef = useRef(null);
  const saveCardRef = useRef(null);

  const months = [
    "01 - January", "02 - February", "03 - March", "04 - April",
    "05 - May", "06 - June", "07 - July", "08 - August",
    "09 - September", "10 - October", "11 - November", "12 - December"
  ];

  const years = Array.from({ length: 2080 - 2026 + 1 }, (_, i) => (2026 + i).toString());

  const validate = () => {
    let newErrors = {};
    let firstErrorRef = null;

    if (!formData.cardType || formData.cardType === "--Please Select--") {
      newErrors.cardType = "Card type is required";
      if (!firstErrorRef) firstErrorRef = cardTypeRef;
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.length < 13) {
      newErrors.cardNumber = "Enter a valid card number";
      if (!firstErrorRef) firstErrorRef = cardNumberRef;
    }
    if (!formData.cvv.trim() || formData.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
      if (!firstErrorRef) firstErrorRef = cvvRef;
    }
    if (!formData.saveCard) {
      newErrors.saveCard = "You must agree to save the card";
      if (!firstErrorRef) firstErrorRef = saveCardRef;
    }

    setErrors(newErrors);

    if (firstErrorRef) {
      firstErrorRef.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = () => {

if (!validate()) return;
setIsVerifying(true);

setTimeout(() => {
setIsVerifying(true);
if(formData.cardNumber.startsWith("4242")){
notify.success("Card verified and saved successfully!");
setIsModalOpen(false);
setFormData({ cardType: "", cardNumber: "", expMonth: "01 - January", expYear: "2026", cvv: "", saveCard: true });
setErrors({});
}else{
 notify.error("Your card was declined. Please use a valid test card.");
 setErrors({
    cardNumber: "Invalid card number or declined",
    cvv: "Check CVV"
 });
  cardNumberRef.current.focus();
}
}, 1500);
};


return (
<div className="min-h-screen bg-gray-50 p-4 md:p-8 relative" style={{ userSelect: "none" }}>
<div className="max-w-4xl mx-auto space-y-6">
        
<div className="space-y-2">
  <h2 className="text-lg font-bold text-gray-800">PayPal Vault</h2>
  <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
     <div className="space-y-1">
        <h3 className="font-bold text-gray-900">Your linked account</h3>
        <p className="text-gray-600 text-sm italic">No account linked yet.</p>
     </div>
  </div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<h2 className="text-lg font-bold text-gray-800">Saved Cards Visa/Mastercard</h2>
<button 
onClick={() => setIsModalOpen(true)}
className="bg-[#fbbf24] hover:bg-orange-400 cursor-pointer text-black text-xs font-bold py-2 px-4 rounded transition-colors duration-200"
>
Add New Card
</button>
</div>
          
<div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
   <p className="text-gray-600 text-sm">You have no saved cards.</p>
</div>
</div>
</div>

{isModalOpen && (
<div className="fixed inset-0 z-[999999] flex items-center min-h-screen justify-center bg-black/50 backdrop-blur-sm px-5 md:px-20 md:py-20">
<div className="bg-white w-full md:w-[450px] rounded-lg shadow-md overflow-hidden">
      
<div className="flex justify-between items-center px-4 py-1 border-b border-b-gray-400">
<h2 className="text-sm font-bold text-gray-800">Save Card</h2>
<button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl">&times;</button>
</div>

<div className="px-4 py-3 space-y-3">
<div className="space-y-1">
<label className="block text-[10px] font-medium text-gray-700">* Card Type</label>
<select 
  ref={cardTypeRef}
  value={formData.cardType}
  disabled={isVerifying}
  onChange={(e) => setFormData({...formData, cardType: e.target.value})}
  className={`w-full text-[12px] border cursor-pointer rounded p-2 outline-none focus:ring-1 ${errors.cardType ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
>
<option>--Please Select--</option>
<option>Visa</option>
<option>Mastercard</option>
<option>American Express</option>
<option>Discover</option>
<option>JCB</option>
</select>
{errors.cardType && <p className="text-red-500 text-[10px]">{errors.cardType}</p>}
</div>

<div className="space-y-1">
<label className="block font-medium text-[10px] text-gray-700">* Card Number</label>
<input 
     ref={cardNumberRef}
     type="text" 
     disabled={isVerifying}
     value={formData.cardNumber}
     onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
     placeholder="Enter Card Number"
     className={`w-full text-[12px] border rounded p-2 outline-none focus:ring-1 ${errors.cardNumber ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
/>
{errors.cardNumber && <p className="text-red-500 text-[10px]">{errors.cardNumber}</p>}
</div>

<div className="space-y-1">
  <label className="block text-[10px] font-medium text-gray-700">* Expiration Date</label>
  <div className="flex gap-4">
    <select 
      value={formData.expMonth}
      disabled={isVerifying}
      onChange={(e) => setFormData({...formData, expMonth: e.target.value})}
      className="flex-1 text-[12px] cursor-pointer border border-gray-300 rounded p-2 outline-none"
    >
      {months.map(m => <option key={m} value={m}>{m}</option>)}
    </select>
    <select 
      value={formData.expYear}
      disabled={isVerifying}
      onChange={(e) => setFormData({...formData, expYear: e.target.value})}
      className="flex-1 border text-[12px] cursor-pointer border-gray-300 rounded p-2 outline-none"
    >
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  </div>
</div>

<div className="space-y-1">
<label className="block text-[10px] font-medium text-gray-700">* Card Verification Number</label>
<input 
    ref={cvvRef}
    type="text" 
    disabled={isVerifying}
    maxLength="4"
    value={formData.cvv}
    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
    className={`w-full cursor-pointer text-[12px] border rounded p-2 outline-none focus:ring-1 ${errors.cvv ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
/>
{errors.cvv && <p className="text-red-500 text-[10px]">{errors.cvv}</p>}
</div>

<div className="space-y-1">
<div className="flex items-center gap-2 pt-2">
<input 
  ref={saveCardRef}
  type="checkbox" 
  disabled={isVerifying}
  id="save-card" 
  className={`w-3 h-3 cursor-pointer ${errors.saveCard ? 'outline-red-500' : ''}`}
  checked={formData.saveCard}
  onChange={(e) => setFormData({...formData, saveCard: e.target.checked})}
/>
<label htmlFor="save-card" className="text-gray-700 cursor-pointer text-[13px]">Save card for future purchases</label>
</div>
{errors.saveCard && <p className="text-red-500 text-[10px]">{errors.saveCard}</p>}
</div>
</div>

<div className="p-4 border-t flex justify-end">
<button 
  className={`cursor-pointer ${isVerifying ? 'bg-gray-400' : 'bg-[#fbbf24] hover:bg-orange-400'} cursor-pointer text-black font-bold py-2 px-8 rounded transition-all flex items-center gap-2`}
  disabled={isVerifying}
  onClick={handleSubmit}
>
{isVerifying ? "Verifying..." : "Submit"}
</button>
</div>
</div>
</div>
)}
</div>
  );
}