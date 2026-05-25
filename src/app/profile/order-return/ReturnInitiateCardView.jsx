'use client'

import * as React from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { X, Camera } from 'lucide-react';
import notify from '@/src/utils/toast';
import { updateOrderStatusAPI } from '@/src/services/ordersServics';
import { useAuth } from '@/src/context/AuthContext';
import { applyReturnAPI, cancelReturnRequestAPI, uploadReturnProblemImages } from '@/src/services/returnServics';


const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90%', bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 4, outline: 'none', maxWidth: '450px'
};

export default function ReturnInitiateCardView({ orders, returnHistory = [] }) {


const { token } = useAuth();
const fileInputRef = useRef(null);
const [step, setStep] = React.useState(0);
const [modalType, setModalType] = React.useState('');
const [isLoading, setIsLoading] = React.useState(false);
const [selectedOrderId, setSelectedOrderId] = React.useState(null);
const [selectedItemId, setSelectedItemId] = React.useState(null);
const [selectedReturnId, setSelectedReturnId] = React.useState(null); 
const [reason, setReason] = React.useState('');
const [description, setDescription] = React.useState('');
const [selectedMethod, setSelectedMethod] = React.useState("PickUp");
const [selectedImages, setSelectedImages] = React.useState([]);
const [payoutChannel, setPayoutChannel] = React.useState('');
const [refundMethod, setRefundMethod] = React.useState('Wallet');
const [accountDetails, setAccountDetails] = React.useState({
  email: '',
  cardName: '',
  cardNumber: '',
  cardIssuer: '',
  providerName: '',
  accountNumber: '',
});


useEffect(()=> {
window.scrollTo(0,0)
},[])


const methods = [
{
  id: "DropOff",
  title: "Drop-Off",
  description: "Drop off the item at your nearest partner courier hub or designated collection point at your convenience.",
  cost: 0
},
{
  id: "PickUp",
  title: "Pick-Up",
  description: "Our courier agent will come directly to your doorstep to securely collect the return package.",
  cost: 16
},
];




const closeModal = () => {
setStep(0);
setModalType('');
setReason('');
setDescription('');
setSelectedOrderId(null);
setSelectedItemId(null);
setSelectedReturnId(null);
setSelectedImages([]);
setIsLoading(false); 
setRefundMethod('Wallet');
setPayoutChannel('');
setAccountDetails({
  email: '', cardName: '', cardNumber: '', cardIssuer: '',
  providerName: '', accountNumber: '',
});
};



const openApplyReturnModal = (orderId, itemId) => {
setSelectedOrderId(orderId);
setSelectedItemId(itemId);
setModalType('APPLY_RETURN');
setStep(1) 
};



const openCancelReturnModal = (orderId, productActualId) =>{
 const matchedReturn = returnHistory.find(ret => 
  ret.orderId === orderId && 
  ret.status === 'Pending' &&
  ret.returnedItems.some(item => item.product === productActualId)
 );
 if (matchedReturn){
  setSelectedReturnId(matchedReturn._id);
 } else{
  const fallbackReturn = returnHistory.find(ret => ret.orderId === orderId && ret.status === 'Pending');
  if (fallbackReturn) setSelectedReturnId(fallbackReturn._id);
 }
   setSelectedOrderId(orderId);
   setModalType('CANCEL_RETURN');
   setStep(7);
};


const handleReasonSubmit = () => {
 if (!reason) return notify.warning("Please select a reason!");
 if (modalType === 'APPLY_RETURN' && (!description || !description.trim())) {
   return notify.warning("Please write a description!");
 }
 if (modalType === 'APPLY_RETURN') {
   setStep(2);
 } else {
   setStep(7);
 }
};



const handleImageStepSubmit = () => {
if(selectedImages.length === 0) {
  return notify.warning("Please upload proof photo!");
}
setStep(3);
};


const handleRefundMethodSubmit = () => {
  if(refundMethod === 'Wallet'){
    setStep(6);
  } else{
    setStep(4)
  }
}


const handleImageChange = (e) => {
const files = Array.from(e.target.files);
if(files.length + selectedImages.length > 5){
  return notify.warning("Maximum 5 images allowed!");
}  
const newFiles = [];

files.forEach((file) => {
  const isDuplicate = selectedImages.some(
   (existingFile) => existingFile.name === file.name && existingFile.size === file.size 
  );

  if(isDuplicate){
     notify.warning("Image Is Already Selected");
   } else {
     newFiles.push(file);
   }
});

if(newFiles.length > 0){
  setSelectedImages((prev) => [...prev, ...newFiles]);
}
};

const removeImage = (index) => {
  setSelectedImages(selectedImages.filter((_, i) => i !== index));
};




const getCleanAccountDetails = () => {
 if(payoutChannel === 'PayPal'){
  return { email: accountDetails.email };
 }
 if(payoutChannel === 'Card'){
  return{
    cardName: accountDetails.cardName, 
    cardNumber: accountDetails.cardNumber,
    cardIssuer: accountDetails.cardIssuer
  };
 }
 if(payoutChannel === 'Mobile'){
  return{
    providerName: accountDetails.providerName,
    accountNumber: accountDetails.accountNumber 
  };
 }
 return {};
}



const handleManualDetailsSubmit = () => {
if (!payoutChannel) return notify.warning("Please select a payout channel!");
  
if (payoutChannel === 'PayPal' && !accountDetails.email) {
return notify.warning("Please enter your PayPal email!");
}
if (payoutChannel === 'Card') {
if (!accountDetails.cardName || !accountDetails.cardNumber) return notify.warning("Please fill up card details!");
if (!accountDetails.cardIssuer) return notify.warning("Please select card issuer network!");
}
if (payoutChannel === 'Mobile') {
if (!accountDetails.providerName) return notify.warning("Please select a mobile banking provider!");
if (!accountDetails.accountNumber) return notify.warning("Please enter your mobile wallet number!");
}
setStep(6);
}




const handleFinalSubmit = async () => {

if (!token) return notify.info("Login Required");

if (modalType === 'APPLY_RETURN' && (!description || !description.trim())) {
  return notify.warning("Please write a description!");
}

setIsLoading(true);

try{
if(modalType === 'CANCEL_ORDER'){
 const res = await updateOrderStatusAPI(selectedOrderId, 'Cancelled', token); 
 if(res.success){
  notify.success("Order cancelled successfully!");
  closeModal();
  window.location.reload();
 }
}
else if(modalType === 'APPLY_RETURN'){

let uploadedUrls = [];
if(selectedImages.length > 0){
try{
uploadedUrls = await uploadReturnProblemImages(selectedImages);
}catch(uploadError){
setIsLoading(false);
return notify.error("Image upload failed! Please check your network.");
}
}
  const returnData = {
    orderId: selectedOrderId,
    selectedItemIds: [selectedItemId],
    reason: reason,
    message: description || "User requested return from history table",
    returnMethod: selectedMethod,
    returnShippingCost: selectedMethod === "PickUp" ? 16 : 0,
    images: uploadedUrls,
    refundDetails: {
      method: refundMethod,
      channel: refundMethod === 'Manual' ? payoutChannel : 'Wallet',
      details: refundMethod === 'Manual' ? getCleanAccountDetails() : {}
    }
};

  const res = await applyReturnAPI(returnData, token);
  if(res.success){
    notify.success("Return request submitted successfully!")
    closeModal();
    window.location.reload();
  }
}
else if(modalType === "CANCEL_RETURN"){
if(!selectedReturnId){
setIsLoading(false);
return notify.error("Could not resolve valid Return ID!"); 
}

const res = await cancelReturnRequestAPI(selectedReturnId, token);
if(res.success){
 notify.success("Return request cancelled successfully!");
 closeModal();
 window.location.reload();
}
}
}catch(error){
const backendMessage = error.response?.data?.message || error.message;
console.error("Cancel API Error:", backendMessage);
notify.error("Failed to cancel return request!")
}finally{
 setIsLoading(false);
}
};


return(
<div className="md:hidden block space-y-3" style={{userSelect: "none"}}>
{orders.map((order) => {
return order.orderItems && order.orderItems.map((item, index) => {
const deliveryDateString = order.deliveredAt || order.updatedAt || order.createdAt;
const deliveryDate = deliveryDateString ? new Date(deliveryDateString).getTime() : new Date().getTime();
const daysSinceDelivery = (new Date().getTime() - deliveryDate) / (1000 * 3600 * 24);
const isExpired = daysSinceDelivery > 7;

const specificReturnLog = returnHistory.find(ret => 
  ret.orderId === order._id &&
  ret.returnedItems.some(ri => ri.product === item.product)
);

let finalReturnStatus = item.returnStatus || "Not Applied";
if(specificReturnLog){
  finalReturnStatus = specificReturnLog.status;
}

return(

<div key={`${order._id}-${item._id || index}`} className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">         
<div className="mb-3">
<div className='flex flex-row justify-between items-center'>
<p className="text-[10px] font-bold flex flex-row gap-2 text-slate-800">Order ID <span className='text-[8px]'>#{order._id}</span></p>
<Link href={`/profile/order-details/${order._id}`} className="text-[8px] cursor-pointer text-blue-600 font-medium hover:underline">
    View Details
</Link>
</div>

<div className='pt-1 pb-1 flex justify-between'>

<div className='flex items-center gap-2'>
<p className="text-[8px] text-gray-400">
    Placed On {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
</p>
<span className="text-[8px] font-bold text-emerald-600 capitalize bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
  {order.orderStatus}
</span>
</div>

{order.orderStatus === 'Delivered' && (
<div>
{finalReturnStatus === 'Cancelled' ? (
<div className="w-[8px] h-[1.5rem]"></div>
) : isExpired && finalReturnStatus === 'Not Applied' ? (
<span className="text-[5px] font-bold text-gray-400 bg-gray-100 px-2 py-1.5 rounded-md border border-gray-200 inline-block cursor-not-allowed">
  Return Period Expired
</span>
) : finalReturnStatus === 'Not Applied' ? (
  <button
  onClick={() => openApplyReturnModal(order._id, item._id)}
  className="bg-emerald-600 text-white rounded-md cursor-pointer px-3 py-1.5 text-[6px] font-bold hover:bg-emerald-700 transition-all shadow-sm">
    Apply Return
  </button>
) : finalReturnStatus === 'Pending' || finalReturnStatus === 'Return Requested' ? (
  <button
  onClick={() => openCancelReturnModal(order._id, item.product)}
  className="bg-amber-600 text-white rounded-md cursor-pointer px-2 py-1.5 text-[7px] font-bold hover:bg-amber-700 transition-all shadow-sm">
   Cancel Return
  </button> 
) : (
  <span className="text-[7px] font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
    {finalReturnStatus}
  </span>
)} 
</div>
)}
</div>
</div>

<div className="flex gap-4 py-3 border-t border-gray-50">
  <div className="w-20 h-20 border border-gray-100 rounded-md p-1 bg-white shadow">
    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
  </div>
  <div className="flex-1">
    <h4 className="text-[10px] font-bold text-slate-800 line-clamp-2 uppercase leading-tight">
      {item.name}
    </h4>
    <p className='text-[10px] font-semibold mt-1 text-gray-500'>${item.price.toLocaleString()} x {item.quantity.toLocaleString()}(qty)</p>
     <p className='text-[10px] font-bold mt-1 text-black'>${item.price.toLocaleString() * item.quantity.toLocaleString()}</p>
    <div className='flex flex-row justify-between items-center'>
  <p className="text-[7px] text-gray-400 mt-1">Seller: {item.catetitle || 'KawsarShop'}</p>
<span className={`px-1 py-1 rounded text-[7px] font-bold border ${
 
finalReturnStatus === 'Cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
finalReturnStatus === 'Pending' || finalReturnStatus === 'Return Requested' ? 'bg-amber-50 text-amber-600 border-amber-100' :
finalReturnStatus === 'Drop-off' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
finalReturnStatus === 'Pick-up' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
finalReturnStatus === 'Package Received' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
finalReturnStatus === 'QC Processing' ? 'bg-purple-50 text-purple-600 border-purple-100' :
finalReturnStatus === 'Refunded' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
finalReturnStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
'bg-gray-50 text-gray-600 border-gray-100'
}`}>
  {finalReturnStatus}
</span>
      </div>
  </div>
</div>

<div className="px-1 bg-gray-50/30 border-t border-gray-100">
<p className="text-[10px] font-bold text-slate-700">
  Total ({item.quantity} Items): 
  <span className="ml-2 font-black">${(item.price * item.quantity).toLocaleString()}</span>
</p>
</div>
</div>
);
});
})}


<Modal open={step === 1} onClose={closeModal} sx={{ zIndex: 99999 }}>
<Box sx={modalStyle}>
  <div className="flex justify-end">
    <IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
  </div>
  <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1 }}>
    {modalType === 'APPLY_RETURN' ? 'Select Return Reason' : 'Select Cancel Reason'} <span className="text-red-500">*</span>
  </Typography>
        
  <FormControl fullWidth sx={{ mb: 3 }}>
    <Select
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      displayEmpty
      sx={{ borderRadius: '8px', height: '45px'}}
      MenuProps={{ style: { zIndex: 1000000 } }}
    >
      <MenuItem value="" disabled>Select Reason</MenuItem>
      {modalType === 'APPLY_RETURN' ? [
        <MenuItem key="def" value="Defective Product">Defective/Damaged Item</MenuItem>,
        <MenuItem key="wro" value="Wrong Item">Received Wrong Product</MenuItem>,
        <MenuItem key="size" value="Size Issue">Size doesn't fit</MenuItem>,
        <MenuItem key="qual" value="Quality Issue">Quality not as expected</MenuItem>,
        <MenuItem key="oth" value="Other">Other Reason</MenuItem>
      ] : [
      <MenuItem key="mis" value="Mistake Order">Ordered by mistake</MenuItem>,
      <MenuItem key="prc" value="Price Issue">Found a better price elsewhere</MenuItem>,
      <MenuItem key="del" value="Delivery Delay">Delivery time is too long</MenuItem>,
      <MenuItem key="chg" value="Change Mind">Changed my mind</MenuItem>,
      <MenuItem key="oth_c" value="Other">Other Reason</MenuItem>
    ]}
  </Select>
</FormControl>

<div className="flex justify-between items-center w-full mb-1">
<Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
  Description {modalType === 'APPLY_RETURN' && <span className="text-red-500">*</span>}
</Typography>
<span className={`text-xs font-medium ${description.length >= 50 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
  {description.length}/50
</span>
</div>

<TextField 
  fullWidth multiline rows={3} 
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder={modalType === 'APPLY_RETURN' ? "Please explain the reason in detail..." : "Tell us more details..."}
  inputProps={{ maxLength: 50 }}
  sx={{ 
  mb: 3, 
  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
  '& .MuiOutlinedInput-input': {
      fontSize: { xs: '12px', sm: '13px', md: '14px' }, 
      color: '#334155'
    }, 
    '& .MuiOutlinedInput-input::placeholder': {
      fontSize: { xs: '11px', sm: '12px', md: '13px' },
      opacity: 0.8 
    }
  }}
/>
<Button 
  fullWidth variant="contained" 
  sx={{ bgcolor: '#E2136E', py: 1.2, borderRadius: '8px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}
  onClick={handleReasonSubmit}
>
  Continue
</Button>
</Box>
</Modal>



<Modal open={step === 2} onClose={closeModal} sx={{ zIndex: 9999999 }}>
<Box sx={modalStyle}>
  <div className="flex justify-between items-center mb-3">
    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
      Upload Proof Photos <span className='text-xs text-gray-400'>(Max 5)</span>
    </Typography>
    <IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
  </div>

<div className='mt-2 mb-5'>
<div className="space-y-3">
{selectedImages.length < 5 && (
  <div 
    onClick={() => fileInputRef.current.click()}
    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer group h-28"
  >
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
      <Camera size={18} className="text-[#E2136E]" />
    </div>
    <p className="text-[12px] mt-1 font-bold text-gray-600">Add Return Photos</p>
    <p className="text-[10px] text-gray-400 text-center">Click to browse your gallery</p>
  </div>
)}

<div className="grid grid-cols-4 gap-2 mt-2">
  {selectedImages.map((file, idx) => (
    <div key={idx} className="relative w-full h-16 border rounded-lg overflow-hidden bg-gray-100 shadow-sm">
      <img 
        src={URL.createObjectURL(file)} 
        className="w-full h-full object-cover" 
        alt="preview" 
      />
      <button 
        onClick={() => removeImage(idx)}
        className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-red-600 cursor-pointer text-white p-0.5 rounded-full backdrop-blur-sm flex items-center justify-center"
      >
        <X size={10}/>
      </button>
    </div>
  ))}
</div>
</div>
    
<input 
type="file" 
hidden 
ref={fileInputRef} 
onChange={handleImageChange} 
accept="image/*" 
multiple 
/>
</div>

<div className="flex gap-3">
  <Button 
    fullWidth variant="outlined" 
    onClick={() => setStep(1)}
    sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: '8px', py: 1 }}
  >
    Back
  </Button>
  <Button 
    fullWidth variant="contained" 
    sx={{ bgcolor: '#E2136E', py: 1, borderRadius: '8px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}
    onClick={handleImageStepSubmit}
  >
    Continue
  </Button>
</div>
</Box>
</Modal>




<Modal open={step === 3} onClose={closeModal} sx={{ zIndex: 9999999, userSelect: "none" }}>
<Box sx={modalStyle}>
<div className="flex justify-between items-center mb-3">
  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
    Select Refund Option
  </Typography>
  <IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
</div>
<div className="space-y-3 mb-5">
<div 
className={`flex items-start justify-between p-3 border rounded-xl cursor-pointer transition-all ${
  refundMethod === "Wallet" 
    ? "border-[#E2136E] bg-[#E2136E]/5" 
    : "border-slate-200 bg-white hover:border-slate-300"
}`}
onClick={() => setRefundMethod("Wallet")}
>
<div className="flex gap-3">
  <div className="mt-0.5">
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
      refundMethod === "Wallet" ? "border-[#E2136E]" : "border-slate-300"
    }`}>
      {refundMethod === "Wallet" && <div className="w-2 h-2 bg-[#E2136E] rounded-full"></div>}
    </div>
  </div>
  <div>
    <h4 className="text-[12px] md:text-[14px] font-bold text-slate-800 leading-tight">Refund to KawsarShop Wallet</h4>
    <p className="text-[9px] md:text-[11px] text-slate-600 mt-1 leading-normal">Money will be added instantly as shop credit.</p>
  </div>
</div>
</div>

<div 
className={`flex items-start justify-between p-3 border rounded-xl cursor-pointer transition-all ${
  refundMethod === "Manual" 
    ? "border-[#E2136E] bg-[#E2136E]/5" 
    : "border-slate-200 bg-white hover:border-slate-300"
}`}
onClick={() => setRefundMethod("Manual")}
>
<div className="flex gap-3">
  <div className="mt-0.5">
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
      refundMethod === "Manual" ? "border-[#E2136E]" : "border-slate-300"
    }`}>
      {refundMethod === "Manual" && <div className="w-2 h-2 bg-[#E2136E] rounded-full"></div>}
    </div>
  </div>
  <div>
    <h4 className="text-[12px] md:text-[14px] font-bold text-slate-800 leading-tight">Manual Payout</h4>
    <p className="text-[9px] md:text-[11px] text-slate-600 mt-1 leading-normal">Get cashback via PayPal, Card, Bkash, Nagad or Bank.</p>
  </div>
</div>
</div>
</div>


<div className="flex gap-3">
  <Button fullWidth variant="outlined" onClick={() => setStep(2)} sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: '8px' }}>Back</Button>
  <Button fullWidth variant="contained" onClick={handleRefundMethodSubmit} sx={{ bgcolor: '#E2136E', borderRadius: '8px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}>Continue</Button>
</div>
</Box>
</Modal>



<Modal open={step === 4} onClose={closeModal} sx={{ zIndex: 9999999, userSelect: "none" }}>
<Box sx={{ ...modalStyle, maxWidth: '480px' }}>
<div className="flex justify-between items-center mb-3">
<Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
  Enter Payout Details
</Typography>
<IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
</div>

<Box className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 mb-5 space-y-3">
<Typography sx={{ fontSize: '12px', marginBottom: "5px", fontWeight: 600, color: '#475569' }}>Select Your Payout Channel</Typography>
      
<FormControl fullWidth size="small">
<Select
value={payoutChannel}
style={{fontSize: "12px"}}
onChange={(e) => {
  setPayoutChannel(e.target.value);
  setAccountDetails({
    email: '', cardName: '', cardNumber: '', cardIssuer: '',
    providerName: '', accountType: ''
  });
}}
displayEmpty
sx={{ borderRadius: '8px', bgcolor: '#fff' }}
MenuProps={{
  style: { zIndex: 100000000 },
  PaperProps: { style: { zIndex: 100000000 } }
}}
>
<MenuItem value="" disabled style={{fontSize: "11px"}}>Choose Transfer Medium</MenuItem>
<MenuItem value="PayPal" style={{fontSize: "11px"}}>PayPal</MenuItem>
<MenuItem value="Card" style={{fontSize: "11px"}}>Credit / Debit Card</MenuItem>
<MenuItem value="Mobile" style={{fontSize: "11px"}}>Mobile Banking (BKash/Nagad/Rocket/Upai)</MenuItem>
</Select>
</FormControl>
</Box>

<div className="flex gap-3">
<Button fullWidth variant="outlined" 
onClick={() => setStep(3)} 
sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: '8px' }}>Back</Button>

<Button fullWidth variant="contained" 
onClick={()=> {
 if(!payoutChannel) return notify.warning("Please select a payout channel!"); 
 setStep(5);
}} sx={{ bgcolor: '#E2136E', borderRadius: '8px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}>Continue</Button>
</div>
</Box>
</Modal>



<Modal open={step === 5} onClose={closeModal} sx={{ zIndex: 9999999, userSelect: "none" }}>
<Box sx={{ ...modalStyle, maxWidth: '480px' }}>
<div className="flex justify-between items-center mb-3">
  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
    Enter Payout Details
  </Typography>
  <IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
</div>

<Box className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 mb-5 space-y-3">

{payoutChannel === 'PayPal' && (
  <TextField 
    fullWidth size="small" label="PayPal Email Address" variant="outlined"
    value={accountDetails.email || ''}
    onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})}
    sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
  />
)}

{payoutChannel === 'Card' && (
<div className="space-y-3">
<TextField fullWidth size="small" 
label="CardHolder Name" 
value={accountDetails.cardName ||''} 
onChange={(e) => setAccountDetails({...accountDetails, cardName: e.target.value})} 
sx={{ bgcolor: '#fff',fontSize: "12px", '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
style={{marginBottom: "10px", fontSize: "12px"}}/>

<TextField fullWidth size="small" 
label="Card Number" 
value={accountDetails.cardNumber || ''} 
onChange={(e) => setAccountDetails({...accountDetails, cardNumber: e.target.value})} 
sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
style={{marginBottom: "10px"}}/>
          
<FormControl fullWidth size="small">
<Select
  value={accountDetails.cardIssuer || ''}
  onChange={(e) => setAccountDetails({...accountDetails, cardIssuer: e.target.value})}
  displayEmpty
  sx={{ borderRadius: '8px', bgcolor: '#fff' }}
  MenuProps={{
    style: { zIndex: 100000000 },
    PaperProps: { style: { zIndex: 100000000 } }
  }}
>
  <MenuItem value="" disabled>Select Card (Issuer)</MenuItem>
  <MenuItem value="Visa">Visa</MenuItem>
  <MenuItem value="Mastercard">Mastercard</MenuItem>
  <MenuItem value="American Express">American Express (Amex)</MenuItem>
  <MenuItem value="DBBL Nexus">DBBL Nexus</MenuItem>
</Select>
</FormControl>
</div>
)}

{payoutChannel === 'Mobile' && (
<div className="space-y-3">
<FormControl fullWidth size="small">
  <Select
    value={accountDetails.providerName || ''}
    onChange={(e) => setAccountDetails({...accountDetails, providerName: e.target.value})}
    displayEmpty
    sx={{ borderRadius: '8px', bgcolor: '#fff' }}
    style={{marginBottom: "10px"}}
    MenuProps={{
      style: { zIndex: 100000000 },
      PaperProps: { style: { zIndex: 100000000 } }
    }}
  >
    <MenuItem value="" disabled>Select Mobile Banking Provider</MenuItem>
    <MenuItem value="bKash">bKash</MenuItem>
    <MenuItem value="Nagad">Nagad</MenuItem>
    <MenuItem value="Rocket">Rocket</MenuItem>
    <MenuItem value="Upay">Upay</MenuItem>
  </Select>
</FormControl>
<TextField fullWidth size="small" 
label="Mobile Wallet Number" 
value={accountDetails.accountNumber || ''} 
onChange={(e) => setAccountDetails({...accountDetails, accountNumber: e.target.value})} 
sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
style={{marginBottom: "10px"}}/>
</div>
)}

</Box>

<div className="flex gap-3">
  <Button fullWidth variant="outlined" onClick={() => setStep(4)}
    sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: '8px' }}>
    Back
  </Button>
  <Button fullWidth variant="contained" onClick={handleManualDetailsSubmit}
    sx={{ bgcolor: '#E2136E', borderRadius: '8px', textTransform: 'none', '&:hover': { bgcolor: '#c1105d' } }}>
    Continue
  </Button>
</div>

</Box>
</Modal>




<Modal open={step === 6} onClose={closeModal} sx={{ zIndex: 9999999 }}>
<Box sx={modalStyle}>
  <div className="flex justify-between items-center mb-3">
    <Typography sx={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>
      Select Return Collection Method
    </Typography>
    <IconButton onClick={closeModal} size="small"><X size={15}/></IconButton>
  </div>

 
<div className="space-y-3 mb-5">
{methods.map((method) => {
const isSelected = selectedMethod === method.id;
return (
<div 
key={method.id}
className={`flex items-start justify-between p-3 border rounded-xl cursor-pointer transition-all ${
  isSelected ? "border-orange-500 bg-orange-50/10" : "border-slate-200 bg-white hover:border-slate-300"
}`}
onClick={() => setSelectedMethod(method.id)}
>
    <div className="flex gap-3">
    <div className="mt-0.5">
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
        isSelected ? "border-orange-500" : "border-slate-300"
      }`}>
        {isSelected && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
      </div>
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-800 leading-tight">{method.title}</h4>
      <p className="text-[7px] text-slate-600 mt-1 leading-normal">{method.description}</p>
    </div>
  </div>
  <div className="text-right pl-2">
    <span className="font-bold text-[9px] text-slate-900">
      {method.cost === 0 ? "Free" : `$${method.cost.toFixed(2)}`}
    </span>
  </div>
</div>
);
})}
</div>

