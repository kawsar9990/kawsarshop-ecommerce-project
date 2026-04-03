'use client'

import { useState, useEffect } from "react";
import { updateProfilePassword } from "@/src/services/apiService";
import { successAlert, errorAlert } from "@/src/lib/sweetAlert/confirmAlert";

export default function PasswordSection({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const isSocialUser = user?.provider === 'google' && (user?.password === "" || !user?.password);


  useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "auto";
      };
  }, [isModalOpen]);


  const handleUpdate = async () => {
    if (!isSocialUser && !formData.currentPassword) return errorAlert("Error", "Current password is required");
    if (formData.newPassword.length < 6) return errorAlert("Error", "Password must be at least 6 characters");
    if (formData.newPassword !== formData.confirmPassword) return errorAlert("Error", "Passwords do not match");

    try {
      setIsUpdating(true);
      await updateProfilePassword({
        userId: user._id || user.id,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        isSocialUser: isSocialUser
      });

      successAlert("Success", isSocialUser ? "Password set successfully!" : "Password updated successfully!");
      setIsModalOpen(false); 
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      errorAlert("Failed", err.message);
    } finally {
      setIsUpdating(false);
    }
  };

return (
<div className="border-b border-gray-100 p-3">
<div className="flex justify-between items-center">
<div>
  <h1 className="text-gray-400 text-[12px]">Password</h1>
  <h1 className="font-bold text-[13px]">
    {isSocialUser ? "" : "********"}
  </h1>
</div>
<button 
onClick={() => setIsModalOpen(true)} 
className="bg-gray-300 cursor-pointer p-2 px-4 rounded-md font-bold text-[11px] lg:text-[13px] hover:bg-gray-400 transition-all"
>
    {isSocialUser ? "Set Password" : "Change"}
  </button>
</div>

{isModalOpen && (
<div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
<div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative mt-10 lg:mt-0">
 <div className="bg-gray-50 p-4 border-b border-b-gray-300">
   <h2 className="font-bold text-lg text-gray-800">
     {isSocialUser ? "Set Your Account Password" : "Change Password"}
   </h2>
   <p className="text-xs text-gray-500">
     {isSocialUser ? "Add a password to login with email later." : "Verify current password to set a new one."}
   </p>
 </div>

<div className="p-5 flex flex-col gap-4">
{!isSocialUser && (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">Current Password</label>
    <input
      type="password"
      placeholder="Enter current password"
      className="border placeholder:text-[12px] border-gray-300 p-2 rounded focus:border-orange-400 outline-none transition-all text-sm"
      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
    />
  </div>
)}
    
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">New Password</label>
    <input
      type="password"
      placeholder="At least 6 characters"
      className="border border-gray-300 placeholder:text-[12px] p-2 rounded focus:border-orange-400 outline-none transition-all text-sm"
      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
    />
  </div>
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">Confirm New Password</label>
    <input
      type="password"
      placeholder="Re-type new password"
      className="border border-gray-300 placeholder:text-[12px] p-2 rounded focus:border-orange-400 outline-none transition-all text-sm"
      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
    />
  </div>
</div>

  <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t border-t-gray-300">
    <button
      onClick={() => setIsModalOpen(false)}
      className="px-4 py-2 cursor-pointer bg-gray-300 text-sm font-bold text-black hover:bg-gray-400 rounded-md transition-all">
      Cancel
    </button>
    <button
      onClick={handleUpdate}
      disabled={isUpdating}
      className="px-6 py-2 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer rounded-md shadow-md transition-all disabled:bg-gray-400"
    >
      {isUpdating ? "Processing..." : (isSocialUser ? "Save Password" : "Update Password")}
    </button>
  </div>
</div>
</div>
)}
</div>
  );
}