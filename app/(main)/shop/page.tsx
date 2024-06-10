import SingleProduct from "@/components/products/SingleProduct";
import Pagination from "@/components/others/Pagination";
import ShopSidebar from "./_components/ShopSidebar";

import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import SidebarHeading from "./_components/SidebarHeading";
import SortOptions from "./_components/SortOptions";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import EmptyState from "@/components/others/EmptyState";
import ShopProductContainer from "./_components/ShopProductContainer";

const featuredProducts = [
  {
    id: 1,
    image: "/elec/prothonics.jpg",
    title: "Wireless Headphones",
    description: "This is a 3.5 mm Bluetooth speaker",
    originalPrice: "$99.99",
    discountedPrice: "$79.99",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    image: "/elec/apple-watch-9-2.jpg",
    title: "Smart Watch",
    description: "This is a 3.5 mm Bluetooth speaker",
    originalPrice: "$199.99",
    discountedPrice: "$149.99",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 3,
    image: "/elec/song-wh.jpg",
    title: "Bluetooth Speaker",
    description: "This is a 3.5 mm Bluetooth speaker",
    originalPrice: "$49.99",
    discountedPrice: "$39.99",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 4,
    image: "/elec/song-wh.jpg",
    title: "Bluetooth Speaker",
    description: "This is a 3.5 mm Bluetooth speaker",
    originalPrice: "$49.99",
    discountedPrice: "$39.99",
    rating: 4.5,
    reviews: 120,
  },
  // Add more products as needed
];

interface ShopProps {
  searchParams: {
    category: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
    page: string;
    search:string,
    sortBy:string,
  };
}

const Shop = async ({ searchParams }: ShopProps) => {
  const { category, maxPrice, minPrice, page = 1, rating,search,sortBy } = searchParams;

  const categories = await prisma.category.findMany({});

  let whereClause = {};

  if (category) {
    whereClause = {
      category: {
        name: { contains: category },
      },
    };
  };

  if(minPrice){
    whereClause = {
      ...whereClause,
      price: {
        gte: Number(minPrice),
      },
    }
  }

  if(maxPrice){
    whereClause = {
      ...whereClause,
      price: {
        lte: Number(maxPrice),
      },
    }
  }

  if(rating) {
    whereClause = {
      ...whereClause,
      reviews:{
        some:{
          rating:{gte:Number(rating)}
        }
    }
  }
}

if(search){
  whereClause = {
    ...whereClause,
    name:{contains:search},
  }
}


let sortOptons = {}

if(sortBy){
  if(sortBy === 'price-asc'){
    sortOptons = {
      price: 'asc'
    }
  }else{
    sortOptons = {
      price : 'desc'
    }
  }
}

  const shopProducts = await prisma.product.findMany({
    where: whereClause,
    orderBy:sortOptons,
    take: 8,
    skip: Number(page) * 8,
  });


  const totalProducts = await prisma.product.count({
    where:whereClause,
  })

  return (
    <div className="bg-white dark:bg-gray-900 space-y-4 py-4">
      <SidebarHeading />
      <MaxWidthWrapper className="flex items-start gap-2 justify-between">
        <div className="hidden md:block">
          <ShopSidebar categories={categories!} />
        </div>
        <ShopProductContainer shopProducts={shopProducts}/>
      </MaxWidthWrapper>
      <Pagination
        itemsPerPage={8}
        totalItems={totalProducts}
      />
    </div>
  );
};
export default Shop;
