'use client'
import { useState, useEffect } from "react";

export default function usePageScroll(key) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedScroll = sessionStorage.getItem(key);
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedScroll));
      }, 50);
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  return mounted;
}
