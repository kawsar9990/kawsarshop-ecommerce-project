'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCarSide, faPhoneVolume, faRocket, faSackDollar, faPlay, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

library.add(faPhoneVolume, faRocket, faCarSide, faSackDollar, faPlay, faUser, faLock, faEnvelope);

export default function Reservation() {
  const [videoOpen, setVideoOpen] = useState(false);

  const heroImgUrl = "https://images.pexels.com/photos/845446/pexels-photo-845446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const gadgetImgUrl = "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80";
  const fashionImgUrl = "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const videoThumbnail = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const videoUrl = "https://www.youtube.com/embed/jRpK-eRZNYQ?si=APm34gTz7WOG4jCe";

  return (
    <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">

     
      <div className="relative w-full h-[500px] overflow-hidden">
        <img src={heroImgUrl} alt="Hero Product" className="object-cover w-full h-full brightness-90" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg"
          >
          Welcome KawsarShop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl"
          >
           Shop the latest laptops, smartphones & fashion accessories with exclusive deals.
          </motion.p>
        </motion.div>
      </div>

     
     

     
<div className="py-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
  <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center text-center">
    <img src={gadgetImgUrl} alt="Smart Gadget" className="w-full cursor-pointer max-w-sm rounded-2xl shadow-xl hover:scale-105 transition-transform" />
    <h3 className="mt-6 text-2xl font-bold">Smart Gadget Collection</h3>
    <p className="text-gray-500 mt-2">Innovative phones with powerful performance & stylish designs.</p>
    <Link href={``} className="mt-4 cursor-pointer bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">View Collection</Link>
  </motion.div>
  <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center text-center">
    <img src={fashionImgUrl} alt="Tech Fashion" className="w-full cursor-pointer max-w-sm rounded-2xl shadow-xl hover:scale-105 transition-transform" />
    <h3 className="mt-6 text-2xl font-bold">Stylish Tech Accessories</h3>
    <p className="text-gray-500 mt-2">Find the perfect blend of fashion and technology.</p>
    <Link href={``} className="mt-4 cursor-pointer bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">Explore Now</Link>
  </motion.div>
</div>




    
    <div  className="relative py-20 bg-gradient-to-br from-blue-800 to-indigo-900 flex justify-center items-center">
  <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1260')] bg-cover bg-center opacity-40 blur-sm"></div>

  <div className="relative z-10 w-[90%] md:w-[400px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
 <h2 className="text-3xl font-bold text-center mb-6">KawsarShop</h2>
          <form className="flex flex-col gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-300" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white/10 text-white placeholder-gray-300 pl-10 pr-3 py-2 rounded-md outline-none border border-white/20 focus:border-blue-400"
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-300" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 text-white placeholder-gray-300 pl-10 pr-3 py-2 rounded-md outline-none border border-white/20 focus:border-blue-400"
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-300" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/10 text-white placeholder-gray-300 pl-10 pr-3 py-2 rounded-md outline-none border border-white/20 focus:border-blue-400"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 py-2 rounded-md font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              login
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don’t have an account? <a href="#" className="text-blue-400 hover:underline">Sign Up</a>
          </p>
     
  </div>
    </div>

 
      
        
     
         







      <div className="relative py-20 bg-black">
        <img src={videoThumbnail} alt="Video Thumbnail" className="w-full h-[400px] object-cover brightness-75" />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <motion.button whileHover={{ scale: 1.2, rotate: 8 }} onClick={() => setVideoOpen(true)} className="bg-red-500 text-white p-6 rounded-full shadow-2xl hover:bg-red-600 transition">
            <FontAwesomeIcon icon={faPlay} className="cursor-pointer text-3xl" />
          </motion.button>
          <h3 className="text-2xl md:text-4xl font-bold mt-4 text-white">KawsarShop Watch</h3>
        </motion.div>

        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 top-20 backdrop-blur-md">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="relative w-[90%] md:w-[800px] bg-black rounded-lg overflow-hidden">
              <button onClick={() => setVideoOpen(false)} className="absolute top-4 right-4 cursor-pointer text-white text-3xl font-bold z-50">✕</button>
              <iframe className="w-full h-[350px]" src={`${videoUrl}?autoplay=1`} title="Engineering Product Video" frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
        )}
      </div>




    
      <div className="bg-blue-600 flex flex-col justify-center items-center gap-2 text-white py-12 text-center">
        <h3 className="text-2xl font-bold">Start Shopping Today</h3>
        <Link href={``} className=" bg-white text-blue-600 px-6 py-3 cursor-pointer rounded-full font-semibold hover:bg-gray-100 transition">Add To Shop</Link>
      </div>
    </div>
  );
}
