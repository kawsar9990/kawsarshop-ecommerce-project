'use client'

import { useState } from "react";
import { updateProfileGender } from "@/src/services/apiService"; // নিশ্চিত হোন এই ফাংশনটি আপনার এপিআই ফাইলে আছে
import { successAlert, errorAlert } from "@/src/lib/sweetAlert/confirmAlert";

export default function GenderSection({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGender, setNewGender] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const displayGender = user?.gender || "";

  const handleUpdate = async () => {
    if (!newGender) {
      errorAlert("Error", "Please select a gender.");
      return;
    }

    try {
      setIsUpdating(true);
      
      const response = await updateProfileGender(user._id || user.id, newGender);

      if (response && setUser) {
        const updatedUser = {
          ...user,
          gender: newGender,
        };
        setUser(updatedUser);
        localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
        
        successAlert("Success!", "Gender updated successfully.");
        setIsEditing(false);
      }
    } catch (err) {
      errorAlert("Failed!", err.message);
    } finally {
      setIsUpdating(false);
    }
  };
  const startEditing = () => {
    setNewGender(displayGender === "not specified" ? "" : displayGender);
    setIsEditing(true);
  };

  if (!user) return null;

  return (
    <div className="border-b border-gray-100">
      <div className="p-3 flex justify-between items-center">
        <div>
          <h1 className="text-gray-400 text-[12px]">Gender</h1>
          {isEditing ? (
            <div className="mt-1 cursor-pointer">
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
                className="border cursor-pointer border-gray-300 outline-none p-1 text-gray-700 font-semibold text-[14px] rounded-sm focus:border-orange-400 bg-white"
                autoFocus
              >
                <option value="" disabled className="cursor-pointer">Select Gender</option>
                <option value="male" className="cursor-pointer">Male</option>
                <option value="female" className="cursor-pointer">Female</option>
                <option value="other" className="cursor-pointer">Other</option>
              </select>
            </div>
          ) : (
            <h1 className={`font-bold text-[13px] capitalize ${displayGender === "not specified" || !displayGender ? "text-gray-400 font-normal italic" : "text-black"}`}>
              {displayGender ? displayGender : "Not specified"}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex flex-col md:flex-row gap-2">
              <button 
                onClick={handleUpdate} 
                disabled={isUpdating}
                className="flex bg-orange-400 p-3 rounded-md hover:bg-orange-500 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px] text-white"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={startEditing}
              className="flex bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center w-15 xl:w-20 text-[8px] lg:text-[13px]"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}