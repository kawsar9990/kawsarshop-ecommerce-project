'use client'

import Link from "next/link";
import Image from "next/image";

import { useMainProduct } from "../../../context/ProductRender";



export default function Banner3(){
  
const {setCategory} = useMainProduct()        
    
        return(
        <div className="pt-10 bg-[#FFF2F8]">

     <div className='flex flex-col gap-5'>


 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-10 xl:p-5 ">
<div className="grid grid-rows-2 gap-4 lg:col-span-1">
  <Link href="/products" onClick={()=> setCategory("Groceries")} className="relative h-[150px]">
  <Image
    src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1770613658/67a891936a43407281a487e6_Fresh_meat_D_1552_n3cksg.jpg"
    alt="Left Image 1"
    fill
    sizes="(max-width:1024px) 100vw, 33vw"
    className="rounded-lg"
  />
</Link>
 <Link href="/products" onClick={()=> setCategory("Groceries")} className="relative h-[150px]">
  <Image
    src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1770613658/67a890e26a43407281a3d146_Fresh_fish_D_1552_cbx9xi.jpg"
    alt="Left Image 2"
    fill
    sizes="(max-width:1024px) 100vw, 33vw"
    className="rounded-lg"
  />
</Link>
</div>  
 <Link href="/products" onClick={()=> setCategory("Groceries")}
 className="relative h-[150px] xl:h-[320px] lg:col-span-2">
  <Image
    src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1770613658/67b1770db43a072aa2c0a6b7_big_Banner_1__1552_crlj1d.jpg"
    alt="Right Big Image"
    fill
    sizes="(max-width:1024px) 100vw, 66vw"
    className="rounded-lg"
  />
</Link>     
 </div>


     </div>

        </div>
    )
}