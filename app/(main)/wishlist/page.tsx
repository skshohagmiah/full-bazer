"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import useWishlistStore from "@/hooks/useWishlist";

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
}

const dummyWishlistItems: WishlistProduct[] = [
  {
    id: 1,
    name: "Elegant Watch",
    price: 150,
    image: "/elec/apple-watch-9-2.jpg",
    color: "Black",
    size: "One Size",
  },
  {
    id: 2,
    name: "Stylish Backpack",
    price: 85,
    image: "/elec/asus-vivobook.jpg",
    color: "Blue",
    size: "Large",
  },
  {
    id: 3,
    name: "Comfortable Shoes",
    price: 120,
    image: "/shoes.jpg",
    color: "Red",
    size: "10",
  },
];

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };
  return (
    <section className="bg-white dark:bg-slate-900 my-4 py-12">
      <MaxWidthWrapper className="px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {dummyWishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <Table className="w-full border">
          <TableHeader className="bg-slate-100 dark:bg-slate-900">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyWishlistItems.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-16 h-16">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-lg font-semibold hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell className="flex gap-2 items-center">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </MaxWidthWrapper>
    </section>
  );
}
