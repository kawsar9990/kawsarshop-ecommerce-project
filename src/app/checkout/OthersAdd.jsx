'use client'

import { ShieldCheck, RefreshCcw, RotateCcw, Headphones } from 'lucide-react';
import Link from 'next/link';


export default function CheckoutFooter(){

return(
<div>
 <div className="max-w-4xl mx-auto mt-5 py-5 px-3 bg-[#F8F9FA] rounded-lg border border-gray-100">
<div className="flex flex-col sm:flex-row sm:justify-around items-start gap-2 pb-10">
  <div className="flex items-center gap-3 justify-center">
    <ShieldCheck className="text-gray-500 font-semibold text-sm" size={32} strokeWidth={1.5} />
    <span className="text-gray-500 font-semibold text-sm">Secure Shopping</span>
  </div>
  <div className="flex items-center gap-3 justify-center">
    <RefreshCcw className="text-gray-500 font-semibold text-sm" size={32} strokeWidth={1.5} />
    <span className="text-gray-500 font-semibold text-sm">Easy Returns</span>
  </div>
  <div className="flex items-center gap-3 justify-center">
    <RotateCcw className="text-gray-500 font-semibold text-sm" size={32} strokeWidth={1.5} />
    <span className="text-gray-500 font-semibold text-sm">100% Money-Back Guarantee</span>
  </div>
</div>

<div className="space-y-2 text-gray-500 text-[11px] leading-relaxed capitalize mb-10">
  <p>
    <span className="font-bold">1. Disclaimer</span> - Your order ships from the JP, US and will go through a formal customs clearance process. The customs authorities may request additional documents to release your shipment. The consignee is responsible for providing these documents. If you need assistance, please contact our support team.
  </p>
  <p>
    2. Please note that a copy of a national ID or passport is required at any point in time to facilitate the clearance process in accordance with customs rules and regulations.
  </p>
  <p>
    3. For any concerns or questions, please contact our support team. 
    <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact Us</Link>
  </p>
</div>

<div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-gray-200">
  
<div className="flex flex-col items-center gap-4">
  <p className="text-gray-800 font-bold text-sm">Trust Ensured With</p>
  <div className="flex items-center gap-4">
    <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200 shadow-sm">
        <span className="text-[#00A859] font-black text-xl italic italic">PCI</span>
        <span className="text-gray-400 text-[10px] ml-1 leading-tight">DSS<br/>COMPLIANT</span>
    </div>
    <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200 shadow-sm">
        <span className="text-blue-800 font-black text-lg">ISO</span>
        <span className="text-gray-700 text-[11px] font-bold ml-2">27001:2022</span>
    </div>
  </div>
</div>

<div className="flex flex-col items-center gap-4">
  <p className="text-gray-800 font-bold text-sm">Our Top Logistics Partners</p>
  <div className="flex items-center gap-4">
    <div className="bg-[#FFCC00] px-4 py-1 rounded flex items-center justify-center">
        <span className="text-[#D40511] font-black italic text-xl">DHL</span>
    </div>
    <div className="bg-[#4D148C] px-4 py-1 rounded flex items-center justify-center">
        <span className="text-white font-black italic text-xl">Fed<span className="text-[#FF6600]">Ex</span></span>
    </div>
  </div>
</div>

</div>
</div>   
</div>
)    
}