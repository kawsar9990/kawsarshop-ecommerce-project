'use client'

import { useState } from "react";
import emailjs from '@emailjs/browser';
import { deleteUserAccount } from "@/src/services/apiService";
import notify from "@/src/utils/toast";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useLoader } from "@/src/context/ItemLoaderContext";


export default function page() {

const {user, setUser, } = useAuth()
const [isAnonymiseChecked, setIsAnonymiseChecked] = useState(false);
const [isAnonymiseProcessed, setIsAnonymiseProcessed] = useState(false);
const [isDeleteChecked, setIsDeleteChecked] = useState(false);
const [comment, setComment] = useState("");
const { showLoader, hideLoader } = useLoader();
const router = useRouter();


const handleProceed = () => {
    if(!isAnonymiseChecked){
      notify.warning("Please agree to the terms before proceeding!") 
      return;
    }
    setIsAnonymiseProcessed(true)
    notify.success("Personal data anonymised successfully!");
}

const handleDeleteRequest = async () => {

    if (!isAnonymiseChecked || !isAnonymiseProcessed){
      notify.warning("Please anonymize personal data before proceeding");
      return;  
    }

    if(comment.trim().length < 5){
        notify.error("Please write a reason in the comment box!")
        return;
    }
    if(!isDeleteChecked){
        notify.warning("Please check the confirmation box to delete your account!")
        return;
    }

    try{

     showLoader();

     const emailParams = {
      name: user.username || "Customer",  
      email: user.email || "No Email",
      message: comment,
      title: "Account Deletion Request"
     };

     await emailjs.send(
        "service_dhvkz26",
        "template_lakvp7i",
        emailParams,
        { publicKey: "Ir1GMI9nwV_yOLoGG" }
     );

     await deleteUserAccount(user._id);
     notify.success("Account deletion request submitted!");

     setUser(null);
     router.push('/')
    }catch(err){
       notify.error(err.message || "Failed to delete account!");
    }finally{
       hideLoader();
    }

   
}

return (
<div className="min-h-screen bg-gray-50 p-4 md:p-8" style={{ userSelect: "none" }}>
<div className="max-w-4xl mx-auto space-y-6">
        
<div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
<h2 className="text-md font-bold text-gray-800 mb-2">Anonymise personal data</h2>
<p className="text-gray-700 text-[13px] leading-relaxed font-semibold capitalize mb-6">
Anonymising your personal data will enable encryption of all your information saved with us. 
Once information is encrypted it can never be reverted back to decrypted form. 
(Your address will also be empty.)
</p>
          
<div className="flex items-center space-x-3 mb-6">
  <input 
    type="checkbox" 
    id="anonymise" 
    disabled={isAnonymiseProcessed}
    checked={isAnonymiseChecked}
    onChange={(e) => setIsAnonymiseChecked(e.target.checked)}
    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
  />
  <label htmlFor="anonymise" className="text-gray-500 text-sm cursor-pointer">
    I agree and I want to proceed
  </label>
</div>
          
  <button onClick={handleProceed} disabled={isAnonymiseProcessed}
   className={`${isAnonymiseProcessed ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#fbbf24] cursor-pointer hover:bg-orange-400'} text-black font-bold py-2 px-6 rounded-md transition-colors duration-200`}>
    {isAnonymiseProcessed ? "Processed" : "Proceed"}
  </button>
</div>

<div className="bg-white border-2 border-red-200 rounded-md p-6 shadow-sm">
  <h2 className="text-lg font-bold text-red-600 mb-2">Delete account</h2>
  <p className="text-gray-900 text-[13px] font-semibold leading-relaxed mb-4">
    Request to delete your account will remove all the information related to your account. 
    This includes order, purchase history, discounts, invoices, etc.
  </p>
  <p className="text-gray-900 text-[13px] font-semibold mb-6">
    You will <span className="uppercase">not</span> be able to restore your access and information after we approve your request to delete the account.
</p>
          
<div className="relative mb-6">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-400">
    Comment
  </label>
  <textarea 
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Please tell us why are you doing this"
    className="w-full border border-gray-300 rounded-md p-3 pt-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 min-h-[100px] resize-y"
  ></textarea>
</div>

<div className="flex items-center space-x-3 mb-6">
  <input 
    type="checkbox" 
    id="delete" 
    checked={isDeleteChecked}
    onChange={(e) => setIsDeleteChecked(e.target.checked)}
    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
  />
  <label htmlFor="delete" className="text-gray-500 text-sm cursor-pointer">
    I understand and I want to delete my account
  </label>
</div>

<button onClick={handleDeleteRequest}
className="bg-[#fbbf24] cursor-pointer hover:bg-orange-400 text-black font-bold py-2 px-6 rounded-md transition-colors duration-200">
    Submit request
  </button>
</div>

</div>
</div>
  );
}