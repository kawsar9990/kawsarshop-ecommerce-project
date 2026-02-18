"use client";

import { useEffect } from "react";

export default function AskNotificationPermission() {
  useEffect(() => {
    let interval;
    let timer;

async function showNotifications() {
    
  if (!("Notification" in window)) {
    console.log("❌ Browser does not support notifications.");
    return;
}
const permission = await Notification.requestPermission();

 if (permission === "granted") {
   console.log("✅ Notification permission granted.");

   new Notification("✅ KawsarShop Notification Allowed!", {
     body: "Welcome Dear Sir Or Mam to KawsarShop!",
   });
     
  interval = setInterval(() => {
   if (document.visibilityState === "visible") {
     new Notification("🔔 Reminder Notification", {
       body: "Dear user, this is a KawsarShop reminder!",
     });
    }
  }, 60 * 15000); 
} 
   else if (permission === "denied") {
     console.log("🚫 User denied notifications.");
   } 
   else {
     console.log("⚠️ User dismissed the notification request.");
 }}
    
 timer = setTimeout(showNotifications, 10 * 1000);

  
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return null; 
}
