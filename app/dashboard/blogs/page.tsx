import DashboardHeading from '@/components/dashboard/others/DashboardHeading'
import React from 'react'
import BlogPosts from './_components/BlogPosts'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import BlogSearch from './_components/BlogSearch'
import Pagination from '@/components/others/Pagination'
import DashboardPageWrapper from '@/components/dashboard/others/DashboardPageWrapper'
import CreateButton from '@/components/dashboard/others/CreateButton'
import prisma from '@/lib/db'

const BlogsPage = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let blogs;
  let totalItems;

  const searchFilter = query
    ? {
        OR: [
          { title: { contains: query } },
        ],
      }
    : {};


  const whereClause = {
    ...searchFilter,
  };

  blogs = await prisma.blogPost.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
  });

  totalItems = await prisma.blogPost.count({
    where: whereClause,
  });

  return (
    <DashboardPageWrapper>
      <div className='flex items-center justify-between gap-2'>
      <DashboardHeading title='Blogs' subtitie='Manage your blogs posts here'/>
      <CreateButton link='/dashboard/blogs/new' label='New Blog' />
      </div>
      <BlogSearch />
      <BlogPosts blogs={blogs} />

      <Pagination itemsPerPage={pageSize} totalItems={totalItems}/>
    </DashboardPageWrapper>
  )
}

export default BlogsPage