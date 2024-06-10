"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInWithEmail } from "@/actions/auth/authActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSignInModal from "@/hooks/useSignInModal";
import useSignUpModal from "@/hooks/useSignUpModal";

const EmailSignInForm = () => {
  const router = useRouter();
  const {onClose} = useSignInModal()
  const {onOpen} = useSignUpModal()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signInWithEmail(values.email, values.password);
    
    if(res.status === 200){
      toast.success(res.message)  
      onClose()
      router.refresh()
    }else{
      toast.error(res.message)
    }
  }

  return (
    <Form {...form}>
      <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm space-y-2">
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
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm flex items-center justify-between gap-2 flex-wrap w-full">
            <p
             onClick={() => {
              onClose();
              onOpen()
             }}
              className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500"
            >
              Don&apos;t have an account ?
            </p>
            <Link
              href="/forgot-password"
              className="font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500"
            >
              Forgot your password ?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full text-base font-medium"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmailSignInForm;
