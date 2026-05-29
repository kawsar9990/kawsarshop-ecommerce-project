'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function CookieConsent(){
const [isVisible, setIsVisible] = useState(false);

useEffect(()=> {
  const consent = localStorage.getItem('cookie-consent');
  
  if(!consent){
    const timer = setTimeout(()=> {
       setIsVisible(true); 
    }, 4000);
    return() => clearTimeout(timer);
  }
}, [])


const handleConsent = (decision) => {
 localStorage.setItem('cookie-consent', decision);
  setIsVisible(false);  
};

if (!isVisible) return null;

return(
<div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-[999999999] animate-fade-in">
<div className="bg-[#121212] text-white p-5 rounded-xl shadow-2xl border border-gray-800">
<p className="text-sm leading-relaxed text-gray-300">
  We are using cookies to ensure that we give you the best experience. By continuing to use this site, you agree to our policy. To read more about how we use cookies read our{' '}
  <Link href="/privacy-policy" className="text-amber-500 font-semibold underline hover:text-amber-400">
    Privacy Policy
  </Link>
  .
</p>

<div className="mt-4 flex items-center gap-3">
  <button
    onClick={() => handleConsent('accepted')}
    className="flex-1 md:flex-none cursor-pointer bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
  >
    Accept
  </button>
  <button
    onClick={() => handleConsent('rejected')}
    className="flex-1 md:flex-none cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
  >
    Reject
  </button>
</div>
</div>
</div>
)
}