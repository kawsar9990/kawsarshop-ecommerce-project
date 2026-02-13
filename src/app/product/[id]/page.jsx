'use client'

import { useParams } from "next/navigation"
import { allProducts } from "../../../data/Product/allProducts";

import Details from "./ProductDetails";
import Review from "./ReviewPage";
import RelatedProducts from "./RelatedProduct";
import OtherProducts from "./OtherProducts";


export default function page() {  
const { id } = useParams()

const product = allProducts.find(item => item.id.toString() === id)

if (!product) return <p>Product not found</p>

return ( 
<div className="pt-40 xl:pt-5 bg-[#FFF2F8]">
<Details product={product}/>

<Review productId={product.id}/>
<RelatedProducts />
<OtherProducts product={product} currentId={product.id}/>
</div>
)
}
