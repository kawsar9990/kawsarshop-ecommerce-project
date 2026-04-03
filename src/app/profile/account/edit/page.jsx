'use client'

import { useAuth } from "../../../../context/AuthContext"
import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react";
import ProfilePhotoSection from "./ProfilePhotoSection";
import NameSection from "./NameSection";
import EmailSection from "./EmailSection";
import MobileSection from "./MobileSection";
import DOBSection from "./DoBSection";
import GenderSection from "./GenderSection";
import PasswordSection from "./PasswordSection";


export default function page(){

const { user, loading, setUser } = useAuth();
const [isUploading, setIsUploading] = useState(false);


if (loading || isUploading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#BC105C]" size={40} />
        {isUploading && <p className="mt-2 font-bold text-[#BC105C]">Saving Image...</p>}
      </div>
    );
}


return(
<div className="py-5">

<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

<div className="xl:col-span-8 lg:p-10 space-y-8 xl:border-r xl:p-2 xl:border-r-gray-400">
<div className="flex flex-col gap-2">
<div>
    <h1 className="font-bold">Account Information</h1>
</div>

<div className="bg-white shadow-lg rounded-md p-2">
<div className="flex flex-col gap-2">


<div>
<ProfilePhotoSection 
user={user} 
setUser={setUser} 
setIsUploading={setIsUploading}
/>
</div>
<hr className="text-gray-200"/>

<div>
<NameSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>

<div>
<EmailSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>


<div>
<MobileSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>


<div>
<DOBSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>


<div>
<GenderSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>



<div>
<PasswordSection 
user={user} 
setUser={setUser}
/>
</div>
<hr className="text-gray-200"/>



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
)
}