'use client'

import img1 from '../../../../public/img/slide-1.jpg'
import img2 from '../../../../public/img/banner-1.jpg'
import img3 from '../../../../public/img/1742439558879_4-4.jpg'
import img4 from '../../../../public/img/1760239113701_NewProject(4).jpg'


import { useLoader } from '../../../context/ItemLoaderContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faCalendarDays, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight,faCalendarDays, faUser, faMagnifyingGlass)




export default function Blog(){
  
const navigate = useRouter();
const {showLoader,hideLoader} = useLoader()


 const handleLoading  = (id) => {
     showLoader();
     setTimeout(() => {
       hideLoader() 
        navigate.push(`/home/Blog/${id}`)
     }, 300);
   }




 const item = [
        {
            id: 1,
            image: img1,
            name: "DSLR Camera",
            date: "10 Dec, 2021",
            category: "Camera",
            text: "Capture every special moment with KawsarShop Cameras! Whether you’re a professional photographer or just love taking pictures, KawsarShop offers high-quality cameras that bring your vision to life.",
        },
        {
            id: 2,
            image: img2,
            name: "American Dress",
            date: "20 Dec, 2022",
            category: "Dress",
            text: "Upgrade your wardrobe with stylish, comfortable, and high-quality clothing from KawsarShop! Whether you’re looking for casual wear, office outfits, or trendy fashion pieces, KawsarShop has everything to elevate your style."
        },
        {
            id: 3,
            image: img3,
            name: "Macbook Leptop",
            date: "18 Nov, 2025",
            category: "PC",
            text: "Capture life’s moments perfectly with KawsarShop Cameras — high-quality, reliable, and designed for every photographer.Every shot matters. Make it extraordinary with cameras from KawsarShop."
        },
        {
            id: 4,
            image: img4,
            name: "Indian Dress",
            date: "20 Mar, 2022",
            category: "Dress",
            text: "Upgrade your wardrobe effortlessly with stylish and comfortable clothing from KawsarShop.Look great, feel confident, and enjoy quality fashion with KawsarShop."
        },
         

    ]



    return(
       <div className='bg-[#FFF2F8] pt-20'>
       
 <div className="p-5">
 <div>
<div className='p-3'>
    <h1 className="font-semibold text-2xl">From The Blog</h1>
</div>

<div className='p-3'>

<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
    {
        item.map(item => (
         <div key={item.id} className="group overflow-hidden bg-white shadow-lg w-full rounded-md">
<Link href={``} onClick={()=> handleLoading(item.id)}>
<div className='relative overflow-hidden'>
     <img src={item.image.src} alt="" className='w-full lg:h-70 h-50 transition-all duration-500 group-hover:scale-110 rounded-md'/>
     <h2 className='absolute bottom-0 bg-orange-500 p-2 text-white font-bold w-20 text-center cursor-pointer'>{item.category}</h2>
</div>

<div className='p-5 flex flex-col gap-2'>

<p className='md:text-2xl font-bold capitalize hover:text-red-400'>{item.name}</p>
<div className='flex justify-between'>
     <div className='flex gap-2 text-gray-500 hover:text-red-600'>
        <div><FontAwesomeIcon icon={faCalendarDays} /></div>
        <div>{item.date}</div>
        </div>
     <div className='flex gap-2 text-gray-500 hover:text-red-600'><p><FontAwesomeIcon icon={faUser} /></p><p>By Admin</p></div>
</div>

<p className='text-gray-500 font-semibold w-full'>{item.text}</p>

</div>

</Link>
     </div>
        ))
    }
</div>

</div>



        </div>
        </div>


       </div>
    )
}