import { Suspense } from 'react';
import '../style/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './ClientLayout';

export const metadata = {
title: "KawsarShop: Best Premium Online Shopping Site in Bangladesh",
description: "Kawsar Shop is Bangladesh's ultimate premium e-commerce marketplace. Discover genuine global brands, trendy fashion, elite lifestyle products, and daily essentials. Enjoy exclusive VIP discounts, lightning-fast delivery, and trusted COD countrywide.",
keywords: ["Kawsar Shop", "KawsarShop", "Online Shopping BD", "E-commerce Bangladesh", "Shopping Website", "Kawsar", "Website", "Kawsar Website", "Kawsarshop"],
icons: {
  icon: "/icon/kawsarShopIcon.png",
  shortcut: "/icon/kawsarShopIcon.png",
  apple: "/icon/kawsarShopIcon.png"
},

openGraph: {
 title: "KawsarShop || Bangladesh's No.One Premium E-commerce",
 description: "Experience luxury online shopping at Kawsar Shop. Get exclusive discounts, premium quality, and super-fast delivery across Bangladesh.",
 url: "https://kawsarshop-ecommerce-web.netlify.app",
 siteName: "KawsarShop",
 images: [
  {
    url: "https://kawsarshop-ecommerce-web.netlify.app/icon/KawsarShop.png",
    width: 1200,
    height: 630,
    alt: "KawsarShop Banner",
  },
 ],
 type: "website"
},

twitter: {
    card: "summary_large_image",
    title: "KawsarShop || Bangladesh's No.One Premium E-commerce",
    description: "Experience luxury online shopping at Kawsar Shop. Get exclusive discounts and fast delivery.",
    images: ["/icon/KawsarShop.png"],
  },

  verification: {
    google: "uVznFPVoj_jjWBzzrLls0F87qJ8zglJA7I46RHpDAG4",
  },

};



export default function RootLayout({ children }) {

const jsonLd = {
 "@context": "https://schema.org", 
  "@type": "WebSite",
  "name": "KawsarShop",
  "url": "https://kawsarshop-ecommerce-web.netlify.app"
}

return (
<html lang="en">     
<body className={`antialiased`} cz-shortcut-listen="true">

<script 
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>  
<ClientLayout>{children}</ClientLayout>
</body>
</html>
);
}
