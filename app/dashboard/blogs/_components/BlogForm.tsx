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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import TiptapEditor from "../_components/TiptapEditor";
import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import { Loader2 } from "lucide-react";
import { BlogPost, Category } from "@prisma/client";
import { createBlog, updateBlog } from "@/actions/dashboard/blogs/blogsActions";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required",
  }),
  excerpt: z.string().min(10, {
    message: "Title is required",
  }),
  content: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  thumbnailImage: z.string().min(1, {
    message: "Image is required.",
  }),
  tags: z.string().min(1, { message: "Tags are required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

interface BlogFormProps {
  initialData?: BlogPost | null; // Optional initial data for editing
  categories: Category[];
}

export default function BlogForm({ initialData, categories }: BlogFormProps) {
  const router = useRouter();

  // Transform initial data if necessary
  const transformedData = {
    ...initialData,
    thumbnailImage: initialData?.thumbnailImage ?? undefined,
    tags: initialData?.tags.join(", "),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: transformedData || {
      title: "",
      content: "",
      thumbnailImage: "",
      tags: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let res;
    if (initialData) {
      res = await updateBlog(initialData.id, data);
    } else {
      res = await createBlog(data);
    }
    if (res.status === 200) {
      toast(res.message);
      router.push("/dashboard/blogs");
    } else {
      toast(res.message);
    }
  };

  return (
    <DashbaordPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/blogs", text: "blogs" },
        ]}
        pageText={initialData ? "edit" : "new"}
      />
      <DashboardHeading
        title={initialData ? "Edit Blog" : "New Blog"}
        subtitie={initialData ? "Edit blog post here" : "Create new blog post"}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full items-start justify-start gap-8 border p-4 rounded-md"
        >
          <div className="grid lg:grid-cols-2 gap-8 w-full">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Post Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Post Excerpt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Post Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write tags separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length === 0 && (
                          <SelectItem value="">No categories</SelectItem>
                        )}
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload  */}
          <FormField
            control={form.control}
            name="thumbnailImage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Thumbnail Image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    endpoint={"blogImage"}
                    onClientUploadComplete={(res) => {
                      field.onChange(res[0].url);
                    }}
                    className="w-full dark:border-gray-500"
                  />
                </FormControl>
                {field.value && (
                  <div className="relative aspect-video mt-2 h-48 w-48 border p-2">
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

          {/* Rich Text Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full h-full">
                <FormLabel>Content</FormLabel>
                <TiptapEditor onChange={field.onChange} value={field.value} />
                <FormMessage />
                <FormDescription>
                  Actuall blog content goes here
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : initialData ? (
              " Update Blog"
            ) : (
              "Create Blog"
            )}
          </Button>
        </form>
      </Form>
    </DashbaordPageWrapper>
  );
}
