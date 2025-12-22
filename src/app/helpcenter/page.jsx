"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  Info,
  Lock,
  Truck,
  Headphones,
  CreditCard,
  User,
  RefreshCw,
  ShoppingBag,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [showHelpBox, setShowHelpBox] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelpBox(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+8801602084187";
  const helpMessage = encodeURIComponent("Hi! I need some help from KawsarShop support team.");

  const handleYesClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${helpMessage}`;
    window.open(url, "_blank");
    setShowHelpBox(false);
  };

  const handleNoClick = () => setShowHelpBox(false);

  const categories = [
    { icon: <ShoppingBag className="text-amber-500 w-8 h-8" />,
     title: "Orders & Delivery", 
     desc: "Track your KawsarShop orders and view shipping updates." 
    },
    { icon: <CreditCard className="text-amber-500 w-8 h-8" />, 
    title: "Payments & Refunds", 
    desc: "Manage KawsarShop payments, refunds, and billing issues." 
    },
    { icon: <User className="text-amber-500 w-8 h-8" />, 
    title: "Account Settings", 
    desc: "Change KawsarShop account password, email, and privacy settings." 
    },
    { icon: <Lock className="text-amber-500 w-8 h-8" />,
     title: "Security & Privacy",
      desc: "Learn how to secure your KawsarShop account." 
    },
    { icon: <RefreshCw className="text-amber-500 w-8 h-8" />, 
    title: "Returns & Replacements", 
    desc: "Initiate returns and replacements at KawsarShop." 
    },
    { icon: <Headphones className="text-amber-500 w-8 h-8" />, 
    title: "Customer Support", 
    desc: "Get in touch with KawsarShop support or start live chat." 
    },
    { icon: <Truck className="text-amber-500 w-8 h-8" />, 
    title: "Shipping Information", 
    desc: "Check KawsarShop delivery times and courier options." 
    },
  ];

  const faqs = [
    { q: "How do I reset my KawsarShop password?", a: "Click on 'Forgot Password' and follow the email instructions." },
    { q: "Can I cancel my KawsarShop order?", a: "Yes, within 2 hours before shipping." },
    { q: "How do I contact KawsarShop customer service?", a: "Visit the Customer Support page or start a live chat." },
    { q: "Where is my KawsarShop refund?", a: "Refunds are processed within 3–5 business days." },
  ];

  return (
    <div className="min-h-screen pt-40 xl:pt-10 bg-white text-gray-900 py-16 px-6 relative">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-amber-100 border border-amber-300 p-4 rounded-xl mb-8 flex items-center gap-3"
      >
        <Info className="text-amber-600 w-6 h-6" />
        <p className="text-sm md:text-base text-gray-700">
          Need help? Visit our{" "}
          <Link
            href={`/reservation`}
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
          >
            KawsarShop Support Portal
          </Link>{" "}
          or wait — our assistant may ask you!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">KawsarShop Help Center</h1>
        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          Find answers or get in touch with the KawsarShop support team anytime.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto mb-12 relative"
      >
        <HelpCircle className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search KawsarShop help articles..."
          className="w-full bg-gray-100 border border-gray-300 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((c, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
          >
            <div className="mb-4">{c.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">{c.title}</h3>
            <p className="text-gray-600 text-sm">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto mt-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Common Questions</h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-amber-400/60 shadow-sm"
            >
              <h4 className="font-semibold text-lg mb-2 text-amber-600">
                ❓ {f.q}
              </h4>
              <p className="text-gray-700">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 bg-gray-100 border-t border-gray-200 py-8 text-center rounded-t-xl"
      >
        {feedback ? (
          <p className="text-amber-600 font-semibold">
            {feedback === "yes" ? "🎉 Thanks for your feedback on KawsarShop!" : "Thanks! We’ll improve KawsarShop further."}
          </p>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Was this page helpful for KawsarShop?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setFeedback("yes")}
                className="bg-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
              >
                <ThumbsUp size={18} /> Yes
              </button>
              <button
                onClick={() => setFeedback("no")}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-400 transition"
              >
                <ThumbsDown size={18} /> No
              </button>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {showHelpBox && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 bg-white border border-gray-300 rounded-xl p-5 shadow-xl w-72 z-50"
          >
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
              <HelpCircle className="text-amber-500 w-5 h-5" /> Need KawsarShop Help?
            </h4>
            <p className="text-gray-700 mb-4">
              Do you need any help or assistance from KawsarShop right now?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleYesClick}
                className="bg-amber-500 text-white px-4 py-1 rounded-full font-semibold hover:scale-105 transition"
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300 transition"
              >
                No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
