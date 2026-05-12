'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReviewTable({ orders }) {
const router = useRouter();

if (orders.length === 0) {
 return <div className="text-center py-10 text-gray-400 text-[10px] md:text-[13px]">No orders found in this category.</div>;
}


const handleReviewRedirect = (item, orderId) => {
  localStorage.setItem('reviewItem', JSON.stringify({
      name: item.name,
      image: item.image,
      price: item.price,
      productId: item.product,
      orderId: orderId
    }));  
  router.push(`/profile/review/${item.product}`);
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
<Link href={`/user/order/${order._id}`} className="ml-3 text-blue-600 hover:underline text-xs font-medium">View Details</Link>
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
  <th className="pb-3 font-semibold text-center">Order Status</th>
  <th className="pb-3 font-semibold text-center">Product Review</th>
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

<td className="py-5 text-center">
<span className={`px-3 py-1 rounded text-[10px] font-bold border ${
  order.orderStatus === 'Delivered' ? ' bg-green-50 text-green-600 border-green-100' : 
  'bg-gray-50 text-gray-600'
}`}>
  {order.orderStatus}
</span>
</td>

<td className='py-5 text-center'>
    <div>
       {item.isReviewed ? (
            <button 
                disabled
                className='text-gray-400 text-[13px] font-medium cursor-not-allowed flex items-center justify-center mx-auto gap-1'
            >
                Reviewed
            </button>
        ) : (
            <button 
                onClick={() => handleReviewRedirect(item, order._id)}
                className='underline text-blue-500 text-[13px] hover:text-orange-600 cursor-pointer font-medium'
            >
                Write a Review
            </button>
        )}
    </div>
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