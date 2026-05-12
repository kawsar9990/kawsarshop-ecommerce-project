'use client'

import Link from 'next/link';

export default function CancelCardView({ orders }) {

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
<Link href={`/user/order/${order._id}`} className="text-[8px] cursor-pointer text-blue-600 font-medium hover:underline">
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