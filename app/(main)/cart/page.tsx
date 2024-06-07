
"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useShoppingCart from "@/hooks/useShoppingCart";
import Image from "next/image";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import Link from "next/link";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateItemQuantity,
    calculateSubTotal,
    calculateDiscount,
    calculateTotal,
    calculateShipping,
    calculateTax,
  } = useShoppingCart();


  const dummyData = [
    {
      product: {
        id: "1",
        name: "Product 1",
        description: "Description for Product 1",
        itemDetails: ["Detail 1", "Detail 2"],
        sku: "SKU1",
        categoryId: "cat1",
        category: { id: "cat1", name: "Category 1", slug: "category-1" },
        variants: [
          {
            id: "var1",
            productId: "1",
            sizeId: "size1",
            colorId: "color1",
            size: { id: "size1", name: "M", value: "M" },
            color: { id: "color1", name: "Red", value: "red" },
            price: 3000,
            stock: 100,
            sku: "SKU1-1",
            image: "url-to-image",
            orderItems: [],
          },
        ],
        reviews: [],
        images: [
          {
            id: "img1",
            url: "/shoes.jpg",
            productId: "1",
            product: null,
          },
        ],
        price: 3000,
        discount: 10,
        totalSales: 50,
        isFeatured: true,
        isArchived: false,
        stock: 100,
        brandName: "Brand 1",
      },
      quantity: 1,
      size: { id: "size1", name: "M", value: "M" },
      color: { id: "color1", name: "Red", value: "red" },
      price: 3000,
    },
    {
      product: {
        id: "2",
        name: "Product 2",
        description: "Description for Product 2",
        itemDetails: ["Detail A", "Detail B"],
        sku: "SKU2",
        categoryId: "cat2",
        category: { id: "cat2", name: "Category 2", slug: "category-2" },
        variants: [
          {
            id: "var2",
            productId: "2",
            sizeId: "size2",
            colorId: "color2",
            size: { id: "size2", name: "L", value: "L" },
            color: { id: "color2", name: "Blue", value: "blue" },
            price: 5000,
            stock: 200,
            sku: "SKU2-1",
            image: "url-to-image",
            orderItems: [],
          },
        ],
        reviews: [],
        images: [
          {
            id: "img2",
            url: "/shoes-2.jpg",
            productId: "2",
            product: null,
          },
        ],
        price: 5000,
        discount: 0,
        totalSales: 20,
        isFeatured: false,
        isArchived: false,
        stock: 200,
        brandName: "Brand 2",
      },
      quantity: 2,
      size: { id: "size2", name: "L", value: "L" },
      color: { id: "color2", name: "Blue", value: "blue" },
      price: 5000,
    },
  ];

  return (
    <MaxWidthWrapper className=" py-8">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>
      <small className="block mb-8">Manage your shopping cart items</small>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {dummyData.length > 0 ? (
            dummyData.map((item) => (
              <Card key={item.product.id} className="mb-6 flex items-center justify-between gap-2">
                <div className="w-full flex items-center gap-2">
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover"
                  />
                  <CardContent className="w-full flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{item.product.name}</h2>
                    <p className="text-xl font-semibold">${(item.price / 100).toFixed(2)}</p>
                    <div className="flex items-center">
                      <Label htmlFor={`quantity-${item.product.id}`} className="mr-2">
                        Quantity:
                      </Label>
                      <Input
                        id={`quantity-${item.product.id}`}
                        type="number"
                        value={item.quantity}
                        // onChange={(e) =>
                        //   updateItemQuantity(item.product.id, item.size, item.color, parseInt(e.target.value))
                        // }
                        className="w-16 mr-4"
                      />
                    </div>
                      <Button
                        variant="outline"
                        // onClick={() => removeItem(item.product, item.size, item.color)}
                      >
                        Remove
                      </Button>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <p>Subtotal</p>
                <p>${(calculateSubTotal() / 100).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Discount</p>
                <p>${(calculateDiscount() / 100).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Shipping</p>
                <p>${(calculateShipping() / 100).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Tax</p>
                <p>${(calculateTax() / 100).toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <p>Total</p>
                <p>${(calculateTotal() / 100).toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size={'lg'}>
                <Link href={'/checkout'}>Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CartPage;
