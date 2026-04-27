'use client'

import { useState, useEffect, useRef  } from 'react';
import { List, Plus, X, Minus, MapPin} from 'lucide-react';
import { updateAddressAPI } from '@/src/services/addressService';
import notify from "../../utils/toast";
import { useLoader } from '@/src/context/ItemLoaderContext';
import ReCAPTCHA from "react-google-recaptcha";


export default function ShippingAddress({addresses = [], userId, refreshAddresses}){

const [isListModalOpen, setIsListModalOpen] = useState(false);
const { showLoader, hideLoader } = useLoader();
const [selectedAddressId, setSelectedAddressId] = useState(null);
const [isAddingNew, setIsAddingNew] = useState(false);
const [loading, setLoading] = useState(false);
const recaptchaRef = useRef(null);

const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];


const [formData, setFormData] = useState({
 fullName: '', phone: '', state: '', zip: '', city: '',
 houseNo: '', street: '', country: 'Bangladesh', addressType: 'Home',
 idNumber: '', isDefault: true   
})


useEffect(()=> {
if (defaultAddress){
setFormData({
 fullName: defaultAddress.fullName || '',
 phone: defaultAddress.phone || '',
 state: defaultAddress.state || '',
 zip: defaultAddress.zip || '',
 city: defaultAddress.city || '',
 houseNo: defaultAddress.houseNo || '',
 street: defaultAddress.street || '',
 country: defaultAddress.country || 'Bangladesh',
 addressType: defaultAddress.addressType || 'Home',
 idNumber: defaultAddress.idNumber || '',
 isDefault: true   
});
}
},[defaultAddress, isAddingNew])


const handleActionClick = (actionType) => {
if(!userId){
return notify.error("Sorry, Please Login First to Manage Addresses!")
}
if(actionType === 'list'){
if(addresses.length === 0){
return notify.info("No Address Set!")    
}
setIsListModalOpen(true);
setIsAddingNew(false);
}else{
setIsAddingNew(!isAddingNew);
}
}

const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
};


const handleUpdateAddress = async (e) => {
if (e) e.preventDefault();
const captchaToken = recaptchaRef.current.getValue();  
if (!captchaToken) return notify.error("Please verify Your Not A Robot!");
showLoader();
setLoading(true);
try{
const res = await updateAddressAPI(defaultAddress._id, { ...formData, captchaToken });
if(res.success){
 notify.success("Address updated successfully!");
 setIsAddingNew(false);  
 if (refreshAddresses) await refreshAddresses();
}
}catch(error){
notify.error("Failed to update address");
}finally{
hideLoader();
setLoading(false);
}
}


const handleModalSave = async () => {
if (!selectedAddressId) return;
showLoader();
setLoading(true);  

try{
const res = await updateAddressAPI(selectedAddressId, { isDefault: true });
if(res.success){
setIsListModalOpen(false);
if (refreshAddresses) await refreshAddresses();  
notify.success("Shipping address changed!");
}
}catch(error){
notify.error("Update failed");
}finally{
 hideLoader();
 setLoading(false);   
}
}


useEffect(() => {
if(isListModalOpen){
  document.body.style.overflow = "hidden";  
  const currentDefault = addresses.find(addr => addr.isDefault) || addresses[0];
  if (currentDefault) setSelectedAddressId(currentDefault._id);
}
else {
document.body.style.overflow = "auto";
}
return () => { document.body.style.overflow = "auto"; };
},[isListModalOpen, addresses])



