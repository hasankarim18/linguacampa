//import React, { useRef, useState } from "react";
import { Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {motion} from 'framer-motion'



import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import './Banner.css';
import "swiper/css/autoplay";
import "swiper/css/effect-fade";



const banner = [
  {
    title: `Discover the joy of language learning at our immersive and
                  engaging summer camp!`,
    img: "https://cdn.pixabay.com/photo/2021/02/05/01/22/man-5983064_640.jpg",
  },
  {
    title: `Unlock your potential with our dynamic language programs designed for an unforgettable summer experience.`,
    img: "https://cdn.pixabay.com/photo/2019/12/10/18/32/friends-4686416_640.jpg",
  },
  {
    title: `Discover the Power of Language: Enroll in Our Summer Camp for an Immersive Journey!`,
    img: "https://cdn.pixabay.com/photo/2020/08/09/09/57/sunset-5475045_640.jpg",
  },
];

const Banner = () => {
 
 
    const pagination = {
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    };

   
  return (
    <div>
      <Swiper     
      
        navigation={true}
        autoplay={{delay:5000}}
        pagination={pagination}        
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper w-full "    
      >
        {banner.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div style={{ height: "500px" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-center bg-white dark:bg-darkNavyBlue dark:text-whtie dark:border">
                  <div className="flex justify-start">
                    <div className="p-2"></div>
                    <motion.div
                      transition={{
                        ease: "linear",
                        duration: 1,
                        y: { duration: 1},
                      }}
                      initial={{ y: 300, opacity: 0.3 }}
                      whileInView={{ y: 0, opacity: 1 }}
                    >
                      <h1 className=" text-4xl p-4 text-darkNavyBlue dark:text-white text-center hidden md:block ">
                        {item.title}
                      </h1>
                    </motion.div>
                  </div>
                  {/* image */}
                  <div className="flex">
                    <div className="relative">
                      <div className="w-full h-full flex items-center justify-center md:hidden  absolute left-0 top-0 z-20 bg-darkNavyBlue text-white text-3xl sm:text-4xl bg-opacity-50">
                        {item.title}
                      </div>
                      <div className="flex justify-center">
                        <motion.img
                          transition={{
                            ease: "linear",
                            duration: 1,
                            y: { duration: 1 },
                          }}
                          initial={{ y: -300, opacity: 0.3 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          className="w-full relative z-10 mx-auto rounded-xl"
                          style={{ height: "500px" }}
                          src={item.img}
                          alt=""
                        />
                      </div>
                    </div>                    
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
