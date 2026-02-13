'use client'


import img from "../../../../../public/icon/5.jpg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReply } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"

export default function BlogReply(){

 const [review, setreview] = useState([])
 const [newrivew, setnewrivew] = useState({
    comment: "",
    name: "",
    email: "",
    web: "",
 })


  const [replyindex, setreplyindex] = useState(null)

  useEffect(()=> {
     const storerivew = localStorage.getItem("review")
    if (storerivew) {
      setreview(JSON.parse(storerivew))
    }
  },[])

    useEffect(() => {
    localStorage.setItem("review", JSON.stringify(review))
  }, [review])

  const handleInput = (e) => {
    const {name , value} = e.target
    setnewrivew({...newrivew, [name] : value})
  }


   const handlesubmited  = (parentIndex = null) => {
    
     if (
      !newrivew.name ||
      !newrivew.email ||
      !newrivew.comment ||
      !newrivew.web
    ) {
      return
    };

 const reviewadd = {
     ...newrivew,
      id: Date.now(), 
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      replies: [],
 }

 if(parentIndex === null){
     setreview([reviewadd, ...review])
 }

 else{
     const updatemsg = [...review]
     updatemsg[parentIndex ].replies.push(reviewadd)
    setreview(updatemsg)
    setreplyindex(null)
 }
  setnewrivew({ comment: "", name: "", email: "", web: "" })

   }




    return(
    <div className="pt-10 bg-white">
<div  className="flex flex-col">



{/* Main  */}
<div className="flex flex-col gap-20">



{/* comments box */}
 <section className="border border-gray-400 p-7 rounded-md">
 <div className="text-2xl pb-7 font-serif font-bold flex gap-2 items-center">
     <span className="font-sans">{review.length}</span> Comment
 </div>


{/* comments */}
<div className="flex flex-col gap-5">

{/* default static comment */}
<div className="flex gap-2">
     <div>
  <img src={img} alt="" className="w-15 rounded-full object-cover"/>        
     </div>
<div className="w-full">
<div className="flex justify-between w-full items-center">
    <span className="font-bold text-[10px] md:text-[20px] font-serif">
      Kawsar
    </span>
    <span className="text-[10px] text-gray-500 md:text-[20px]">
      20/03/2007 at 12:00 pm
    </span>
  </div>
  <p className="text-[10px] md:text-[20px]">test</p>
  <button className="hover:bg-orange-400 rounded-full w-10 h-10 border border-gray-400 hover:border-0 cursor-pointer">
    <FontAwesomeIcon className="rounded-full" icon={faReply} />
  </button>
</div>
</div>

{/* default static comment */}



{/* dynamic comments */}
<div>
 <div className="flex flex-col gap-5">
{review.map((r,i)=> (
    <div key={i} className="flex flex-col gap-2">
  
  {/* main comments  */}
 <div className="flex gap-2">
    <div>
 <img src={img} alt="" className="w-15 rounded-full object-cover"/>
</div> 
<div className="w-full">
 <div className="flex justify-between w-full items-center">
   <span className="font-bold text-[10px] md:text-[20px] font-serif">
     {r.name}
   </span>
   <span className="text-[10px] text-gray-500 md:text-[20px]">
     {r.date} {r.time}
   </span>
 </div>
 <p className="text-[10px] md:text-[20px]">
   {r.comment}
 </p>
 <button  onClick={() => setreplyindex(i)}
 className="hover:bg-orange-400 rounded-full w-10 h-10 border border-gray-400 hover:border-0 cursor-pointer"
 >
 <FontAwesomeIcon className="rounded-full" icon={faReply}/>    
 </button>       
    </div>
</div>
  {/* main comments  */}


{/* replies */}
{r.replies.length > 0 && (
 <div className="ml-10 flex flex-col gap-3 mt-3">
{r.replies.map((rr, j)=> (
<div key={j} className="flex gap-2 w-full">
 <img src={img}  alt="" className="w-10 rounded-full object-cover" />
 <div className="w-full">
  <div className="flex justify-between w-full items-center">
    <span className="font-bold text-[10px] md:text-[20px] font-serif">
      {rr.name}
    </span>
    <span className="text-[10px] text-gray-500 md:text-[20px]">
      {rr.date} {rr.time}
    </span>
  </div>
  <p className="text-[10px]">{rr.comment}</p>
</div>
</div>     
))}
</div>    
)}
{/* replies */}



{/* reply form */}
{replyindex === i && (
<div className="border border-gray-400 p-5 rounded-md mt-3">
  <p className="text-lg font-bold font-serif flex justify-between items-center">
      Reply to {r.name}
  <span
    className="text-red-500 font-bold text-[10px] cursor-pointer"
    onClick={() => setreplyindex(null)}
  >
    Cancel
  </span>
</p>
<div className="flex flex-col pt-3 gap-3">
 <textarea
   name="comment"
   placeholder="Comment *"
   value={newrivew.comment}
   onChange={handleInput}
   className="border border-gray-400 rounded-md p-3 outline-red-400"
 />
 <input
   type="text"
   name="name"
   placeholder="Name *"
   value={newrivew.name}
   onChange={handleInput}
   className="border border-gray-400 rounded-md p-3 outline-red-400"
 />
 <input
   type="email"
   name="email"
   placeholder="Email *"
   value={newrivew.email}
   onChange={handleInput}
   className="border border-gray-400 rounded-md p-3 outline-red-400"
 />
 <input
   type="url"
   name="web"
   placeholder="Website *"
   value={newrivew.web}
   onChange={handleInput}
   className="border border-gray-400 rounded-md p-3 outline-red-400"
 />
 <button
   onClick={() => handlesubmited(i)}
   className="bg-red-500 cursor-pointer font-bold text-white p-3 rounded-md mt-3"
 >
   Post Reply
 </button>
</div>

</div>    
)}
{/* reply form */}


    </div>
))}
</div>   
</div>
{/* dynamic comments */}





</div>
{/* comments */}

 </section>
{/* comments box */}






{/* comments input box */}
   <div className="pt-10">
<div className="border border-gray-400 p-7 rounded-md ">
 <p className="text-2xl font-bold font-serif">Leave a Reply</p>
<p className="font-sans text-gray-500 text-[10px] pt-3">
  Your email address will not be published. Required fields are
  marked *
</p>    
<div className="flex flex-col justify-start pt-5">
<div className="flex flex-col gap-3">
   <label
     htmlFor="cm"
     className="font-serif font-bold cursor-pointer"
   >
     Comment *
   </label>
   <textarea
     name="comment"
     id="cm"
     value={newrivew.comment}
     onChange={handleInput}
     className="border border-gray-400 rounded-md p-3 outline-red-400"
   ></textarea>
 </div>
 <div className="flex flex-col pt-5 gap-3">
   <label
     htmlFor="nm"
     className="font-serif font-bold cursor-pointer"
   >
     Name *
   </label>
   <input
     type="text"
     value={newrivew.name}
     onChange={handleInput}
     name="name"
     id="nm"
     className="border border-gray-400 rounded-md p-3 outline-red-400"
   />
 </div>
 <div className="flex flex-col pt-5 gap-3">
   <label
     htmlFor="em"
     className="font-serif font-bold cursor-pointer"
   >
     Email *
   </label>
   <input
     type="email"
     value={newrivew.email}
     onChange={handleInput}
     name="email"
     id="em"
     className="border border-gray-400 rounded-md p-3 outline-red-400"
   />
 </div>
 <div className="flex flex-col pt-5 gap-3">
   <label
     htmlFor="ur"
     className="font-serif font-bold cursor-pointer"
   >
     Website *
   </label>
   <input
     value={newrivew.web}
     onChange={handleInput}
     type="url"
     name="web"
     id="ur"
     className="border border-gray-400 rounded-md p-3 outline-red-400"
   />
 </div>
 <div className="pt-5 pb-5 flex flex-row gap-2 items-start justify-start">
   <input type="checkbox" id="ck" />
   <label
     htmlFor="ck"
     className="cursor-pointer"
     style={{ userSelect: "none" }}
   >
     Save my name, email, and website in this browser for the
     next time I comment.
   </label>
 </div>
 <button
   onClick={() => handlesubmited(null)}
   className="bg-red-500 cursor-pointer font-bold text-white p-3 rounded-md"
 >
   Post Comment
 </button>
</div>
</div>
   </div>
{/* comments input box */}






</div>
{/* Main  */}




</div>
    </div>
    )
}