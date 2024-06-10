"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "@prisma/client";
import prisma from "@/lib/db";



const settings = {
  spaceBetween: 30,
  slidesPerView: 3,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    clickable: true,
  },
  modules: [Pagination, Autoplay],
  breakpoints: {
    1024: { slidesPerView: 3 },
    600: { slidesPerView: 2 },
    300: {slidesPerView:1}
  },
};

interface TestimonialProps {
  testimonials:Testimonial[]
}

export default function Testimonials({testimonials}:TestimonialProps) {


  return (
    <div className="bg-white dark:bg-slate-950 py-12 sm:py-16">
      <div className="container mx-auto px-2 text-center">
        <h2 className="text-3xl md:text-4xl  font-bold text-gray-800 dark:text-white mb-8">
          What Our Customers Say
        </h2>

        <Swiper {...settings} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial?.userName}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
