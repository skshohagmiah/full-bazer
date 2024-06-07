import Link from 'next/link'
import React from 'react'

const BlogsHeading = () => {
  return (
    <div className='py-12 bg-slate-200 dark:bg-slate-800 flex items-center justify-center'>
        <div className='flex items-center justify-center gap-2 text-3xl font-semibold'>
            <Link href={'/'}>Home</Link>
            <p className='mx-2'>/</p>
            <p>Blogs</p>
        </div>
    </div>
  )
}

export default BlogsHeading