return(
<div>
<div className="max-w-4xl mx-auto mt-5 bg-white border border-gray-100 rounded-sm shadow-sm">

<div className="flex items-center justify-between px-4 py-1 border-b border-gray-100 bg-gray-50/50">
<h2 className="font-semibold text-gray-800">Shipping Address</h2>
<div className="flex gap-2">
<button 
onClick={() => handleActionClick('list')}
className="p-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 cursor-pointer border-none transition-colors"
>
<List size={16} strokeWidth={3.5} />
</button>
<button 
onClick={() => handleActionClick('form')}
className={`p-2 text-white rounded-md transition-all duration-300 ${isAddingNew ? 'bg-amber-500 rotate-180' : 'bg-orange-500'} border-none cursor-pointer`}
>
{isAddingNew ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
</button>   
</div>
</div>

<div className="px-5 py-3">
{!isAddingNew ? (
<div className="animate-in fade-in slide-in-from-top-2 duration-500">
{addresses.length > 0 ? (
<div className="space-y-1">
<p className="text-black text-[13px]">{defaultAddress.fullName}</p>
<p className="text-gray-500 text-[13px]">
    {defaultAddress.houseNo}, {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.zip}, {defaultAddress.country}
</p>
<p className="text-gray-500 text-[13px]">
 {defaultAddress.phone}
</p>
</div>   
): (
<>
{userId ? (
<div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-md bg-gray-50/30">
<div className="bg-orange-100 p-3 rounded-full mb-3">
    <MapPin className="text-orange-500" size={30} />
</div>
<p className="text-gray-500 font-medium mb-4 text-center px-4">
    You haven't added any shipping address yet.
</p>
<button
onClick={() => handleActionClick('form')}
className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-md shadow-md transition-all active:scale-95 cursor-pointer border-none">
<Plus size={18} />
Add New Address
</button>
</div>
):(
<p className="text-gray-400 text-center py-4 italic text-[12px]">
    No shipping address found. Please login to add or view addresses.
</p>
)}
</>
)}
</div>
):(
<form onSubmit={handleUpdateAddress} className="animate-in fade-in zoom-in-95 duration-500">
<div className="flex items-center gap-2 text-amber-600 font-bold mb-6 border-b pb-2">
    <MapPin size={20} />
    <span>Update Shipping Details</span>
</div> 
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold text-gray-500 uppercase">Full Name *</label>
    <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
</div>
 <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold text-gray-500 uppercase">Telephone/Mobile *</label>
    <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
</div>
<div className="flex flex-col gap-1 cursor-pointer">
    <label className="text-[11px] font-bold text-gray-500 uppercase">State or Province *</label>
    <select name="state" value={formData.state} onChange={handleChange} className="border p-2.5 rounded-sm cursor-pointer text-sm outline-none bg-white" required>
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
</div>

  <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-gray-500 uppercase">Zip/Postal Code *</label>
      <input name="zip" value={formData.zip} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
  </div>
  <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-gray-500 uppercase">City or Town *</label>
      <input name="city" value={formData.city} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
  </div>
  <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-gray-500 uppercase">House No *</label>
      <input name="houseNo" value={formData.houseNo} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
  </div>

<div className="flex flex-col gap-1">
<label className="text-[11px] font-bold text-gray-500 uppercase">Street *</label>
<input name="street" value={formData.street} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
</div>
 <div className="flex flex-col gap-1">
     <label className="text-[11px] font-bold text-gray-500 uppercase">Country</label>
     <input name="country" value={formData.country} type="text" className="border p-2.5 rounded-sm text-sm bg-gray-50 outline-none" readOnly />
 </div>
 <div className="flex flex-col gap-1 cursor-pointer">
     <label className="text-[11px] font-bold text-gray-500 uppercase">Address Type</label>
     <select name="addressType" value={formData.addressType} onChange={handleChange} className="border p-2.5 rounded-sm text-sm outline-none cursor-pointer bg-white">
         <option value="Home">Home</option>
         <option value="Office">Office</option>
     </select>
 </div>
 <div className="flex flex-col gap-1 md:col-span-3">
     <label className="text-[11px] font-bold text-gray-500 uppercase">National ID/Passport Number *</label>
     <input name="idNumber" value={formData.idNumber} onChange={handleChange} type="text" className="border p-2.5 rounded-sm text-sm outline-none focus:border-amber-500" required />
 </div>
<div className=" w-full">
    <ReCAPTCHA ref={recaptchaRef} sitekey="6Lc_gLUsAAAAAPacRhoXuzbh42HcxFmmrgC_Vj4k" className="mb-6" />
   <div className='flex justify-center w-full'>
     <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-black w-full font-bold py-3 px-10 md:px-2 rounded-sm shadow-md transition-all active:scale-95 text-[10px] md:text-[13px] uppercase tracking-widest cursor-pointer border-none">
        {loading ? "Saving..." : "Save Address & Continue"}
    </button>
   </div>
</div>
</div>
</form>
)} 
</div>
</div>

{isListModalOpen && (
<div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
<div className="bg-white w-full max-w-lg rounded-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">

<div className="flex items-center justify-between p-4 border-b border-b-gray-300 bg-white shrink-0">
<h3 className="text-lg font-bold text-gray-800">Select Delivery Address</h3>
<button onClick={() => setIsListModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer">
    <X size={24} />
</button>
</div>

<div className="p-4 overflow-y-auto min-h-0 flex-1 bg-white custom-scrollbar" style={{ maxHeight: '300px' }}>
<div className="flex flex-col gap-3">
{addresses.map((addr) => (
<label 
    key={addr._id} 
    className={`flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all shrink-0 ${
        selectedAddressId === addr._id ? 'border-orange-500 bg-orange-50/40' : 'border-gray-200 hover:border-orange-200'
    }`}
>
    <input 
        type="radio" 
        name="address_select"
        checked={selectedAddressId === addr._id}
        onChange={() => setSelectedAddressId(addr._id)}
        className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
    />
    <div className="flex-1">
        <p className="font-bold text-gray-800">{addr.fullName}</p>
        <p className="text-sm text-gray-500">{addr.houseNo}, {addr.street}, {addr.city}</p>
        <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
    </div>
</label>
))}
</div>
</div>

<div className="p-4 border-t border-t-gray-300 bg-gray-50 flex justify-end gap-3 shrink-0">
<button 
    onClick={handleModalSave}
    disabled={loading}
    className="bg-orange-500 text-[12px] hover:bg-orange-600 text-white font-bold px-8 py-2 rounded-md shadow-md border-none cursor-pointer transition-all active:scale-95"
>
    {loading ? "Updating..." : "Save & Update"}
</button>
</div>

</div>
</div>
)}

</div>
)
}