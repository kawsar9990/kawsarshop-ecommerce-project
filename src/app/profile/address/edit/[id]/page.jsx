'use client'

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";
import notify from '@/src/utils/toast';
import { getAddressesAPI,updateAddressAPI } from '@/src/services/addressService';
import { useLoader } from '@/src/context/ItemLoaderContext';
import { useAuth } from '@/src/context/AuthContext';


export default function page(){
const {user} = useAuth();
 const { id } = useParams();
const recaptchaRef = useRef(null);
const router = useRouter();
const [isVerified, setIsVerified] = useState(false);
const {showLoader, hideLoader} = useLoader()

const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        state: '',
        zip: '',
        city: '',
        houseNo: '',
        street: '',
        country: '',
        addressType: 'Home',
        idNumber: '',
        isDefault: false
});

const [errors, setErrors] = useState({});

useEffect(()=> {
const fetchCurrentAddress = async () => {
const userId = user?.id || user?._id;
if (!userId || !id) return;

showLoader();

try{
const res = await getAddressesAPI(userId);
if (res.success){
const currentAddr = res.data.find(addr => addr._id === id);
if (currentAddr){
setFormData({
 fullName: currentAddr.fullName || '',
 phone: currentAddr.phone || '',   
 state: currentAddr.state || '',
 zip: currentAddr.zip || '',
 city: currentAddr.city || '',
 houseNo: currentAddr.houseNo || '',
 street: currentAddr.street || '',
 country: currentAddr.country || '',
 addressType: currentAddr.addressType || 'Home',
 idNumber: currentAddr.idNumber || '',
 isDefault: currentAddr.isDefault || false
});
}}}
catch(error){
notify.error("Failed to load address data");
}
finally{
 hideLoader();   
}}
fetchCurrentAddress();
window.scrollTo(0, 0);
}, [id, user])



const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
}


const handleLocationClick = () => {
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition(
(position) => {
  alert("Location access granted! Lat: " + position.coords.latitude);
},
(error) => {
if (error.code === 1) {
  notify.error("Browser Permission Not Allowed.");
}});
} else {
  notify.warning("Your Browser does not support geolocation.");
}
};


const onCaptchaChange = (value) => {
   setIsVerified(!!value);
};


const handleUpdate = async (e) => {
if (e) e.preventDefault();

const captchaToken = recaptchaRef.current.getValue();
if (!captchaToken) return notify.error("Please verify the Captcha first.");

let newErrors = {};
Object.keys(formData).forEach(key => {
if (key !== 'isDefault' && (!formData[key] || formData[key].toString().trim() === "")) {
    newErrors[key] = "The field is required";
}
});

if (Object.keys(newErrors).length > 0) {
setErrors(newErrors);
return;
}

showLoader();
try{
const res = await updateAddressAPI(id, { 
    ...formData, 
    captchaToken 
});

if (res.success) {
  notify.success("Address updated successfully!");
  router.push('/profile/address');
}else{
  notify.error(res.message || "Update failed");
}
}catch(error){
notify.error("Failed to update address");
} finally{
  hideLoader();
}

if (!isVerified) {
    notify.error("Please verify the Captcha first.");
    return;
}
}



