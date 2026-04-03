'use client'

import Link from "next/link"

export default function page(){

return(
<div style={{userSelect: "none"}}>
<div className="p-5">

<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

<div className="xl:col-span-8 lg:p-10 space-y-8 xl:border-r xl:p-2 xl:border-r-gray-400">
<div className="flex flex-col gap-2">
<p className="font-bold text-gray-700">My Orders</p>
<div className="bg-white shadow-2xl rounded-md p-6 mt-5 border border-gray-100">
<div  className="p-5">
<p className="text-center">You have placed no orders yet.</p>
</div>
</div>
</div>
</div>



<div className="xl:col-span-3 space-y-4 xl:p-0">
<div className="flex flex-col gap-2">
<div>
    <h1 className="font-bold">Default Payment</h1>
</div>
<div className="w-full">
<Link href={`/profile/payment-method`}
className="bg-amber-400 text-[12px] w-full block text-center p-2 rounded-md cursor-pointer shadow-lg font-bold hover:bg-amber-500 transition-colors">
+ Add Payments Methods</Link>
 </div>
</div>
</div>

</div>
</div>
</div>
)
}