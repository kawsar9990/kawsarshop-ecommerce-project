'use client'

import Image from "next/image"

export default function ImgSection({product}){



return(
<div className="lg:sticky lg:top-40">



{/* dekstop  */}
<div className="hidden lg:flex flex-row gap-3">
<div className="flex flex-col justify-between">
{product.categoryImg?.map((cat, i) => (
<div key={i} className="relative cursor-pointer ">
<Image
  src={cat}           
  alt={`Category ${i+1}`}
  width={100}
  height={100}
  className="rounded-lg shadow object-cover cursor-pointer"
/>
</div>
))}
</div>
<div className="relative">
<Image
 src={product.image}           
  alt={product.name}
  width={400}
  height={150}
  className="rounded-lg shadow h-110 object-cover cursor-pointer"
/>
</div>
</div>
{/* dekstop  */}





{/* responsive  */}
<div className="flex flex-col gap-4 lg:hidden sm:justify-center items-center">
<div className="relative">
<Image
 src={product.image}           
  alt={product.name}
  width={520}
  height={150}
  className="rounded-lg shadow object-cover cursor-pointer"
/>
</div>

<div className="flex flex-row gap-2 md:gap-10">
{product.categoryImg?.map((cat, i) => (
<div key={i} className="relative cursor-pointer flex-1">
<Image
  src={cat}           
  alt={`Category ${i+1}`}
  width={145}
  height={100}
  className="rounded-lg shadow object-cover cursor-pointer"
/>
</div>
))}
</div>
</div>
{/* responsive  */}




</div>
    )
}