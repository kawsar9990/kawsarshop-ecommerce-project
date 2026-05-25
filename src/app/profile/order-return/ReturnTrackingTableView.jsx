'use client'

import Link from 'next/link';


export default function TrackingTavleView({ returnHistory = [] }) {

const safeReturnHistory = Array.isArray(returnHistory) ? returnHistory : [];

return (
<div className="hidden md:block space-y-6">
{safeReturnHistory.map((order) => {
const finalReturnStatus = order.status || order.returnStatus || 'Pending';
const items = order.returnedItems || order.orderItems || [];

return items.map((item, index) => {
if (!item) return null;

const itemPrice = Number(item.price) || 0;
const itemQuantity = Number(item.quantity) || 1;
const itemTotal = itemPrice * itemQuantity;

return(

<div key={`${order._id}-${index}`} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">      
<div className="p-3 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-50">
<div className='w-full flex flex-col gap-2'>

<div className="text-sm flex justify-between items-center mt-3">
<div className='flex justify-between items-center'>
<span className="text-gray-600">Order No:</span>
<span className="font-bold text-slate-800 ml-1">#{order._id}</span>
<Link href={`/profile/order-return/${order._id}`} className="ml-3 text-blue-600 hover:underline text-xs font-medium">Tracking Orders</Link>
</div>
<div>
</div>
</div>

<div className="flex items-center justify-between">
<p className="text-[11px] text-gray-400 mt-0.5">
  Placed on: {new Date(order.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
</p>
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
  <th className="pb-3 font-semibold text-center">Return Status</th>
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