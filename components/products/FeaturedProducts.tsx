import prisma from "@/lib/db";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import SingleProduct from "./SingleProduct";

const FeaturedProducts = async() => {

  const featuredProducts = await prisma.product.findMany({
    take:8,
    where:{
      isFeatured:true,   
    }
  })


  return (
    <section className="py-12 bg-white dark:bg-slate-900">
    <MaxWidthWrapper className="">
      <div className="px-2 lg:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
    </section>
  );
};

export default FeaturedProducts;
