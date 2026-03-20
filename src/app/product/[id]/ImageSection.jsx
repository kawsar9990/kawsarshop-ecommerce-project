'use client'

import { useState } from "react"
import Image from "next/image"
import FsLightbox from "fslightbox-react"

export default function ImgSection({product}){

const [toggler, setToggler] = useState(false);
const [productIndex, setProductIndex] = useState(0);
const productImages = [product.image, ...(product.categoryImg || [])];


const [showMagnifier, setShowMagnifier] = useState(false);
const [[x, y], setXY] = useState([0, 0]);
const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

const mouseEnter = (e) => {
  const el = e.currentTarget;
  const { width, height } = el.getBoundingClientRect();
  setSize([width, height]);
  setShowMagnifier(true);
}

const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
}




return(
<div className="w-full">


<FsLightbox
        toggler={toggler}
        sources={productImages}
        slide={productIndex + 1}
/>


{/* dekstop  */}
<div className="hidden lg:flex flex-row gap-3">
<div className="flex flex-col justify-between">
{product.categoryImg?.map((cat, i) => (
<div key={i} className="relative cursor-pointer"
onClick={() => { setProductIndex(i + 1); setToggler(!toggler); }}>
<Image
  src={cat}           
  alt={product.name}
  width={90}
  height={100}
  className="rounded-lg shadow object-cover cursor-pointer"
/>
</div>
))}
</div>
<div className="relative cursor-zoom-in" 
onMouseEnter={mouseEnter}
onMouseMove={mouseMove}
onMouseLeave={() => setShowMagnifier(false)}
onClick={() => { setProductIndex(0); setToggler(!toggler); }}>
<Image
  src={product.image}           
  alt={product.name}
  width={400}
  height={150}
  className="rounded-lg shadow h-110 object-cover"
/>
   {showMagnifier && (
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `350px`,
          width: `350px`,
          top: `${y - 75}px`,
          left: `${x - 75}px`,
          opacity: "1",
          border: "2px solid white",
          borderRadius: "50%",
          backgroundColor: "white",
          backgroundImage: `url('${product.image}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * 2.5}px ${imgHeight * 2.5}px`,
          backgroundPositionX: `${-x * 2.5 + 75}px`,
          backgroundPositionY: `${-y * 2.5 + 75}px`
        }}
      />
    )}
</div>
</div>
{/* dekstop  */}





{/* responsive  */}
<div className="flex flex-col gap-4 lg:hidden sm:justify-center items-center">
<div className="relative cursor-zoom-in"
onMouseEnter={mouseEnter}
onMouseMove={mouseMove}
onMouseLeave={() => setShowMagnifier(false)}
onClick={() => { setProductIndex(0); setToggler(!toggler); }}>
<Image
 src={product.image}           
  alt={product.name}
  width={250}
  height={50}
  className="rounded-lg shadow object-cover"
/>
{showMagnifier && (
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `150px`,
          width: `150px`,
          top: `${y - 75}px`,
          left: `${x - 75}px`,
          opacity: "1",
          border: "2px solid white",
          borderRadius: "100%",
          backgroundColor: "white",
          backgroundImage: `url('${product.image}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * 2.5}px ${imgHeight * 2.5}px`,
          backgroundPositionX: `${-x * 2.5 + 75}px`,
          backgroundPositionY: `${-y * 2.5 + 75}px`
        }}
      />
    )}
</div>

<div className="flex flex-row gap-2 md:gap-10 justify-between">
{product.categoryImg?.map((cat, i) => (
<div key={i} className="relative cursor-pointer justify-between"
onClick={() => { setProductIndex(i + 1); setToggler(!toggler); }}>
<Image
  src={cat}           
  alt={product.name}
  width={145}
  height={100}
  className="rounded-lg w-full h-[100px] shadow object-cover cursor-pointer"
/>
</div>
))}
</div>
</div>
{/* responsive  */}

</div>
    )
}