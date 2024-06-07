import React from "react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { Button } from "../ui/button";
import Image from "next/image";
import NewProducts from "../products/NewProducts";
import TwoBillboards from "./BillboardTwo";

const HereSectionTwo = () => {
  return (
    <MaxWidthWrapper className="grid md:grid-cols-3 gap-4">
      <TwoBillboards />
      <NewProducts />
    </MaxWidthWrapper>
  );
};

export default HereSectionTwo;
