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
import { TaxRate } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";


// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tax name is required",
  }),
  percentage: z
    .number()
    .min(0, { message: "Tax percentage must be a positive number" })
    .max(100, { message: "Tax percentage cannot exceed 100" }),
  country: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});


interface TaxRateFormProps {
  initialData: TaxRate | null;
}
export default function TaxRateForm({ initialData }: TaxRateFormProps) {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      percentage: 0,
      country: "",
      state: "",
      zip: "",
    },
  });
  useEffect(() => {
    if (initialData) {
      form.setValue("name", initialData.name);
      form.setValue("percentage", initialData.percentage || 0);
      form.setValue("country", initialData.country || "");
      form.setValue("state", initialData.state || "");
      form.setValue("zip", initialData.zip || "");
    }
  }, [initialData, form]);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/tax-rates/${params?.taxRateId}`, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create/update tax rate");
      }
      router.refresh();
      router.push('/dashboard/settings')

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
          className=" lg:grid grid-cols-2 gap-8 w-full"
        >
          {/* Tax Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="e.g., Sales Tax"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tax Percentage */}
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isLoading}
                    placeholder="e.g., 10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country (Optional) */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., USA" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State/Province (Optional) */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., CA"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zip/Postal Code (Optional) */}
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip/Postal Code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 90210" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Save Changes Button */}
          <div className="col-span-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
