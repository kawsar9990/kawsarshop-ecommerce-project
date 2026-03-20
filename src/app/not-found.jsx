'use client';

import { motion } from "framer-motion";
import Link from "next/link";



export default function NotFound() {
  return (
  <div className="pt-20 xl:pt-0">
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-purple-900 via-black to-indigo-900 text-white relative overflow-hidden">
      
<motion.div
  className="absolute -top-32 -left-32 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 6, repeat: Infinity }}
/>
<motion.div
  className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"
  animate={{ scale: [1, 1.3, 1] }}
  transition={{ duration: 7, repeat: Infinity }} />

<motion.h1
  initial={{ scale: 0, rotate: -10 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: "spring", stiffness: 120, damping: 15 }}
  className="text-[12rem] md:text-[14rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-green-500 drop-shadow-xl"
>
  404
</motion.h1>

<motion.p
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.7 }}
  className="text-4xl md:text-5xl font-bold text-center"
>
  Oops! Page Not Found
</motion.p>

<motion.p
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.7 }}
  className="text-gray-300 mt-4 max-w-lg text-center md:text-lg"
>
  The page you’re looking for doesn’t exist or has been moved.
</motion.p>
 

<Link
  href={`/`}
  className="mt-10 cursor-pointer inline-block px-10 py-4 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
>
  Go Back Home
</Link>
    
    </div>
  </div>
  );
}
