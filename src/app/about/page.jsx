'use client';


import img1 from '../../../public/img/WhatsApp Image 2025-01-16 at 5.34.28 PM (1).jpeg'
import img2 from '../../../public/img/WhatsApp Image 2025-01-16 at 5.34.28 PM (2).jpeg'
import img3 from '../../../public/img/WhatsApp Image 2025-03-02 at 3.38.51 PM.jpeg'
import img4 from '../../../public/img/2.jpeg'

export default function AboutPage() {
  return (
    <div className="pt-0 xl:pt-0">

      <div className="bg-[#FFF2F8] text-gray-900">

       
<div className="cursor-pointer w-full pt-40 xl:pt-20">
  <div className="flex justify-center items-center">
    <p className="text-5xl font-semibold text-[#114]">About Us</p>
  </div>
</div>


<div className="max-w-6xl mx-auto py-20 px-6">
  <div className="grid md:grid-cols-2 gap-10">
    <img
      src={img2.src}
      alt="KawsarShop Team"
      className="rounded-2xl shadow-lg w-full md:w-80"
    />
    <div>
      <h2 className="text-3xl font-extrabold mb-4">Who We Are</h2>
      <p className="text-gray-600 leading-relaxed capitalize mb-4">
       KawsarShop is an innovative and customer-focused e-commerce platform dedicated to delivering a seamless, reliable, and enjoyable online shopping experience. Our mission is to provide high-quality products, modern technology, and excellent customer service under one digital roof.
       We aim to bridge the gap between quality products and customer trust through a secure and user-friendly online marketplace.
       At KawsarShop, we offer a wide range of carefully selected products across multiple categories, including fashion, lifestyle, daily essentials, and trending items. Each product listed on our platform goes through a quality-check process to ensure durability, value, and customer satisfaction. We continuously update our catalog to align with modern trends and evolving customer needs.
      </p>
      <p className="text-gray-600 leading-relaxed">
        From humble beginnings, KawsarShop has grown into a trusted marketplace connecting thousands of customers with top brands worldwide.
      </p>
    </div>
  </div>
</div>





<div className="bg-[#FFF2F8] py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-extrabold mb-10">Meet the KawsarShop Team</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { name: "Kawsar Ahmed", role: "CEO & Founder", img: img1.src},
        { name: "kawsar Ahmed", role: "CTO", img: img2.src },
        { name: "kawsar Ahmed", role: "Marketing Head", img: img3.src },
        { name: "kawsar Ahmed", role: "Operations Manager",img: img4.src },
      ].map((member, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow p-5"
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-amber-400"
          />
          <h4 className="text-lg font-bold">{member.name}</h4>
          <p className="text-gray-600 text-sm">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
