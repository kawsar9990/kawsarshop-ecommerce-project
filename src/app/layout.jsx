'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import '../style/globals.css'
import { ScrollRestorer } from 'next-scroll-restorer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoaderProvider } from '../context/ItemLoaderContext';
import { MainProduct } from '../context/ProductRender';

import Header from '../Components/Header/Header';
import Footer from "../Components/Footer/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/searchpage"
 
  return (
   <html lang="en">
      <title>KAWSAR || SHOPING COMPLEX</title>
      <meta name="description" content="Best online shopping site in Bangladesh" />
      <meta name="keywords" content="https://www.kawsarshop.com/bd" />
      <link rel="shortcut icon" href="/icon/titleicon.png" type="image/x-icon" />
     
    <body className={`antialiased`} cz-shortcut-listen="true">
     <MainProduct>
      {!hideHeaderFooter && <Header /> }
      <LoaderProvider>  


      <Suspense  fallback={null}>
        <ScrollRestorer /> 
      </Suspense>
      
         {children}

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
          
      </LoaderProvider>
     {!hideHeaderFooter && <Footer /> }
     </MainProduct>
      </body>
    </html>
  );
}
