'use client'

import Link from 'next/link';
import notify from '@/src/utils/toast';
import { updateOrderStatusAPI } from '@/src/services/ordersServics';
import { useAuth } from '@/src/context/AuthContext';


export default function OrderCardView({ orders }) {

const { token } = useAuth();

const handleCancelOrder = async (orderId) =>{
try{
const res = await updateOrderStatusAPI(orderId, 'Cancelled', token);
if (res.success){
notify.success("Order cancelled successfully!");
window.location.reload(); 
}
}
catch(error){
 notify.error(err.message || "Failed to cancel order"); 
}
}

if (orders.length === 0) {
 return <div className="text-center py-10 text-gray-400 text-[10px] md:text-[13px]">No orders found in this category.</div>;
}

return(
<div className="md:hidden space-y-3">
{orders.map((order) => {

const totalOrderQty = order.orderItems.reduce((sum, i) => sum + i.quantity, 0);
const perUnitShipping = totalOrderQty > 0 ? order.shippingPrice / totalOrderQty : 0;

return order.orderItems.map((item, index) => {

const itemShipping = perUnitShipping * item.quantity;
const itemTotal = (item.price * item.quantity) + itemShipping;

return(

<div key={`${order._id}-${index}`} className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">         
<div className="mb-3">
<div className='flex flex-row justify-between items-center'>
<p className="text-[10px] font-bold flex flex-row gap-2 text-slate-800">Order ID <span className='text-[8px]'>#{order._id}</span></p>
<Link href={`/profile/order-details/${order._id}`} className="text-[8px] cursor-pointer text-blue-600 font-medium hover:underline">
    View Details
</Link>
</div>

<div className='pt-1 pb-1 flex justify-between'>
  <p className="text-[10px] text-gray-400">
    Placed On {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
  </p>

<span className="text-[10px] font-bold text-gray-500 capitalize">
  {order.isPaid ? 'Paid' : 'Unpaid'}
</span>
</div>

<div className='flex justify-end'>
{order.orderStatus === 'Pending' && (
<button onClick={() => handleCancelOrder(order._id)}
  className='border rounded-md cursor-pointer px-5 py-2 text-[10px] font-bold text-gray-500 hover:bg-rose-500 hover:text-white transition-all'>
  Cancel Order
</button>
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
  <p className="text-[8px] text-gray-400 mt-1">Seller: {item.catetitle || 'KawsarShop'}</p>
  <span className={`py-1 px-1 rounded font-bold border ${
  order.orderStatus === 'Pending' ? 'bg-blue-50 text-[7px] text-blue-600 border-orange-100' : 
  order.orderStatus === 'Confirmed' ? 'bg-cyan-50 text-[7px] text-cyan-600 border-cyan-100' : 
  order.orderStatus === 'Processing' || order.orderStatus === 'To Ship' ? 'bg-purple-50 text-[7px] text-purple-600 border-purple-100' :
  order.orderStatus === 'Shipped' ? 'bg-orange-50 text-[7px] text-orange-500 border-blue-100' :
  order.orderStatus === 'Out for Delivery' ? 'bg-yellow-50 text-[5px] text-yellow-700 border-yellow-200' :
  order.orderStatus === 'Delivered' ? 'bg-green-50 text-[7px] text-green-600 border-green-100' :
  order.orderStatus === 'Cancelled' ? 'bg-pink-50 text-[7px] text-pink-500 border-rose-100' : 
  'bg-gray-50 text-gray-600'
}`}>
  {order.orderStatus}
</span>
      </div>
  </div>
</div>

<div className="px-1 bg-gray-50/30 border-t border-gray-100">
<p className="text-[10px] font-bold text-slate-700">
  Total ({item.quantity} Items): 
  <span className="ml-2 font-black">${itemTotal.toLocaleString()}</span>
</p>
</div>
</div>
);
});
})}
</div>
);
}