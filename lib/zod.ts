import { z } from "zod"
 
export const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })

  export const signUpSchema = z.object({
    name: z.string().min(3,'Name is required'),
    email: z.string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })


  // Zod schema for form validation
export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().optional(),
  itemDetails: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  brandName: z.string().optional(),
  images: z.array(z.string()).optional(),
  price: z.string().min(0.01, { message: "Price must be at least 0.01" }),
  discount: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  stock: z.string().min(0, { message: "Stock must be a positive number" }),
  variants: z
    .array(
      z.object({
        sizeId: z.string().optional(),
        colorId: z.string().optional(),
        price: z.string().min(0, "Price must be a positive number"),
        stock: z.string().min(0, "Stock must be a positive number"),
      })
    )
    .optional(),
});