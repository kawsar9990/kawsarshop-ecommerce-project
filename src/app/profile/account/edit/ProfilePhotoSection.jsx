'use client'

import { useRef, useState } from "react";
import Image from "next/image";
import { confirmAction, successAlert, errorAlert } from "../../../../lib/sweetAlert/confirmAlert";
import { cancleAction, cancelsuccessAlert, cancelerrorAlert } from "../../../../lib/sweetAlert/cancelAlert";
import ImageCropper, { getCroppedImg } from "@/src/Components/ui/Modals/ImageCropper";
import { uploadAndSaveProfilePic, removeProfilePic } from "@/src/services/apiService";


export default function ProfilePhotoSection({ user, setUser, setIsUploading }){

const defaultAvatar = "https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg";
const fileInputRef = useRef(null);
const [selectedImg, setSelectedImg] = useState(null);
const [isCropping, setIsCropping] = useState(false);


const handleFileChange = (e) => {
  if(e.target.files && e.target.files.length > 0){
   const reader = new FileReader();
   reader.readAsDataURL(e.target.files[0]);
   reader.onload = () => {
    setSelectedImg(reader.result);
    setIsCropping(true)
   } 
  }
}


const handleCropConfirm = async (croppedAreaPixels) => {
  setIsCropping(false);

  const isConfirmed = await confirmAction("Update Profile Photo?", "Do you want to upload this photo?");
  if(isConfirmed){
  try{
    setIsUploading(true);
    const croppedBlob = await getCroppedImg(selectedImg, croppedAreaPixels);
    const response = await uploadAndSaveProfilePic(croppedBlob, user?._id || user?.id);
    if(setUser&& response){
      const updatedUser = {
        ...user,
        profilePic: response.imageUrl || (response.user && response.user.profilePic)
      }
    setUser(updatedUser);
    localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
    successAlert("Success!", "Profile picture updated successfully.");
    }
  } catch(err){
      errorAlert("Failed!", err.message || "Upload failed.");
    } finally {
      setIsUploading(false);
      setSelectedImg(null);
    }
  } else{
    setSelectedImg(null)
  }
}

const handleRemovePhoto = async () =>{
  const isConfirmed = await cancleAction("Remove Photo?", "Are you sure you want to remove your profile picture?");
  if(isConfirmed){
  try{
    setIsUploading(true);
    const response = await removeProfilePic(user?._id || user?.id);

    if(setUser && response){
      const updatedUser = {
        ...user,
        profilePic: ""
      };
      setUser(updatedUser);
      localStorage.setItem("kawsarshop_auth", JSON.stringify(updatedUser));
      cancelsuccessAlert("Removed!", "Profile picture removed successfully.");
    }
  }catch(err){
    cancelerrorAlert("Failed!", err.message || "Could not remove photo.");
  }finally{
    setIsUploading(false);
  }
  }
}

if (!user) return null;

return(
<div className="p-5">

<input type="file" 
ref={fileInputRef}
onChange={handleFileChange}
accept="image/*"
className="hidden"/>

{isCropping && (
  <ImageCropper 
  image={selectedImg}
  onConfirm={handleCropConfirm}
  onCancel={() => { setIsCropping(false); setSelectedImg(null); }}/>
)}


<div className="flex justify-between items-center">
<div className="flex items-center gap-4 ">
<div>
<Image 
src={user?.profilePic || user?.image || user?.picture || user?.photoURL || defaultAvatar}
alt={user.name || "User"}
width={60}
height={60}
className="object-cover rounded-full"
/>
</div>
<div>
    <h1 className="font-bold text-[10px] lg:text-[13px]">Profile Picture</h1>
</div>
</div>

<div className="flex flex-col md:flex-row justify-center items-center gap-3">
{user.profilePic && (
<button onClick={handleRemovePhoto}
className="bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center text-[8px] lg:text-[13px]">Remove</button>
)}

<button onClick={()=> fileInputRef.current.click()}
 className="flex bg-gray-300 p-3 rounded-md hover:bg-gray-400 cursor-pointer shadow-md font-bold justify-center items-center w-15 xl:w-20 text-[8px] lg:text-[13px]">Update</button>
</div>
</div>

</div>
)
}