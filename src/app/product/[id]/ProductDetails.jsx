'use client'

import ImgSection from "./ImageSection"
import TabsBox from "./ReviewTabs"
import PageDetails from "./DetailsSection"

export default function Details({product}){
return(
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 items-start">
<div className="flex flex-col gap-10">
<ImgSection product={product} />
<div className="pt-10 border-t border-gray-100 hidden lg:flex">
<TabsBox product={product}/>
</div>
</div>

<div className="lg:sticky lg:top-35 h-fit"> 
<PageDetails product={product} />
<div className="pt-10 border-t border-gray-100 flex lg:hidden">
<TabsBox product={product}/>
</div>
</div>
</div>
    )
}