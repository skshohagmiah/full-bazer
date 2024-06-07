"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SingleProduct from "@/components/products/SingleProduct";
import Pagination from "@/components/others/Pagination";
import ShopSidebar from "./_components/ShopSidebar";

import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import SidebarHeading from "./_components/SidebarHeading";
import SortOptions from "./_components/SortOptions";

const categories = ["Electronics", "Clothing", "Books", "Toys"]; // Example categories

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

const Shop = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);
  const [sortOption, setSortOption] = useState(""); // For sorting products
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const productsPerPage = 8; // Number of products per page

  // useEffect(() => {
  //   const categoriesParam = searchParams.get("categories")?.split(",") || [];
  //   const minPrice = Number(searchParams.get("minPrice")) || 0;
  //   const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
  //   const rating = Number(searchParams.get("rating")) || 0;

  //   const filtered = featuredProducts.filter((product) => {
  //     const inCategory =
  //       categoriesParam.length === 0 ||
  //       categoriesParam.includes(product.category);
  //     const inPriceRange =
  //       product.price >= minPrice && product.price <= maxPrice;
  //     const meetsRating = product.rating >= rating;
  //     return inCategory && inPriceRange && meetsRating;
  //   });

  //   setFilteredProducts(filtered);
  // }, [searchParams]);

  // // Handle sorting
  // useEffect(() => {
  //   let sortedProducts = [...filteredProducts];
  //   if (sortOption === "price-asc") {
  //     sortedProducts.sort((a, b) => a.price - b.price);
  //   } else if (sortOption === "price-desc") {
  //     sortedProducts.sort((a, b) => b.price - a.price);
  //   } else if (sortOption === "rating") {
  //     sortedProducts.sort((a, b) => b.rating - a.rating);
  //   }
  //   setFilteredProducts(sortedProducts);
  // }, [sortOption]);

  // // Handle pagination
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  return (
    <div className="bg-white dark:bg-gray-900 space-y-4 py-4">
      <SidebarHeading />
      <MaxWidthWrapper className="flex items-start gap-2 justify-between">
        <div className="hidden md:block">
        <ShopSidebar categories={categories} />
        </div>
        <div className="">
            <SortOptions />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 p-4 border">
            {featuredProducts.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={filteredProducts.length}
        />
    </div>
  );
};

export default Shop;
