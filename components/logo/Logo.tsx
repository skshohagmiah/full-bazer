import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center gap-1 whitespace-nowrap relative w-[150px] md:w-[200px] h-[100px]'>
        <Image src={'/logo.svg'} alt='brand' fill/>
    </Link>
  )
}

export default Logo