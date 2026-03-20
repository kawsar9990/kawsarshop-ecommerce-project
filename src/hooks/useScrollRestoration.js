'use client'
import { useEffect } from "react";
import { useLoader } from "../context/ItemLoaderContext"

export const useScrollRestoration = (loadingState = false) => {
const { showLoader, hideLoader } = useLoader();

const saveScrollPos = (callback) => {
if (typeof window !== 'undefined') {
      sessionStorage.setItem('scroll_pos', window.scrollY.toString());
}
showLoader();
if (callback) callback();
setTimeout(() => hideLoader(), 700);
}


useEffect(()=> {
const savedPos = sessionStorage.getItem('scroll_pos');

    if (savedPos && !loadingState) {
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: 'instant' 
        });
      }, 200);

      const handleUserScroll = () => {
        if (Math.abs(window.scrollY - parseInt(savedPos)) > 10) {
          sessionStorage.removeItem('scroll_pos');
          window.removeEventListener('scroll', handleUserScroll);
        }
      };
      window.addEventListener('scroll', handleUserScroll);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleUserScroll);
      };
    }
},[loadingState])

return {saveScrollPos};
}