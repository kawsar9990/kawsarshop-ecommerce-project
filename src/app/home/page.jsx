'use client';

import FirstSlider from "./Home/firstslider"
import Sliderbox from "./Home/sliderbox"
import HomePopularProduct from "./PopularProduct/page"
import Pages from "./MainSlider/page"
import LatestPage from "./LatestProduct/page"
import FeaturedPage from "./FeaturedProducts/page"
import Banner2 from "./OthersPage/page2"
import ElectronicsPage from "./Electronics/page"
import BagsPage from "./Bags/page"
import GroceriesPage from "./Groceries/page"
import FootwearPage from "./Footwear/page"
import BeautyPage from "./Beauty/page"
import WellnessPage from "./Wellness/page"
import JewelleryPage from "./Jewellery/page"
import Banner3 from "./OthersPage/page3"
import Blog from "./Blog/page"

import {useEffect, useState } from "react";

export default function HomePage(){
   
const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
}, []);

if(!mounted) return null;  
   
    return(
        <div className="xl:pt-0 bg-[#FFF2F8]">
        <FirstSlider />
        <Sliderbox />
        <HomePopularProduct />
        <Pages />
        <LatestPage />
        <FeaturedPage />
        <Banner2 />
        <ElectronicsPage />
        <BagsPage />
        <GroceriesPage />
        <FootwearPage />
        <Banner3 />
        <BeautyPage />
        <WellnessPage />
        <JewelleryPage />
        <Blog />
        </div>
    )
}