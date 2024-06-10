
import HeroSection from "@/components/hero/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import FeatureHighlights from "@/components/testinomials/FeatureHighlights";
import Testimonials from "@/components/testinomials/Testinomials";
import BillboardTwo from "@/components/hero/BillboardTwo";
import ProductCollectionOne from "@/components/products/ProductCollectionOne";
import prisma from "@/lib/db";

export default async  function Home() {

  const billboards = await prisma.billboard.findMany({
    take:3,
    orderBy:{
      createdAt:'desc'
    }
  })


  const testinomials = await prisma.testimonial.findMany({})

  return (
    <main className="space-y-4">
      <HeroSection billboards={billboards} />
      <ProductCollectionOne />
      <FeatureHighlights />
      <FeaturedProducts />
      <BillboardTwo />
      <Testimonials testimonials={testinomials} />
    </main>
  );
}
