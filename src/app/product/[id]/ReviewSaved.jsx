'use client'

import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Modal, Box, Typography, TextField, Button, Select, FormControl, InputLabel } from '@mui/material';
import { X } from 'lucide-react';
import { updateProductReview, deleteProductReview } from '@/src/services/reviewServics';
import notify from '@/src/utils/toast';
import { useAuth } from '@/src/context/AuthContext';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: '90%', bgcolor: 'background.paper', borderRadius: '12px', boxShadow: 24, p: 4, outline: 'none', maxWidth: '450px'
};

export default function ReviewSaved({ reviews, productId }) {
const { user, token } = useAuth();
const [anchorEl, setAnchorEl] = React.useState(null);
const [selectedReview, setSelectedReview] = React.useState(null);
const [isLoading, setIsLoading] = React.useState(false);
const [step, setStep] = React.useState(0); 
const [reason, setReason] = React.useState('');
const [editRating, setEditRating] = React.useState(5);
const [editComment, setEditComment] = React.useState("");
const [isDeleting, setIsDeleting] = React.useState(false);
const [isReporting, setIsReporting] = React.useState(false);
const open = Boolean(anchorEl);

const currentUserId = user?._id || user?.id || null;

const isOwnReview = selectedReview?.userId && currentUserId 
  ? selectedReview.userId.toString() === currentUserId.toString() 
  : false;

  
const handleClick = (event, review) => {
  setAnchorEl(event.currentTarget);
  setSelectedReview(review);
};

const handleClose = () => {
  setAnchorEl(null);
};


const openReasonModal = () => {
    if (selectedReview) {
      setIsReporting(false);
      setStep(1); 
      handleClose();
    }
};

const openDeleteModal = () => {
    if (selectedReview) {
      setIsDeleting(true);
      setIsReporting(false);
      setStep(1); 
      handleClose();
    }
};


const openReportModal = () => {
  if (selectedReview) {
    setIsReporting(true);
    setIsDeleting(false);
    setStep(1);
    handleClose();
  }
};


const handleReasonSubmit = () => {
 if(!reason) return notify.warning("Please select a reason");
 
 if (isReporting) {
      setStep(3);
      return;
 }

 if(isDeleting){
  setStep(3);
  return;
 }
  setEditRating(selectedReview.rating || 5);
  setEditComment(selectedReview.comment || "");
  setStep(2); 
}


const handleUpdate = async () => {
if (!selectedReview) return;
if (!token) return notify.info("Login Required");
setIsLoading(true);
if (!productId) {
  notify.error("Frontend Error: Product ID is still missing!");
  return;
}

try {
const authData = localStorage.getItem('kawsarshop_auth');
if (!authData) return notify.warning("Please login first!")
const parsedData = JSON.parse(authData);
const token = parsedData.token || parsedData.accessToken || parsedData.data?.token;

const response = await updateProductReview({
  productId: productId,
  reviewId: selectedReview._id,
  rating: editRating,
  comment: editComment
}, token);
    
if(response.success) {
   notify.success("Review Updated!");
   closeModal();
   window.location.reload();
}
} catch (err) {
    console.error("Backend Error: " + err.message); 
  } finally{
    setIsLoading(false);
  }
};


const closeModal = () => {
  setStep(0);
  setReason('');
  setIsDeleting(false);
  setIsReporting(false);
  setSelectedReview(null);
  setIsLoading(false);
};


const handleDelete = async () => {
if (!selectedReview) return;
if (!token) return notify.info("Login Required");
setIsLoading(true);
try {
const authData = localStorage.getItem('kawsarshop_auth');
const token = authData ? JSON.parse(authData).token || JSON.parse(authData).accessToken : null;
if (!token) return notify.info("Login Required");
await deleteProductReview({
  productId: productId,
  reviewId: selectedReview._id,
  orderId: selectedReview.orderId
}, token);

notify.success("Review Deleted!");
closeModal();
window.location.reload();
}catch (err) {
console.error("Error deleting review: " + err.message);
notify.error("Delete failed!");
}finally {
  setIsLoading(false);
}
};


const handleReport = async () => {
if (!selectedReview) return;
if (!token) return notify.info("Login Required"); 
setIsLoading(true);
try{
await new Promise(resolve => setTimeout(resolve, 1500));
notify.success("Report submitted successfully!");
closeModal();
}
finally{
setIsLoading(false);  
}
}

return (
<div className="w-full flex flex-col gap-6">

{(!reviews || reviews.length === 0) && (
  <div className="text-center py-10 rounded-lg">
    <p className="text-gray-500 font-medium">No reviews yet!</p>
  </div>
)}

{reviews && reviews.map((review, index) => (
<div key={index} className='flex flex-row gap-4 border-b border-gray-50 pb-4 last:border-0'>
<div className="shrink-0">
  <img src={review.userImage || "https://res.cloudinary.com/dkmzakgx2/image/upload/v1773324319/5_d3ytz1.jpg"} className="rounded-full w-12 h-12 object-cover border" alt="" />
</div>

<div className='flex flex-col gap-1 w-full'>
<div className="flex justify-between items-start">
  <p className="font-bold text-gray-800 capitalize">{review.username}</p>
  <IconButton onClick={(e) => handleClick(e, review)} size="small">
    <MoreVertIcon fontSize="small" />
  </IconButton>
</div>

<div className="flex items-center justify-between">
  <div className='flex items-center gap-2'>
  <Rating
    value={review.rating}
    readOnly
    size="small"
    emptyIcon={<StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />}
    sx={{ fontSize: "14px", color: '#E2136E' }}
  />
  <span className="text-[8px] md:text-[10px] font-bold text-emerald-600 uppercase">Verified Purchase</span>
</div>
<p className="text-[8px] md:text-[11px] text-gray-400">
  {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : "Just now"}
</p>
</div>
<div className="mt-1 bg-gray-50 p-3 rounded-lg border-l-2 border-[#E2136E]">
  <p className="text-gray-600 text-sm">{review.comment}</p>
</div>
</div>
</div>
))}

<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
 {isOwnReview ? (
  [
  <MenuItem key="edit" onClick={openReasonModal} sx={{ fontSize: '14px' }}>Edit Review</MenuItem>,
  <MenuItem key="delete" onClick={openDeleteModal} sx={{ fontSize: '14px', color: 'red' }}>Delete Review</MenuItem>
  ]
 ) : (
  <MenuItem onClick={openReportModal} sx={{ fontSize: '14px', color: 'red' }}>Report Review</MenuItem>
 )}
</Menu>



<Modal open={step === 1} onClose={closeModal} sx={{ zIndex: 99999 }}>
<Box sx={modalStyle}>
<div className="flex justify-end">
  <IconButton onClick={closeModal} size="small"><X size={18}/></IconButton>
</div>
<Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1 }}>
{isReporting 
  ? "Select Report Reason" 
  : isDeleting 
    ? "Select Delete Reason" 
    : "Select Edit Reason"
}
<span className="text-red-500">*</span></Typography>
          
