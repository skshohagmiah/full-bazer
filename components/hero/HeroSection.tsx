"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { Button } from "../ui/button";
import { Billboard } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  billboards: Billboard[];
}

const HeroSection = ({ billboards }: HeroSectionProps) => {

  const router = useRouter()
  return (
    <MaxWidthWrapper>
      <section className="relative w-full h-[150px] sm:h-[250px] lg:h-[350px] my-4 mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full h-full"
        >
          {billboards.length === 0 ? (
            <p className="absolute top-1/2 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 text-center md:text-start md:space-y-2 p-4 md:p-0">
              No billboard created yet.
            </p>
          ) : (
            billboards?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div onClick={() => router.push(slide.link)} className="relative w-full h-full hover:cursor-pointer hover:brightness-95">
                  <Image
                    src={slide.imageUrl}
                    alt={'billboard-image'}
                    fill
                    className="object-fill md:object-cover"
                  />
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
