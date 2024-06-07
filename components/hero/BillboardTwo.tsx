import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import MaxWidthWrapper from "../others/MaxWidthWrapper";

const BillboardTwo = () => {
  return (
    <MaxWidthWrapper className="p-0 w-full">
      <div className="relative h-[300px] w-full">
        <Image
          src={"/shoes.jpg"}
          alt="shoes"
          fill
          className="brightness-75 object-cover"
        />
        {/* Slide Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-start space-y-2">
          <h1 className="text-2xl md:text-4xl text-yellow-400 font-extrabold  mb-4">
            The Perfect Fit for Every Foot
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Explore our wide range of comfortable and stylish footwear for men,
            women, and kids.
          </p>
          <Button
            size={"lg"}
            className="bg-blue-500 hover:bg-blue-700 rounded-none mt-4 text-lg text-white font-bold py-2 px-4 md:py-4 md:px-8"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BillboardTwo;
