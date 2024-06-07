"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ShippingMethod } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Shipping method name is required",
  }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  isFree: z.boolean(),
  minimumOrderAmount: z.coerce.number().min(0).optional(),
});

interface ShippingMethodFormProps {
  initialData: ShippingMethod | null;
}

export default function ShippingMethodForm({
  initialData,
}: ShippingMethodFormProps) {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      isFree: false,
      minimumOrderAmount: undefined,
    },
  });
  useEffect(() => {
    if (initialData) {
      form.setValue("name", initialData.name);
      form.setValue("description", initialData.description || "");
      form.setValue("price", initialData.price || 0);
      form.setValue("isFree", initialData.isFree);
      form.setValue(
        "minimumOrderAmount",
        initialData.minimumOrderAmount || 0
      );
    }
  }, [initialData, form]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/shipping-methods/${params?.shippingMethodId}`, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create/update shipping method");
      }

      router.refresh();
      router.push('/dashboard/settings')

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Standard Shipping"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description (Optional) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Describe the shipping method..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price (Only shown when "Free Shipping" is off) */}
            {!form.watch("isFree") && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (in cents)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isLoading}
                        placeholder="500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          {/* Free Shipping Toggle */}
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className={cn(
                      "data-[state=checked]:bg-blue-500",
                      "data-[state=unchecked]:bg-gray-200"
                    )}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Free Shipping</FormLabel>
                  <FormDescription>
                    Enable if this shipping method is free.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* minimum Order Amount */}
          {form.watch("isFree") && (
            <FormField
              control={form.control}
              name="minimumOrderAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Amount (in cents)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="1000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? initialData
                ? "Updating..."
                : "Creating..."
              : initialData
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
