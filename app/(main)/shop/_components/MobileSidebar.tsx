import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from './ShopSidebar';

const MobileSidebar = () => {
  return (
    <div className='md:hidden'>
         <Sheet>
        {/* Menu toggle button */}
        <SheetTrigger asChild>
          <Button className='className="flex items-center justify-center gap-2'>
          <Filter /> Filter
          </Button>
        </SheetTrigger>
        {/* Menu content */}
        <SheetContent  side={'left'}>
          <SheetHeader >
            <SheetDescription className='text-start'>
                <Sidebar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar