import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

export default function Banner3(){
    return(
        <div className="pt-10  bg-white">

     <div className='flex flex-col gap-5'>



<div className='flex justify-center w-full items-center text-center'>

<Swiper pagination={true} modules={[Pagination]} className="mySwiper cursor-pointer">
        <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381974/1_w9awsi.jpg" alt="" className='w-full'/>
        </SwiperSlide>


        <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381954/2_b0oglx.png" alt="" className='w-full'/>
        </SwiperSlide>

        <SwiperSlide>
<img src={"https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381958/3_owf97n.jpg"} alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381974/1_w9awsi.jpg" alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381954/2_b0oglx.png" alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381958/3_owf97n.jpg" alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381974/1_w9awsi.jpg" alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381954/2_b0oglx.png" alt="" className='w-full'/>
        </SwiperSlide>

      <SwiperSlide>
<img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381974/1_w9awsi.jpg" alt="" className='w-full'/>
        </SwiperSlide>

      </Swiper>

</div>





<div className='flex'>

<div>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381955/3_1_ft65gl.jpg" alt="" />
</div>

<div>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381966/5_ijr6z1.jpg" alt="" />
</div>

<div>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381962/4_tpqd5u.jpg" alt="" />
</div>

<div>
    <img src="https://res.cloudinary.com/dkmzakgx2/image/upload/v1766381968/8_rfv7ko.jpg" alt="" />
</div>

</div>





     </div>

        </div>
    )
}