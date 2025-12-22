'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useCategory } from "../../../context/CategoryContext.js";



export default function Item(){

const {activeTab, setActiveTab} = useCategory();
   
const categories = [
    "Fashion",
    "Electronics",
    "Bag",
    "Footwear",
    "Groceries",
    "Beauty",
    "Wellness",
    "Jewellery",
  ];


 


  const NextArrow = ({ onClick }) => (
    <div
      className={`hidden absolute top-1/2 right-2 translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer 
     text-black text-2xl w-8 h-8 md:flex items-center justify-center rounded-full`}
      onClick={onClick}>❯</div>);


  const PrevArrow = ({ onClick }) => (
    <div
      className={`hidden absolute top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer 
      text-black text-2xl w-8 h-8 md:flex items-center justify-center rounded-full`}
      onClick={onClick}>❮</div>);



      
  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  
  };





    return(
        <div className="bg-white overflow-hidden relative">


 

       <div className="relative bg-white overflow-hidden">
        <Slider {...settings} className="uppercase text-[13px] font-semibold font-serif text-center">
          {categories.map((cat)=> (
        <div key={cat}>

 <button onClick={() => setActiveTab(cat)}
   className={`relative cursor-pointer p-2 transition-all duration-300 ${
   activeTab === cat
    ? "text-blue-600 after:absolute after:bottom-0 transition-transform duration-700 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
    : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {cat}
            </button>

        </div>    
          ))}
        </Slider>
      </div>



        </div>
    )
}