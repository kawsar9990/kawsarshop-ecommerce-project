'use client'


import img1 from '../../../../../public/img/slide-1.jpg'
import img2 from '../../../../../public/img/banner-1.jpg'
import img3 from '../../../../../public/img/1742439558879_4-4.jpg'
import img4 from '../../../../../public/img/1760239113701_NewProject(4).jpg'



// popular 
import img5 from '../../../../../public/img/post-4.jpg'
import img6 from '../../../../../public/img/banner-1 (1).jpg'
import img7 from '../../../../../public/img/post-2.jpg'
import img8 from '../../../../../public/img/post-3.jpg'
import img9 from '../../../../../public/img/slide-1 (2).jpg'


// others 3 img 
import img14 from '../../../../../public/img/deli_locker-982x500.webp'
import img15 from '../../../../../public/img/new-bundle-offer-banner-982x500.webp'
import img16 from '../../../../../public/img/walton-monitor-982x500.webp'

import { useLoader } from '../../../../context/ItemLoaderContext'
import BlogReply from './replybox'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarDays, faComment, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faCalendarDays, faComment,faUser, faMagnifyingGlass)



export default function BlogRoute(){
   const navigate = useRouter();
   const {showLoader,hideLoader}= useLoader()


    const handleLoading  = (post) => {
     showLoader()
     setTimeout(() => {
        setselectpost(post)
        hideLoader()
       navigate.push(`/home/Blog/${post.id}`);
        window.scrollTo({ top:0, behavior: "smooth"})
     }, 300);
   }

   const LinkButton = [
     "Jewellery",
     "Wellness",
     "Leptops",
     "Cloths",
     "Others"
   ]


   
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
         {
            id: 5,
            image: img5,
            name: "Bangladesh Dress",
            date: "10 Mar, 2022",
            category: "Dress",
            text: "Bangladesh is well-known around the world for its clothing and textile industry. The country produces a wide variety of garments, including shirts, jeans, T-shirts, jackets, and traditional outfits like sarees and panjabis. Bangladeshi clothes are famous for their fine craftsmanship, quality fabrics, and affordable prices."
        },
          {
            id: 6,
            image: img6,
            name: "Smarts Watch",
            date: "18 Mar, 2022",
            category: "Watches",
            text: "Watches are not just timekeeping devices—they are symbols of style, personality, and precision. In Bangladesh, watches have become a popular fashion accessory among both men and women. From classic analog designs to modern smartwatches, the market offers a wide range of choices."
        },
          {
            id: 7,
            image: img7,
            name: "Indian Glass",
            date: "15 Mar, 2022",
            category: "Glass",
            text: "Sunglasses are a stylish and practical accessory that protect the eyes from harmful UV rays and bright sunlight. In Bangladesh, sunglasses are popular among people of all ages, especially during the summer season."
        },
          {
            id: 8,
            image: img8,
            name: "African Dress",
            date: "14 Mar, 2022",
            category: "Dress",
            text: "Upgrade your wardrobe effortlessly with stylish and comfortable clothing from KawsarShop.Look great, feel confident, and enjoy quality fashion with KawsarShop."
        },
          {
            id: 9,
            image: img9,
            name: "Indian Showe",
            date: "23 Mar, 2022",
            category: "Showe",
            text: "Upgrade your wardrobe effortlessly with stylish and comfortable clothing from KawsarShop.Look great, feel confident, and enjoy quality fashion with KawsarShop."
        },

    ]
   
   
    const {id} = useParams()
    const blog  = item.find(post => post.id === parseInt(id))

     if (!blog)
     return <p className="p-10 text-red-500">Blog not found!</p>;
   

    const [searchItem, setSearchItem] = useState("");
    const [selectpost, setselectpost] = useState(blog || item[0])




    return(
         <div className='bg-white'>
<div className='pt-20 xl:pt-0 pb-10'>

<div className='grid grid-cols-1 gap-5 xl:gap-1 xl:grid-cols-[2fr_1fr] p-2'>
<div className='pt-20 xl:pt-2' id='top'>
<div className='p-3'>
<div className='flex flex-col gap-3'>
     <p><Link href={``} className=' rounded-lg bg-orange-500 p-2 text-white font-bold w-20 text-center cursor-pointer'>{selectpost.category}</Link></p>
     <p><Link href={``} className='md:text-2xl font-bold  capitalize hover:text-red-400'>{selectpost.name}</Link></p>
     <div className='flex justify-between'>
          <div className='flex'>
               <div className='flex gap-2 items-center text-gray-500 hover:text-red-600'><FontAwesomeIcon icon={faUser} /></div>
               <div className='flex gap-2 text-gray-500 hover:text-red-600'>By Admin</div>
          </div>
          <div className='flex'>
               <div className='flex gap-2 items-center text-gray-500 hover:text-red-600'><FontAwesomeIcon icon={faCalendarDays} /></div>
               <div className='flex gap-2 text-gray-500 hover:text-red-600'>{selectpost.date}</div>
          </div>
          <div className='flex'>
               <div className='flex gap-2 items-center text-gray-500 hover:text-red-600'><FontAwesomeIcon icon={faComment} /></div>
               <div className='flex gap-2 text-gray-500 hover:text-red-600'>0</div>
          </div>
     </div>
</div>

<div className='mt-10 mb-10 w-full cursor-pointer'>
<img src={selectpost.image.src} alt="" className='rounded-md w-full'/>
</div>

<div className='flex flex-col gap-10 capitalize'>
     <p className='text-gray-500 font-semibold'>{selectpost.text}</p>
     <p className='text-gray-600'>
          Kawsar is a skilled programmer who has made a name for himself in the world of technology through his dedication and innovative work. From a young age, he was fascinated by computers and software, spending countless hours exploring how programs work and experimenting with basic coding. During his school years, he began learning programming languages such as C, C++, Java, and Python, developing a strong foundation in logic and problem-solving. He enhanced his skills through online tutorials, coding challenges, and personal projects, which helped him gain practical experience early on. Later, he pursued a degree in Computer Science at university, where he deepened his knowledge in software development, algorithms, data structures, and web development.
     </p>
     <p className='text-gray-600'>
          Kawsar has never limited himself to theoretical understanding; he constantly applies his programming skills to solve real-world problems. He actively participated in university projects and hackathons, creating innovative applications and software that simplify everyday tasks and improve efficiency for users.
Kawsar’s work is driven by the goal of using technology to make life easier and more secure for people. He has contributed to a variety of programming projects, including database management systems, mobile applications, and web applications. His software is often customized to meet user needs, focusing on usability and efficiency.
     </p>

     <p className='bg-amber-50 border-1 border-red-500 uppercase p-7 rounded shadow font-black'>
“ the was popularised in the 160 with the release circum stances any occur in which toil and pain can procure him some great pleasur To take atrivial example ”
     </p>

     <div className='flex flex-col gap-5'>
          <p className='font-bold text-[20px]'>Discover great stuff & services</p>
          <p className='text-gray-600'>
               Overall, Kawsar is a passionate programmer whose curiosity, creativity, and commitment to learning set him apart. He demonstrates how technical expertise, combined with problem-solving skills and a willingness to help others, can make a significant impact in the technology world. Whether developing software, exploring cutting-edge technology, or teaching others, Kawsar continues to push boundaries and contribute meaningfully to the programming community, establishing himself as a respected and inspiring figure in the field.
          </p>
     </div>

     <div className='p-5'>
          <ul className='list-disc grid grid-cols-1 md:justify-center md:grid-cols-2'>
               <li className='text-black-500 font-semibold font-serif'>Etiam porta sem malesuada euismod.</li>
               <li className='text-black-500 font-semibold font-serif'>Porta sem area Product.</li>
               <li className='text-black-500 font-semibold font-serif'>Service tiam porta sem malesuada</li>
               <li className='text-black-500 font-semibold font-serif'>Etiam porta sem malesuada euismod.</li>
               <li className='text-black-500 font-semibold font-serif'>Porta sem area Product.</li>
               <li className='text-black-500 font-semibold font-serif'>Service tiam porta sem malesuada</li>
          </ul>
     </div>

     <div className='mt-5 grid grid-cols-1 gap-10 p-5 justify-center items-center md:grid-cols-2 lg:grid-cols-3'>
          <img src={img16.src} alt="" className='w-full rounded-md'/>
          <img src={img14.src} alt="" className='w-full rounded-md'/>
          <img src={img15.src} alt="" className='w-full rounded-md'/>
     </div>

     <div className='flex flex-col gap-10'>
          <p className='text-gray-500 font-stretch-50%'>
            Kawsar is an enthusiastic entrepreneur and a passionate food lover who decided to combine his love for good food with his business acumen by opening his own Shop. From a young age, Kawsar was fascinated by different cuisines and culinary traditions, often experimenting with recipes at home and sharing them with family and friends. His interest in food grew alongside his curiosity about business management and hospitality, which eventually led him to pursue a restaurant of his own. He carefully planned every aspect of his venture, from selecting the location to designing the menu, ensuring that each element reflected his commitment to quality and customer satisfaction.   
          </p>
          <p  className='text-gray-500 font-stretch-50%'>
            Kawsar paid special attention to the concept of his restaurant, aiming to create a space where people could not only enjoy meals but also feel comfortable and relaxed. The interior was designed with a mix of modern and traditional elements, creating an inviting environment that encourages diners to linger and savor their meals. He worked closely with chefs to develop a menu that balances innovation with familiarity, offering dishes that cater to diverse tastes while maintaining high standards of freshness and quality. From appetizers to desserts, every dish is crafted with care, using locally sourced ingredients whenever possible.   
          </p>
          <p  className='text-gray-500 font-stretch-50%'>
               Kawsar is also forward-thinking when it comes to technology and marketing. He uses social media and online platforms to engage with customers, share updates, and promote special events. His approach ensures that his restaurant stays connected with the community and remains competitive in an increasingly digital world. Ultimately, Kawsar’s restaurant is more than just a place to eat; it represents his passion for food, dedication to excellence, and commitment to providing memorable experiences for every guest. Through hard work, creativity, and a focus on quality, Kawsar has created a restaurant that reflects his values and leaves a lasting impression on everyone who visits.

If you want, I can also rewrite this into a slightly more storytelling style to make it feel more personal and lively, still keeping it around 500 words. Do you want me to do that?
          </p>
     </div>

          <div>
               <BlogReply />
          </div>

</div>

</div>

</div>



<div className='shadow-2xl p-10 rounded-md xl:h-450 xl:mt-20'>
<div>

    <div className='flex flex-col gap-3 pb-5 w-full'>
     <label htmlFor="sear" className='text-gray-900 font-bold cursor-pointer'>Search</label>
    
     <div className='w-full flex'>
    

   <div className="w-full bg-[#dddddd] flex items-center justify-between rounded-md shadow pl-3 pr-2">
  <input
    type="text"
    id="sear"
    value={searchItem}
    onChange={(e) => setSearchItem(e.target.value)}
    placeholder="Search Here...."
    autoComplete='off'
    className="flex py-2 bg-transparent outline-none placeholder-gray-600 focus:ring-0"
  />
  <button 
  className="bg-red-600  p-2 px-4 text-center text-white cursor-pointer font-bold rounded-md">
    <FontAwesomeIcon icon={faMagnifyingGlass} />
  </button>
</div>

     </div>
     </div>
     <hr className='text-gray-400'/>


     <div className='pt-10'>
          <p className='font-bold text-2xl'>Latest Posts</p>
       <div className='pb-10'>
        {item.slice(0,4).map((post) => (
    <div className="pt-5" key={post.id} onClick={()=> handleLoading(post)}>

<a href='#top'>
<div className='flex gap-3 justify-start items-center'>

<div>
     <img src={post.image.src} alt="" className='w-30 h-20 rounded-md '/>
</div>

<div>
    <div className='flex gap-2 text-[10px] text-gray-500 hover:text-red-600'>
        <div><FontAwesomeIcon icon={faCalendarDays} /></div>
        <div>{post.date}</div>
        </div>
    <div className='text-gray-500 text-[10px]'>{post.name}</div>  
</div>

</div>
</a>

  </div>
               ))}
          </div>
     <div>

     </div>

 <hr className='text-gray-400'/>

     <p className='font-bold pt-10 text-2xl'>Popular Posts</p>

 <div className='pb-10'>
               {item.slice(4,9).map((post) => (
                    <div className="pt-5" key={post.id} onClick={()=> handleLoading(post)}>

<a href='#top' >
<div className='flex gap-3 justify-start items-center'>

<div>
     <img src={post.image.src} alt="" className='w-30 h-20 rounded-md '/>
</div>

<div>
    <div className='flex gap-2 text-[10px] text-gray-500 hover:text-red-600'>
        <div><FontAwesomeIcon icon={faCalendarDays} /></div>
        <div>{post.date}</div>
        </div>
    <div className='text-gray-500 text-[10px]'>{post.name}</div>  
</div>

</div>
</a>
    </div>
       ))}
          </div>

     </div> 

 <hr className='text-gray-400'/>

<div className='pt-10 flex flex-col gap-2 pb-10'>
     <p className='font-bold text-2xl'>Category</p>
     <Link href={``}>Electronic-Cloths (9)</Link>
</div>

 <hr className='text-gray-400'/>


<div className="pt-10">
     <p className='font-bold text-2xl'>Tags</p>
     <div className='gap-2 grid grid-cols-2 xl:grid-cols-3 w-full mt-5 items-center'>
          {LinkButton.map((i)=> (
          <button className='flex' key={i}>
               <Link href={``} className='bg-white shadow p-2 w-full text-center rounded-md'>
               {i}
               </Link>
          </button>
          ))}
     </div>
</div>



</div>
</div>


  
</div>






</div>


        
        </div>
    )
}