'use client'

export default function DetailsTableView({ order }) {
if (!order) return null;

return (
<div className="md:hidden space-y-6">
<div className="bg-gray-50 p-4 border border-gray-200 rounded-t-md flex justify-between items-center">
<p className="text-[8px]">
  Delivery Type: <span className="">{order.shippingMethodName || 'Standard Delivery'}</span>
</p>
<p className="text-[9px]">
  Total: ${order.itemsPrice.toLocaleString()}
</p>
</div>

<div className="flex justify-between items-center px-2">
  <h3 className="text-[8px] font-bold text-gray-700">Order No: #{order._id}</h3>
  <span className="text-[10px] text-gray-400 capitalize">
    {order.isPaid ? 'Paid' : 'Unpaid'}
  </span>
</div>

<div className="md:hidden space-y-4">
{order.orderItems?.map((item, index) => (
<div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative">
<div className="flex gap-4">
<div className="w-20 h-20 border border-gray-300 rounded p-1 self-start">
  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
</div>
<div className="flex-1 space-y-1">
  <h4 className="text-[10px] font-bold text-gray-800 leading-tight pr-10 line-clamp-1">{item.name}</h4>

  <p className="text-[10px] text-gray-500 font-semibold">${item.price.toLocaleString()} x {item.quantity} (qty)</p>
  <p className="text-[10px] font-bold text-black">${(item.price * item.quantity).toLocaleString()}</p>
  
<div className="flex items-center flex-row justify-between">
<div>
    <p className="text-[7px] text-gray-400">Seller: KawsarShop</p>
</div>
 <span className={`px-2 py-1 rounded text-[6px] font-bold border ${
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
  </div>
</div>
</div>
</div>
))}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-md bg-white overflow-hidden">
<div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
  <h4 className="font-bold text-sm mb-4 uppercase border-b border-dashed pb-2">Total summary</h4>
  <div className="space-y-3 text-[10px] text-gray-600">
    <div className="flex justify-between text-[10px]"><span>Payment method</span><span className="font-bold">{order.paymentMethod}</span></div>
    <div className="flex justify-between"><span>Product price</span><span className="font-bold">$ {order.itemsPrice?.toLocaleString()}</span></div>
    <div className="flex justify-between"><span>Delivery charge</span><span className="font-bold">$ {order.shippingPrice?.toLocaleString()}</span></div>
    <div className="flex justify-between pt-3 border-t font-black text-gray-900 text-[12px]">
      <span>Grand total</span><span>$ {order.totalAmount?.toLocaleString()}</span>
    </div>
  </div>
</div>

<div className="p-6">
  <h4 className="font-bold text-sm mb-4 uppercase border-b border-dashed pb-2">Shipping Address</h4>
  <div className="text-sm text-gray-600 space-y-1">
    <p className="font-bold text-gray-900 text-[12px]">{order.shippingAddress.name}</p>
    <p className="text-[12px]">{order.shippingAddress.address}</p>
    <p className="text-[12px]">{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
    <p className="text-[12px]">{order.shippingAddress.phone}</p>
    <div className="mt-4">
      <span className="px-3 py-1 bg-pink-50 text-pink-500 text-[10px] font-bold rounded border border-pink-100">
        {order.shippingAddress.addressType || "Home"}
      </span>
    </div>
  </div>
</div>
</div>
</div>
  );
}
