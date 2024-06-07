"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { createSize, updateSize } from "@/actions/dashboard/sizes/sizesActions";
import { toast } from "sonner";
import { Size } from "@prisma/client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Size name is required.",
  }),
  value: z.string().min(1, {
    message: "Size value is required.",
  }),
});
type SizeFormValues = z.infer<typeof formSchema>;

export default function SizeForm({ size }: { size?: Size }) {
  const router = useRouter();

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: size || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      let res;
      if (size) {
        res = await updateSize(size?.id, data.name, data.value);
      } else {
        res = await createSize(data.name, data.value);
      }
      if (res.status === 200) {
        toast(res.message);
        router.push("/dashboard/sizes");
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full gap-8 border p-4 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Size name (e.g., Small, Medium)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Size value (e.g., S, M)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size={"lg"}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : size ? (
              "Update Size"
            ) : (
              "Create Size"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
