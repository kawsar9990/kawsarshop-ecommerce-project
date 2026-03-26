"use client";

import { useEffect } from "react";

export default function FakeNotificationTitle() {
  
    useEffect(() => {
    let originalTitle = document.title;
    let flashing = false; 
    const interval = setInterval(() => {
      document.title = flashing ? "(99) New Notification!" : originalTitle;
      flashing = !flashing;
    }, 2000);
    return () => {
      clearInterval(interval);
      document.title = originalTitle;
    };
  }, []);



  return null; 
}
