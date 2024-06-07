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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useLayoutStore from "@/hooks/useLayoutStore";

const formSchema = z.object({
  layoutType: z.enum(["sidebar", "navbar"]),
});

export default function LayoutSettings() {
  const layoutType = useLayoutStore((state) => state.layoutType);
  const setLayoutType = useLayoutStore((state) => state.setLayoutType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      layoutType: "sidebar",
    },
  });

  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form className="flex flex-col w-full items-start justify-start gap-8">
          {/* Layout Type (Switch) */}
          <FormField
            control={form.control}
            name="layoutType"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Switch
                    checked={layoutType === "navbar"}
                    onCheckedChange={(checked) =>
                      setLayoutType(checked ? "navbar" : "sidebar")
                    }
                    className={cn(
                      "data-[state=checked]:bg-blue-500",
                      "data-[state=unchecked]:bg-gray-200"
                    )}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Navbar Layout</FormLabel>
                  <FormDescription>
                    Use a top navbar instead of a sidebar.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
