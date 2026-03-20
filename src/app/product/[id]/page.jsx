'use client'

import { useEffect } from "react";
import { useParams } from "next/navigation"
import { useProducts } from "../../../hooks/useProducts";

import DetailsPageSkeleton from "../../../Components/ui/Skeletons/DetailsPageSkeleton";
import Details from "./ProductDetails";
import RelatedProducts from "./RelatedProduct";
import SimilarProducts from "./SimilarProducts";
import OtherProducts from "./OtherProducts";


export default function page() {  
const { id } = useParams()
const {products, dataloading} = useProducts()

useEffect(() => {
    window.scrollTo(0, 0);
}, [id]);

const product = products.find(item => item._id === id)

if (dataloading) {
    return (
      <div className="pt-40 xl:pt-5 bg-[#FFF2F8]">
        <div className="container mx-auto">
           <DetailsPageSkeleton />
        </div>
      </div>
    )
}

if (!product) return 
<div className="text-center text-2xl text-red-600 font-black flex justify-center items-center pt-20">
  <p>Product Not Found!</p>
</div>


return ( 
<div className="pt-40 xl:pt-5 bg-[#FFF2F8]">
<Details product={product}/>
<RelatedProducts product={product}/>
<SimilarProducts  product={product}/>
<OtherProducts product={product}/>
</div>
)
}
