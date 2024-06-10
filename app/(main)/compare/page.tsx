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
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import useCompareStore from "@/hooks/useCompareStore";

export default function CompareProducts() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number[]>([]);
  const router = useRouter();

  const handleRemoveFromCompare = (productId: number) => {
    removeFromCompare(productId);
  };

  const handleImageSelect = (index: number, imageIndex: number) => {
    setSelectedImageIndex((prev) => {
      const newSelected = [...prev];
      newSelected[index] = imageIndex;
      return newSelected;
    });
  };

  return (
    <section className="bg-white dark:bg-slate-900 text-black dark:text-white my-4">
      <MaxWidthWrapper className="py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Compare Products
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {items.map((product, index) => (
            <Card key={product.id} className="w-full md:w-1/2 shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <Image
                    src={product.images[selectedImageIndex[index] || 0]?.url}
                    alt={product.name}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {product.category.name}
                  </CardDescription>
                  <p className="text-xl font-bold mt-2">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="divide-y divide-gray-200 dark:divide-gray-600">
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Specifications</h4>
                  <Table>
                    <TableBody>
                      {product.specifications.map((spec) => (
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

                <div>
                  <h4 className="text-md font-semibold mb-2">
                    Ratings & Reviews
                  </h4>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 h-4 w-4" />
                    <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                      {(
                        product.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / product.reviews.length
                      ).toFixed(1)}{" "}
                      stars
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {product.reviews.length} reviews
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center space-x-2 mt-4">
                {product.images.map((image, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-md overflow-hidden cursor-pointer ${
                      selectedImageIndex[index] === i
                        ? "ring-2 ring-primary-500"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(index, i)}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${i + 1}`}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                ))}
              </CardFooter>

              <CardFooter className="flex justify-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveFromCompare(product.id)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          {items.length < 2 && (
            <Card className="w-full md:w-1/2 shadow-lg">
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
            </Card>
          )}
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => clearCompare()}
          >
            Clear Compare List
          </Button>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
