'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/src/context/AuthContext"
import { getOrdersByUserIdAPI } from "@/src/services/ordersServics" 
import DetailsTableView from "./DetailsTableView" 
import DetailsCardView from "./DetailsCardView"

export default function OrderDetailsPage() {
const { id } = useParams(); 
const { token, user } = useAuth();
const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchOrder = async () => {
const userId = user?.id || user?._id;
if (!userId || !token || !id) return;

try {
setLoading(true);
const res = await getOrdersByUserIdAPI(userId, token);
const allOrders = res.orders || res.data || res;

const singleOrder = allOrders.find(o => o._id === id);

if (singleOrder) {
  setOrder(singleOrder);
}
} catch (err) {
  console.error("Error loading order:", err);
} finally {
  setLoading(false);
}
};
fetchOrder();
}, [id, token, user]);

if (loading) return <div className="text-center py-20">Loading Order Details...</div>;
if (!order) return <div className="text-center py-20 text-red-500">Order not found!</div>;

return (
<div className="bg-gray-50 min-h-screen md:p-4">
<div className="md:max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
<h1 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h1>
<hr className="mb-6" />
        
<div>
        <DetailsTableView order={order} />
        <DetailsCardView order={order} />
</div>
      </div>
    </div>
  );
}