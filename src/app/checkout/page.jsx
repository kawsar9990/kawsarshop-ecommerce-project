'use client'

import notify from "@/src/utils/toast"
import { useState,useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext";
import { getAddressesAPI } from "@/src/services/addressService";
import Link from "next/link"
import {ArrowRight} from "lucide-react";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import CheckoutFooter from "./OthersAdd";
import OrderReview from "./ProductView";
import PriceBox from "./PriceBox";

export default function page(){
const { user } = useAuth();
const [addresses, setAddresses] = useState([]);


 const fetchAddresses = async () =>{
  const userId = user?.id || user?._id;
  if (!userId) return;  
  try{
  const res = await getAddressesAPI(userId);
  if (res.success){
    setAddresses(res.data || []);
  }
  }catch(err){
    notify.error("Failed to load addresses");
  }
 };

 useEffect(() => {
    if(user){
       fetchAddresses(); 
    }
 },[user]);

return(
<div className="bg-[#F8F9FA] py-8 md:py-10" style={{userSelect: "none"}}>
<div className="px-4 sm:px-6 lg:px-8">

<div className="pt-30 md:px-5 md:pt-30 xl:pt-0 flex justify-between items-center mb-8">
<h1 className="text-[15px] md:text-[17px] font-bold text-slate-800">
    Checkout
</h1>
<Link href="/products" className="text-[15px] md:text-[17px]  text-[#BC105C] hover:underline font-semibold flex items-center gap-1 text-sm">
    Continue Shopping <ArrowRight size={16} />
</Link>
</div>




<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-8 space-y-4">
<div>
<ShippingAddress 
addresses={addresses} 
refreshAddresses={fetchAddresses}
userId={user?.id || user?._id}/>
</div>
<div>
<ShippingMethod />
</div>
<div>
<PaymentMethod />
</div>
<div>
<CheckoutFooter />
</div>
</div>  


<div className="lg:col-span-4 w-full sticky top-32">

<div>
<OrderReview />
</div>
<div>
<PriceBox />
</div>

</div>


</div>
</div>
</div>
)
}