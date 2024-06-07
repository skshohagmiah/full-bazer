import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import prisma from "@/lib/db";
import Image from "next/image";
import ProductActions from "../_components/ProductActions";

// Fetch product details from the database
export default async function ProductDetailsPage({ searchParams }: { searchParams: { productId: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: searchParams.productId,
    },
    include: {
      category: true,
      images: true,
      reviews: true,
      variants: {
        include: {
          size: true,
          color: true,
        },
      },
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="py-4 md:py-6 px-4 md:px-8 space-y-8">
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "Dashboard" },
          { link: "/dashboard/products", text: "Products" },
        ]}
        pageText={product.name}
      />

      <DashboardHeading
        title="Product Details"
        subtitie="Manage product details here"
      />

      <Card>
        <CardHeader className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription>Product ID: {product.id}</CardDescription>
          </div>
          <ProductActions productId={product.id}/>
        </CardHeader>
        <CardContent>
          {/* Product Images */}
          <div className="mb-8 md:p-4">
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <div key={index} className="relative h-64 w-full rounded-md overflow-hidden shadow-lg">
                    <Image
                      src={image.url}
                      alt={product.name}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-64 w-full bg-gray-200">
                  No Image Available
                </div>
              )}
            </div>
          </div>
          <Separator />

          {/* General Information */}
          <div className="mb-8 p-2 md:p-4">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Category:</p>
                <p>{product.category.name}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Price:</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Stock available:</p>
                <p>{product.stock} items</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Total sales:</p>
                <p>{product.totalSales} items</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Discount:</p>
                <p>{product.discount}%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Brand name:</p>
                <p>{product.brandName}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Featured:</p>
                <Badge variant={product.isFeatured ? "default" : "outline"}>
                  {product.isFeatured ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-2">Archived:</p>
                <Badge variant={product.isArchived ? "destructive" : "outline"}>
                  {product.isArchived ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Description:</p>
              <p>{product.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Item Details:</p>
              <ul className="list-disc pl-5">
                {product.itemDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <Separator />

          {/* Variants */}
          <div className="mb-8 p-2 md:p-4">
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            {product.variants.length > 0 ? (
              <div className="grid gap-4">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="border p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Size: {variant.size?.name || "N/A"}</p>
                        <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">Color: {variant.color?.name || "N/A"}</p>
                        <p
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: variant.color?.value || "transparent" }}
                        ></p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Price: ${variant.price.toFixed(2)}</p>
                        <p className="text-sm font-medium">Stock: {variant.stock}</p>
                        <p className="text-xs text-gray-500">SKU: {variant.sku || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No variants available</p>
            )}
          </div>
          <Separator />

          {/* Reviews */}
          <div className="mb-8 p-2 md:p-4">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {product.reviews.length > 0 ? (
              <div className="grid gap-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border p-4 rounded-md">
                    <p className="font-medium">{review.comment}</p>
                    <p>{review.comment}</p>
                    <p className="text-xs text-gray-500">Rating: {review.rating}/5</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
