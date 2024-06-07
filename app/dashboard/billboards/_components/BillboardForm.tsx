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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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


const billboardFormSchema = z.object({
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  link: z.string().url().optional(),
  linkType: z.enum(["PRODUCT", "CATEGORY", "URL"]).optional(),
  buttonLabel: z.string().min(3, { message: "Button text is required" }),
});

export default function BillboardForm({billboard}:{billboard:Billboard}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof billboardFormSchema>>({
    resolver: zodResolver(billboardFormSchema),
    // @ts-ignore
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
      startDate: undefined,
      endDate: undefined,
      link: "",
      linkType: "URL",
      buttonLabel: "",
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
        {/* Label (Text Input) */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label/Title</FormLabel>
              <FormControl>
                <Input placeholder="Billboard Label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date (Calendar Input) */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block mb-2">
                Start Date (Optional)
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date (Calendar Input) */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block mb-2">End Date (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link Type (Select Dropdown) */}
        <FormField
          control={form.control}
          name="linkType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Type (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Link Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PRODUCT">Product</SelectItem>
                  <SelectItem value="CATEGORY">Category</SelectItem>
                  <SelectItem value="URL">External URL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link (Input Field) */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    form.getValues("linkType") === "URL"
                      ? "https://example.com"
                      : "Product or Category ID"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link (Input Field) */}
        <FormField
          control={form.control}
          name="buttonLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button label / text</FormLabel>
              <FormControl>
                <Input placeholder="Summer Sale Offer" {...field} />
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
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    onClientUploadComplete={(res) => field.onChange(res[0].url)}
                    className="w-full dark:border-gray-500"
                    endpoint="billboardImage"
                  />
                </FormControl>
                {field.value && (
                  <div className="relative aspect-video mt-2 h-48 w-48">
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
