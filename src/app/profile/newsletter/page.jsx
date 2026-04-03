'use client'

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"
import { updateProfileNewsletter } from "@/src/services/apiService";
import { successAlert, errorAlert } from "@/src/lib/sweetAlert/confirmAlert";


export default function page(){

const { user, setUser } = useAuth();
const [isChecked, setIsChecked] = useState(false);
const [isUpdating, setIsUpdating] = useState(false);

useEffect(()=> {
if(user){
setIsChecked(user.newsletter || false)
}
},[user])


const handleSave = async () => {
try{
setIsUpdating(true)
const response = await updateProfileNewsletter(user._id || user.id, isChecked);

if(response){
 const updatedUser = { ...user, newsletter: isChecked };
 setUser(updatedUser); 
 localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
 setIsChecked(isChecked);
 successAlert("Success!", "Newsletter preference updated.");
}
}catch(err){
errorAlert("Error", err.message || "Failed to update.");
}finally{
setIsUpdating(false); 
}
}

return(
<div style={{ userSelect: "none" }}>
<div className="p-5">
<p className="font-bold text-gray-700">Newsletter Subscription</p>
    
<div className="bg-white shadow-2xl rounded-xl p-6 mt-5 border border-gray-100">
<div className="flex flex-col gap-5">
        
<div onClick={() => setIsChecked(!isChecked)} 
className="cursor-pointer flex items-center group gap-3 p-2 rounded-md transition-all duration-300">
<div className="relative flex items-center justify-center">
<input
type="checkbox"
name="ckeckd"
id="ckeckd"
checked={isChecked}
onChange={(e)=> setIsChecked(e.target.checked)}
className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all 
checked:bg-orange-500 checked:border-orange-500 
group-hover:border-orange-400 focus:outline-none"
/>
<svg
className="absolute w-3.5 h-3.5 pointer-events-none hidden peer-checked:block text-white"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="4"
strokeLinecap="round"
strokeLinejoin="round"
>
<polyline points="20 6 9 17 4 12"></polyline>
</svg>
</div>
  
  <label
    htmlFor="ckeckd"
    onClick={(e) => e.stopPropagation()}
    className="cursor-pointer text-gray-600 font-medium group-hover:text-orange-600 transition-colors duration-300"
  >
    Promotional Emails
  </label>
</div>

 <div>
   <button onClick={handleSave} disabled={isUpdating}
   className={`w-full px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg 
   shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98] 
   transition-all duration-200 cursor-pointer ${isUpdating ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600 shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-[0.98]"}`}>
     {isUpdating ? "Saving..." : "Save"}
   </button>
 </div>

</div>
</div>
</div>
</div>
)
}