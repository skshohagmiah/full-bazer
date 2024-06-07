"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  category: {
    name: string;
  };
  specifications: {
    key: string;
    value: string;
  }[];
  reviews: {
    rating: number;
    comment: string;
  }[];
}

// Dummy data for the products
const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description:
      "The iPhone 15 Pro Max features a stunning Super Retina XDR display, a powerful A17 Bionic chip, and a state-of-the-art Pro camera system.",
    price: 119900, // Price in cents (e.g., $1199.00)
    images: [
      { url: "/iphone.jpg" }, // Replace with your actual image URLs
    ],
    category: { name: "Electronics" },
    specifications: [
      { key: "Screen Size", value: "6.7 inches" },
      { key: "Chip", value: "A17 Bionic" },
      { key: "Camera", value: "48MP Triple Camera System" },
      { key: "Storage", value: "128GB, 256GB, 512GB, 1TB" },
    ],
    reviews: [
      { rating: 5, comment: "The best iPhone yet!" },
      { rating: 4, comment: "Great camera and performance." },
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    description:
      "The Samsung Galaxy S23 Ultra boasts a Dynamic AMOLED 2X display, the Snapdragon 8 Gen 2 processor, and a versatile 200MP camera system.",
    price: 109900, // Price in cents (e.g., $1099.00)
    images: [
      { url: "/samsung.jpg" }, // Replace with your actual image URLs
    ],
    category: { name: "Electronics" },
    specifications: [
      { key: "Screen Size", value: "6.8 inches" },
      { key: "Chip", value: "Snapdragon 8 Gen 2" },
      { key: "Camera", value: "200MP Quad Camera System" },
      { key: "Storage", value: "256GB, 512GB, 1TB" },
    ],
    reviews: [
      { rating: 4, comment: "Amazing display and battery life." },
      { rating: 5, comment: "Impressive camera capabilities." },
    ],
  },
];

export default function CompareProducts() {
  const [selectedImageIndex1, setSelectedImageIndex1] = useState(0);
  const [selectedImageIndex2, setSelectedImageIndex2] = useState(0);
  const router = useRouter()

  return (
    <section className="bg-white my-4 dark:bg-slate-900 text-black dark:text-white">
      <MaxWidthWrapper className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Compare Products
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[0, 1].map((index) => (
            <Card key={index} className="w-full md:w-1/2">
              {products[index] ? (
                <>
                  <CardHeader className="flex flex-row gap-4 items-center">
                    {/* Main Image */}
                    <div className="relative aspect-square h-32 w-32 rounded-md overflow-hidden">
                      <Image
                        src={products[index].images[selectedImageIndex1]?.url}
                        alt={products[index].name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <CardTitle>{products[index].name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {products[index].category.name}
                      </CardDescription>
                      <p className="text-xl font-bold mt-2">
                        {formatCurrency(products[index].price)}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="divide-y divide-gray-200 dark:divide-gray-600">
                    {/* Specifications */}
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2">
                        Specifications
                      </h4>
                      <Table>
                        <TableBody>
                          {products[index].specifications.map((spec) => (
                            <TableRow key={spec.key}>
                              <TableCell className="pr-2 font-medium">
                                {spec.key}
                              </TableCell>
                              <TableCell>{spec.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Ratings & Reviews */}
                    <div>
                      <h4 className="text-md font-semibold mb-2">
                        Ratings & Reviews
                      </h4>
                      <div className="flex items-center">
                        <Star className="text-yellow-500 h-4 w-4" />
                        <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                          {products[index].reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / products[index].reviews.length || 0}{" "}
                          stars
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on {products[index].reviews.length} reviews
                      </p>
                    </div>
                  </CardContent>

                  {/* Thumbnail Images */}
                  <CardFooter className="flex justify-center space-x-2">
                    {products[index].images.map((image, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-md overflow-hidden cursor-pointer ${
                          selectedImageIndex1 === i
                            ? "ring-2 ring-primary-500"
                            : ""
                        }`}
                        onClick={() =>
                          index === 0
                            ? setSelectedImageIndex1(i)
                            : setSelectedImageIndex2(i)
                        }
                      >
                        <Image
                          src={image.url}
                          alt={`${products[index].name} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </CardFooter>
                </>
              ) : (
                // Empty Slot
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-2xl font-bold mb-2">Empty Slot</div>
                    <Button
                      className="bg-primary-500 hover:bg-primary-400 dark:bg-primary-400 dark:hover:bg-primary-500 rounded-full"
                      onClick={() => router.push("/products")}
                    >
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
