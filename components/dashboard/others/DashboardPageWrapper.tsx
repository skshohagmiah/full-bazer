import { cn } from '@/lib/utils'
import React from 'react'

const DashboardPageWrapper = ({children,className}:{children:React.ReactNode, className?:string}) => {
  return (
    <section className={cn('py-4 md:py-6 px-4 md:px-8 space-y-6', className)}>
     {children}
    </section>
  )
}

export default DashboardPageWrapper