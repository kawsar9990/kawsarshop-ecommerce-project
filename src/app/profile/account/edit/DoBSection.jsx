'use client'

import { useState, useEffect  } from "react";
import DatePicker from "react-datepicker";
import { updateProfileDOB } from "@/src/services/apiService";
import { successAlert, errorAlert } from "@/src/lib/sweetAlert/confirmAlert";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";


export default function DOBSection({ user, setUser }){

const [isEditing, setIsEditing] = useState(false);
const [startDate, setStartDate] = useState(null);
const [isUpdating, setIsUpdating] = useState(false);


const displayDOB = user?.dob || "";

useEffect(() => {
    if (isEditing && displayDOB) {
      try{
        const parsedDate = parse(displayDOB, "d-MMMM-yyyy", new Date());
        setStartDate(parsedDate);
      }catch(err){
        setStartDate(new Date());
      }
    }
}, [isEditing, displayDOB]);



const handleUpdate = async () => {
if (!startDate) {
   errorAlert("Error", "Please select a date.");
   return; 
}

try{
 setIsUpdating(true);
 const formattedDate = format(startDate, "d-MMMM-yyyy");
 const response = await updateProfileDOB(user._id || user.id, formattedDate);
  if(response && setUser){
    const updatedUser = {
      ...user,
      dob: formattedDate,
    };
    setUser(updatedUser);
    localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
    successAlert("Success!", "Date of Birth updated successfully.");
    setIsEditing(false);
  }
}catch(err){
  errorAlert("Failed!", err.message);
}finally{
  setIsUpdating(false)
}  
}

if (!user) {
return <div className="p-3 animate-pulse text-gray-400 text-sm">Loading...</div>;
}
if (!user) return null;

return(
<div>
<div className="p-3 flex justify-between items-center">
<div>
<h1 className="text-gray-400 text-[12px]">Date of Birth</h1>
{isEditing ? (
<div className="mt-1 custom-datepicker-wrapper">
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="dd-MMMM-yyyy"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    className="border border-gray-300 outline-none p-1 text-gray-700 font-semibold text-[14px] rounded-sm focus:border-orange-400 w-full"
    maxDate={new Date()}
  />
</div> 
    ): (
<h1 className={`font-bold text-[13px] ${!displayDOB ? "text-gray-400 font-normal italic" : "text-black"}`}>
    {displayDOB ? displayDOB : "Not set"}
</h1>
)}
  </div>

  <div className="flex items-center gap-2">
    {isEditing ? (
      <div className="flex flex-col md:flex-row gap-2">
        <button onClick={handleUpdate} disabled={isUpdating}
        className="flex bg-orange-400 p-3 rounded-md hover:bg-orange-500 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px]">
          {isUpdating ? "Updating....." : "Update"}
        </button>
      <button onClick={() => setIsEditing(false)}
      className="flex bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px]">
        Cancel
      </button>
      </div>
    ): (
      <button onClick={()=> setIsEditing(true)}
     className="flex bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center w-15 xl:w-20 text-[8px] lg:text-[13px]">Edit</button>
    )}
  </div>
</div>
</div>
)
}

