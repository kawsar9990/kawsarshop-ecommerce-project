'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Printer } from "lucide-react";

export default function LegalNoticePage() {
  const [openIndex, setOpenIndex] = useState(null);

 const notices = [
  {
    title: "KawsarShop Terms of Service",
    content:
      "By accessing KawsarShop, you agree to comply with all terms and conditions. Misuse of our platform may result in account suspension or legal action.",
  },
  {
    title: "KawsarShop Privacy Policy",
    content:
      "We value your privacy at KawsarShop. Your data is stored securely and used only to improve our service experience. We never sell personal data to third parties.",
  },
  {
    title: "KawsarShop Return & Refund Policy",
    content:
      "Products purchased from KawsarShop can be returned within 30 days if unused and in original condition. Refunds are processed within 5-7 business days.",
  },
  {
    title: "KawsarShop Cookies & Tracking",
    content:
      "KawsarShop uses cookies to enhance your browsing experience. You can manage cookie preferences anytime from your browser settings.",
  },
];


  return (
    <div className="min-h-screen pt-40 xl:pt-10 bg-white text-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
       

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Legal Notice</h1>
          <p className="text-gray-600">
            Please review our key policies below. These are updated regularly to keep you informed.
          </p>
        </div>

      

        <div className="space-y-4">
          {notices.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex justify-between w-full items-center p-4 text-left font-semibold text-gray-800"
                >
                  <span>{item.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 text-gray-700"
                    >
                      {item.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      
        <div className="mt-10 text-center text-sm text-gray-600">
          <p>Last updated: <strong>October 26, 2025</strong></p>
          <button
            onClick={() => window.print()}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <Printer className="w-4 h-4" />
            Print Page
          </button>
        </div>


      </div>
    </div>
  );
}
