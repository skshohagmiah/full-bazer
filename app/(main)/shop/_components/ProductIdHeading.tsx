import Link from 'next/link'
import React from 'react'

const ProductIdHeading = () => {
  return (
    <div className='flex items-center justify-center py-12 bg-slate-100 dark:bg-slate-800 w-full '>
      <div className='flex items-center justify-center gap-2'>
        <Link className='text-slate-700 dark:text-slate-300 text-2xl font-semibold' href="/shop">Shop</Link>
        <span  className="mx-2 text-slate-700 dark:text-slate-300 text-2xl font-semibold">/</span>
        <span className='text-slate-700 dark:text-slate-300 text-2xl font-semibold'>Product</span>
      </div>
    </div>
  )
}

export default ProductIdHeading