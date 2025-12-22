'use client';

import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

export default function TermsPage() {
  const handleAgree = () => {
    alert("Thank you! You have accepted KawsarShop Terms & Conditions.");
  };

  return (
    <div className="min-h-screen pt-40 xl:pt-10 bg-white text-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
     
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-3">
            <Shield className="w-12 h-12 text-amber-500" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
            KawsarShop Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Please read KawsarShop terms carefully before using our services.
          </p>
        </motion.div>

    
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-8 leading-relaxed text-gray-700"
        >
          <section>
            <h2 className="text-xl font-bold text-amber-600 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KawsarShop, you agree to comply with these
              Terms and Conditions. If you do not agree, please discontinue use
              immediately.
            </p>
          </section>
     <section>
         <h2 className="text-xl font-bold text-amber-600 mb-2">2. User Responsibilities</h2>
         <p>
           Users of KawsarShop are expected to provide accurate information, respect other
           members, and refrain from any illegal or harmful activity while
              using our platform.
            </p>
       </section>

<section>
  <h2 className="text-xl font-bold text-amber-600 mb-2">3. Purchases & Payments</h2>
  <p>
    All payments on KawsarShop must be completed securely. We reserve the right to
    cancel orders suspected of fraudulent activity or misuse.
  </p>
</section>

 <section>
   <h2 className="text-xl font-bold text-amber-600 mb-2">4. Limitation of Liability</h2>
   <p>
     KawsarShop is not liable for any indirect or consequential damages
     resulting from the use of our website or services.
   </p>
 </section>

  <section>
    <h2 className="text-xl font-bold text-amber-600 mb-2">5. Changes to Terms</h2>
    <p>
      KawsarShop may update these terms from time to time. Please review this
      page regularly to stay informed about any changes.
    </p>
  </section>
</motion.div>
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.6 }}
className="text-center mt-12">
 <button
   onClick={handleAgree}
   className="inline-flex items-center cursor-pointer gap-2 bg-amber-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-amber-600 transition">
   <CheckCircle className="w-5 h-5" /> I Agree
 </button>
<p className="mt-3 text-sm text-gray-500">
  Last updated: <strong>October 26, 2025</strong> | KawsarShop
</p>
  </motion.div>
      </div>
    </div>
  );
}
