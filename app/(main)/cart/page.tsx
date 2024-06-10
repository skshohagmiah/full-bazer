"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useShoppingCart from "@/hooks/useShoppingCart";
import { useRouter } from "next/navigation";

const CartPage = () => {
  // Dummy data for the cart items
  const items = [
    {
      product: {
        id: "1",
        name: "Sample Product 1",
        price: 4999,
        images: [{ url: "/elec/apple-watch-9-2.jpg" }],
      },
      size: { name: "Small" },
      color: { name: "Red" },
      quantity: 1,
    },
    {
      product: {
        id: "2",
        name: "Sample Product 2",
        price: 5999,
        images: [{ url: "/elec/apple-watch-9.jpg" }],
      },
      size: { name: "Medium" },
      color: { name: "Blue" },
      quantity: 2,
    },
  ];

  // Cart calculation functions
  const router = useRouter()
  const calculateSubTotal = () => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const calculateDiscount = () => 0; // Assuming no discount for this example
  const calculateShipping = () => 500; // Fixed shipping cost
  const calculateTax = () => Math.round(calculateSubTotal() * 0.1); // 10% tax
  const calculateTotal = () => calculateSubTotal() - calculateDiscount() + calculateShipping() + calculateTax();

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useShoppingCart();
  const { updateItemQuantity, removeItem } = useShoppingCart();

  return (
    <section className="bg-white py-8 dark:bg-slate-900 my-4">
      <MaxWidthWrapper className="px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <small className="block mb-8">Manage your cart items</small>
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* Cart Items Table */}
          <div className="w-full lg:w-2/3 overflow-x-auto">
            <Table className="rounded-md border min-w-[600px]">
              <TableHeader className="bg-slate-200 dark:bg-slate-800">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-start">
                {items.length > 0 ? (
                  items.map((item) => (
                    <TableRow
                      key={item.product.id + item.size?.name + item.color?.name}
                    >
                      <TableCell className="flex items-center gap-4 p-4">
                        <div className="w-14 h-14 relative">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            layout="fill"
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {item.size?.name}, {item.color?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-left">
                        {formatCurrency(item.product.price)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity === 1}
                          >
                            <Minus />
                          </Button>
                          <span className="text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            removeItem(item.product, item.size, item.color)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <p className="text-center">Your cart is empty.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Order Summary */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 lg:sticky lg:top-20">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <p>Subtotal</p>
                  <p>{formatCurrency(calculateSubTotal())}</p>
                </div>
                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <p>Discount</p>
                  <p>- {formatCurrency(calculateDiscount())}</p>
                </div>
                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <p>Shipping</p>
                  <p>{formatCurrency(calculateShipping())}</p>
                </div>
                <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                  <p>Tax</p>
                  <p>{formatCurrency(calculateTax())}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl mt-4">
                  <p>Total</p>
                  <p>{formatCurrency(calculateTotal())}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button size={'lg'} className="bg-blue-600 text-white w-full" onClick={() => router.push('/checkout')}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CartPage;
