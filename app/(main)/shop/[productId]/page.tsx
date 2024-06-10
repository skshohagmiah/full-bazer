import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import ProductIdHeading from "../_components/ProductIdHeading";
import RecommendedProducts from "../_components/RecommendedProducts";
import ProductImages from "./_components/ProductImages";
import ProductTab from "./_components/ProductTab";
import ProductDescription from "./_components/ProductDescription";
import prisma from "@/lib/db";
import EmptyState from "@/components/others/EmptyState";
import {Product} from '@prisma/client'

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {


  if(params.productId.length <= 12) {
    return <EmptyState label="Product not found" />
  }

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      variants: {
        include: {
          color: true,
          size: true,
        },
      },
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <section className="bg-white dark:bg-slate-900">
      <ProductIdHeading />

      <MaxWidthWrapper className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImages images={product?.images!} />

          <ProductDescription product={product!} />
        </div>

        <ProductTab product={product!} />
      </MaxWidthWrapper>
      <Separator />
      <RecommendedProducts />
    </section>
  );
};

export default SingleProductPage;
