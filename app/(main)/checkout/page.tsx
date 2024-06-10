"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import ShippingAddressForm from "./_components/ShippingAddressForm";
import useShoppingCart from "@/hooks/useShoppingCart";
import EmptyState from "@/components/others/EmptyState";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

const CheckoutPage: React.FC = () => {
  const {
    items,
    calculateSubTotal,
    calculateDiscount,
    calculateTotal,
    calculateShipping,
    calculateTax,
    setShippingAddress,
    setBillingAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useShoppingCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethodState] = useState<string | null>(
    selectedPaymentMethod
  );

  useEffect(() => {
    if (selectedPaymentMethod) {
      setPaymentMethodState(selectedPaymentMethod);
    }
  }, [selectedPaymentMethod]);

  const form = useForm();

  const handlePlaceOrder = () => {
    // Handle place order logic
    console.log("Order placed!");
  };

  return (
    <section className="bg-white dark:bg-slate-900 my-4">
      <MaxWidthWrapper className="py-8 px-4 text-black dark:text-white">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <small className="mb-8 block">Please fill out the form below</small>
        {dummyData.length === 0 ? (
          <EmptyState label="Your cart is empty" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Shipping & Billing Form */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ShippingAddressForm />
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePlaceOrder)}>
                      <Controller
                        name="paymentMethod"
                        control={form.control}
                        defaultValue={paymentMethod}
                        render={({ field }) => (
                          <>
                            <FormItem className="flex items-center gap-4 w-fit">
                              <FormLabel
                                htmlFor="creditCard"
                                className="block whitespace-nowrap"
                              >
                                Credit Card
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="!mt-0"
                                  type="radio"
                                  id="creditCard"
                                  value="creditCard"
                                  checked={field.value === "creditCard"}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    setPaymentMethodState(e.target.value);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center gap-4 w-fit">
                              <FormLabel htmlFor="paypal" className="block">
                                PayPal
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="!mt-0"
                                  type="radio"
                                  id="paypal"
                                  value="paypal"
                                  checked={field.value === "paypal"}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    setPaymentMethodState(e.target.value);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dummyData.map((item) => (
                    <Card key={item.product.id} className="mb-4 p-2">
                      <div className="flex items-center">
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div className="flex-1 flex flex-wrap gap-2 items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {item.product.name}
                          </h3>
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="text-sm">
                            Price: {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Summary Details */}
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(calculateSubTotal() / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>-${(calculateDiscount() / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${(calculateShipping() / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${(calculateTax() / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-4 font-bold text-lg">
                      <span>Total:</span>
                      <span>${(calculateTotal() / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-fit"
                    type="button"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
};

export default CheckoutPage;
