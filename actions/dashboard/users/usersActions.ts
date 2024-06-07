"use server";

import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
        where:{id},
    })

    revalidatePath('/dashboard/users')

    return {
        status:200,
        message:'User deleted successfully.'
    }

  } catch (error) {
    console.log("[User delete Error]", error);
    return {
      status: 200,
      message: "Sorry, something went wrong, acton now performed.",
    };
  }
}


export async function changeUserStatus(userId:string, role:Role){
  try {
    await prisma.user.update({
      where:{
        id:userId,
      },
      data:{
        role:role
      }
    })

    return {
      status:200,
      message:'User role changed successfully.'
    }
  } catch (error) {
    console.log("[User role change error]", error);
    return {
      status:400,
      message:'Sorry, user role not change, something went wrong !'
    }
  }
}