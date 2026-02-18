'use client'

import ImgSection from "./ImageSection"
import PageDetails from "./DetailsSection"

export default function Details({product}){
return(
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
<div className="relative">
<ImgSection product={product} />
</div>

<PageDetails product={product} />
</div>
    )
}