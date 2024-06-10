"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { GeneralSettings as GeneralSettingType } from "@prisma/client";
import { updateOrCreateGeneralSettings } from "@/actions/dashboard/settings/settingsActions";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Site name is required",
  }),
  description: z.string().optional(),
  brandName: z.string().optional(),
  logoImage: z.string().min(3, { message: "Logo image  is required" }),
  faviconImage: z.string().min(3, { message: "Fevicon image is required" }),
});

interface GeneralSettingsProps {
  initialData: GeneralSettingType | null | undefined;
}

export default function GeneralSettings({ initialData }: GeneralSettingsProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData || {
      title: "",
      description: "",
      brandName: "",
      faviconImage: "",
      logoImage: "",
      phone: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const res = await updateOrCreateGeneralSettings(data!);
    if (res.status === 200) {
      toast(res.message);
      router.refresh();
    } else {
      toast(res.message);
    }
  };

  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className=" lg:grid lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Site Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This title will be shown in the browser tab-bar
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
                  <FormLabel>Site Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Site Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This Description will be shown in some external links
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>brandName/Logo Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Site Logo Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This brandName name will be in the site logo, if you have
                    logo as image then you can skip this step
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offical phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="01865905625" {...field} />
                  </FormControl>
                  <FormDescription>
                    This number will be in the navigation header for any customer call
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" lg:grid lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="logoImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Image</FormLabel>
                  <FormControl>
                    <UploadDropzone
                      endpoint={"logoImage"}
                      className="w-full dark:border-gray-500"
                      onClientUploadComplete={(res) =>
                        field.onChange(res[0].url)
                      }
                    />
                  </FormControl>
                  <Image
                    className="border p-2 flex item-center justify-center"
                    src={field.value}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                  <FormDescription>This is the Logo Image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faviconImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fevicon Image</FormLabel>
                  <FormControl>
                    <UploadDropzone
                      endpoint={"feviconImage"}
                      className="w-full dark:border-gray-500"
                      onClientUploadComplete={(res) =>
                        field.onChange(res[0].url)
                      }
                    />
                  </FormControl>
                  <Image
                    className="border p-2 flex item-center justify-center"
                    src={field.value}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                  <FormDescription>
                    This Image will be shown in the browser tab-bar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
