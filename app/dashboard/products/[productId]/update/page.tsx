import React from "react";
import prisma from "@/lib/db";
import ProductForm from "../../_components/ProductForm";

const UpdateProductPage = async ({
  searchParams,
}: {
  searchParams: { productId: string };
}) => {
  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});
  const categories = await prisma.category.findMany({});
  const productData = await prisma.product.findFirst({
    where: {
      id: searchParams.productId,
    },
    include: {
      images: true,
      variants: {
        include: { color: true, size: true },
      },
    },
  });

  const transformedProduct = {
    ...productData,
    price: productData?.price?.toString(),
    stock: productData?.stock?.toString(),
    discount: productData?.discount?.toString(),
    itemDetails: productData?.itemDetails?.toString(),
    images: productData?.images.map((image) => image.url),
    variants: productData?.variants.map((variant) => ({
      ...variant,
      price: variant.price.toString(),
      stock: variant.stock.toString(),
    })),
  };

  console.log(productData);

  return (
    <ProductForm
      categories={categories}
      sizes={sizes}
      colors={colors}
      initialData={transformedProduct!}
    />
  );
};

export default UpdateProductPage;