<FormControl fullWidth sx={{ mb: 3 }}>
  <Select
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    displayEmpty
    sx={{ borderRadius: '8px', height: '45px'}}
    MenuProps={{
    style: { zIndex: 1000000 }
  }}
  >
<MenuItem value="" disabled>Select</MenuItem>
{isReporting ? (
  [
<MenuItem key="spam" value="Spam">Spam</MenuItem>,
<MenuItem key="fake" value="Fake Review">Fake Review</MenuItem>,
<MenuItem key="offensive" value="Offensive Content">Offensive Content</MenuItem>,
<MenuItem key="irrelevant" value="Irrelevant">Irrelevant</MenuItem>,
<MenuItem key="other" value="Other">Other</MenuItem>,
  ]
) : [
<MenuItem value="Refund Issue">Return / Refund Issue</MenuItem>,
<MenuItem value="Wrong Picture">Wrong Picture</MenuItem>,
<MenuItem value="Service Issue">Service Related Issue</MenuItem>,
<MenuItem value="Rude Review">Rude/ Abusive review</MenuItem>,
<MenuItem value="Other">Other</MenuItem>,
]}
  </Select>
</FormControl>
  <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1 }}>Description</Typography>
  <TextField 
    fullWidth multiline rows={3} 
    placeholder="Tell us more..."
    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
  />
  <Button 
    fullWidth variant="contained" 
    disabled={isLoading}
    sx={{ bgcolor: '#E2136E', py: 1.2, borderRadius: '8px', textTransform: 'none', '&:hover': {bgcolor: '#c1105d'} }}
    onClick={handleReasonSubmit}
  >
    {isLoading ? "Submitting..." : "Submit"}
  </Button>
</Box>
</Modal>

<Modal open={step === 2} onClose={closeModal} sx={{ zIndex: 9999999 }}>
<Box sx={modalStyle}>
<div className="flex justify-between items-center mb-4">
  <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Edit Your Review</Typography>
  <IconButton onClick={closeModal}><X size={20}/></IconButton>
</div>

<div className="mb-4">
  <Typography sx={{ fontSize: '14px', mb: 1 }}>Rating:</Typography>
  <Rating value={editRating} onChange={(e, val) => setEditRating(val)} />
</div>
<TextField
  fullWidth multiline rows={4}
  variant="outlined"
  label="Your Review"
  value={editComment}
  onChange={(e) => setEditComment(e.target.value)}
  sx={{ mb: 3 }}
/>

<Button 
  fullWidth variant="contained" 
  disabled={isLoading}
  sx={{ bgcolor: '#E2136E', '&:hover': {bgcolor: '#c1105d'} }}
  onClick={handleUpdate}
>
  {isLoading ? "Updating..." : "Save Changes"}
</Button>
</Box>
</Modal>



<Modal open={step === 3} onClose={closeModal} sx={{ zIndex: 9999999 }}>
  <Box sx={modalStyle}>
    <div className="flex justify-between items-center mb-4">
    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold', color: '#d32f2f' }}>
      {isReporting ? "Confirm Report" : "Confirm Delete"}
    </Typography>
    <IconButton onClick={closeModal}><X size={20}/></IconButton>
  </div>
  <Typography sx={{ fontSize: '15px', color: '#555', mb: 4 }}>
   {isReporting
              ? "Are you sure you want to report this review as abusive?"
              : "Are you sure you want to delete this review? This action cannot be undone."
    }
  </Typography>
  <div className="flex gap-3">
    <Button 
      fullWidth 
      variant="outlined" 
      onClick={closeModal}
      sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}
    >
      No, Keep it
    </Button>
    <Button 
      fullWidth 
      variant="contained" 
      disabled={isLoading}
      onClick={isReporting ? handleReport : handleDelete}
      sx={{ 
        bgcolor: '#d32f2f', 
        textTransform: 'none', 
        '&:hover': { bgcolor: '#b71c1c' } 
      }}
    >
     {isLoading
       ? (isReporting ? "Reporting..." : "Deleting...")
       : (isReporting ? "Yes, Report" : "Yes, Delete")
     }
    </Button>
  </div>
</Box>
</Modal>
</div>
  );
}