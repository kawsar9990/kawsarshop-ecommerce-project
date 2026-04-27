"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, ShoppingBag, Crown, ShoppingCart, Mail } from 'lucide-react';
import notify from '@/src/utils/toast';

export default function Page() {
  const [settings, setSettings] = useState({
    orders: { email: true, sms: true, push: true },
    membership: { email: true, sms: true, push: true },
    cart: { email: true, sms: true, push: true },
    newsletters: { email: true, sms: true, push: true },
  });


  useEffect(()=> {
    const savedData = sessionStorage.getItem('notificationSettings');
    if(savedData){
      setSettings(JSON.parse(savedData));
    }
  },[])
  
 const handleToggle = (category, type) => {
  if (category === 'membership') return;
  setSettings((prev) => ({
    ...prev,
    [category]: { 
      ...prev[category], 
      [type]: !prev[category][type] 
    },
  }));
};


const handleSave = () => {
    sessionStorage.setItem('notificationSettings', JSON.stringify(settings));
    notify.success('Settings saved to session storage!');
};

  const notificationItems = [
    { id: 'orders', title: 'Order related Notifications', desc: 'Set notification related to your orders', icon: <ShoppingBag className="text-blue-600" />, color: 'bg-blue-50' },
    { id: 'membership', title: 'Membership Notifications', desc: 'Set notification related to your premium membership plus+ plan', icon: <Crown className="text-red-400" />, color: 'bg-red-50', disabled: true },
    { id: 'cart', title: 'Cart Related Notifications', desc: 'Set notification related to your products on cart', icon: <ShoppingCart className="text-teal-500" />, color: 'bg-teal-50' },
    { id: 'newsletters', title: 'Newsletters', desc: 'Set notification related to check latest deals on email', icon: <Mail className="text-blue-400" />, color: 'bg-blue-50' },
  ];

  return (
    <div style={{ userSelect: "none" }} className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[13px] md:text-xl font-bold text-gray-800">Manage Notification</h2>
        <button onClick={handleSave} 
        className="bg-[#FFB921] hover:bg-[#e5a61d] cursor-pointer text-white px-6 md:px-10 py-2 rounded-md font-semibold transition-all shadow-sm">
          Save
        </button>
      </div>


<div className="space-y-4">
{notificationItems.map((item) => (
<div key={item.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
  
  <div className="flex items-start md:items-center space-x-4">
    <div className={`${item.color} p-3 rounded-lg flex-shrink-0`}>
      {item.icon}
    </div>
    <div>
     <h3 className="font-bold text-gray-800 text-[13px] md:text-base leading-tight">
        {item.title} {item.disabled && <span className="text-[10px] font-normal text-red-500 ml-2">(Always On)</span>}
      </h3>
      <p className="text-[10px] md:text-[11px] text-gray-400 mt-1">{item.desc}</p>
    </div>
  </div>
   <div className="grid grid-cols-1 md:flex md:space-x-8 lg:space-x-12 border-t md:border-t-0 pt-4 md:pt-0">
     {[
       { type: 'email', label: 'Emails Notification*' },
       { type: 'sms', label: 'Whatsapp/SMS' },
       { type: 'push', label: 'Push Notification' }
   ].map((opt) => (
     <div key={opt.type} className="flex md:flex-col items-center justify-between md:justify-center py-2 md:py-0 space-y-0 md:space-y-2 border-b border-gray-50 md:border-b-0 last:border-b-0">
       <span className="text-[11px] font-medium text-gray-500 md:text-center">
         {opt.label}
       </span>
       
       <div 
         onClick={() => handleToggle(item.id, opt.type)}
         className="cursor-pointer transition-transform active:scale-90"
       >
         {settings[item.id][opt.type] ? (
           <CheckCircle size={24} className="text-[#00D100] fill-[#00D100] text-white" />
         ) : (
           <div className="w-6 h-6 border-2 border-gray-200 rounded-full bg-gray-50" />
         )}
       </div>
     </div>
   ))}
      </div>
    </div>
        ))}
      </div>
    </div>
  );
}