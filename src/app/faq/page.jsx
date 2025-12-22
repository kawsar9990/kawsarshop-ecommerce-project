'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from 'next/link';
import img1 from '../../../public/img/download.jpeg'
import img2 from '../../../public/img/Mark Zuckerberg.jpeg'
import img3 from '../../../public/img/Steve Jobs showing the first iphone.jpeg' 
import img4 from '../../../public/img/download (1).jpeg'



const heroImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2000&q=80";


const reviews = [
  { 
    name: 'Elon Musk', 
    designation: 'CEO, Tesla', 
    img: img1.src, 
    text: 'KawsarShop delivers innovation with every purchase. My new laptop arrived fast and performs flawlessly — truly impressive service!'
  },
  { 
    name: 'Mark Zuckerberg', 
    designation: 'CEO, Meta', 
    img: img2.src, 
    text: 'The KawsarShop experience was seamless from browsing to checkout. Delivery was quick, and the packaging was excellent.'
  },
  { 
    name: 'Steve Jobs', 
    designation: 'Founder, Apple', 
    img: img3.src, 
    text: 'KawsarShop stands out for its premium quality and attention to detail. Every product feels carefully curated.'
  },
  { 
    name: 'Bill Gates', 
    designation: 'Founder, Microsoft', 
    img: img4.src, 
    text: 'I’m impressed by KawsarShop’s customer service and wide range of authentic products. A reliable destination for online shopping.'
  }
];


const faqItems = [
  { 
    q: "How can I order products online?", 
    a: "Shopping at KawsarShop is easy! Just add your favorite items to the cart and complete your purchase through our secure checkout system."
  },
  { 
    q: "Where can I track my order?", 
    a: "You can track your order anytime from your KawsarShop account dashboard. Simply go to 'My Orders' to view real-time delivery updates."
  },
  { 
    q: "Can I return a product?", 
    a: "Yes! KawsarShop offers a 30-day return policy on eligible products. If you’re not fully satisfied, you can easily request a return or exchange."
  },
  { 
    q: "Are all products genuine?", 
    a: "Absolutely! Every product on KawsarShop comes directly from verified and trusted manufacturers — authenticity is guaranteed."
  },
  { 
    q: "Do you offer discounts?", 
    a: "Yes, we love rewarding our customers! Subscribe to the KawsarShop newsletter or follow us on social media to get the latest deals and exclusive offers."
  },
  { 
    q: "How can I contact support?", 
    a: "Our customer support team is always here to help. Visit the KawsarShop Contact page or start a live chat for quick assistance."
  }
];


export default function FaqPage(){

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 10,
    },
    breakpoints: {
    "(min-width: 640px)": {
      slides: {
        perView: 1,
        spacing: 10,
      },
    },
    "(min-width: 768px)": {
      slides: {
        perView: 2,
        spacing: 15,
      },
    },
    "(min-width: 1280px)": {
      slides: {
        perView: 3,
        spacing: 20,
      },
    },
  },
  });

  useEffect(()=> {
    const slider = instanceRef.current;
    if (!slider) return;
    const interval = setInterval(() => {
      slider.next();
    }, 1000);
    return () => clearInterval(interval);
  }, [instanceRef])


  return(
 <div className="min-h-screen bg-gray-900 text-white " >

<motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative xl:h-[450] w-full overflow-hidden"
      >
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-full object-cover brightness-75"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold">
           Welcome KawsarShop
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
            Shop the latest laptops, smartphones & fashion accessories with exclusive deals.
          </p>
          <Link href={``} className="mt-6 cursor-pointer bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Shop Now
          </Link>
        </motion.div>
      </motion.div>

    

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">❓ {item.q}</h3>
              <p className="text-gray-300">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>


    
     <section className="py-16 px-6 bg-gray-950">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-10">
          Customer Reviews
        </h2>
        <div ref={sliderRef} className="keen-slider">
          {reviews.map((r, idx) => (
            <div key={idx} className="keen-slider__slide p-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-gray-800 p-6 rounded-xl h-80 cursor-pointer shadow-lg flex flex-col items-center"
              >
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{r.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{r.designation}</p>
                <p className="text-gray-300 text-center">{r.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

 </div>
  )
}