import React from 'react'
import ProductForm from '../_components/ProductForm'
import prisma from '@/lib/db'

const AddProductPage = async () => {

  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});
  const categories = await prisma.category.findMany({});


  return (
      <ProductForm categories={categories} sizes={sizes} colors={colors} initialData={null}/>
  )
}

export default AddProductPage