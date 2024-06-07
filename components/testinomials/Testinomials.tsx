"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  name: string;
  quote: string;
  image: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    quote:
      "This product is amazing! The quality is top-notch, and the customer service is outstanding.",
    image: "https://github.com/shadcn.png",
    role: "CEO of Acme Corp",
  },
  {
    name: "Jane Smith",
    quote:
      "I love the unique designs and the attention to detail. I've received so many compliments on my purchase.",
    image: "https://github.com/shadcn.png",
    role: "CTO of Beta Inc.",
  },
  {
    name: "Sam Wilson",
    quote:
      "The shopping experience was seamless, and the delivery was super fast. I'll definitely be back for more!",
    image: "https://github.com/shadcn.png",
    role: "Marketing Manager",
  },
  {
    name: "Emily Davis",
    quote:
      "I was hesitant at first, but the product exceeded my expectations. It's worth every penny.",
    image: "https://github.com/shadcn.png",
    role: "Happy Customer",
  },
  {
    name: "Michael Lee",
    quote:
      "I've never seen such a wide variety of styles and sizes. There's something for everyone here.",
    image: "https://github.com/shadcn.png",
    role: "Fashion Enthusiast",
  },
  // ... more testimonials (You don't need to duplicate for infinite loop)
];

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

export default function Testimonials() {
  return (
    <div className="bg-white dark:bg-slate-950 py-12 sm:py-16">
      <div className="container mx-auto px-2 text-center">
        <h2 className="text-3xl md:text-4xl  font-bold text-gray-800 dark:text-white mb-8">
          What Our Customers Say
        </h2>

        <Swiper {...settings} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
