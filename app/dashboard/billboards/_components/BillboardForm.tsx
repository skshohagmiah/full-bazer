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
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { createBillboard, updateBillboard } from "@/actions/dashboard/billboard/billboardsActions";
import { toast } from "sonner";
import { Billboard } from "@prisma/client";
import { Loader2 } from "lucide-react";


const billboardFormSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
  link: z.string().url()
});

export default function BillboardForm({billboard}:{billboard:Billboard | null}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof billboardFormSchema>>({
    resolver: zodResolver(billboardFormSchema),
    // @ts-ignore
    defaultValues: billboard || {
      imageUrl: "",
      link: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof billboardFormSchema>) => {
    let res;
    if(billboard){
      res = await updateBillboard(billboard.id, data);
    }else{
      res = await createBillboard(data);
    }
    if (res.status === 200) {
      toast(res.message);
      router.push("/dashboard/billboards");
    } else {
      toast(res.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 border p-4 rounded-md shadow-md"
      >




        {/* Link (Input Field) */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard Click Link</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://yourdomain.com/shop?laptops'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="lg:col-span-2">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    onClientUploadComplete={(res) => field.onChange(res[0].url)}
                    className="w-full dark:border-gray-500"
                    endpoint="billboardImage"
                  />
                </FormControl>
                {field.value && (
                  <div className="relative aspect-video mt-2 h-[15rem] w-full">
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
        <div className="lg:col-span-2 flex items-center justify-start">
          <Button
            size={"lg"}
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              billboard ? "Update Billboard" : "Create Billboard"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
