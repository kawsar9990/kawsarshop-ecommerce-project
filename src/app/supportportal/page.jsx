'use client';

import { useState } from "react";

export default function HelpSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    category: "",
    message: "",
  });

const handleChange = (e) => {
  setFormData(
 { ...formData, [e.target.name]: e.target.value });
};

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Support Request Submitted:", formData);
  alert("Your support request has been submitted successfully!");
  setFormData({
    name: "",
    email: "",
    orderId: "",
    category: "",
    message: "",
  });
};

  return (
<div className="bg-[#FFF2F8]">
<div className="max-w-6xl mx-auto px-4 py-10 pt-40 xl:pt-15">


<div className="cursor-pointer w-full">
  <div className="flex justify-center items-center underline">
    <p className="text-5xl font-semibold text-[#114]">Support Center</p>
  </div>
</div>



<div className="bg-[#FFF2F8] rounded-xl p-6 mb-10">
  <h2 className="text-xl font-semibold mb-3">Contact KawsarShop Support</h2>
  <ul className="text-gray-700 space-y-2">
    <li>📧 Email: kawsar158464@gmail.com</li>
    <li>📞 Phone: +8801602084187</li>
    <li>💬 Live Chat: Available on website</li>
    <li>⏰ Support Hours: 9:00 AM – 8:00 PM (Everyday)</li>
  </ul>
</div>

 <div className="border rounded-xl p-6 bg-white">
 <h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>

<form onSubmit={handleSubmit} className="grid gap-4">
<input
  type="text"
  name="name"
  placeholder="Your Name"
  value={formData.name}
  onChange={handleChange}
  required
  className="border p-3 rounded-lg"
/>

<input
  type="email"
  name="email"
  placeholder="Your Email"
  value={formData.email}
  onChange={handleChange}
  required
  className="border p-3 rounded-lg"
/>

<input
  type="text"
  name="orderId"
  placeholder="Order ID (optional)"
  value={formData.orderId}
  onChange={handleChange}
  className="border p-3 rounded-lg"
/>

<select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="border p-3 rounded-lg"
>
  <option value="">Select Issue Category</option>
  <option value="Order">Order Support</option>
  <option value="Payment">Payment & Billing</option>
  <option value="Shipping">Shipping & Delivery</option>
  <option value="Return">Returns & Refunds</option>
  <option value="Account">Account Issues</option>
  <option value="Technical">Technical Support</option>
</select>

<textarea
  name="message"
  placeholder="Describe your issue"
  value={formData.message}
  onChange={handleChange}
  required
  rows={4}
  className="border p-3 rounded-lg"
/>

<button type="submit"
className="bg-black cursor-pointer text-white py-3 rounded-lg hover:bg-gray-800 transition">
 Submit Request
   </button>
    </form>
      </div>
    </div>
</div>
  );
}
