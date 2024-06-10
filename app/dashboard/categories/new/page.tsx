import React from 'react'
import CategoryForm from '../_components/CategoryForm'
import DashboardHeading from '@/components/dashboard/others/DashboardHeading'
import DashboardPageWrapper from '@/components/dashboard/others/DashboardPageWrapper'
import BreadcrumbComponent from '@/components/others/BreadcrumbComponent'
import prisma from '@/lib/db'

const NewCategoryPage = async() => {


  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent links={[{link:'/dashboard',text:'dashboard'},{link:'/dashboard/categories', text:'categories'}]} pageText='new' />
        <DashboardHeading title=' New Category' subtitie='Fillout the form properly'/>
        <CategoryForm initialData={null} />
    </DashboardPageWrapper>
  )
}

export default NewCategoryPage