import React from 'react'
import HeroPhoneVideo from '../assets/HeroPhoneVideo.mp4'

import { Carousel } from "flowbite-react";
import { Button } from "flowbite-react";
import Products from '../components/Products';



const Home = () => {
  return (
    <div>
      
      <section className="hero flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gradient-to-r from-green-50 via-white to-green-50">
      {/* Left Side */}
      <div className="left text-center md:text-left md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Discover the <span className="text-green-600">Latest Smartphones</span>
        </h1>
        <p className="text-lg text-gray-600">
          Browse our selection of the newest smartphones on the market
        </p>
        <Button color="dark" className="px-6 py-2 text-white rounded-lg shadow">
          Shop Now
        </Button>
      </div>

    {/* Right Side */}
<div className="right md:w-1/2 flex justify-center mb-8 md:mb-0">
  <img
    src="https://itronics.in/wp-content/uploads/2024/09/iPhone_16_Pro_Max_White_Titanium_PDP_Image_Position_1__en-IN.png"
    alt="iPhone"
    className="w-[400px] md:w-full max-w-xl object-contain"
  />
</div>

    </section>


      <div className="h-80 sm:h-96 xl:h-[30rem] 2xl:h-[36rem]">
        <Carousel>
          <img src="https://i.gadgets360cdn.com/large/vivo_x200_pro_black_1733993419003.jpg?downsize=950:*" alt="..." style={{ height: '500px', width: '1000px', borderRadius: '10px' }} />
          <img src="https://images.timesnownews.com/thumb/msid-115623211,thumbsize-885816,width-1280,height-720,resizemode-75/115623211.jpg" alt="..." style={{ height: '500px', width: '1000px', borderRadius: '10px' }} />
          <img src="https://i0.wp.com/innogyan.in/wp-content/uploads/2025/01/wp-17369178398565973188097891097315.jpg?resize=1536%2C864&ssl=1" alt="..." style={{ height: '500px', width: '1000px', borderRadius: '10px' }} />
        </Carousel>
      </div>


      <section>
        <Products/>
      </section>


    </div>



  )
}

export default Home











{/* <video className='rounded-sm' src={HeroPhoneVideo}  width="640" height="480" controls autoplay loop/> */ }