//@ts-nocheck

"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import { Category, Color, Size } from "@prisma/client";
import { productSchema } from "@/lib/zod";
import {
  createProduct,
  updateProduct,
} from "@/actions/dashboard/products/productActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";

interface ProductFormProps {
  initialData?:
    | (Product & {
        variants: (ProductVariant & { color: Color; size: Size })[];
        images: Image[];
      })
    | null;
  colors: Color[];
  sizes: Size[];
  categories: Category[];
}

export default function ProductForm({
  initialData,
  colors,
  sizes,
  categories,
}: ProductFormProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      itemDetails: "",
      categoryId: "",
      brandName: "",
      images: [""],
      price: "",
      discount: "",
      isFeatured: false,
      isArchived: false,
      stock: "",
      variants: [{ sizeId: "", colorId: "", price: "", stock: "" }],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    if (initialData) {
      const res = await updateProduct(initialData.id, data);
      if (res.status === 200) {
        toast(res.message);
        router.push("/dashboard/products");
      } else {
        toast(res.message);
      }
    } else {
      const res = await createProduct(data);
      if (res.status === 200) {
        toast(res.message);
        router.push("/dashboard/products");
      } else {
        toast(res.message);
      }
    }
  };

  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/products", text: "products" },
        ]}
        pageText={initialData ? "update" : "new"}
      />
      <DashboardHeading
        title={initialData ? "Edit Product" : "New Product"}
        subtitie={
          initialData ? "Edit product here" : "Create new product to sell"
        }
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border shadow-md p-4 rounded-md overflow-y-auto"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="9.99" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length == 0 && "No category created."}
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nike" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock quantity"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="Discount" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number in percentage like 10 for 10% discount
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E,G. Feature one here, feature two,"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write each point by comma seperated.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 py-4">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product images (Can be multiple)</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        endpoint="productImages"
                        className="w-full col-span-2 dark:border-gray-500"
                        onClientUploadComplete={(res) => {
                          field.onChange(res.map((item) => item.url));
                        }}
                      />
                    </FormControl>
                    <div className="flex items-center gap-2 flex-wrap">
                      {field.value.length >= 2 &&
                        field.value.map((item) => (
                          <Image
                            src={item}
                            alt="product"
                            key={item}
                            width="200"
                            height="200"
                          />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will be archived.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Product variants fields */}
          <div className="space-y-4 border rounded-md p-4">
            <label className="block text-xl font-medium">
              Product Variants (optional)
            </label>
            <small className="text-muted-foreground">
              Variant are like Different sizes or colors of your products
            </small>
            {variantFields.map((variant, index) => (
              <div key={variant.id} className="space-y-6">
                <div className="flex flex-col md:items-center md:justify-between md:flex-row md:space-x-8 space-y-4 border p-4 rounded-md">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.sizeId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="whitespace-nowrap">
                          Variant Size
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[10rem]">
                              <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizes.length == 0 && "No size created."}
                            {sizes.map((size) => (
                              <SelectItem key={size.id} value={size.id}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <FormDescription>
                          e.g., Small, Medium, Large
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.colorId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="whitespace-nowrap">
                          Variant Color
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[10rem]">
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors.length == 0 && "No color created."}
                            {colors.map((color) => (
                              <SelectItem key={color.id} value={color.id}>
                                {color.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <FormDescription>
                          e.g., Red, Blue, Green
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant Price (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="9.99" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant Stock</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Stock quantity"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeVariant(index)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                appendVariant({ sizeId: "", colorId: "", price: "", stock: "" })
              }
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Variant
            </Button>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : initialData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </Form>
    </DashboardPageWrapper>
  );
}
