'use client'

export default function DetailsTableView({ order }) {
if (!order) return null;

return (
<div className="hidden md:block space-y-6">
<div className="bg-gray-50 p-4 border border-gray-200 rounded-t-md flex justify-between items-center">
  <p className="text-sm font-medium">
    Delivery Type: <span className="font-bold">{order.shippingMethodName || 'Standard Delivery'}</span>
  </p>
  <p className="text-lg font-bold">
    Total: ${order.itemsPrice.toLocaleString()}
  </p>
</div>

<div className="flex justify-between items-center px-2">
  <h3 className="text-sm font-bold text-gray-700">Order No: #{order._id}</h3>
  <span className="text-sm font-semibold text-gray-400 capitalize">
    {order.isPaid ? 'Paid' : 'Unpaid'}
  </span>
</div>

<div className="border border-gray-200 rounded-md overflow-hidden">
<table className="w-full text-left text-xs">
<thead className="bg-gray-50 border-b border-gray-200 text-gray-600 capitalize">
  <tr>
    <th className="p-4 font-semibold">Name</th>
    <th className="p-4 font-semibold text-center">Seller Name</th>
    <th className="p-4 font-semibold text-center">Image</th>
    <th className="p-4 font-semibold text-center">Qty</th>
    <th className="p-4 font-semibold text-center">Amount</th>
    <th className="p-4 font-semibold text-center">Order Status</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-100">
{order.orderItems?.map((item, index) => (
<tr key={index} className="hover:bg-gray-50/50">
<td className="p-4 max-w-[200px]">
  <p className="font-medium text-green-400 line-clamp-2">{item.name}</p>
</td>
<td className="p-4 text-center font-semibold text-gray-600">
  KawsarShop
</td>
<td className="p-4">
  <div className="w-16 h-16 mx-auto border rounded p-1 bg-white">
    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
  </div>
</td>
<td className="p-4 text-center font-bold">{item.quantity}</td>
<td className="p-4 text-center font-bold text-gray-800">
      $ {(item.price * item.quantity).toLocaleString()}
</td>
<td className="p-4 text-center">
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
))}
</tbody>
</table>

<div className="grid grid-cols-1 md:grid-cols-1 border-t border-gray-200 bg-white gap-3 p-4">

<div className="px-3 py-4 border-r border-gray-200 shadow-sm">
<h4 className="font-bold text-sm mb-4 uppercase">Total summary</h4>
<div className="space-y-2 text-sm text-gray-600">
<div className="flex justify-between">
  <span>Payment method</span>
  <span className="font-bold text-gray-800">{order.paymentMethod}</span>
</div>
<div className="flex justify-between">
  <span>Product price</span>
  <span className="font-bold text-gray-800">$ {order.itemsPrice.toLocaleString()}</span>
</div>
<div className="flex justify-between">
<span>Delivery charge</span>
<span className="font-bold text-gray-800">$ {order.shippingPrice.toLocaleString()}</span>
</div>
  <div className="flex justify-between pt-3 border-t font-black text-gray-900">
    <span>Grand total</span>
    <span>$ {order.totalAmount.toLocaleString()}</span>
  </div>
</div>
</div>

<div className="px-3 py-4 border-r border-gray-200 shadow-sm">
<h4 className="font-bold text-[15px] mb-4">Shipping Address</h4>
<div className="text-sm text-gray-600 space-y-1">
  <p className="text-gray-900">{order.shippingAddress.name}</p>
  <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
  <p>{order.shippingAddress.address}</p>
  <p>{order.shippingAddress.phone}</p>
  <div className="mt-3">
    <span className="px-2 py-1 bg-pink-50 text-pink-500 text-[10px] font-bold rounded">{order.shippingAddress.addressType || "Home"}</span>
  </div>
</div>
</div>
</div>
</div>
</div>
  );
}