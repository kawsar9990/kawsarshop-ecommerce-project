'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function InternetStatus(){
const [status, setStatus] = useState(null);
const [visible, setVisible] = useState(false);

useEffect(() => {

const checkConnection = () => {
  let xhr = new XMLHttpRequest();
  
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
  xhr.onload = () => {
    if(xhr.status >= 200 && xhr.status < 300){
        setStatus((prevStatus) => {
            if(prevStatus === 'offline'){
              setVisible(true);
              setTimeout(() => setVisible(false),3000);
              return 'online'  
            }
             return prevStatus;
        });
    } else{
       setStatus('offline');
       setVisible(true);    
    }
  };

  xhr.onerror = () => {
    setStatus('offline');
    setVisible(true);
  };
  xhr.send();
};

checkConnection();

const interval = setInterval(checkConnection, 5000)

const goOnline = () => checkConnection();
const goOffline = () => {
  setStatus('offline');
  setVisible(true);  
};
window.addEventListener('online', goOnline);
window.addEventListener('offline', goOffline);

return () => {
   clearInterval(interval);
   window.removeEventListener('online', goOnline);
   window.removeEventListener('offline', goOffline); 
}
}, [])

if (!visible || !status) return null;

return(
 <div className="fixed bottom-5 p-2 md:p-0 md:right-5 z-[9999999] max-w-sm w-full space-y-3 transition-all duration-300">
    
{status === 'offline' && (
<div className="flex items-center justify-between bg-[#1a1a1a] text-white px-4 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-neutral-800 transition-all duration-300">
  <div className="flex items-center gap-3">
    <WifiOff size={13}/>
    <p className="text-sm font-medium text-neutral-300">you are currently offline</p>
  </div>
  <div className="flex items-center gap-3">
    <button 
      onClick={() => window.location.reload()} 
      className="text-blue-500 cursor-pointer hover:text-blue-400 text-sm font-semibold transition"
    >
      Refresh
    </button>
    <button onClick={() => setVisible(false)} className="text-neutral-500 cursor-pointer hover:text-neutral-300 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
)}

{status === 'online' && (
  <div className="flex items-center justify-between bg-[#1a1a1a] text-white px-4 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-neutral-800 transition-all duration-300">
    <div className="flex items-center gap-3">
      <Wifi size={13} className="text-green-500 stroke-[2.5]"/>
      <p className="text-[12px] md:text-sm font-medium text-neutral-300">your Internet connection was restored</p>
    </div>
<button onClick={() => setVisible(false)} className="text-neutral-500 cursor-pointer hover:text-neutral-300 transition">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
</div>
)}
</div>
)    
}