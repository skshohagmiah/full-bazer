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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { IntegrationSettings as integrationSettingType } from "@prisma/client";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  // Add more fields as needed for other integrations (e.g., Stripe keys, Mailchimp API key)
});

interface IntegrationSettingProps {
  initialData: integrationSettingType;
}

export default function IntegrationSettings({
  initialData,
}: IntegrationSettingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      googleAnalyticsId: "",
      facebookPixelId: "",
      // Set default values for other integrations
    },
  });

  const onSubmit = async (data:any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/settings/integrations`, {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          {/* Google Analytics */}
          <FormField
            control={form.control}
            name="googleAnalyticsId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Analytics ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="UA-XXXXXXXX-X"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Enter your Google Analytics tracking ID to enable analytics
                  tracking for your store.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Facebook Pixel */}
          <FormField
            control={form.control}
            name="facebookPixelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Pixel ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXXXXXXXXXXXXXXX"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Enter your Facebook Pixel ID to track conversions and website
                  events.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add more integrations here */}

          {/* Save Changes Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