<div className="flex gap-3">
<Button 
fullWidth variant="outlined" 
onClick={() => refundMethod === 'Manual' ? setStep(5) : setStep(3)}
sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', borderRadius: '8px', fontSize: '12px' }}
>
Back
</Button>
<Button 
fullWidth variant="contained" 
sx={{ bgcolor: '#E2136E', py: 1.2, borderRadius: '8px', fontSize: '12px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}
onClick={() => setStep(7)}
>
Continue
</Button>
</div>
</Box>
</Modal>




<Modal open={step === 7} onClose={closeModal} sx={{ zIndex: 9999999 }}>
<Box sx={modalStyle}>
  <div className="flex justify-between items-center mb-4">
    <Typography variant="h6" sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' }, fontWeight: 'bold', color: '#d32f2f' }}>
      {modalType === 'CANCEL_ORDER' ? 'Confirm Cancellation' : modalType === 'APPLY_RETURN' ? 'Confirm Return Request' : 'Cancel Return Request'}
    </Typography>
    <IconButton onClick={closeModal}><X size={20}/></IconButton>
  </div>
  <Typography sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' }, color: '#555', mb: 4 }}>
    {modalType === 'CANCEL_ORDER' 
      ? "Are you sure you want to cancel this order? This action cannot be undone."
      : modalType === 'APPLY_RETURN'
        ? "Are you sure you want to apply for a return for this item?"
        : "Are you sure you want to pull back/cancel your return request?"
    }
  </Typography>
  <div className="flex gap-3">
  <Button 
    fullWidth variant="outlined" 
    onClick={closeModal}
    sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc', fontSize: { xs: '10px', sm: '16px', md: '13px', xl: '18px'} }}
  >
    No, Go Back
  </Button>
  <Button 
    fullWidth variant="contained" 
    disabled={isLoading}
    onClick={handleFinalSubmit}
    sx={{ 
      bgcolor: modalType === 'APPLY_RETURN' ? '#4caf50' : '#d32f2f', 
      textTransform: 'none', fontSize: { xs: '9px', sm: '14px', md: '13px', xl: '18px' },
      '&:hover': { bgcolor: modalType === 'APPLY_RETURN' ? '#388e3c' : '#b71c1c' } 
    }}
  >
    {isLoading ? "Processing..." : modalType === 'CANCEL_ORDER' ? "Yes, Cancel Order" : modalType === 'APPLY_RETURN' ? "Yes, Submit Return" : "Yes, Cancel Return"}
  </Button>
</div>
</Box>
</Modal>


</div>
);
}