import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Color, Image, Product, ProductVariant, Review, Size, User } from '@prisma/client'
import { Star } from 'lucide-react'
import React from 'react'


interface ProductTabProps {
  product: (Product & {
    variants: (ProductVariant & { color: Color | null; size: Size | null })[];
    images: Image[];
    reviews: (Review & { user: { name: string } })[];
  });
}

const ProductTab = ({product}:ProductTabProps) => {
  return (
    <div className="mt-8 mx-auto w-full flex items-center justify-center">
          <Tabs defaultValue="description" className="w-full text-center">
            <TabsList className="flex items-center justify-center gap-4 py-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    {spec}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {product.reviews.map((review, index) => (
                <Card key={index} className="mb-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center space-x-2">
                      <Star className="text-yellow-500" /> {review.rating}/5
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center gap-2">
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">- {review.user.name}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
  )
}

export default ProductTab