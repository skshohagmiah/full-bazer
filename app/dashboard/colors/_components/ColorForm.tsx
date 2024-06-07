"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

// import { Color } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Color } from "@prisma/client";
import {
  createColor,
  updateColor,
} from "@/actions/dashboard/colors/colorsActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Color name is required.",
  }),
  value: z.string().min(1, {
    message: "Color value is required.",
  }),
});
type ColorFormValues = z.infer<typeof formSchema>;

export default function ColorForm({ color }: { color?: Color }) {
  const router = useRouter();

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: color || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      let res;
      if (color) {
        res = await updateColor(color.id, data.name, data.value);
      } else {
        res = await createColor(data.name, data.value);
      }

      if (res.status === 200) {
        toast(res.message);
        router.push("/dashboard/colors");
      }
      toast(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full gap-8 border rounded-md p-4">
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
                      placeholder="Color name (e.g., Red, Blue)"
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
                    {/* Input with color picker functionality */}
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Color value (e.g., #FF0000)"
                        {...field}
                      />
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spiin" />
            ) : color ? (
              "Update Color"
            ) : (
              "Create Color"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
