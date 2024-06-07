"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const dummyWishlistItems: WishlistProduct[] = [
  {
    id: 1,
    name: "Elegant Watch",
    price: 150,
    image: "/elec/apple-watch-9-2.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Stylish Backpack",
    price: 85,
    image: "/elec/asus-vivobook.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Comfortable Shoes",
    price: 120,
    image: "/shoes.jpg", // Replace with actual image URL
  },
];

export default function WishlistPage() {
  const handleRemoveFromWishlist = (productId: number) => {
    // Implement the logic to remove the product from the wishlist
    console.log("Removed item:", productId);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {dummyWishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyWishlistItems.map((product) => (
            <Card key={product.id} className="h-full w-full">
              <CardHeader className="relative">
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-md"
                    />
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/product/${product.id}`}
                  className="text-lg font-semibold hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {product.name}
                </Link>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {formatCurrency(product.price)}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={()=>{}}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
