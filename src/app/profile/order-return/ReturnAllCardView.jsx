'use client'

import Link from 'next/link';


export default function ReturnCardView({ returnHistory = [] }) {

const safeReturnHistory = Array.isArray(returnHistory) ? returnHistory : [];


return(
<div className="md:hidden space-y-3">
{safeReturnHistory.map((order) => {
const finalReturnStatus = order.status || order.returnStatus || 'Pending';
const items = order.returnedItems || order.orderItems || [];

return items.map((item, index) => {
if (!item) return null;

const itemPrice = Number(item.price) || 0;
const itemQuantity = Number(item.quantity) || 1;
const itemTotal = itemPrice * itemQuantity;

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
<span className={`px-2 py-1 rounded font-bold border ${
finalReturnStatus === 'Cancelled' ? 'bg-rose-50 text-rose-600 text-[7px] border-rose-100' : 
finalReturnStatus === 'Pending' || finalReturnStatus === 'Return Requested' ? 'bg-amber-50 text-amber-600 text-[7px] border-amber-100' :
finalReturnStatus === 'Drop-off' ? 'bg-blue-50 text-blue-600 border-blue-100 text-[7px]' : 
finalReturnStatus === 'Pick-up' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 text-[7px]' : 
finalReturnStatus === 'Package Received' ? 'bg-cyan-50 text-cyan-600 border-cyan-100 text-[5px]' :
finalReturnStatus === 'QC Processing' ? 'bg-purple-50 text-purple-600 border-purple-100 text-[6px]' :
finalReturnStatus === 'Refunded' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 text-[7px]' :
finalReturnStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100 text-[7px]' :
'bg-gray-50 text-gray-600 border-gray-100 text-[7px]'
}`}>
  {finalReturnStatus}
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