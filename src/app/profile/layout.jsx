'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from "../../context/AuthContext"
import { 
LayoutDashboard,User,Heart,NotebookTabs,FolderKanban,Cuboid,MessageSquareDot,Bell,Coins,
HatGlasses,Notebook,ChevronDown,HelpCircle,LogOut,Bot,Gift,Undo2,RefreshCwOff
} from 'lucide-react';

export default function ProfileLayout({children}){
const pathname = usePathname();
const [isOpen, setIsOpen] = useState(false);
const { logout } = useAuth();

const menuItems = [
{ name: "Account Dashboard", path: "/profile/account", icon: <LayoutDashboard size={15} className="text-yellow-500"/> },    
{ name: "Contact Us", path: "/contact", icon: <Bot size={15} className="text-yellow-500"/> },
{ name: "Account Information", path: "/profile/account/edit", icon: <User size={15} className="text-yellow-500"/> },
{ name: "My Wishlist", path: "/profile/kawsarwishlist", icon: <Heart size={15} className="text-yellow-500"/> },
{ name: "Speacial Offer", path: "/profile/speacial-offer", icon: <Gift size={15} className="text-yellow-500"/> },
{ name: "Address Book", path: "/profile/address/new", icon: <NotebookTabs size={15} className="text-yellow-500"/> },
{ name: "My Product Review", path: "/profile/review", icon: <FolderKanban size={15} className="text-yellow-500"/> },
{ name: "My Orders", path: "/profile/order", icon: <Cuboid size={15} className="text-yellow-500"/> },
{ name: "My Orders Return", path: "/profile/order-return", icon: <Undo2 size={15} className="text-yellow-500"/> },
{ name: "My Orders Cancellation", path: "/profile/order-cancellation", icon: <RefreshCwOff size={15} className="text-yellow-500"/> },
{ name: "Newsletter Subscription", path: "/profile/newsletter", icon: <MessageSquareDot size={15} className="text-yellow-500"/> },
{ name: "Manage Notification", path: "/profile/manage-notification", icon: <Bell size={15} className="text-yellow-500"/> },
{ name: "Payment Method", path: "/profile/payment-method", icon: <Coins size={15} className="text-yellow-500"/> },
{ name: "Privacy Setting", path: "/profile/privacy", icon: <HatGlasses size={15} className="text-yellow-500"/> },
{ name: "Terms & Conditions", path: "/termspage", icon: <Notebook size={15} className="text-yellow-500"/> },
]

return(
<div className="bg-gray-50">
<div className="max-w-7xl mx-auto px-4 xl:px-0 pt-33 xl:pt-3">
<div className="flex flex-col xl:flex-row gap-8">

{/* mobile */}
<div className="xl:hidden w-full relative z-999 flex justify-center px-4">
<div className="relative w-50 mx-auto">
  <button
onClick={() => setIsOpen(!isOpen)}
className="w-full flex items-center gap-2 cursor-pointer justify-between bg-[#BC105C] py-3 px-6 rounded-md border border-gray-200 shadow-sm font-bold text-gray-700">
<div className="flex items-center gap-2 text-white">
   <span className='text-[13px]'>My Account Link</span>
 </div>
 <ChevronDown size={15} className={`transition-transform text-white duration-300 ${isOpen ? 'rotate-180' : ''}`} />
</button>
{isOpen && (
<div className="absolute top-full w-70 left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
{menuItems.map((item) => (
<Link 
  key={item.path}
  href={item.path}
  onClick={() => setIsOpen(false)}
  className={`flex items-center gap-3 p-4 border-b border-gray-100 last:border-0 ${
    pathname === item.path ? 'bg-[#BC105C] text-white' : 'text-gray-600 hover:bg-gray-50'
  }`}
>
  {item.icon}
  <span className="text-[12px] font-semibold">{item.name}</span>
  </Link>
  ))}
<Link 
   href="/profile/help"
   onClick={() => setIsOpen(false)}
   className="gap-3 p-4 bg-blue-50 text-blue-700 border-b border-gray-100 hover:bg-blue-100 transition-colors"
 >
   <div className="flex items-center gap-3 w-fit">
     <HelpCircle size={16} className="text-blue-600" />
     <span className="text-[12px] font-bold">Need Help?</span>
   </div>
 </Link>
 <button 
    onClick={() => {
     logout();
     setIsOpen(false);
   }}
   className="p-4 cursor-pointer text-red-500 font-bold hover:bg-red-50 w-full transition-colors">
   <div className="flex items-center gap-3 w-fit cursor-pointer">
     <LogOut size={16} />
     <span className="text-[12px] cursor-pointer">Logout</span>
   </div>
 </button>
</div>
</div>   
)}
</div>
</div>
{/* mobile */}



{/* desktop  */}
<div className="hidden xl:block w-72 p-5 h-fit sticky top-32 border-r border-gray-200 pr-4">
<div className="mb-6 px-2">
  <h2 className="text-[14px] font-extrabold text-gray-800">Welcome</h2>
</div>

<div className="flex flex-col gap-1">
{menuItems.map((item) => {
const isActive = pathname === item.path;
return (
<Link 
  key={item.path}
  href={item.path}
  className={`flex items-center gap-3 px-5 py-3.5 transition-all duration-200 font-medium border-b border-gray-50 last:border-0 ${
    isActive 
    ? "bg-[#BC105C]/5 text-[#BC105C] border-l-4 border-l-[#BC105C] font-semibold" 
    : "text-gray-600 hover:bg-gray-50 hover:text-[#BC105C]"
  }`}
>
  <span className={`${isActive ? 'text-white' : ''}`}>
    {item.icon}
  </span>
  <span className="text-[12px]">{item.name}</span>
</Link>
  );
})}
              
<hr className="border-gray-100" />
<Link 
  href="/profile" 
  className="flex items-center gap-3 px-2 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all font-medium mb-2"
>
<HelpCircle size={15} className="text-blue-600" />
<span>Need Help?</span>
</Link>
<button 
  onClick={logout}
  className="flex items-center cursor-pointer gap-3 px-2 py-2 rounded-md transition-all duration-200 font-medium text-red-500 hover:bg-red-50 active:scale-95 w-full text-left"
>
  <LogOut size={15} className='cursor-pointer'/>
  <span className='cursor-pointer'>Logout</span>
</button>
</div>
</div>
{/* desktop  */}


<div className="flex-1 min-h-screen">
  {children}
</div>


</div>
</div>
</div>
)
}