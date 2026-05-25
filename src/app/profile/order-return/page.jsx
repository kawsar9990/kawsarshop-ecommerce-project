'use client'

import TabSlider from "./tabs"
import { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { getOrdersByUserIdAPI } from "@/src/services/ordersServics"

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
if (res && res.success) {
  setOrders(res.orders || []);
} else if(res){
  setOrders(res.orders || res.data || res || []);
}
} catch (err) {
    console.error("Orders load failed:", err);
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
<div className="font-semibold py-3">
    <h1>Returns</h1>
</div>

<hr className="text-gray-300"/>

<div>
{loading ? (
<div className="text-center py-10">Loading orders...</div>
): (
<div>
<TabSlider orders={orders}/>
</div>
)}
</div>
</div>
</div>
</div>
)
}