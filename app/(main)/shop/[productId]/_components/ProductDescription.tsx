"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useShoppingCart from "@/hooks/useShoppingCart";
import { formatCurrency } from "@/lib/utils";
import { Color, Image, Product, ProductVariant, Review, Size } from "@prisma/client";
import { Minus, Plus, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ShareProduct from "./ShareProduct";

interface ProductDescriptionProps {
  product: (Product & {
    variants: (ProductVariant & { color: Color | null; size: Size | null })[];
    images: Image[];
    reviews: (Review & { user: { name: string } })[];
  });
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0].color.id
  );
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size.id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useShoppingCart();
  const router = useRouter();

  const filteredVariants = product.variants.filter(
    (variant) => variant.color.id === selectedColor
  );
  const defaultPrice = product.variants.find(
    (v) => v.size.id === selectedSize && v.color.id === selectedColor
  )?.price;

  const handleAddToCart = () => {
    const variant = product.variants.find(
      (variant) =>
        variant.color.id === selectedColor && variant.size.id === selectedSize
    );

    if (variant) {
      addItem({ product, quantity, size: variant.size, color: variant.color });
    }
  };

  const handleAddToWishlist = () => {
    // Add to wishlist functionality here
    console.log("Added to wishlist!");
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded"
          >
            New
          </Badge>
          <p className="text-xs text-gray-500">Brand: Shohag</p>
        </div>

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="flex items-center gap-2">
          <p className="text-sm font-bold bg-green-500 text-white px-2 rounded-md flex items-center gap-2">
            4.5 <Star className="text-yellow-500 fill-yellow-400" size={15} />
          </p>
          <p className="text-gray-500">({product.reviews.length} Reviews)</p>
        </div>

        <p className="text-rose-600 text-sm rounded w-fit">
          Only 10 left in stock - order soon
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          <span className="line-through text-muted-foreground text-sm">
            {formatCurrency(product.price - 100)}
          </span>{" "}
          {formatCurrency(defaultPrice ? defaultPrice : product.price)}
        </p>
        {product.discount && (
          <Badge
            variant="default"
            className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded"
          >
            {product.discount}% OFF
          </Badge>
        )}
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div>
          <label className="text-base font-medium">Choose Color</label>
          <div className="flex space-x-2 mt-2">
            {product.variants.map((variant) => (
              <button
                key={variant.color.id}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === variant.color.id
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: variant.color.value }}
                onClick={() => setSelectedColor(variant.color.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-base font-medium">Choose Size</label>
          <div className="flex space-x-2 mt-2">
            {product.variants.map((variant) => (
              <button
                key={variant.size.id}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedSize === variant.size.id
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedSize(variant.size.id)}
              >
                {variant.size.value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-base font-medium">Quantity</label>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" onClick={() => handleQuantityChange(-1)}>
              <Minus />
            </Button>
            <Input value={quantity} readOnly className="w-12 text-center" />
            <Button variant="outline" onClick={() => handleQuantityChange(1)}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <Button
          className="bg-blue-600 text-white text-lg hover:bg-blue-500 w-full"
          onClick={handleAddToCart}
          size="lg"
        >
          Add to Cart
        </Button>
        <Button
          onClick={() => router.push("/checkout")}
          variant="outline"
          size="lg"
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full text-xl"
        >
          Buy Now
        </Button>
      </div>

      <Separator />
      <ShareProduct productName={product.name} />
      <Separator />
      <div>
        <h2 className="text-2xl font-semibold">Product Highlights</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {product.specifications.map((spec) => (
            <li key={spec}>
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
