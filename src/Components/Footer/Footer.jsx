'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faCreditCard, faTruckFast, faGift, faHeadphones, faMessage } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faFacebookMessenger, faWhatsapp, faTelegram, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"

library.add(faTruckFast,faArrowLeft,faCreditCard,faGift,faHeadphones,faFacebookF,faFacebookMessenger,faWhatsapp,faTelegram,faInstagram,faGithub, faMessage)


export default function Footer(){
  

    const [sliderRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 15,
    },
     breakpoints: {

    "(max-width: 1280px)": {
        slides: {
            perView: 5,
            spacing: 30,
        }
    },
    "(max-width: 1024px)": {
        slides: {
            perView: 4,
            spacing: 10,
        }
    },
 "(max-width: 540px)": {
        slides: {
            perView: 2,
            spacing: 8,
        }
    }} })
  
  
    return(
 <div>
       
       <div  className="bg-[#FAFAFA] xl:pb-0 pb-20">
        <div className="p-5">



{/* slider  */}
<div className="flex items-center xl:justify-center pb-5">
  <div ref={sliderRef} className="keen-slider p-2 flex items-center xl:justify-center">


      <div className="keen-slider__slide number-slide1 group">
      <div className="flex flex-col justify-start gap-2">
        <FontAwesomeIcon icon={faTruckFast} className="group-hover:text-red-700 text-[30px]"/>
        <Link href={``} className="font-semibold">Free Shipping</Link>
        <p className="text-[10px]" style={{userSelect: "none"}}>For all Orders Over $100</p>
      </div>
      </div>
     

      <div className="keen-slider__slide number-slide2 group">

      <div className="flex flex-col justify-start gap-2">
      <p className="group-hover:text-red-700">
        <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="currentColor" className="size-9">
        <path fillRule="evenodd"  d="M20.239 3.749a.75.75 0 0 0-.75.75V15H5.549l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3.75 3.75a.75.75 0 0 0 0 1.06l3.75 3.75a.75.75 0 1 0 1.06-1.06L5.55 16.5h14.69a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.751Z" clipRule="evenodd" />
      </svg> 
      </p>
             <Link href={``} className="font-semibold">30 Days Returns</Link>
        <p className="text-[10px]" style={{userSelect: "none"}}>For an Exchange Product</p>
      </div>

      </div>


      <div className="keen-slider__slide number-slide3 group">
       <div className="flex flex-col justify-start gap-2">
         <FontAwesomeIcon icon={faCreditCard}  className="text-[30px] group-hover:text-red-700"/>
         <Link href={``} className="font-semibold">Secured Payment</Link>
        <p className="text-[10px]" style={{userSelect: "none"}}>Payment Cards Accepted</p>
      </div>
      </div>


      <div className="keen-slider__slide number-slide4 group">
    <div className="flex flex-col justify-start gap-2">
       <FontAwesomeIcon icon={faGift}  className="text-[30px] group-hover:text-red-700"/>
        <Link href={``} className="font-semibold">Special Gifts</Link>
        <p className="text-[10px]" style={{userSelect: "none"}}>Our First Product Order</p>
      </div>
      </div>

      <div className="keen-slider__slide number-slide5 group">
      <div className="flex flex-col justify-start gap-2">
        <FontAwesomeIcon icon={faHeadphones}  className="text-[30px] group-hover:text-red-700"/>
        <Link href={``} className="font-semibold">Support 24/7</Link>
        <p className="text-[10px]" style={{userSelect: "none"}}>Contact us Anytime</p>
      </div>
      </div>

    </div>  
</div>
{/* slider  */}

<hr className="text-gray-300"/>






<div className="pt-10">

<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

{/* first box  */}
<div className="">
  <h1 className="font-semibold text-[20px]">Contact us</h1>
  <p className="pt-2 font-serif text-[15px]">KawsarShop - Mega Super Magic Store</p>
  <p className="pt-2 font-serif text-[15px]">Tangail,Dhaka,Bangladesh</p>
  <p className="pt-5">
    <Link href={``} className="pt-2 text-[15px]">kawsar158464@gmail.com</Link>
  </p>
  <p className="pt-2 text-[20px] text-red-600 font-bold">(+880) 1611236444</p>
  <div className="flex gap-2 items-center pt-2">
    <p><FontAwesomeIcon icon={faMessage} className="text-[20px] text-red-600"/></p>
    <div className="font-semibold ">
      <p>Online Chat</p>
      <p>Get Expert Help</p>
    </div>
  </div>
</div>
{/* first box  */}

{/* second box */}
<div className="flex justify-between gap-5 pr-10">

  <div className="flex flex-col justify-start gap-1">
    <h1 className="font-semibold text-[20px]">Products</h1>
    <Link href={``} className="text-gray-500 hover:text-red-500">New Products</Link>
    <Link href={``} className="text-gray-500 hover:text-red-500">Delivery</Link>
    <Link href={`/contact`} className="text-gray-500 hover:text-red-500">Contact us</Link>
    <Link href={`/noticepage`} className="text-gray-500 hover:text-red-500">Legal Notice</Link>
    <Link href={`/termspage`} className="text-gray-500 hover:text-red-500">Terms & Condition</Link>
    <Link href={``} className="text-gray-500 hover:text-red-500">Checkout</Link>
  </div>

    <div className="flex flex-col justify-start gap-1">
      <h1 className="font-semibold text-[20px]">Our company</h1>
       <Link href={`/about`} className="text-gray-500 hover:text-red-500">About Us</Link>
       <Link href={`/faq`} className="text-gray-500 hover:text-red-500">Faq</Link>
       <Link href={`/reservation`} className="text-gray-500 hover:text-red-500">Reservation</Link>
       <Link href={`helpcenter`} className="text-gray-500 hover:text-red-500">Help Center</Link>
       <Link href={``} className="text-gray-500 hover:text-red-500">Secure Payment</Link>
       <Link href={`/login`} className="text-gray-500 hover:text-red-500">Login</Link>
    </div>

</div>
{/* second box */}


{/* third box */}
<div>
  <h1 className="font-semibold text-[20px]">Subscribe to newsletter</h1>
  <p className="pt-2 pb-2 text-gray-500">Subscribe to our latest newsletter to get news about special discounts.</p>

    <div>
      <input
    type="email"
    placeholder="Enter your email"
    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
  />


  <button
    className="mt-4  w-50 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
    Subscribe
  </button>


<div className="flex items-center mt-2 text-gray-500 gap-3">
    <input
      id="subscribe"
      type="checkbox"
      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
    />
    <label htmlFor="subscribe" className="cursor-pointer">
      I agree to receive promotional emails.
    </label>
  </div>


    </div>

</div>
{/* third box */}



</div>

</div>






        </div>
        </div>





  <div className=" bg-white pb-25 xl:pb-5 px-5 py-10">
<div className="flex flex-col justify-center gap-5 lg:gap-0 items-center lg:justify-between lg:flex-row">

<div className="text-gray-700 flex flex-row gap-3 lg:gap-2">
  <Link href={`https://www.facebook.com/profile.php?id=61576560495361`} 
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
 <FontAwesomeIcon icon={faFacebookF} />
  </Link>

  <Link href={`https://m.me/profile.php?id=61576560495361`} 
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
  <FontAwesomeIcon icon={faFacebookMessenger} />
  </Link>

  <Link href={`https://wa.me/8801602084187`} 
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
  <FontAwesomeIcon icon={faWhatsapp} />
  </Link>

  <Link href={`https://t.me/8801602084187`}
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
  <FontAwesomeIcon icon={faTelegram} />
  </Link>

  <Link href={`https://instagram.com/tmr_kawsar`} 
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
  <FontAwesomeIcon icon={faInstagram} />
  </Link>

  <Link href={`https://github.com/kawsar9990`} 
  rel="noopener noreferrer"
  target="_blank"
  className="border border-gray-400 rounded-full p-1 cursor-pointer hover:text-red-600 shadow-lg">
  <FontAwesomeIcon icon={faGithub} />
  </Link>
</div>


<div>
  <p>© 2026 - Kawsar Ecommerce Shop </p>
</div>

<div className="flex gap-1">
  <img src="/icon/66.png" alt="icon 66" />
<img src="/icon/img5.png" alt="icon img5"  />
<img src="/icon/master_card.png" alt="master card" />
<img src="/icon/paypal.png" alt="paypal" />
<img src="/icon/visa.png" alt="visa" />
</div>

</div>
  </div>


 </div>
    )
}