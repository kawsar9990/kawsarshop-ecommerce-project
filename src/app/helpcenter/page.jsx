"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import {
  HelpCircle,
  Info,
  Lock,
  Truck,
  Headphones,
  CreditCard,
  User,
  RefreshCw,
  ShoppingBag,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";



export default function HelpCenterPage() {
  
  const [showHelpBox, setShowHelpBox] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelpBox(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+8801602084187";
  const helpMessage = encodeURIComponent("Hi! I need some help from KawsarShop support team.");

  const handleYesClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${helpMessage}`;
    window.open(url, "_blank");
    setShowHelpBox(false);
  };

  const handleNoClick = () => setShowHelpBox(false);

  const categories = [
    { icon: <ShoppingBag className="text-[#155] w-8 h-8" />, title: "Orders & Delivery", desc: "Track your KawsarShop orders and view shipping updates." },
    { icon: <CreditCard className="text-[#155] w-8 h-8" />, title: "Payments & Refunds", desc: "Manage KawsarShop payments, refunds, and billing issues." },
    { icon: <User className="text-[#155] w-8 h-8" />, title: "Account Settings", desc: "Change KawsarShop account password, email, and privacy settings." },
    { icon: <Lock className="text-[#155] w-8 h-8" />, title: "Security & Privacy", desc: "Learn how to secure your KawsarShop account." },
    { icon: <Headphones className="text-[#155] w-8 h-8" />, title: "Customer Support", desc: "Get in touch with KawsarShop support or start live chat." },
    { icon: <Truck className="text-[#155] w-8 h-8" />, title: "Shipping Information", desc: "Check KawsarShop delivery times and courier options." },
  ];


  return (
    <div className="min-h-screen pt-40 xl:pt-10 bg-[#FFF2F8] text-gray-900 p-5 relative capitalize">


      <div className="bg-[#FFF2F8] p-4 rounded-xl mb-8 flex items-center justify-center gap-3">
        <Info className="text-[#155] w-6 h-6"/>
        <p className="text-sm md:text-base text-gray-700">
          Need help? Visit our{" "}
          <Link href={`/supportportal`} className="text-[#E2136E] font-semibold cursor-pointer hover:underline">
            KawsarShop Support Portal
          </Link>{" "}
          or wait — our assistant may ask you!
        </p>
      </div>


      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">KawsarShop Help Center</h1>
      </div>


      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 cursor-pointer"
          >
            <div className="mb-4">{c.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{c.title}</h3>
            <p className="text-gray-600 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>



<div className="mt-16 py-8 text-center">
{feedback ? (
<p className="text-amber-600 font-semibold">
 {feedback === "yes" ? "🎉 Thanks for your feedback on KawsarShop!" : "Thanks! We’ll improve KawsarShop further."}
 </p>
 ) : (
<>
   <h3 className="text-xl font-bold mb-3 text-gray-900">Was this page helpful for KawsarShop?</h3>
   <div className="flex justify-center gap-4">
   <button
   onClick={() => setFeedback("yes")}
  className="bg-[#E2136E] cursor-pointer text-white px-4 py-2 rounded-full flex items-center gap-2"
>
  <ThumbsUp size={18} /> Yes
</button>
<button
onClick={() => setFeedback("no")}
className="bg-gray-300 text-gray-800 cursor-pointer px-4 py-2 rounded-full flex items-center gap-2">
        <ThumbsDown size={18} /> No
      </button>
    </div>
  </>
)}
</div>

    

{showHelpBox && (
 <div className="fixed bottom-20 right-6 bg-white border border-gray-300 rounded-xl p-5 shadow-xl w-72 z-50">
 <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
   <HelpCircle className="text-[#155] w-5 h-5" /> Need KawsarShop Help?
 </h4>
 <p className="text-gray-700 mb-4">
   Do you need any help or assistance from KawsarShop right now?
 </p>
<div className="flex gap-3 justify-end">
    <button
  onClick={handleYesClick}
  className="bg-[#E2136E] cursor-pointer text-white px-4 py-1 rounded-full font-semibold">
   Yes
 </button>
 <button
   onClick={handleNoClick}
   className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-1 rounded-full">
   No
 </button>
     </div>
        </div>
      )}
    </div>
  );
}
