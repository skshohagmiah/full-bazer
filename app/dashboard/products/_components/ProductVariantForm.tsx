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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { PlusCircle, Trash2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Variant name is required" }),
  options: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: "Option name is required",
        }),
        image: z.string().optional(),
      })
    )
    .min(1, { message: "At least one option is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  stock: z.number().min(0, { message: "Stock must be a positive number" }),
  sku: z.string().min(1, { message: "SKU is required" }),
});

type ProductVariantInput = z.infer<typeof formSchema>;
// ... (your other imports and interfaces)

export default function ProductVariantForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ProductVariantInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      options: [{ name: "", image: "" }],
      price: 0,
      stock: 0,
      sku: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const handleImageUpload = async (result: any, index: number) => {
    const data = await result.json();
    // update the form value at the specified index with the new image URL
    const updatedOptions = [...form.getValues("options")];
    updatedOptions[index].image = data.url;
    form.setValue("options", updatedOptions);
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
      <div className="grid lg:grid-cols-2 gap-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter variant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="9.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* sku */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sku</FormLabel>
              <FormControl>
                <Input placeholder="sku" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: "", image: "" })} // Append a new empty option
          className="mb-4"
        >
          Add Option
        </Button>
      </div>
    </div>
  );
}
