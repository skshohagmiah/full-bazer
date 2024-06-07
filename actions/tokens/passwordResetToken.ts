"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import bcrypt from "bcryptjs";

export async function passwordResetToken(token: string) {
  try {
    const dbtoken = await prisma.resetToken.findFirst({
      where: {
        token: token,
      },
    });

    const isvalidToken = dbtoken?.expires! >= Date.now();

    if (isvalidToken) {
      return {
        status: 200,
        message: "You can reset password",
      };
    } else {
      return {
        status: 400,
        message: "Token Is Invalid, you cannot reset password !",
      };
    }
  } catch (error) {
    console.log("[Password reset error]", error);
    return {
      status: 400,
      message: "Cannot reset password, something went wrong !",
    };
  }
}

export async function resetPassword(newPassword: string) {
  try {
    const user = await getCurrentUser();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      status: 200,
      message: "Password has been changed succesfully.",
    };
  } catch (error) {
    console.log("Password reset error.");
    return {
      status: 400,
      message: "Password not been reset, something went wrong !",
    };
  }
}
