import React from "react";
import BlogForm from "../_components/BlogForm";
import prisma from "@/lib/db";

const BlogUpdatePage = async ({
  searchParams,
}: {
  searchParams: { blogId: string };
}) => {

  const blog = await prisma.blogPost.findFirst({
    where: {
      id: searchParams.blogId,
    },
  });

  const categories = await prisma.category.findMany({});

  
  return (
    <div>
      <BlogForm initialData={blog} categories={categories} />
    </div>
  );
};

export default BlogUpdatePage;
