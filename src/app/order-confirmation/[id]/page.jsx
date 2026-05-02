'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getOrderByIdAPI } from '@/src/services/ordersServics'; 
import { useAuth } from '@/src/context/AuthContext';
import notify from '@/src/utils/toast';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/src/context/ItemLoaderContext';

export default function OrderConfirmationPage() {
const { id } = useParams();
const { token } = useAuth();
const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);
const router = useRouter();
const {showLoader, hideLoader} = useLoader();

useEffect(() => {
const fetchOrderDetails = async () => {
if (!id || !token) return;

try {
showLoader()
setLoading(true);
const res = await getOrderByIdAPI(id, token);
if (res) {
    setOrder(res.order || res.data || res);
}
} catch (err) {
    notify.error("Order load failed!");
} finally {
    hideLoader();
    setLoading(false);
}
};
fetchOrderDetails();
}, [id, token]);

if (loading) {
return (
<div className="min-h-screen flex flex-col items-center justify-center bg-white">
<div className="w-16 h-16 border-4 border-[#BC105C] border-t-transparent rounded-full animate-spin"></div>
<p className="mt-4 text-slate-600 font-bold animate-pulse">Loading...</p>
</div>
);
}

if (!order) {
return (
<div className="min-h-screen flex flex-col justify-center items-center">
    <h2 className="text-xl font-bold">Order Not Found!</h2>
    <p>ID: {id}</p>
    <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">
        Try Reloading
    </button>
</div>
);
}


return (
<div className='pt-30 xl:pt-0'>
<div className="max-w-4xl mx-auto p-4 md:py-10">
<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
<h1 className="text-[15px] md:text-2xl font-bold text-emerald-600 mb-2">Order Confirmed!</h1>
<p className="text-gray-600 text-[12px] md:text-[15px] mb-6">Thank you for your purchase. Your order ID is <span className="font-bold">#{order._id}</span></p>

<div className="grid md:grid-cols-2 gap-8">
<div className="space-y-2">
    <h3 className="font-bold border-b pb-2">Shipping Address</h3>
    <p className="text-sm">{order.shippingAddress.name}</p>
     <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
    <p className="text-sm">{order.shippingAddress.address}</p>
    <p className="text-sm font-semibold">Phone: {order.shippingAddress?.phone}</p>
</div>

<div className="space-y-2">
    <h3 className="font-bold border-b pb-2">Order Summary</h3>
    <div className="flex justify-between text-sm">
        <span>Status:</span>
        <span className="font-bold text-orange-500">{order.orderStatus}</span>
    </div>
    <div className="flex justify-between text-sm">
        <span>Payment:</span>
        <span className="font-bold">{order.paymentMethod}</span>
    </div>
    <div className="flex justify-between text-lg font-bold pt-4 border-t">
        <span>Total Amount:</span>
        <span>${order.totalAmount}</span>
    </div>
</div>
</div>

<div className="mt-10">
<h3 className="font-bold mb-4 text-lg">Items Ordered</h3>
<div className="space-y-4">
{order.orderItems?.map((item, index) => (
<div key={index} className="flex items-center md:items-start justify-between gap-5 border-b pb-4">
<div className='shadow-md p-2 rounded-md border border-gray-300 cursor-pointer'>
    <img src={item.image} alt={item.name} 
    className="w-17 h-20 rounded" />
</div>
<div className="flex-1">
<h4 className="text-[12px] md:text-sm font-bold line-clamp-1">{item.name}</h4>
<h4 className="text-sm text-[12px]">{item.category}</h4>
<p className="text-xs text-gray-500">Quanity: {item.quantity}</p>
</div>
<span className="font-bold text-[13px] md:text-[17px]">${item.price * item.quantity}</span>
</div>
))}
</div>
</div>

<div className="mt-10 flex flex-col md:flex-row gap-4 pt-8">
<button 
onClick={() => router.push('/')} 
className="flex-1 bg-orange-500 cursor-pointer text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-all text-center"
>
Back to Home
</button>
<button 
onClick={() => router.push('/profile/order')}
className="flex-1 border cursor-pointer border-slate-900 text-slate-900 py-3 rounded-md font-bold hover:bg-gray-50 transition-all text-center"
>
View My Orders
</button>
</div>
</div>
</div>
</div>
);
}