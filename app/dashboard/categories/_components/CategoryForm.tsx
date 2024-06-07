"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Billboard, Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import {
  createCategory,
  updateCategory,
} from "@/actions/dashboard/categories/categoriesActions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
});

interface CategoryFormProps {
  initialData: Category | null;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData! || {
      name: "",
      imageUrl: "",
      slug: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let res;
    if (initialData) {
      res = await updateCategory(initialData.id, data);
    } else {
      res = await createCategory(data);
    }
    if (res.status === 200) {
      toast(res.message);
      router.push("/dashboard/categories");
    } else {
      toast(res.message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full gap-8 px-8 py-4 border shadow-md rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start justify-start gap-8"
        >
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug / Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Image Uploader */}
          <div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadDropzone
                      className="dark:border-gray-500"
                      endpoint={"categoryImage"}
                      onClientUploadComplete={(res) =>
                        field.onChange(res[0].url)
                      }
                    />
                  </FormControl>
                  {field.value && (
                    <div className="relative aspect-video mt-2 h-48 w-48">
                      <Image
                        fill
                        src={field.value}
                        alt="Uploaded Preview"
                        className="object-cover rounded-sm"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              size={"lg"}
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                initialData ? "Update Category" : "Create Category"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
