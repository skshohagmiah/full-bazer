"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

/**
 * Sign in with email.
 * 
 * @param email The email of the user.
 * @param password The password of the user.
 * @returns An object with the status and message.
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    // Sign in with credentials.
    await signIn("credentials", { email, password, redirect: false });

    // Return success message.
    return {
      status: 200,
      message: "Sign In Successfull",
    };
  } catch (error) {
    // Log the error.
    console.log("[email sign in error]", error);

    // Return error message.
    return {
      status: 400,
      message: "Sign in failed, something went wrong !",
    };
  }
}

/**
 * Sign up a user with email.
 * 
 * @param email The email of the user.
 * @param name The name of the user.
 * @param password The password of the user.
 * @returns An object with the status and message.
 */
export async function signUpWithEmail(
  email: string,
  name: string,
  password: string
) {
  try {
    // Check if user already exists.
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // Return error if user already exists.
      return {
        status: 400,
        message: "User already exists with this email.",
      };
    } else {
      // Hash the password.
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user.
      if (email === "skshohag22637@gmail.com") {
        await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: "SUPER_ADMIN",
          },
        });
      } else {
        await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
      }

      // Sign in with credentials.
      await signIn("credentials", { email, password, redirect: false });

      // Return success message.
      return {
        status: 200,
        message: "User registered successfully.",
      };
    }
  } catch (error) {
    // Log the error.
    console.log(error)

    // Return error message.
    return {
      status: 400,
      message: "Sign up failed, something went wrong !.",
    };
  }
}
