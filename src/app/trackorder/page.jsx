'use client';

import { useState,useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import notify from "@/src/utils/toast";
import { trackOrderPublicAPI } from "@/src/services/ordersServics";


export default function page() {
const [orderId, setOrderId] = useState('');
const [expanded, setExpanded] = useState(false);
const [phone, setPhone] = useState('');
const [showStatus, setShowStatus] = useState(false);
const [loading, setLoading] = useState(false);
const [trackingData, setTrackingData] = useState(null);

const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};


useEffect(() => {
    window.scrollTo(0, 0);
},[]);


const handleTrack = async () => {

if (!orderId){
 return notify.error("Please enter Order ID"); 
}

if (!phone){
 return notify.error("Please enter Phone Number"); 
}

if(orderId && phone){
setLoading(true);

try{
const data = await trackOrderPublicAPI(orderId.trim(), phone.trim());

if(data){
  setTrackingData(data.order);
  setShowStatus(true);
  notify.success("Order Tracking Successfully!");
}
}
catch(error){
 notify.error(error.message || "Order not found!");
 setTrackingData(null);
 setLoading(false);
}
finally{
setLoading(false);  
}
}
}

const faqs = [
{id: 'faq1',
question: "How can I track my order?",
answer: `You can easily track your order with the track order link that you've received through your order confirmation mail/SMS. You can also track your order using the track order option available at the bottom of the page on our website. For app users, the track order option is present on the menu icon. For any additional support, you can <a href="/contact" style="color: blue; text-decoration: underline;">Contact Our Support Team</a>`
},
{id: 'faq2',
question: "What do the different order statuses mean?",
answer: "Order statuses typically indicate the current stage of your order. <br/><b>Pending:</b> Received but not processed.<br/><b>Processing:</b> Being prepared.<br/><b>Shipped:</b> On its way.<br/><b>Delivered:</b> Arrived at address."
},
{id: 'faq3',
question: "Can I change my delivery address after placing the order?",
answer: "In case if you require to change your delivery address after placing the order, please contact our customer support or assigned courier company for assistance."
},
{id: 'faq4',
question: "What should I do if my order is delayed?",
answer: "If your order gets delayed for some reason, first, you can track its status and then contact our customer support for assistance. In this way, you can be tension-free about your order and know its current status and the reasons behind its delay."
},
{ id: 'faq5',
question: "What happens if I miss my delivery?",
answer: `Set the delivery of your product within the specific timeframe that can be chosen while checking out. Anyhow, if you miss your product delivery, then the shipment will be returned to the country of origin. The customer can only file a refund claim if it’s eligible as per  <a href="/privacy-policy" style="color: blue; text-decoration: underline;">Kawsar'Shop Privacy Policy</a>`
},
{ id: 'faq6',
question: "Why is my tracking number not updating?",
answer: "There are several reasons why your tracking number might not be updated, like processing delays, carrier issues, label creations, lost packages and so on. For help, you can contact our customer support and clear out the confusion as required."
},
];

return (
<div className="font-sans text-gray-800 pt-20 md:pt-0">

<section className="py-16 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between bg-white">
  <div className="md:w-1/2 mb-10 md:mb-0">
    <h1 className="text-4xl font-bold text-[#FFB100] leading-tight mb-2">
      TRACK YOUR ORDER <br /> INSTANTLY!
    </h1>
    <p className="text-gray-600 mb-6 italic">Real-Time Updates, Hassle-Free Tracking!</p>
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Enter your order id"
        className="border border-gray-300 p-3 rounded-md w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your phone number"
        className="border border-gray-300 p-3 rounded-md w-full sm:w-80  focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="w-full sm:w-80  bg-[#FFB100] hover:bg-[#e69c00] cursor-pointer text-black font-bold py-3 px-8 rounded-md transition duration-300" onClick={handleTrack}>
        Track Order
      </button>
    </div>
  </div>
  <div className="md:w-1/2 flex justify-center">
    <img 
      src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1778766916/track-banner.png_wnipi3.webp" 
      alt="Order Tracking Illustration" 
      className="max-w-full h-auto"
    />
  </div>
</section>


<section className="pb-10">
{showStatus && trackingData && (
<div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl overflow-hidden shadow-xl mt-10">
<div className="bg-black text-white p-4 flex justify-between items-center">
<Typography variant="body2" className="font-mono">
    ORDER ID: {trackingData._id}
</Typography>
    <span className="bg-[#FFB100] text-black px-3 py-1 rounded-md font-bold text-xs">
        {trackingData.orderStatus}
    </span>
</div>

<div className="p-6 bg-white">
<div className="grid md:grid-cols-2 gap-6">
<div>
    <h3 className="font-bold border-b pb-2 mb-3">Product Summary</h3>
    {trackingData.orderItems.map((item, index) => (
        <div key={index} className="flex gap-4 mb-4 items-center">
            <img src={item.image} className="w-16 h-16 object-cover rounded shadow" alt={item.name} />
            <div>
                <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                <p className="text-gray-500 text-xs">Qty: {item.quantity} | Size: {item.size[0] || 'N/A'}</p>
                <p className="text-[#FFB100] font-bold">${item.price}</p>
            </div>
        </div>
    ))}
</div>

<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-bold border-b pb-2 mb-3">Shipping Details</h3>
<p className="text-sm font-semibold">{trackingData.shippingAddress.name}</p>
<p className="text-gray-600 text-xs">{trackingData.shippingAddress.address}, {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state}, {trackingData.shippingAddress.country}</p>
<p className="text-gray-600 text-xs">Phone: {trackingData.shippingAddress.phone}</p>
                    
    <div className="mt-5 pt-3 border-t border-dashed border-gray-300">
        <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${trackingData.itemsPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span>Shipping ({trackingData.shippingMethodName}):</span>
            <span>${trackingData.shippingPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-black mt-2">
            <span>Grand Total:</span>
            <span>${trackingData.totalAmount.toLocaleString()}</span>
        </div>
    </div>
</div>

</div>
</div>
</div>
)}
</section>


<section className="bg-[#FFC33B] py-12 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between">
  <div className="md:w-1/2 mb-8 md:mb-0">
    <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
      FAST SHIPPING WITH TRUSTED <br /> PARTNERS!
    </h2>
    <div className="flex gap-4 mb-4">
      <div><img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1778766917/dhl.png_ofoxcn.webp" alt="DHL" className="h-9 w-auto" /></div>
      <div><img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1778766916/fedEx.png_hu6bxa.webp" alt="FedEx" className="h-9 w-auto" /></div>
      <div><img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1778766916/aramex.png_gv80p0.webp" alt="Aramex" className="h-9 w-auto" /></div>
    </div>
    <p className="text-white text-sm">Seamless Global Delivery – Secure, Speedy & Hassle-Free!</p>
  </div>
  <div className="md:w-1/2 flex justify-end">
    <img 
      src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1778766917/map-banner.png_j2js9p.webp" 
      alt="Global Shipping Map" 
      className="max-w-full h-auto opacity-90"
    />
  </div>
</section>


<section className="py-16 px-4 md:px-20 bg-gray-50">
<h2 className="text-3xl font-bold text-center mb-10 underline decoration-yellow-400 underline-offset-8">FAQs</h2>
{faqs.map((item) => (
<Accordion 
  key={item.id} 
  expanded={expanded === item.id} 
  onChange={handleChange(item.id)}
  sx={{ 
    mb: 1.5, 
    boxShadow: '0px 2px 5px rgba(0,0,0,0.05)', 
    '&:before': { display: 'none' }, 
    border: '1px solid #eaeaea', 
    borderRadius: '12px !important',
    overflow: 'hidden',
  }}
>
<AccordionSummary
  expandIcon={<ChevronDown size={20} />}
  sx={{ 
    backgroundColor: expanded === item.id ? '#fcfcfc' : 'white',
    '& .MuiAccordionSummary-content': { alignItems: 'center' }
  }}
>
<Typography sx={{ fontWeight: '600', fontSize: {xs: '12px', md: '1.1rem'} }}>
  {item.question}
</Typography>
</AccordionSummary>
<AccordionDetails sx={{ borderTop: '1px solid #f0f0f0', py: 3 }}>
<Typography 
  component="div"
  sx={{ color: '#555', lineHeight: '1.6' }}
  dangerouslySetInnerHTML={{ __html: item.answer }}
/>
</AccordionDetails>
</Accordion>
))}
</section>


</div>
  );
};
