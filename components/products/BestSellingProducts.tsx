import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { ChevronRight, Eye, GitCompare, Heart, ShoppingBag } from "lucide-react";

const BestSellingProducts = () => {
  const featuredProducts = [
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
    // {
    //   id: 4,
    //   image: "/elec/song-wh.jpg",
    //   title: "Bluetooth Speaker",
    //   description: "this is a 3.5 mm bluetooth speaker",
    //   originalPrice: "$49.99",
    //   discountedPrice: "$39.99",
    //   rating: 4.5,
    //   reviews: 120,
    // },
    // Add more products as needed
  ];

  return (
    <div className="p-4 md:col-span-2 bg-white dark:bg-slate-900 space-y-4">
      <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Best Selling Products</h2>
      <div className="p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:cursor-pointer">
        <ChevronRight />
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <Link
            href={"/shop/${product.id}"}
            key={product.id}
            className=" border dark:border-none rounded-lg  bg-white dark:bg-slate-800 relative group overflow-hidden"
          >
           <div className="overflow-hidden w-full h-[12rem] md:h-[14rem] relative p-4">
           <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover text-center group-hover:scale-110 transition-transform duration-150 ease-in-out"
            />
           </div>
           <div className="p-4">
           <h3 className="text-center">{product.title}</h3>
            <p className="text-lg font-medium text-center">
              Upto {product.discountedPrice}% Off
            </p>
           </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
