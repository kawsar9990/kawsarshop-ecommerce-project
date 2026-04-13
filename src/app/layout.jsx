'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useDynamicTitle } from '../hooks/useDynamicTitle';
import '../style/globals.css'
import { ScrollRestorer } from 'next-scroll-restorer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from '../redux/Providers';
import FloatingCart from '../Components/Cart/FloatingCartBtn';

import { AuthProvider } from '../context/AuthContext';
import { LoaderProvider } from '../context/ItemLoaderContext';
import { MainProduct } from '../context/ProductRender';

import Header from '../Components/Header/Header';
import Footer from "../Components/Footer/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/searchpage"

  useDynamicTitle();
 
  return (
   <html lang="en">
      <title>KawsarShop: Online Shopping Site</title>
      <meta name="description" content="Best online shopping site in Bangladesh" />
      <meta name="keywords" content="https://www.kawsarshop.com/bd" />
      <link rel="shortcut icon" href="/icon/titleicon.png" type="image/x-icon" />
     
    <body className={`antialiased`} cz-shortcut-listen="true">
     <SessionProvider>
     <ReduxProvider>
       <AuthProvider>
     <MainProduct>
      <LoaderProvider>  
      {!hideHeaderFooter && <Header /> }


      <Suspense  fallback={null}>
        <ScrollRestorer /> 
      </Suspense>
      
         {children}

          <FloatingCart />

         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className={`p-3 md:p-0 rounded-md`}
            style={{ top: '20px', right: '20px', zIndex: "88888888888888" }}
          />
          
     {!hideHeaderFooter && <Footer /> }
       </LoaderProvider>
     </MainProduct>
     </AuthProvider>
     </ReduxProvider>
     </SessionProvider>
      </body>
    </html>
  );
}
