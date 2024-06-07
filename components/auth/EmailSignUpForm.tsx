"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpWithEmail } from "@/actions/auth/authActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const EmailSignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await signUpWithEmail(
      values.email,
      values.name,
      values.password
    );
    if (res?.message && res.status !== 200) {
      toast(res.message);
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name :</FormLabel>
                <FormControl>
                  <Input placeholder="shohag" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm flex items-center justify-between gap-2 flex-wrap w-full">
            <Link
              href="/sign-in"
              className="font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500"
            >
              Already have an account ?
            </Link>
          </div>
        </div>

        <div>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full text-base font-medium"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmailSignUpForm;
