import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/sendEmail";
import React from "react";
import { v4 as uuidV4 } from "uuid";
import PasswordResetBtn from "./PasswordResetBtn";

const ForgotPasswordPage = async () => {
  const session = await auth();

  const sendResetLink = async () => {
    'use server';
    const token = await prisma.resetToken.create({
      data: {
        token: uuidV4(),
        expires: Date.now() + 10000 * 60,
      },
    });

    const resetlink = `${process.env.BASE_URL}/reset-password?token=${token.token}`;
    await sendPasswordResetEmail(resetlink, session?.user?.name as string, 'shohagmiah2100@gmail.com');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <form
        action={sendResetLink}
        className="p-8 rounded-md shadow-md text-center space-y-4 bg-white dark:bg-gray-800"
      >
        <h2 className="text-2xl font-semibold">Reset your password</h2>
        <p className="text-muted-">
          We will send you a link in your email, follow that link and reset your
          passsword.{" "}
        </p>
        <PasswordResetBtn />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
