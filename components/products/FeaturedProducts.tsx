import MaxWidthWrapper from "../others/MaxWidthWrapper";
import SingleProduct from "./SingleProduct";

const FeaturedProducts = () => {
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
    <section className="py-12 bg-white dark:bg-slate-900">
    <MaxWidthWrapper className="">
      <div className="px-2 lg:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
