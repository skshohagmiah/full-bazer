import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import prisma from "@/lib/db";
import Link from "next/link";

const BillboardTwo = async() => {

  const billboardTwo = await prisma.billboard.findFirst({
    take:1,
    orderBy:{
      createdAt:'asc'
    }
  })

  return (
    <MaxWidthWrapper className="p-0 w-full">
      <Link href={billboardTwo?.link || '/shop'}>
      <div className="relative h-[350px] w-full hover:brightness-95 hover:cursor-pointer">
        <Image
          src={billboardTwo?.imageUrl || ''}
          alt="shoes"
          fill
          className="object-fill"
        />
      </div></Link>
    </MaxWidthWrapper>
  );
};

export default BillboardTwo;
