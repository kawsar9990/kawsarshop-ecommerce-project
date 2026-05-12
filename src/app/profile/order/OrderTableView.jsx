'use client'

import Link from 'next/link';
import notify from '@/src/utils/toast';
import { updateOrderStatusAPI } from '@/src/services/ordersServics';
import { useAuth } from '@/src/context/AuthContext';

export default function OrderTableView({ orders }) {

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


return (
<div className="hidden md:block space-y-6">
{orders.map((order) => {
const totalOrderQty = order.orderItems.reduce((sum, i) => sum + i.quantity, 0);
const perUnitShipping = totalOrderQty > 0 ? order.shippingPrice / totalOrderQty : 0;

return order.orderItems.map((item, index) => {

const itemShipping = perUnitShipping * item.quantity;
const itemTotal = (item.price * item.quantity) + itemShipping;

return(

<div key={`${order._id}-${index}`} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">      
<div className="p-3 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-50">
<div className='w-full flex flex-col gap-2'>

<div className="text-sm flex justify-between items-center mt-3">
<div className='flex justify-between items-center'>
<span className="text-gray-600">Order No:</span>
<span className="font-bold text-slate-800 ml-1">#{order._id}</span>
<Link href={`/profile/order-details/${order._id}`} className="ml-3 text-blue-600 hover:underline text-xs font-medium">View Details</Link>
</div>
<div>
{order.orderStatus === 'Pending' && (
<button onClick={() => handleCancelOrder(order._id)}
  className='border rounded-md cursor-pointer px-5 py-2 text-[10px] font-bold text-gray-500 hover:bg-rose-500 hover:text-white transition-all'>
  Cancel Order
</button>
)}
</div>
</div>

<div className="flex items-center justify-between">
<p className="text-[11px] text-gray-400 mt-0.5">
  Placed on: {new Date(order.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
</p>
<span className="text-[12px] font-bold text-gray-500 capitalize">
  {order.isPaid ? 'Paid' : 'Unpaid'}
</span>
</div>
</div>
</div>

<div className="p-4 overflow-x-auto">
<table className="w-full min-w-[600px] text-xs text-left">
<thead>
<tr className="text-gray-500 border-b-2 border-gray-100">
  <th className="pb-3 font-semibold w-[20%]">Name</th>
  <th className="pb-3 font-semibold text-center">Seller Name</th>
  <th className="pb-3 font-semibold text-center">Image</th>
  <th className="pb-3 font-semibold text-center">Qty</th>
  <th className="pb-3 font-semibold text-center">Amount</th>
  <th className="pb-3 font-semibold text-center">Order Status</th>
</tr>
</thead>

<tbody>
<tr className="align-middle">
<td className="py-5 pr-4">
  <p className="text-emerald-600 font-semibold line-clamp-2">{item.name}</p>
</td>

<td className="py-5 text-center text-slate-600 font-semibold">
  KawsarShop
</td>

<td className="py-5">
<div className="w-14 h-14 border border-gray-200 rounded p-1 mx-auto bg-white">
  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
</div>
</td>

<td className="py-5 text-center font-bold text-slate-700 text-sm">
  {item.quantity}
</td>

<td className="py-5 text-center font-bold text-slate-800 text-sm">
  ${item.price.toLocaleString()}
</td>

<td className="py-5 text-center">
<span className={`px-3 py-1 rounded text-[10px] font-bold border ${
  order.orderStatus === 'Pending' ? 'bg-blue-50 text-blue-600 border-orange-100' : 
  order.orderStatus === 'Confirmed' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 
  order.orderStatus === 'Processing' || order.orderStatus === 'To Ship' ? 'bg-purple-50 text-purple-600 border-purple-100' :
  order.orderStatus === 'Shipped' ? 'bg-orange-50 text-orange-500 border-blue-100' :
  order.orderStatus === 'Out for Delivery' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
  order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
  order.orderStatus === 'Cancelled' ? 'bg-pink-50 text-pink-500 border-rose-100' : 
  'bg-gray-50 text-gray-600'
}`}>
  {order.orderStatus}
</span>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-4 py-3 bg-gray-50/30 border-t border-gray-100">
<p className="text-sm font-bold text-slate-700">
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