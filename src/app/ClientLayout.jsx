'use client';

import { usePathname } from 'next/navigation';
import { useDynamicTitle } from '../hooks/useDynamicTitle';
import { ScrollRestorer } from 'next-scroll-restorer';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from '../redux/Providers';
import FloatingCart from '../Components/Cart/FloatingCartBtn';
import { AuthProvider } from '../context/AuthContext';
import { LoaderProvider } from '../context/ItemLoaderContext';
import { MainProduct } from '../context/ProductRender';
import { Suspense } from 'react';

import Header from '../Components/Header/Header';
import Footer from "../Components/Footer/Footer";


export default function ClientLayout({ children }){
    
const pathname = usePathname();
const hideHeaderFooter = pathname === "/searchpage"

useDynamicTitle();

return(
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
)
}