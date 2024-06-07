
import HeroSection from "@/components/hero/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import FeatureHighlights from "@/components/testinomials/FeatureHighlights";
import Testimonials from "@/components/testinomials/Testinomials";
import BillboardTwo from "@/components/hero/BillboardTwo";
import ProductCollectionOne from "@/components/products/ProductCollectionOne";

export default  function Home() {

  return (
    <main className="space-y-4">
      <HeroSection />
      <ProductCollectionOne />
      <FeatureHighlights />
      <FeaturedProducts />
      <BillboardTwo />
      <Testimonials />
  
    </main>
  );
}
