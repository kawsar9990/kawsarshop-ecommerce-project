'use client';

import { useEffect } from 'react';

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img1 from '../../../public/img/download.jpeg'
import img2 from '../../../public/img/Mark Zuckerberg.jpeg'
import img3 from '../../../public/img/Steve Jobs showing the first iphone.jpeg' 
import img4 from '../../../public/img/download (1).jpeg'


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
    q: "𝙃𝙤𝙬 𝙘𝙖𝙣 𝙄 𝙤𝙧𝙙𝙚𝙧 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙨 𝙤𝙣𝙡𝙞𝙣𝙚", 
    a: "𝘚𝘩𝘰𝘱𝘱𝘪𝘯𝘨 𝘢𝘵 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘪𝘴 𝘦𝘢𝘴𝘺! 𝘑𝘶𝘴𝘵 𝘢𝘥𝘥 𝘺𝘰𝘶𝘳 𝘧𝘢𝘷𝘰𝘳𝘪𝘵𝘦 𝘪𝘵𝘦𝘮𝘴 𝘵𝘰 𝘵𝘩𝘦 𝘤𝘢𝘳𝘵 𝘢𝘯𝘥 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘦 𝘺𝘰𝘶𝘳 𝘱𝘶𝘳𝘤𝘩𝘢𝘴𝘦 𝘵𝘩𝘳𝘰𝘶𝘨𝘩 𝘰𝘶𝘳 𝘴𝘦𝘤𝘶𝘳𝘦 𝘤𝘩𝘦𝘤𝘬𝘰𝘶𝘵 𝘴𝘺𝘴𝘵𝘦𝘮."
  },
  { 
    q: "𝙒𝙝𝙚𝙧𝙚 𝙘𝙖𝙣 𝙄 𝙩𝙧𝙖𝙘𝙠 𝙢𝙮 𝙤𝙧𝙙𝙚𝙧", 
    a: "𝘠𝘰𝘶 𝘤𝘢𝘯 𝘵𝘳𝘢𝘤𝘬 𝘺𝘰𝘶𝘳 𝘰𝘳𝘥𝘦𝘳 𝘢𝘯𝘺𝘵𝘪𝘮𝘦 𝘧𝘳𝘰𝘮 𝘺𝘰𝘶𝘳 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘢𝘤𝘤𝘰𝘶𝘯𝘵 𝘥𝘢𝘴𝘩𝘣𝘰𝘢𝘳𝘥. 𝘚𝘪𝘮𝘱𝘭𝘺 𝘨𝘰 𝘵𝘰 '𝘔𝘺 𝘖𝘳𝘥𝘦𝘳𝘴' 𝘵𝘰 𝘷𝘪𝘦𝘸 𝘳𝘦𝘢𝘭-𝘵𝘪𝘮𝘦 𝘥𝘦𝘭𝘪𝘷𝘦𝘳𝘺 𝘶𝘱𝘥𝘢𝘵𝘦𝘴."
  },
  { 
    q: "𝘾𝙖𝙣 𝙄 𝙧𝙚𝙩𝙪𝙧𝙣 𝙖 𝙥𝙧𝙤𝙙𝙪𝙘𝙩", 
    a: "𝘠𝘦𝘴! 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘰𝘧𝘧𝘦𝘳𝘴 𝘢 30-𝘥𝘢𝘺 𝘳𝘦𝘵𝘶𝘳𝘯 𝘱𝘰𝘭𝘪𝘤𝘺 𝘰𝘯 𝘦𝘭𝘪𝘨𝘪𝘣𝘭𝘦 𝘱𝘳𝘰𝘥𝘶𝘤𝘵𝘴. 𝘐𝘧 𝘺𝘰𝘶’𝘳𝘦 𝘯𝘰𝘵 𝘧𝘶𝘭𝘭𝘺 𝘴𝘢𝘵𝘪𝘴𝘧𝘪𝘦𝘥, 𝘺𝘰𝘶 𝘤𝘢𝘯 𝘦𝘢𝘴𝘪𝘭𝘺 𝘳𝘦𝘲𝘶𝘦𝘴𝘵 𝘢 𝘳𝘦𝘵𝘶𝘳𝘯 𝘰𝘳 𝘦𝘹𝘤𝘩𝘢𝘯𝘨𝘦."
  },
  { 
    q: "𝘼𝙧𝙚 𝙖𝙡𝙡 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙨 𝙜𝙚𝙣𝙪𝙞𝙣𝙚", 
    a: "𝘈𝘣𝘴𝘰𝘭𝘶𝘵𝘦𝘭𝘺! 𝘌𝘷𝘦𝘳𝘺 𝘱𝘳𝘰𝘥𝘶𝘤𝘵 𝘰𝘯 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘤𝘰𝘮𝘦𝘴 𝘥𝘪𝘳𝘦𝘤𝘵𝘭𝘺 𝘧𝘳𝘰𝘮 𝘷𝘦𝘳𝘪𝘧𝘪𝘦𝘥 𝘢𝘯𝘥 𝘵𝘳𝘶𝘴𝘵𝘦𝘥 𝘮𝘢𝘯𝘶𝘧𝘢𝘤𝘵𝘶𝘳𝘦𝘳𝘴 — 𝘢𝘶𝘵𝘩𝘦𝘯𝘵𝘪𝘤𝘪𝘵𝘺 𝘪𝘴 𝘨𝘶𝘢𝘳𝘢𝘯𝘵𝘦𝘦𝘥."
  },
  { 
    q: "𝘿𝙤 𝙮𝙤𝙪 𝙤𝙛𝙛𝙚𝙧 𝙙𝙞𝙨𝙘𝙤𝙪𝙣𝙩𝙨", 
    a: "𝘠𝘦𝘴, 𝘸𝘦 𝘭𝘰𝘷𝘦 𝘳𝘦𝘸𝘢𝘳𝘥𝘪𝘯𝘨 𝘰𝘶𝘳 𝘤𝘶𝘴𝘵𝘰𝘮𝘦𝘳𝘴! 𝘚𝘶𝘣𝘴𝘤𝘳𝘪𝘣𝘦 𝘵𝘰 𝘵𝘩𝘦 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘯𝘦𝘸𝘴𝘭𝘦𝘵𝘵𝘦𝘳 𝘰𝘳 𝘧𝘰𝘭𝘭𝘰𝘸 𝘶𝘴 𝘰𝘯 𝘴𝘰𝘤𝘪𝘢𝘭 𝘮𝘦𝘥𝘪𝘢 𝘵𝘰 𝘨𝘦𝘵 𝘵𝘩𝘦 𝘭𝘢𝘵𝘦𝘴𝘵 𝘥𝘦𝘢𝘭𝘴 𝘢𝘯𝘥 𝘦𝘹𝘤𝘭𝘶𝘴𝘪𝘷𝘦 𝘰𝘧𝘧𝘦𝘳𝘴."
  },
  { 
    q: "𝙃𝙤𝙬 𝙘𝙖𝙣 𝙄 𝙘𝙤𝙣𝙩𝙖𝙘𝙩 𝙨𝙪𝙥𝙥𝙤𝙧𝙩", 
    a: "𝘖𝘶𝘳 𝘤𝘶𝘴𝘵𝘰𝘮𝘦𝘳 𝘴𝘶𝘱𝘱𝘰𝘳𝘵 𝘵𝘦𝘢𝘮 𝘪𝘴 𝘢𝘭𝘸𝘢𝘺𝘴 𝘩𝘦𝘳𝘦 𝘵𝘰 𝘩𝘦𝘭𝘱. 𝘝𝘪𝘴𝘪𝘵 𝘵𝘩𝘦 𝘒𝘢𝘸𝘴𝘢𝘳𝘚𝘩𝘰𝘱 𝘊𝘰𝘯𝘵𝘢𝘤𝘵 𝘱𝘢𝘨𝘦 𝘰𝘳 𝘴𝘵𝘢𝘳𝘵 𝘢 𝘭𝘪𝘷𝘦 𝘤𝘩𝘢𝘵 𝘧𝘰𝘳 𝘲𝘶𝘪𝘤𝘬 𝘢𝘴𝘴𝘪𝘴𝘵𝘢𝘯𝘤𝘦."
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
 <div className="bg-[#FFF2F8] text-[#113]">


<div className="cursor-pointer w-full pt-40 xl:pt-20">
  <div className="flex justify-center items-center underline">
    <p className="text-5xl font-semibold text-[#114]">FAQ</p>
  </div>
</div>



<section className="py-16 px-6 max-w-6xl mx-auto cursor-pointer">
  <h2 className="text-3xl md:text-5xl font-black text-center mb-6">
    Frequently Asked Questions
  </h2>
  <div className="grid gap-8 md:grid-cols-2">
    {faqItems.map((item, idx) => (
      <div
        key={idx}
        className="text-black p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
      >
        <h3 className="text-xl font-bold text-[#155] mb-2">{item.q}</h3>
        <p className="text-black">{item.a}</p>
      </div>
    ))}
  </div>
</section>


    
   <section className="py-16 px-6 text-black">
   <h2 className="text-3xl md:text-5xl font-black text-center mb-10">
     Customer Reviews
   </h2>
  <div ref={sliderRef} className="keen-slider">
  {reviews.map((r, idx) => (
    <div key={idx} className="keen-slider__slide p-6">
      <div
        className=" p-6 rounded-xl bg-white h-80 cursor-pointer shadow-lg flex flex-col items-center"
      >
        <img
          src={r.img}
          alt={r.name}
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h3 className="text-xl font-bold">{r.name}</h3>
        <p className="text-black text-sm mb-4">{r.designation}</p>
        <p className="text-black text-center">{r.text}</p>
      </div>
    </div>
  ))}
</div>
      </section>

 </div>
  )
}