'use client'
import { CheckCircle2 } from "lucide-react";


export default function EmailSection({ user }){


if (!user) return null;
return(
<div style={{userSelect: "none"}}>
<div className="p-3 flex justify-between items-center">
<div>
    <h1 className="text-gray-400 text-[12px]">Email</h1>
    <div className="flex gap-1 lg:gap-3 flex-row">
    <h1 className="font-bold text-[13px]">{user.email}</h1>
    <h1 className="flex items-center">
    <CheckCircle2 size={14} className="fill-green-600 text-white" />
    <p className="text-gray-400 text-[12px]">(Verified)</p>
    </h1>
 </div>
  </div>

</div> 
</div>
)
}