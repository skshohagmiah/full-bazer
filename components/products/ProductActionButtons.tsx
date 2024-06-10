"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Eye, Heart, RefreshCcw, ShoppingBag } from "lucide-react";
import { Color, Image, Product, ProductVariant, Size } from "@prisma/client";
import useShoppingCart from "@/hooks/useShoppingCart";
import useWishlistStore from "@/hooks/useWishlist";
import useCompareStore from "@/hooks/useCompareStore";
import { toast } from "sonner";

interface ProductActionButtonsProps {
  className?: string;
  product: Product & {
    images: Image[];
    variants: (ProductVariant & { color: Color | null; size: Size | null })[];
  };
}

const ProductActionButtons = ({
  className,
  product,
}: ProductActionButtonsProps) => {
  const { addItem } = useShoppingCart();
  const { addToWishlist } = useWishlistStore();
  const { addToCompare } = useCompareStore();

  const handleAddToCart = () => {
    addItem({
      price: product?.variants[0]?.price || product?.price,
      quantity: 1,
      color: null,
      size: null,
      product: product,
    });
    toast("Item added to cart", { icon: "🛒" });
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      color: null,
      size: null,
      image: product?.images[0].url || "",
      name: product.name,
      price: product.price,
      productId: Number(product.id),
    });
    toast("Item added to wishlist", { icon: "💖" });
  };

  const handleAddToCompare = () => {
    addToCompare({
      productId: Number(product.id),
      description: product.description,
      images: product.images,
      name: product.name,
      price: product.price,
      discount: Number(product.discount),
      specifications: product.specifications,
    });
    toast('Item added to compare list', {icon: '✔'})
  };

  return (
    <div
      className={cn(
        "absolute right-4 top-1/2 transform -translate-y-2/3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleAddToWishlist}
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
              onClick={handleAddToCompare}
              variant="ghost"
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-100"
            >
              <RefreshCcw className="h-5 w-5" />
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
              onClick={handleAddToCart}
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
  );
};

export default ProductActionButtons;
