import React from 'react'
import BlogForm from '../_components/BlogForm'
import prisma from '@/lib/db'

const NewBlogPage = async() => {

  const categories = await prisma.category.findMany({});

  return (
    <div>
        <BlogForm initialData={null} categories={categories}/>
    </div>
  )
}

export default NewBlogPage