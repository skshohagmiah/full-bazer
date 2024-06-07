"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  GitCompare,
  ShoppingBag,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Card } from "../ui/card";

const SingleProduct = ({ product }) => {
  return (
    <Card className="relative group bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-transform ">
    <p className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-2 rounded-br z-40">10% off</p>
     <div className="overflow-hidden border-b-2">
     <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={400}
        className="object-cover group-hover:scale-110 transition-transform duration-150 ease-in-out overflow-hidden"
      />
     </div>
      <div className="p-6 flex items-center justify-between text-start">
      <div>
        <small className="text-muted-foreground">{product.category} || category</small>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {product.title}
        </h3>
        <div className="flex items-center justify-start ">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-gray-800 dark:text-gray-100 ml-1">
            {product.rating}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
      </div>
        <div className="text-xl font-bold flex flex-col items-start mb-4">
          <small className="line-through text-muted-foreground">{product.originalPrice}</small>
          <p className="text-blue-600 dark:text-blue-400">{product.discountedPrice}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 top-1/3 transform -translate-y-1/2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to Wishlist</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
              >
                <GitCompare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Compare</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
              >
                <Eye className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quick View</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default SingleProduct;
