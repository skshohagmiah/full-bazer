"use client";

import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Card } from "@/components/ui/card";
import { Image as ImageType } from "@prisma/client";

const ProductImages = ({ images }: { images: ImageType[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].url);

  return (
    <div className="flex flex-col-reverse md:flex-row items-start gap-2">
      {/* Thumbnail Images */}
      <div className="flex md:flex-col justify-center items-center gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-20 h-20 relative rounded-md overflow-hidden cursor-pointer border hover:border-gray-400 transition-all duration-200" // Add hover effect
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url}
              alt={`Product Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <Card className="w-full max-w-[600px] bg-gray-200 relative rounded-md overflow-hidden aspect-square">
        <Zoom>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt="Product Image"
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </Zoom>
      </Card>
    </div>
  );
};

export default ProductImages;
