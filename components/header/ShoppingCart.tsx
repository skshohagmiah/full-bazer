"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { ShoppingCart as CartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import useShoppingCart from "@/hooks/useShoppingCart";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "../ui/separator";
import EmptyState from "../others/EmptyState";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShoppingCart() {

  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  const {
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    items,
    calculateTotal,
  } = useShoppingCart();

  return (
    <Sheet onOpenChange={() => setShowCart(!showCart)} open={showCart}>
      <SheetTrigger asChild className="relative">
        <Button
          variant="ghost"
          size={"icon"}
          className="rounded-full "
        >
          <CartIcon />
          <Badge
            variant="secondary"
            className="ml-2 absolute -top-1 -right-1 bg-rose-400"
          >
            {items.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className=" w-[90%] md:w-full flex flex-col gap-2 sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? <EmptyState label="Your cart is empty"/>
              : `You have ${items.length} items in your cart.`}
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? null : (
          <>
            <CardContent className="divide-y divide-gray-200 dark:divide-gray-600 w-full px-0">
              {items.map((item) => (
                <Card key={item.product.id + item.size?.id + item.color?.id} className="flex items-center justify-between gap-2 w-full">
                  <CardHeader className="flex flex-row gap-4 items-center w-full">
                    {/* Product Image */}
                    <div className="relative aspect-square h-14 w-14 rounded-md overflow-hidden">
                      <Image
                        src={item.product.images[0]?.url} // Get the first image url from the product
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1 text-sm">
                      {/* Product Name, Size, Color */}
                      <CardTitle className="font-semibold text-sm">
                        {item.product.name}{" "}
                        {item.size ? `(${item.size.name})` : null}{" "}
                        {item.color ? `(${item.color.name})` : null}
                      </CardTitle>
                      {/* Product Price and Quantity */}
                      <CardDescription className="text-muted-foreground">
                        {formatCurrency(item.price)}
                        {" x "}
                        {item.quantity}
                      </CardDescription>
                    </div>
                    <Button
                      size={"sm"}
                      variant="ghost"
                      className="text-xs text-muted-foreground"
                      onClick={() =>
                        removeItem(item.product, item.size, item.color)
                      } // Remove item with size and color
                    >
                      Remove
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </>
        )}
      <SheetFooter className="flex-1 flex justify-end flex-col sm:flex-col gap-2 mt-auto h-fit sm:pb-8">
        <div className="text-lg text-right font-medium text-gray-900 dark:text-white">
          Total: {formatCurrency(calculateTotal())} {/* Use total from hook */}
        </div>
        <Separator />
        <div className="space-y-2" onClick={() => setShowCart(false)}>
          <Button variant="outline" className="w-full" size={"lg"} onClick={() => router.push('/cart')}>
            Shopping Cart
          </Button>
          <Button className="w-full" size={"lg"} onClick={() => router.push('/checkout')}>
            Checkout
          </Button>
        </div>
      </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
