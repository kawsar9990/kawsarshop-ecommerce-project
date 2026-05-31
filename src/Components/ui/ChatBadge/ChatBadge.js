'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLoader } from "@/src/context/ItemLoaderContext"

export default function ChatBadge(){
const [showBubble, setShowBubble] = useState(true);
const {hideLoader, showLoader} = useLoader();
const router = useRouter();

const handleNavigation = () => {
if(showBubble){
showLoader();
}
router.push('/chat'); 
hideLoader()
}

return(
<div className="fixed bottom-[70px] right-0 md:right-6 font-sans flex items-center bg-transparent select-none" style={{zIndex: "999999"}}>
{showBubble && (
<button 
onClick={handleNavigation}
className="relative mr-4 bg-white text-gray-800 px-4 py-3 rounded-xl shadow-2xl border border-gray-100 max-w-xs animate-bounce-short cursor-pointer hover:bg-gray-50 transition-all duration-200 text-left focus:outline-none"
>
<div 
onClick={(e) => {
 e.stopPropagation();
 setShowBubble(false);   
}}
className="absolute -top-2 -left-2 bg-gray-100 hover:bg-gray-200 text-gray-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-all border border-gray-200/50 cursor-pointer"
>
✕
</div>
<p className="text-xs font-semibold tracking-wide text-gray-700 text-center pr-1">
Hello! How can I help you today?
</p>
<div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45"></div>
</button>
)}
<button 
onClick={handleNavigation}
className="relative cursor-pointer group block focus:outline-none">
<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-2xl transition-all duration-300 transform group-hover:scale-105 bg-gray-100">
<img 
src="/img/kkks.jpeg"
alt="Support Assistant"
className="w-full h-full object-cover"
/>    
</div>
<span className="absolute top-0 right-1 flex h-4 w-4">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
</span>
</button>
</div>
)
}