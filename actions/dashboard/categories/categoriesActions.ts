"use server";

import prisma from "@/lib/db";

interface CategoryProps{
        name: string;
        slug:string;
        imageUrl: string;
}

export async function createCategory({imageUrl,name,slug}:CategoryProps) {
  try {
    await prisma.category.create({
      data: {
        name:name,
        imageUrl:imageUrl as string,
        slug:slug
      },
    });

    return {
      status: 200,
      message: "Category created succesfully.",
    };
  } catch (error) {
    console.log("[Error creating category]", error);
    return {
      status: 400,
      message: "Something went wrong !",
    };
  }
}


export async function updateCategory(categoryId:string, data: CategoryProps) {
  try {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
    return {
      status: 200,
      message: "Category updated succesfully.",
    };
  } catch (error) {
    console.log("[Error updating category]", error);  
    return {
      status: 400,
      message: "Something went wrong !",  
    };
  }
}



export async function deleteCategory(categoryId:string) {
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return {
      status: 200,
      message: "Category deleted succesfully.",
    };
  } catch (error) {
    console.log("[Error deleting category]", error);
    return {
      status: 400,
      message: "Something went wrong !",
    };
  }
}


export async function getCategories() {
    return await prisma.category.findMany()
}