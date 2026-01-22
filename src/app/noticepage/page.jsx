'use client';

import { motion } from 'framer-motion';
import {Building2,Mail,User,ShieldCheck,Scale,Gavel,RefreshCcw,} from 'lucide-react';
import Link from 'next/link';


export default function page() {
 
  return (
    <div className="pt-40 xl:pt-20 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-24">
      <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-5xl mx-auto"
  >
 <div className="text-center mb-16">
   <h1 className="text-5xl font-extrabold text-gray-900">KawsarShop Legal Notice</h1>
   <p className="mt-4 text-gray-600 text-lg">
     Official Legal Information & Terms for KawsarShop e-commerce platform
   </p>
 </div>

<Section icon={<Building2 />} title="Company / Website Identity">
  <p><strong>Business / Company Name:</strong> KawsarShop</p>
  <p><strong>Website & Domain:</strong> https://kawsarshop-ecommerce-web.netlify.app/</p>
  <p><strong>Registered Address:</strong> Dhaka, Bangladesh</p>
  <p><strong>Country / Jurisdiction:</strong> Bangladesh</p>
  <p><strong>Trade License / Registration No:</strong> N/A</p>
</Section>

<Section icon={<Mail />} title="Contact Information">
  <p><strong>Official Email:</strong> kawsar158464@gmail.com</p>
  <p><strong>Phone / Hotline:</strong> +8801611236444</p>
  <p><strong>Office Address:</strong> Dhaka, Bangladesh</p>
  <p><strong>Business Hours:</strong> Sunday – Thursday, 8:00 AM – 12:00 AM</p>
</Section>

<Section icon={<User />} title="Owner / Responsible Person">
  <p><strong>Owner / Founder:</strong> Engineer MD Kawsar Ahmed</p>
  <p><strong>Responsible Person for Legal Matters:</strong> Kawsar (Managing Authority)</p>
</Section>

<Section icon={<ShieldCheck />} title="Intellectual Property Rights">
  <p>
    All content, images, logos, graphics, and texts on this website are the property of KawsarShop
    and protected under copyright laws.
  </p>
  <p>Unauthorized copying, reproduction, modification, or commercial use is strictly prohibited.</p>
</Section>

<Section icon={<Scale />} title="Disclaimer">
  <p>
    Product information, prices, and availability may change without prior notice.
    KawsarShop is not responsible for any errors or omissions.
  </p>
  <p>
    KawsarShop is not responsible for any third-party website content linked from this website.
  </p>
</Section>


 <Section icon={<RefreshCcw />} title="Limitation of Liability">
   <p>
     KawsarShop shall not be liable for any direct, indirect, or incidental damages arising from
     use of this website, service interruptions, or force majeure events including natural disasters.
   </p>
 </Section>

<Section icon={<Gavel />} title="Legal Compliance">
  <p>
    This website operates in accordance with the laws of Bangladesh, consumer protection regulations,
    and applicable VAT / tax compliance.
  </p>
</Section>

<Section icon={<Gavel />} title="Dispute Resolution">
  <p>
    Any disputes shall be governed by the laws of Bangladesh and under the jurisdiction of Bangladeshi courts.
  </p>
</Section>

 <Section icon={<RefreshCcw />} title="Policy References">
   <p><Link href="/privacypolicy" className="text-blue-600 hover:underline">Privacy Policy</Link></p>
   <p><Link href="/termspage" className="text-blue-600 hover:underline">Terms & Conditions</Link></p>
   <p><Link href="/helpcenter" className="text-blue-600 hover:underline">Help Center</Link></p>
 </Section>

 <div className="mt-12 text-center text-gray-500 text-sm">
   <p>Last Updated: 16 Dec 2025</p>
   <p>KawsarShop reserves the right to update or modify this Legal Notice at any time without prior notice.</p>
 </div>

  </motion.div>
</div>
  );
}



function Section({ icon, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
        {icon} {title}
      </h2>
      <div className="text-gray-700 space-y-2 text-sm leading-relaxed">{children}</div>
    </motion.section>
  );
}