return(
<div className="md:px-1 md:py-8 mb-20" style={{ userSelect: "none" }}>

<div className='flex flex-col gap-2 font-semibold text-[13px] md:text-[15px]'>
    <h1>Edit Address</h1>
    <h1>Update Information</h1>
</div>

<form onSubmit={handleUpdate} className='w-full mt-3 flex flex-col gap-3'>


<div className='bg-white w-full shadow-lg rounded-md px-4 py-7'>
<div className='flex w-full lg:flex-row flex-col lg:justify-between gap-3 lg:gap-2'>

<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-gray-400 capitalize">Full Name (First and Last Name)*</label>
  <input
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    type="text" 
    placeholder='Full Name (First and Last Name)*'
    className={`w-full border placeholder:text-[10px] p-3 rounded-md text-sm outline-none transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-orange-400'}`}
  />
{errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>}
</div>

<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-gray-400 capitalize">Telephone/Mobile*</label>
  <input 
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    type="tel" 
    placeholder="Telephone/Mobile*" 
    className={`w-full border placeholder:text-[10px] p-3 rounded-md text-sm outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-orange-400'}`}
  />
 {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>} 
</div>

</div>
</div>

<div className='flex flex-col gap-2 mt-3'>

<div className='flex justify-between items-center'>
 <h1 className='font-semibold text-[13px] md:text-[15px]'>Address</h1>
 <button 
  onClick={handleLocationClick}
  className="flex items-center cursor-pointer gap-2 text-[10px] font-semibold border border-gray-300 px-2 py-1 rounded shadow-sm hover:bg-gray-50 transition active:scale-95"
>
<span className="text-lg">⊕</span> Use Current Location
</button>
</div>

<div className='bg-white w-full shadow-lg rounded-md px-4 py-7'>
<div className='w-full flex gap-3'>

<div className='flex flex-col w-full lg:flex-row lg:justify-between gap-3'>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">State or Province*</label>
  <select 
  name="state"
  value={formData.state}
  onChange={handleChange}
  className={`w-full border p-3 rounded text-sm outline-none bg-white appearance-none cursor-pointer ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
    <option value="">Please select</option>
    <option value="Dhaka">Dhaka</option>
    <option value="Barisal">Barisal</option>
    <option value="Chittagong">Chittagong</option>
    <option value="Mymensingh">Mymensingh</option>
    <option value="Rajshahi">Rajshahi</option>
    <option value="Khulna">Khulna</option>
    <option value="Rangpur">Rangpur</option>
    <option value="Sylhet">Sylhet</option>
  </select>
{errors.state && <p className="text-red-500 text-[10px] mt-1">{errors.state}</p>}  
</div>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">Zip/Postal Code*</label>
  <input 
  name="zip"
  value={formData.zip}
  onChange={handleChange}
  type="text" 
  placeholder="Zip/Postal Code*" 
  className={`w-full border placeholder:text-[10px] p-3 rounded text-sm outline-none ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}/>
{errors.zip && <p className="text-red-500 text-[10px] mt-1">{errors.zip}</p>}
</div>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">City or Town*</label>
  <input 
  name="city"
  value={formData.city}
  onChange={handleChange}
  type="text" 
  placeholder="City or Town*" 
  className={`w-full border p-3 rounded text-sm outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />
{errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city}</p>}
</div>
</div>

</div>


<div className='mt-5 flex flex-col w-full lg:flex-row lg:justify-between gap-3'> 
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">House/Building No*</label>
  <input
  name="houseNo"
  value={formData.houseNo}
  onChange={handleChange}
  type="text" 
  placeholder="House/Building No*" 
  className={`w-full border p-3 rounded text-sm outline-none ${errors.houseNo ? 'border-red-500' : 'border-gray-300'}`}/>
{errors.houseNo && <p className="text-red-500 text-[10px] mt-1">{errors.houseNo}</p>}
</div>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">Street*</label>
  <input 
  name="street"
  value={formData.street}
  onChange={handleChange}
  type="text" 
  placeholder="Street*" 
  className={`w-full border p-3 rounded text-sm outline-none ${errors.street ? 'border-red-500' : 'border-gray-300'}`}/>
{errors.street && <p className="text-red-500 text-[10px] mt-1">{errors.street}</p>}
</div>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">Country</label>
  <input 
  name="country"
  value={formData.country}
  onChange={handleChange}
  type="text" 
  placeholder='Country' 
  className={`w-full border p-3 rounded text-sm outline-none ${errors.country ? 'border-red-500' : 'border-gray-300'}`}/>
{errors.country && <p className="text-red-500 text-[10px] mt-1">{errors.country}</p>}
</div>                          
</div>


<div className='mt-5 flex flex-col w-full lg:flex-row lg:justify-between gap-3'>
<div className="relative w-full">
  <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">Address Type</label>
  <select name="addressType"
  value={formData.addressType}
  onChange={handleChange}
  className={`w-full border p-3 rounded text-sm outline-none bg-white appearance-none cursor-pointer ${errors.addressType ? 'border-red-500' : 'border-gray-300'}`}>
    <option value="Home">Home</option>
    <option value="Office">Office</option>
  </select>
  {errors.addressType && <p className="text-red-500 text-[10px] mt-1">{errors.addressType}</p>}
</div>
<div className="relative md:col-span-2 w-full">
<label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-500 capitalize">National ID/Passport Number*</label>
<input type="text" 
onChange={handleChange} 
value={formData.idNumber} 
name="idNumber"
placeholder="National ID/Passport Number*" 
className={`w-full border placeholder:text-[10px] p-3 rounded text-sm outline-none ${errors.idNumber ? 'border-red-500' : 'border-gray-300'}`}/>
{errors.idNumber && <p className="text-red-500 text-[10px] mt-1">{errors.idNumber}</p>}
</div>
</div>


<div className="mt-10 cursor-pointer">
<ReCAPTCHA 
ref={recaptchaRef}
sitekey="6Lc_gLUsAAAAAPacRhoXuzbh42HcxFmmrgC_Vj4k"
onChange={onCaptchaChange}
className='cursor-pointer'
/>
</div>


<div className="mt-10 flex justify-end">
  <button type="submit" 
    className={`py-3 px-12 rounded font-bold text-sm shadow-md transition-all uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black cursor-pointer`}
  >
    Save Address
  </button>
</div>

</div>
</div>
</form>
</div>
)
} 