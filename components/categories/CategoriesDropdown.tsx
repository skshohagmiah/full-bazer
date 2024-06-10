
import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import prisma from '@/lib/db'
import Image from 'next/image'

const CategoriesDropdown = async() => {

    const categories = await prisma.category.findMany({});

  return (
    <HoverCard>
            <HoverCardTrigger asChild className="bg-blue-500 dark:bg-slate-700 py-4 px-8">
              <Link
                href="#"
                className="group flex items-center gap-2 text-lg font-medium hover:text-blue-200"
              >
                <Filter className="h-6 w-6 group-hover:text-blue-200" /> Shop By
                Categories
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="grid gap-6 p-4">
                {categories.length === 0 && (
                  <p>No categories found.</p>
                )}
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/shop?category?=${category.name}`}
                    className="flex items-center gap-2 text-sm hover:text-blue-200"
                  >
                    <Image src={category.imageUrl || ''} alt='image' width={30} height={30} className='object-cover rounded-md'/>
                    {category.name}
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

  )
}

export default CategoriesDropdown