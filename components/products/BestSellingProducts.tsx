import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ChevronRight} from "lucide-react";
import ProductActionButtons from "./ProductActionButtons";
import prisma from "@/lib/db";

const BestSellingProducts = async() => {

  const mostSellingProduct = await prisma.product.findMany({
    take:6,
    orderBy:{totalSales: 'desc'},
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
    <div className="p-4 md:col-span-2 bg-white dark:bg-slate-900 space-y-4">
      <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Most Selling Products</h2>
      <Link href={'/shop'} className="p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 hover:cursor-pointer">
        <ChevronRight />
      </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {mostSellingProduct.map((product) => (
          <Link
            href={"/shop/${product.id}"}
            key={product.id}
            className=" border dark:border-none rounded-lg pb-2  bg-white dark:bg-slate-800 relative group overflow-hidden"
          >
           <div className="overflow-hidden w-full h-[10rem] md:h-[14rem] relative p-4">
           <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-contain md:object-cover text-center group-hover:scale-110 transition-transform duration-150 ease-in-out"
            />
           </div>
           <div className="md:p-4">
           <h3 className="text-center">{product.name}</h3>
            <p className="md:text-lg font-medium text-center">
              Upto <span className="text-green-500">{product.discount}</span>% Off
            </p>
           </div>

            <ProductActionButtons product={product} />
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
