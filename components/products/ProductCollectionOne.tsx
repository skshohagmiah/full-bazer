import React from 'react'
import MaxWidthWrapper from '../others/MaxWidthWrapper'
import BestSellingProducts from './BestSellingProducts'
import NewProducts from './NewProducts'

const ProductCollectionOne = () => {
  return (
    <MaxWidthWrapper className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-4'>
      <BestSellingProducts />
      <NewProducts />
    </MaxWidthWrapper>
  )
}

export default ProductCollectionOne