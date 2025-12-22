"use client";


import { useLoader } from '../../../context/ItemLoaderContext'
import { useRouter } from "next/navigation";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ShopBox(){
  const router = useRouter();

  const product = [
    { id: 1, 
    image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765903906/pngimg.com_-_iphone17_PNG42_t0z0hv.png", 
    name: "Iphone 16 pro", 
    price: 2000, 
    bg: "from-pink-500 to-fuchsia-700"
    },
    
    { id: 2, 
    image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765903962/pngimg.com_-_laptop_PNG5872_zqw0ne.png",
    name: "Samsung A5 Monitor",
    price: 1000, 
    bg: "from-rose-200 to-pink-400" 
    },

    { id: 3, 
    image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765903970/pngwing.com_2_hcoge6.png", 
    name: "Machbook Z5 Ultra", 
    price: 2500, 
    bg: "from-green-200 to-emerald-400" 
    },

    { id: 4, 
    image: "https://res.cloudinary.com/dkmzakgx2/image/upload/v1765904029/pngwing.com_dpaifj.png", 
    name: "Samsung XZ Router", 
    price: 200, 
    bg: "from-amber-200 to-orange-500" },
  ];


const [sliderRef] = useKeenSlider({
  slides: { perView: 1, spacing: 10 },
  breakpoints: {
    "(min-width: 768px)": {
      slides: { perView: 3, spacing: 10 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 2, spacing: 10 }
    },
    "(min-width: 1280px)": {
      slides: { perView: 4, spacing: 10 }
    }
  }
});  


  const {showLoader, hideLoader} = useLoader()
  const handleLoading = (id) => {
    showLoader()
    setTimeout(() => {
      hideLoader()
      router.push(`/productpage`);
    }, 300);
  };


  return (
    <div className="pt-10 xl:pt-2">

      <div ref={sliderRef} className="keen-slider px-3">

        {product.map((i) => (
          <div key={i.id} className="keen-slider__slide xl:pr-5">
      <div className={`p-2 h-40 bg-gradient-to-r ${i.bg} rounded-lg`}>
        <div className='flex items-center justify-center px-5 py-5'>
          
          <div className='w-1/2'>
           <img src={i.image} alt="" className='w-20 md:w-24' />
         </div>
         <div className='w-1/2'>
          <div className='text-black font-semibold'>{i.name}</div>
          <div className='font-bold text-orange-600'>${i.price}</div>
          <button
            onClick={() => handleLoading(i.id)}
            className='uppercase font-bold hover:text-orange-600 underline'
          >
            Shop now
          </button>
        </div>
      </div>
    </div>
    </div>
        ))}

      </div>
    </div>
  );
}
