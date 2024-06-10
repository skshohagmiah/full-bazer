import { ChevronRight, Eye, GitCompare, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ProductActionButtons from "./ProductActionButtons";
import prisma from "@/lib/db";
import Link from "next/link";

const NewProducts = async() => {


  const newProducts = await prisma.product.findMany({
    take:5,
    orderBy:{
      createdAt:'desc'
    },
    include:{
      images:true,
      variants:{
        include:{
          color:true,
          size:true
        }
      }
    }
  })

  return (
    <div className="p-4 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">New Products</h2>
        <Link href={'/shop'} className="p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:cursor-pointer">
        <ChevronRight />
      </Link>
        </div>
      {newProducts.map(product => (
        <Card key={product.id} className="relative group hover:bg-white/20 bg-white dark:bg-gray-800 dark:hover:bg-gray-500  overflow-hidden transition-transform flex items-center justify-between ">
        <div className="overflow-hidden relative h-[100px] w-[100px]">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-150 ease-in-out overflow-hidden"
          />
        </div>
        <div className="p-3 flex items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
              {product.name}
            </h3>
          </div>
          <div className="text-xl font-bold flex flex-col items-center">
            <small className="line-through text-muted-foreground">
              {product.price}
            </small>
            <p className="text-blue-600 dark:text-blue-400">
              {product.price * (product?.discount || 100 / 100)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <ProductActionButtons className="absolute left-2/3  top-1/2 -translate-x-1/2 -translate-y-1/2 transform  flex items-center justify-center text-white gap-2  opacity-0 group-hover:opacity-100 transition-opacity" product={product}/>
      </Card>
      ))}
    </div>
  );
};

export default NewProducts;
