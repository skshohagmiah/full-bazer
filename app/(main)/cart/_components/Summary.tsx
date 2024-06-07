"use client";
import { useShoppingCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "@/components/ui/country-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShippingMethod } from "@prisma/client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const addressFormSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  postalCode: z.string().min(1, {
    message: "Postal code is required",
  }),
  country: z.string(),
});
type AddressFormValues = z.infer<typeof addressFormSchema>;

export default function Summary() {
  const {
    items,
    shippingAddress,
    setShippingAddress,
    calculateSubtotal,
    calculateDiscount,
    calculateTax,
    calculateTotal,
  } = useShoppingCart();

  const [shippingMethods, setShippingMethods] = useState<
    (ShippingMethod | null)[]
  >([]);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);
  useEffect(() => {
    const fetchShippingMethods = async () => {
      const res = await fetch("/api/shipping-methods");
      const data = await res.json();
      setShippingMethods(data);
    };

    fetchShippingMethods();
  }, []);

  const onShippingMethodChange = (shippingMethod: ShippingMethod | null) => {
    setSelectedShippingMethod(shippingMethod);
    // Also update the shipping cost in your cart state if needed
  };

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
  });
  useEffect(() => {
    form.setValue("address", shippingAddress?.address || "");
    form.setValue("city", shippingAddress?.city || "");
    form.setValue("postalCode", shippingAddress?.postalCode || "");
    form.setValue("country", shippingAddress?.country || "");
  }, [shippingAddress, form]);

  const onSubmit = (data: AddressFormValues) => {
    setShippingAddress(data);
  };

  return (
    <div className="md:col-span-4 flex flex-col">
      {/* Shipping Address Form */}
      <Accordion
        type="single"
        collapsible
        className="w-full flex-1 bg-accent p-8 rounded-md"
      >
        <AccordionItem value="address">
          <AccordionTrigger>Shipping Address</AccordionTrigger>
          <AccordionContent>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Shipping Address
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid gap-2 md:grid-cols-2 md:gap-4">
                    {/* Address Input */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City Input */}
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Postal Code Input */}
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Country Select */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <CountrySelect
                            onValueChange={field.onChange}
                            value={field.value}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="ml-auto">
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 bg-white dark:bg-slate-900 p-8 rounded-md sticky bottom-0">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h3>

        {/* List of items with prices */}
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.product.id + item.size?.name + item.color?.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="relative h-8 w-8 mr-2">
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <p className="text-sm">
                  {item.product.name} {item.size ? `(${item.size.name})` : null}{" "}
                  {item.color ? `(${item.color.name})` : null}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        {/* Shipping Method Selection */}
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2">Shipping Method</h4>
          <Select
            onValueChange={(value) =>
              onShippingMethodChange(value as ShippingMethod)
            }
            value={selectedShippingMethod?.id}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {shippingMethods.map((method) => (
                <SelectItem key={method?.id} value={method?.id}>
                  {method?.name} - {formatCurrency(method?.price || 0)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        {/* Summary Details */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatCurrency(calculateSubtotal())}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>- {formatCurrency(calculateDiscount())}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{formatCurrency(calculateShipping())}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>{formatCurrency(calculateTax())}</p>
          </div>
          <Separator   className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">
              {formatCurrency(calculateTotal())}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {/* Checkout Button */}
          <Button
            className="w-full bg-black text-white hover:bg-slate-900"
            onClick={() => router.push("/checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
