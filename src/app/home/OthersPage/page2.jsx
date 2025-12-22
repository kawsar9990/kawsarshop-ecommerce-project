export default function Banner2(){
    return(
        <div className="pt-10 pb-10 bg-white">


<div className='flex flex-col md:flex-row p-3 justify-center items-center gap-5'>

<div className='shadow-lg cursor-pointer relative group overflow-hidden'>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381971/10_uzgpfe.jpg"  alt="" className='rounded-md shadow-md'/>
<div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
</div>



<div className='shadow-lg cursor-pointer relative group overflow-hidden'>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766382492/11_aspruo.jpg" alt=""  className='rounded-md hover:bg-gray-900'/>
<div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
</div>



</div>


        </div>
    )
}