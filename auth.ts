//@ts-nocheck
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export const { signIn, signOut, auth, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Email or Password is invalid");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Email or Password is invalid");
        }

        return user;
      },
    }),
  ],
});
