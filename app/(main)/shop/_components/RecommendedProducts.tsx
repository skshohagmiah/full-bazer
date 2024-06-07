import MaxWidthWrapper from '@/components/others/MaxWidthWrapper'
import SingleProduct from '@/components/products/SingleProduct';
import React from 'react'

const RecommendedProducts = () => {

    const featuredProducts = [
        {
          id: 1,
          image: "/elec/prothonics.jpg",
          title: "Wireless Headphones",
          description:'this is a 3.5 mm bluetooth speaker',
          originalPrice: "$99.99",
          discountedPrice: "$79.99",
          rating: 4.5,
          reviews: 120,
        },
        {
          id: 2,
          image: "/elec/apple-watch-9-2.jpg",
          title: "Smart Watch",
          description:'this is a 3.5 mm bluetooth speaker',
          originalPrice: "$199.99",
          discountedPrice: "$149.99",
          rating: 4.5,
          reviews: 120,
        },
        {
          id: 3,
          image: "/elec/song-wh.jpg",
          title: "Bluetooth Speaker",
          description:'this is a 3.5 mm bluetooth speaker',
          originalPrice: "$49.99",
          discountedPrice: "$39.99",
          rating: 4.5,
          reviews: 120,
        },
        {
            id: 4,
            image: "/elec/song-wh.jpg",
            title: "Bluetooth Speaker",
            description:'this is a 3.5 mm bluetooth speaker',
            originalPrice: "$49.99",
            discountedPrice: "$39.99",
            rating: 4.5,
            reviews: 120,
          },
        // Add more products as needed
      ];

  return (
    <MaxWidthWrapper className='py-4'>
        <h2 className='text-3xl font-semibold my-6'>Recommended products for you</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {featuredProducts.map(product => (
                <SingleProduct key={product.id} product={product}/>
            ))}
        </div>
    </MaxWidthWrapper>
  )
}

export default RecommendedProducts