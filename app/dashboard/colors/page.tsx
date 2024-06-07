import DashbaordPageWrapper from '@/components/dashboard/others/DashboardPageWrapper'
import DashboardHeading from '@/components/dashboard/others/DashboardHeading'
import React from 'react'
import ColorsTable from './_components/ColorsTable'
import CreateButton from '@/components/dashboard/others/CreateButton'

const ColorsPage = () => {
  return (
    <DashbaordPageWrapper>
       <div className='flex items-center justify-between gap-2'>
       <DashboardHeading title='Colors' subtitie='Manage product colors here'/>
       <CreateButton link='/dashboard/colors/new' label='New Color'/>
       </div>
       <ColorsTable />
    </DashbaordPageWrapper>
  )
}

export default ColorsPage