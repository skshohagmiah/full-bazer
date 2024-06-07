import React from 'react'
import DashbaordPageWrapper from '@/components/dashboard/others/DashboardPageWrapper'
import DashboardHeading from '@/components/dashboard/others/DashboardHeading'
import ColorForm from '../_components/ColorForm'
import BreadcrumbComponent from '@/components/others/BreadcrumbComponent'
import prisma from '@/lib/db'

const ColorIdPage = async ({searchParams}:{searchParams:{colorId:string}}) => {

    const color = await prisma.color.findFirst({
        where:{
            id:searchParams.colorId
        }
    })

  return (
    <DashbaordPageWrapper>
    <BreadcrumbComponent
      links={[
        { link: "/dashboard", text: "dashboard" },
        { link: "/dashboard/colors", text: "colors" },
      ]}
      pageText="update"
    />
    <DashboardHeading
      title="Update Color"
      subtitie="Update color for the product"
    />
    <ColorForm color={color!}/>
  </DashbaordPageWrapper>
  )
}

export default ColorIdPage