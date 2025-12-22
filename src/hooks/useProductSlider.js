'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function useProductSlider(){
    
  const [sliderRef] = useKeenSlider({
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
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 10 },
      },
    },
  });
return sliderRef
}