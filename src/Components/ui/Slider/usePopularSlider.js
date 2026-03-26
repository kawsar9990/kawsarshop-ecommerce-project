'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect } from "react";

export default function usePropularSlider(products = []){
    
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 6,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 4, spacing: 30 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 668px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 10 },
      },
    },
  });

  useEffect(()=> {
    if(!instanceRef.current) return;

    const timeout = setTimeout(() => {
      if(instanceRef.current){
       instanceRef.current.update();
      }}, 300);
    return () => clearTimeout(timeout);
   
  },[products.length,instanceRef])

return sliderRef
}