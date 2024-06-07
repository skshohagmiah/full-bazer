"use client";

import { useState, useRef, TouchEvent, MouseEvent, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { Button } from "../ui/button";

interface Slide {
  image: string;
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  offerText: string | JSX.Element;
  buttonText: string;
}

const HeroSection: React.FC = () => {
  const slides: Slide[] = [
    {
      image: "/phone.jpg",
      title: "Experience Unmatched Performance",
      subtitle: " The latest smartphone technology",
      offerText: "Limited time offer: 20% off",
      buttonText: "Discover More",
    },
    {
      image: "/tv.jpg",
      title: "Immerse Yourself in Entertainment",
      subtitle: "Cinematic visuals and crystal-clear audio",
      offerText: "Buy one, get one free",
      buttonText: "Explore TVs",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!startX.current) return;
    const xDiff = e.touches[0].clientX - startX.current;
    if (xDiff > 50) {
      prevSlide();
      startX.current = null;
    } else if (xDiff < -50) {
      nextSlide();
      startX.current = null;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!startX.current) return;
    const xDiff = e.clientX - startX.current;
    if (xDiff > 50) {
      prevSlide();
      startX.current = null;
    } else if (xDiff < -50) {
      nextSlide();
      startX.current = null;
    }
  };

  const handleMouseUp = () => {
    startX.current = null;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      startX.current = null;
    };
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <MaxWidthWrapper>
      <section
        className="relative w-full h-[300px] lg:h-[450px] overflow-hidden cursor-grab my-4 mx-auto"
        ref={slideRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Slide Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Image
              src={slide.image}
              alt={typeof slide.title === "string" ? slide.title : ""}
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            {/* Slide Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center md:text-start space-y-2">
              <p className="text-xl md:text-2xl text-white text-white/80">
                {slide.offerText}
              </p>
              <h1 className="text-3xl md:text-6xl text-lime-400 font-extrabold  mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 whitespace-nowrap">
                {slide.subtitle}
              </p>
              <Button
                size={"lg"}
                className="bg-blue-500 hover:bg-blue-700 rounded-none mt-4 text-lg text-white font-bold py-2 px-4 md:py-4 md:px-8"
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-gray-800/50 text-white rounded-full p-2"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
