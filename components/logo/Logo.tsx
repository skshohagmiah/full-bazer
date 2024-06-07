import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-1 whitespace-nowrap'>
        <Image src={'/logo.svg'} alt='brand' width={25} height={25}/>
        <h2 className=' text-2xl md:text-3xl font-bold text-blue-500'><span className='text-rose-500'>Full</span> Bazer</h2>
    </div>
  )
}

export default Logo