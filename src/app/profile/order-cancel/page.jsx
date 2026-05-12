'use client'

import { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { getOrdersByUserIdAPI } from "@/src/services/ordersServics"
import CancelOrder from "./CancelOrder"

export default function page(){
const { user, token } = useAuth();
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(()=> {
window.scrollTo(0,0)
},[])

useEffect(() => {
const fetchUserOrders = async () => {
const userId = user?.id || user?._id; 
if (!userId || !token) return;
try{
    const res = await getOrdersByUserIdAPI(userId, token); 
    if (res) {
      const allOrders = res.orders || res.data || res;
      const cancelledOnly = allOrders.filter(order =>
        order.orderStatus?.toLowerCase() === 'cancelled'
      )
      setOrders(cancelledOnly);
}
} catch (err) {
    console.error("Orders load failed");
} finally {
    setLoading(false);
}
};
fetchUserOrders();
}, [user, token]);




return(
<div style={{userSelect: "none"}}>
<div className="lg:px-5 lg:py-5">

<div className="bg-white shadow-md rounded-md px-5 py-5">
<div className="font-semibold py-3 text-[15px] md:text-[18px]">
    <h1>Cancelation</h1>
</div>

<div>
{loading ? (
<div className="text-center py-10">Loading orders...</div>
): orders.length === 0 ? (
<div className="flex flex-col gap-2">
<div  className="px-5 py-10">
<p className="text-center text-[12px] md:text-[15px]">You have placed no orders yet.</p>
</div>
</div>
) : (
<div>
    <CancelOrder orders={orders}/>
</div>
)}
</div>

</div>
</div>
</div>
)
}