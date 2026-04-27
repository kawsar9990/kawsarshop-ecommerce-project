'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { useLoader } from '@/src/context/ItemLoaderContext';
import { getAddressesAPI, deleteAddressAPI, updateAddressAPI } from '@/src/services/addressService';
import notify from '@/src/utils/toast';

export default function page(){
const { user } = useAuth();
const { showLoader, hideLoader } = useLoader();
const router = useRouter();
const [addresses, setAddresses] = useState([]);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [addressToDelete, setAddressToDelete] = useState(null);


useEffect(()=> {
window.scrollTo(0, 0)
},[])


const fetchAddresses = async () => {
const userId = user?.id || user?._id;
if (!userId) return;
showLoader();
try{
const res = await getAddressesAPI(userId);
if (res.success) {
setAddresses(res.data || []);
}
}
catch(error){
notify.error("Failed to load addresses");
}
finally{
hideLoader();
}
}

useEffect(() => {
 if (user?.id || user?._id) {
     fetchAddresses();
 }
},[user?.id, user?._id]);



const handleSetDefault = async (addressId) =>{
showLoader();

try{
const res = await updateAddressAPI(addressId, { isDefault: true });
if (res.success){
 notify.success("Default address updated!");
 fetchAddresses();   
}
}
catch(error){
notify.error("Failed to set default address");
}
finally{
 hideLoader();   
}
};

const openDeleteModal = (id) => {
setAddressToDelete(id);
setIsDeleteModalOpen(true);
};

const confirmDelete = async () => {
 if (!addressToDelete) return;
 setIsDeleteModalOpen(false);
 showLoader();  

try{
const res = await deleteAddressAPI(addressToDelete);
if (res.success){
 notify.success("Address deleted successfully!");
 fetchAddresses();  
}
}
catch(error){
notify.error("Failed to delete address");
}
finally{
hideLoader();
setAddressToDelete(null); 
}
}


const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

return(
<div className="md:py-7 md:px-3" style={{ userSelect: "none" }}>
<div className="flex flex-col lg:flex-row gap-8">

<div className="flex-1">
<div className="flex justify-between items-center mb-6">
<h1 className="text-[13px] md:text-xl font-bold text-gray-800">Address Book</h1>
<Link href="/profile/address/new">
    <button className="bg-amber-500 cursor-pointer hover:bg-amber-600 text-black px-4 py-2 rounded font-semibold text-[13px] md:text-sm transition-all shadow-sm">
        + Add New Address
    </button>
</Link>
</div>

<div className="space-y-4">
{addresses.length > 0 ? addresses.map((addr, index) => {
const isThisDefault = addr.isDefault || (addresses.every(a => !a.isDefault) && index === 0);

return(
<div key={addr._id} className="bg-white border border-gray-100 rounded-md p-5 shadow-sm flex flex-col md:flex-row md:justify-between items-start hover:shadow-md transition-shadow">
<div className="text-sm text-gray-700 space-y-1">
{isThisDefault ? (
 <span className="bg-blue-600 text-white text-[10px] px-3 py-2 rounded font-bold">
     Default
 </span>
): (
<button 
onClick={() => handleSetDefault(addr._id)}
className="text-blue-600 text-[10px] border border-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-50 transition mb-2 cursor-pointer">
Set as Default
</button>    
)}
<h3 className="font-bold text-[15px] pt-3">{addr.addressType}</h3>
<p className="text-[12px] text-black">{addr.fullName}</p>
<div className='flex justify-between items-center'>
    <p className="text-[12px] text-black">{addr.houseNo} {addr.street}, {addr.city}, {addr.zip}, {addr.country}</p>
</div>
<p className="text-[12px] text-black">{addr.phone}</p>
</div>
<div className="hidden md:flex gap-2">
<button
onClick={() => router.push(`/profile/address/edit/${addr._id}`)}
className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-xs font-semibold transition">
Edit
</button>
<button
onClick={() => openDeleteModal(addr._id)}
className="bg-gray-100 cursor-pointer hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 py-1.5 rounded text-xs font-semibold transition">
Delete
</button>    
</div>
<div className="flex md:hidden justify-between w-full mt-3">
<button
onClick={() => router.push(`/profile/address/edit/${addr._id}`)}
className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-xs font-semibold transition">
Edit
</button>
<button
onClick={() => openDeleteModal(addr._id)}
className="bg-gray-100 cursor-pointer hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 py-1.5 rounded text-xs font-semibold transition">
Delete
</button>    
</div>
</div> 
)}) : (
<div className="text-center text-[15px] py-10 text-gray-500 bg-white rounded-md border border-dashed border-gray-300">
    No address found. Please add one.
</div>    
)}  
</div>
</div>

<div className="lg:w-1/3">
<h2 className="text-xl font-bold text-gray-800 mb-6">Default Address</h2>
<div className="bg-white rounded-md p-6 shadow-lg border-t-4 border-amber-500 sticky top-5">
{defaultAddress ? (
<div className="text-gray-700 space-y-1">
<span className="font-bold text-[15px]">
    {defaultAddress.addressType}
</span>
<p className="text-[13px]">{defaultAddress.fullName}</p>
<p className="text-[13px]">{defaultAddress.houseNo}, {defaultAddress.street} , {defaultAddress.zip}, {defaultAddress.idNumber}</p>
<p className="text-[13px]">{defaultAddress.city}, {defaultAddress.state}, {defaultAddress.zip}, {defaultAddress.country}</p>
<p className="text-[13px]">{defaultAddress.phone}</p>

<div className='text-[13px] cursor-pointer'>
<button onClick={() => router.push(`/profile/address/edit/${defaultAddress._id}`)}
className='underline cursor-pointer font-bold hover:text-amber-600'>Change Default Address</button>
</div>
</div>
): (
<div className="text-center">
<p className="text-gray-500 text-sm mb-4">No default address set.</p>
<Link href="/profile/address/new">
    <button className="bg-amber-500 cursor-pointer hover:bg-amber-600 text-black px-4 py-2 rounded font-semibold text-[12px] md:text-sm">
        + Add Address
    </button>
</Link>
</div>    
)}
</div>
</div>
</div>

{isDeleteModalOpen && (
<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
<div 
className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
onClick={() => setIsDeleteModalOpen(false)}
></div>
<div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 overflow-hidden animate-in fade-in zoom-in duration-200">
<div className="text-center">
<div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-4">
<svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>
</div>
<h3 className="text-xl font-bold text-gray-900 mb-2">Delete Address?</h3>
<p className="text-sm text-gray-500 mb-6">
    Are you sure you want to delete this address? This action cannot be undone.
</p>
<div className="flex gap-3 justify-center">
<button
onClick={() => setIsDeleteModalOpen(false)}
className="flex-1 px-4 cursor-pointer py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold rounded-lg transition"
>
No, Keep it
</button>
<button
onClick={confirmDelete}
className="flex-1 cursor-pointer px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition shadow-lg active:scale-95"
>
Yes, Delete
</button>
</div>
</div>
</div>
</div>
)}

</div>
)
}