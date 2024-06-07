"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountrySelect } from "@/components/ui/country-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import useShoppingCart from "@/hooks/useShoppingCart";


const formSchema = z.object({
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

export default function ShippingAddressForm() {
  const { shippingAddress, setShippingAddress } = useShoppingCart();
  
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
  });

  const onSubmit = async (data: formSchema) => {
    setShippingAddress(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Street address, P.O. Box, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2 md:grid-cols-2 md:gap-4">
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
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code/ZIP</FormLabel>
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
        <Button type="submit">Save Shipping Address</Button>
      </form>
    </Form>
  );
}
