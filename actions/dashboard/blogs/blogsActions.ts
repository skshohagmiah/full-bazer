"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface BlogProps {
  title: string;
  content: string;
  thumbnailImage: string;
  tags: string;
  categoryId: string;
  excerpt: string;
}
export async function createBlog(data: BlogProps) {
  try {
    const author = await getCurrentUser();

    await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        thumbnailImage: data.thumbnailImage,
        tags: data.tags.split(','),
        categoryId: data.categoryId,
        excerpt: data.excerpt,
        authorId: author?.id!,
      },
    });

    return {
      status: 200,
      message: "Blog post created succesfully.",
    };
  } catch (error) {
    console.log("[Blog creation error]", error);
    return {
      status: 400,
      message: "Blog not created,something went wrong !",
    };
  }
}



export async function updateBlog(blogId:string,data:BlogProps){
  try {
    await prisma.blogPost.update({
      where:{
        id:blogId
      },
      data:{
        title: data.title,
        content: data.content,
        thumbnailImage: data.thumbnailImage,
        tags: data.tags.split(','),
        categoryId: data.categoryId,
        excerpt: data.excerpt
      }
    })
    return {
      status: 200,
      message: "Blog updated succesfully.",   
    }
  } catch (error) {
    console.log("[Blog update error]", error);
    return {
      status: 400,  
      message: "Blog not updated, something went wrong !",
    }
  } 
}


export async function deleteBlog(blogId:string){

  const currentUser = await getCurrentUser();

  if(currentUser?.role !== "SUPER_ADMIN"){
    return {
      status: 400,
      message: "You don't have permission to delete this blog.",  
    }
  }

  try {
    await prisma.blogPost.delete({
      where:{
        id:blogId
      }
    })

    return {
      status: 200,
      message: "Blog deleted succesfully.", 
    }
  } catch (error) {
    console.log("[Blog delete error]", error);
    return {
      status: 400,
      message: "Blog not deleted, something went wrong !",
    }
  }
}