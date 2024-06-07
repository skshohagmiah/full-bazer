"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Minus, Plus, Star } from "lucide-react";
import useShoppingCart from "@/hooks/useShoppingCart";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import ProductIdHeading from "../_components/ProductIdHeading";
import { Badge } from "@/components/ui/badge";
import RecommendedProducts from "../_components/RecommendedProducts";

// Dummy data for the product
const product = {
  id: "1",
  name: "Sample Product",
  description:
    "This is a sample product description. It provides details about the product features, benefits, and usage.",
  price: 4999, // Price in cents
  discountPercentage: 10,
  images: [
    { url: "/elec/apple-watch-9-2.jpg" },
    { url: "/elec/apple-watch-9.jpg" },
  ],
  variants: [
    {
      id: "1",
      color: { id: "1", name: "Red", value: "#FF0000" },
      size: { id: "1", name: "Small", value: "S" },
      quantity: 10,
      price: 4999,
    },
    {
      id: "2",
      color: { id: "2", name: "Blue", value: "#0000FF" },
      size: { id: "2", name: "Medium", value: "M" },
      quantity: 15,
      price: 5999,
    },
  ],
  specifications: [
    { key: "Weight", value: "1.2kg" },
    { key: "Dimensions", value: "10x10x10 cm" },
    { key: "Battery Life", value: "10 hours" },
    { key: "Warranty", value: "2 years" },
  ],
  reviews: [
    { user: "Alice", rating: 4, comment: "Great product!" },
    { user: "Bob", rating: 5, comment: "Exceeded my expectations." },
    { user: "Charlie", rating: 3, comment: "Good, but could be better." },
  ],
};

const SingleProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0].color.id
  );
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size.id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useShoppingCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0].url);

  const filteredVariants = product.variants.filter(
    (variant) => variant.color.id === selectedColor
  );
  const defaultPrice = product.variants.find(
    (v) => v.size?.id === selectedSize && v.color?.id === selectedColor
  )?.price;

  const handleAddToCart = () => {
    const variant = product.variants.find(
      (variant) =>
        variant.color.id === selectedColor && variant.size.id === selectedSize
    );

    if (variant) {
      addItem({ product, quantity, size: variant.size, color: variant.color });
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 text-black dark:text-white">
      <ProductIdHeading />

      <MaxWidthWrapper className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* product images */}
          <div className="flex flex-col-reverse md:flex-row items-start gap-2">
            {/* Thumbnail Images */}
            <div className="flex md:flex-col justify-center items-center gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 relative rounded-md overflow-hidden cursor-pointer border"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Main Image */}
            <Card className="w-full  h-[300px] md:max-w-[600px] md:w-[600px] md:h-[600px] bg-gray-200 relative rounded-md overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className=" flex items-center gap-2">
                <Badge
                  variant="default"
                  className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded"
                >
                  New
                </Badge>
                <p className="text-xs text-gray-500">Brand: Shohag</p>
              </div>
              {/* Product Name */}
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* write a rating div with rating and reviews number */}
              <div className="flex items-center gap-2">
                <p className="text-base font-bold bg-green-500 text-white px-2 rounded-md flex items-center gap-2">
                  4.5{" "}
                  <Star className="text-yellow-500 fill-yellow-400" size={20} />
                </p>
                <p className="text-gray-500">
                  ({product.reviews.length} Reviews)
                </p>
              </div>

              <p className="text-rose-600 px-2 bg-gray-200 dark:bg-gray-600 rounded w-fit ">
                Only 10 left in stock - order soon
              </p>
            </div>

            {/* Price and Discount (If applicable) */}
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                <span className="line-through text-muted-foreground text-sm">
                  {formatCurrency(product.price - 100)}
                </span>{" "}
                {formatCurrency(defaultPrice ? defaultPrice : product.price)}
              </p>
              {product.discountPercentage && (
                <Badge
                  variant="default"
                  className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded"
                >
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>

            <Separator className="my-4" />

            {/* Variant Selection (Color and Size) */}
            <div className="space-y-4">
              {/* Color Select */}
              <div>
                <label className="text-base font-medium">Color</label>
                <div className="flex space-x-2 mt-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color.id}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === variant.color.id
                          ? "border-blue-600"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: variant.color.value }}
                      onClick={() => setSelectedColor(variant.color.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div>
                <label className="text-base font-medium">Size</label>
                <div className="flex space-x-2 mt-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.size.id}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        selectedSize === variant.size.id
                          ? "border-blue-600"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedSize(variant.size.id)}
                    >
                      {variant.size.value}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity Input */}
              <div>
                <label className="text-base font-medium">Quantity</label>
                <div className="flex items-center gap-2 mt-2">
                  <Button className="" variant={"outline"}>
                    <Minus />
                  </Button>
                  <Button className="" variant={"outline"}>
                    {quantity}
                  </Button>
                  <Button className="" variant={"outline"}>
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Add to Cart and Additional Buttons */}
            <div className="flex space-x-4 mt-4">
              <Button
                className="bg-blue-600 text-white text-lg hover:bg-blue-500 w-full"
                onClick={handleAddToCart}
                size={"lg"}
              >
                Add to Cart
              </Button>
              <Button
                variant={"outline"}
                size={"lg"}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full text-xl"
              >
                Buy Now
              </Button>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold">Product highlights</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {product.specifications.map((speci) => (
                  <li key={speci.key}>{speci.value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-8 mx-auto w-full flex items-center justify-center">
          <Tabs defaultValue="description" className="w-full text-center">
            <TabsList className="flex items-center justify-center gap-4 py-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <strong>{spec.key}:</strong> {spec.value}
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
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ">
                      - {review.user}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthWrapper>
      <Separator />
      <RecommendedProducts />
    </section>
  );
};

export default SingleProductPage;
