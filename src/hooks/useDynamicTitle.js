'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useDynamicTitle = () => {
  
const pathname = usePathname();

useEffect(()=> {

const isHome = pathname === "/" || pathname === "/home";

if(isHome){
   document.title = "KawsarShop: Online Shopping Site"; 
}else{
    const specialTitles = {
        "/cart": "Shopping Cart",
        "/searchpage": "Search Results",
        "/payment-methods": "Payment Methods",
        "/home/Blog": "KawsarShop: Blog",
        "/about": "About Us KawsarShop",
        "/faq": "Frequently Asked Questions",
        "/forgot-password": "Forgot Password",
    };

    let dynamicTitle = specialTitles[pathname];

    if(!dynamicTitle){
        const pathSegments = pathname.split('/').filter(Boolean);

        const filteredSegments = pathSegments.filter(segment => {
            const isNumber = /^\d+$/.test(segment);
            const isMongoId = /^[a-f\d]{24}$/i.test(segment);
            return !isNumber && !isMongoId;
        });

        dynamicTitle = filteredSegments
        .map(segment => 
            segment.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        )
        .join(' - ');
    }
    document.title = `${dynamicTitle || "Product Details"} | KawsarShop`
}

}, [pathname])

};