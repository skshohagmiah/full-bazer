"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
// import { EmailSettings } from "@prisma/client";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EmailSettings as emailSettingType} from "@prisma/client";

const formSchema = z.object({
  officialEmail: z.string().email({
    message: "Invalid email address",
  }),
  senderName: z.string().optional(),
})

interface EmailSettingProps {
  initialData: emailSettingType
}

export default function EmailSettings({ initialData }: EmailSettingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      officialEmail: "",
      senderName: "",
    },
  });
  const onSubmit = async (data:any) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/settings/email`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      router.refresh();
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
          <div className="lg:grid lg:grid-cols-2 gap-8">
            {/* Sender Email */}
            <FormField
              control={form.control}
              name="officialEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Enter your store official email for mailing customers</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sender Name */}
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender Name (optional) </FormLabel>
                  <FormControl>
                    <Input placeholder="Your Site Name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          {/* Save Changes Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
