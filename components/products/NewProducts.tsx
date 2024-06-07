import { ChevronRight, Eye, GitCompare, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const NewProducts = () => {
  const products = [
    {
      id: 1,
      image: "/elec/prothonics.jpg",
      title: "Wireless Headphones",
      description: "this is a 3.5 mm bluetooth speaker",
      originalPrice: "$99.99",
      discountedPrice: "$79.99",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      image: "/elec/apple-watch-9-2.jpg",
      title: "Smart Watch",
      description: "this is a 3.5 mm bluetooth speaker",
      originalPrice: "$199.99",
      discountedPrice: "$149.99",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 3,
      image: "/elec/song-wh.jpg",
      title: "Bluetooth Speaker",
      description: "this is a 3.5 mm bluetooth speaker",
      originalPrice: "$49.99",
      discountedPrice: "$39.99",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 4,
      image: "/elec/song-wh.jpg",
      title: "Bluetooth Speaker",
      description: "this is a 3.5 mm bluetooth speaker",
      originalPrice: "$49.99",
      discountedPrice: "$39.99",
      rating: 4.5,
      reviews: 120,
    },
    // Add more products as needed
  ];

  return (
    <div className="p-4 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">New Products</h2>
        <div className="p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:cursor-pointer">
        <ChevronRight />
      </div>
        </div>
      {products.map(product => (
        <Card key={product.id} className="relative group hover:bg-white/20 bg-white dark:bg-gray-800 dark:hover:bg-gray-500  overflow-hidden transition-transform flex items-center justify-between ">
        <div className="overflow-hidden relative h-[100px] w-[100px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-150 ease-in-out overflow-hidden"
          />
        </div>
        <div className="p-3 flex items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
              {product.title}
            </h3>
          </div>
          <div className="text-xl font-bold flex flex-col items-center">
            <small className="line-through text-muted-foreground">
              {product.originalPrice}
            </small>
            <p className="text-blue-600 dark:text-blue-400">
              {product.discountedPrice}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute left-2/3  top-1/2 -translate-x-1/2 -translate-y-1/2 transform  flex items-center justify-center text-white gap-2  opacity-0 group-hover:opacity-100 transition-opacity">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 bg-white dark:bg-gray-700 rounded-full text-black dark:text-gray-100"
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
                  className="p-2 bg-white dark:bg-gray-700 rounded-full text-black dark:text-gray-100"
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
                  className="p-2 bg-white dark:bg-gray-700 rounded-full text-black dark:text-gray-100"
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
                  className="p-2 bg-white dark:bg-gray-700 rounded-full text-black dark:text-gray-100"
                >
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to Cart</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
      ))}
    </div>
  );
};

export default NewProducts;
