import { Lock, Truck, Headphones, ShoppingBag } from "lucide-react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { Card } from "../ui/card";

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-blue-500" />,
      title: "Secure Payments",
      description:
        "Our platform ensures secure and encrypted transactions for a worry-free shopping experience.",
    },
    {
      icon: <Truck className="h-10 w-10 text-green-500" />,
      title: "Fast Shipping",
      description:
        "Enjoy quick and reliable delivery with our fast shipping options.",
    },
    {
      icon: <Headphones className="h-10 w-10 text-red-500" />,
      title: "24/7 Customer Support",
      description:
        "Our customer support team is available 24/7 to assist you with any queries or issues.",
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-purple-500" />,
      title: "Wide Range of Products",
      description:
        "Discover a vast selection of products across various categories.",
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900">
      <MaxWidthWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 group bg-white dark:bg-gray-800 rounded-lg  hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4 group-hover:animate-bounce">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FeatureHighlights;
