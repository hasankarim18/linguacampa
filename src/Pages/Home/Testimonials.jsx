//import React, { useRef, useState } from "react";
import { Navigation, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./Banner.css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import HeadLine from "../../Utils/HeadLine";

const banner = [
  {
    title: `Attending the summer camp language program was a fantastic experience for my child. Not only did they improve their language skills, but they also made lifelong friends from around the world. The instructors were highly knowledgeable and created a supportive learning environment. We highly recommend this program!`,
    name: "Sarah W",
    img: "https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247__340.jpg",
  },
  {
    title: `I enrolled in the summer camp language program to brush up on my language skills before a study abroad program. The classes were intensive and tailored to my needs. The instructors were passionate, patient, and made learning enjoyable. Thanks to this program, I felt confident and ready for my language immersion experience!`,
    name: "David P",
    img: "https://cdn.pixabay.com/photo/2014/10/06/14/56/teacher-476342_640.jpg",
  },
  {
    title: `Our family had a wonderful experience with the summer camp language school. Our children had the opportunity to learn a new language while engaging in fun cultural activities. The staff was professional, caring, and attentive to each child's needs. We couldn't be happier with the results!`,
    name: "Emily and John L",
    img: "https://cdn.pixabay.com/photo/2017/01/24/09/18/learn-2004899_640.jpg",
  },
  {
    title: `As a working professional, I wanted to improve my language skills for career advancement. The summer camp language program offered flexible class schedules that fit my busy lifestyle. The instructors were experienced and provided practical language skills relevant to my industry. I'm grateful for the personalized attention and progress I made during the program.`,
    name: "Mark R",
    img: "https://cdn.pixabay.com/photo/2012/02/22/20/08/classroom-15593_640.jpg",
  },
];

const Testimonials = () => {
  

  return (
    <div className="mt-16">
        <HeadLine>
           Our Clients
        </HeadLine>
      <Swiper
        navigation={true}
        autoplay={{ delay: 5000 }}
      //  pagination={pagination}
        modules={[ Navigation, Autoplay]}
        className="mySwiper w-full "
      >
        {banner.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="bg-white dark:bg-darkNavyBlue dark:border" >
                <p className="w-3/4 mx-auto">{item.title}</p>
                <div className="flex  w-full justify-center mt-12">
                  <img
                    src={item.img}
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-full"
                    alt=""
                  />
                </div>
                <p className="w-3/4 mt-8 font-bold text-xl mx-auto">{item.name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonials;
