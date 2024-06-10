"use server";

import prisma from "@/lib/db";

interface BillboardProps {
  imageUrl: string;
  link: string;
}

export async function createBillboard(data: BillboardProps) {
  try {
    await prisma.billboard.create({
      data,
    });

    return {
      status: 200,
      message: "Billboard created succesfully.",
    };
  } catch (error) {
    console.log("[Billboard creating error]", error);
    return {
      status: 400,
      message: "Something Went Wrong !",
    };
  }
}



export async function updateBillboard(billboardId:string, data: BillboardProps) {
  try {
    await prisma.billboard.update({
      where: {
        id: billboardId,
      },
      data,
    });
    return {
      status: 200,
      message: "Billboard updated succesfully.",
    };
  } catch (error) {
    console.log("[Billboard update error]", error);
    return {
      status: 400,
      message: "Something Went Wrong !",
    };
  }

}


export async function deleteBillboard(id: string) { 
  try {
    await prisma.billboard.delete({ 
      where: { 
        id,
      },
    });
    return {
      status: 200,
      message: "Billboard deleted succesfully.",
    };
  } catch (error) {
    console.log("[Billboard delete error]", error);
    return {
      status: 400,
      message: "Something Went Wrong !",
    };
  }
}