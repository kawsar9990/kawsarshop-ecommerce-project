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
<div className="max-w-6xl mx-auto px-4 py-10 pt-40 xl:pt-15">
 <h1 className="text-3xl font-bold mb-4">KawsarShop Help & Support</h1>
 <p className="text-gray-600 mb-8">
   Welcome to the KawsarShop Support Portal. We are here to help you with
   orders, payments, delivery, returns, and technical issues.
 </p>

<div className="grid md:grid-cols-3 gap-6 mb-10">
{[
  { title: "Order Support", desc: "Track, cancel or modify your orders." },
  { title: "Payment & Billing", desc: "Payment issues, refunds & invoices." },
  { title: "Shipping & Delivery", desc: "Delivery time, delays & charges." },
  { title: "Returns & Refunds", desc: "Return policy & refund status." },
  { title: "Account Issues", desc: "Login, password & profile issues." },
  { title: "Technical Support", desc: "Website or checkout problems." },
].map((item, index) => (
<div
  key={index}
  className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
    <p className="text-gray-500 text-sm">{item.desc}</p>
  </div>
))}
      </div>

<div className="bg-gray-100 rounded-xl p-6 mb-10">
  <h2 className="text-xl font-semibold mb-3">Contact KawsarShop Support</h2>
  <ul className="text-gray-700 space-y-2">
    <li>📧 Email: kawsar158464@gmail.com</li>
    <li>📞 Phone: +8801602084187</li>
    <li>💬 Live Chat: Available on website</li>
    <li>⏰ Support Hours: 9:00 AM – 8:00 PM (Everyday)</li>
  </ul>
</div>

 <div className="border rounded-xl p-6">
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
  );
}
