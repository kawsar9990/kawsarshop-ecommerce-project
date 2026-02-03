'use client';

import { usePathname } from 'next/navigation';
import {THEME} from '../config/theme'
import '../style/globals.css'

import { LoaderProvider } from '../context/ItemLoaderContext';
import { MainProduct } from '../context/ProductRender';

import Header from '../Components/Header/Header';
import Footer from "../Components/Footer/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/not-found" || pathname === "/searchpage" || pathname === "/login" || pathname === "/register" || pathname === "/ordertracking"
 
  return (
    <html lang="en">
      <title>KAWSAR || SHOPING COMPLEX</title>
      <meta name="description" content="Best online shopping site in Bangladesh" />
      <meta name="keywords" content="https://www.kawsarshop.com/bd" />
      <link rel="shortcut icon" href="/icon/titleicon.png" type="image/x-icon" />
     
    <body className={`antialiased`} cz-shortcut-listen="true" style={{fontFamily: THEME.FONT_FAMILY}}>
     <MainProduct>
      {!hideHeaderFooter && <Header /> }
      <LoaderProvider>      
         {children}
      </LoaderProvider>
     {!hideHeaderFooter && <Footer /> }
     </MainProduct>
      </body>
    </html>
  );
}
