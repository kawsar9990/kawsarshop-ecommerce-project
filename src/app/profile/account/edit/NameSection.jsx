'use client'

import { useState, useEffect  } from "react";
import { updateProfileName } from "@/src/services/apiService";
import { successAlert, errorAlert } from "@/src/lib/sweetAlert/confirmAlert";

export default function NameSection({ user, setUser }){

const [isEditing, setIsEditing] = useState(false);
const [newName, setNewName] = useState("");
const [error, setError] = useState("");
const [isUpdating, setIsUpdating] = useState(false);


const displayName = user 
 ? (user?.firstname || user?.lastname
   ? `${user?.firstname || ""} ${user?.lastname || ""}`.trim()
   : (user?.name || user?.username || "User"))
 : "User";


useEffect(() => {
    if (isEditing) {
      setNewName(displayName);
      setError("");
    }
}, [isEditing, displayName]);


if (!user) {
return <div className="p-3 animate-pulse text-gray-400 text-sm">Loading...</div>;
}

const handleUpdate = async () => {
if (!newName.trim()) {
   setError("This field is required.");
   return; 
}

try{
 setIsUpdating(true);
 const response = await updateProfileName(user._id || user.id, newName.trim());
  if(response && setUser){
    const updatedUser = {
      ...user,
      username: newName.trim(),
    };
    setUser(updatedUser);
    localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
    successAlert("Success!", "Name updated successfully.");
    setIsEditing(false);
  }
}catch(err){
  errorAlert("Failed!", err.message);
}finally{
  setIsUpdating(false)
}  
}

if (!user) return null;

return(
<div>
<div className="p-3 flex justify-between items-center">
  <div>
    <h1 className="text-gray-400 text-[12px]">Name</h1>
    {isEditing ?(
      <div className="flex flex-col gap-1 mt-1">
        <input type="text" 
        value={newName}
        onChange={(e)=> {
          setNewName(e.target.value);
          if (e.target.value.trim()) setError("");
        }}
        className={`border-gray-400 outline-1 p-1 text-gray-400 font-semibold text-[15px] rounded-sm`}
        autoFocus/>
        {error && <span className="text-red-500 text-[10px] font-medium">{error}</span>}
      </div>  
    ): (
    <h1 className="font-bold text-[13px]">{displayName}</h1>
    )}
  </div>

  <div className="flex items-center gap-2">
    {isEditing ? (
      <div className="flex flex-col md:flex-row gap-2">
        <button onClick={handleUpdate} disabled={isUpdating}
        className="flex bg-orange-400 p-3 rounded-md hover:bg-orange-500 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px]">
          {isUpdating ? "Updating....." : "Update"}
        </button>
      <button onClick={() => setIsEditing(false)} disabled={isUpdating}
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

