import { Button } from "@/components/ui/button";
import { Heart, RefreshCcw } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const ShareProduct = ({ productName }: { productName: string }) => {
  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this product: ${productName}`;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center space-x-2 mt-4">
      <div className="flex items-center gap-2">
        <Button className="" variant={"outline"} size={"icon"}>
          <Heart />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <RefreshCcw />
        </Button>
      </div>
      <span className="h-[3rem] w-[2px] bg-gray-400 md:mx-6 block" />
      <div className="flex items-center gap-2">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-500"
          onClick={() => shareOnSocialMedia("facebook")}
          size={"icon"}
        >
          <FaFacebook size={25} />
        </Button>
        <Button
          className="bg-sky-400 text-white hover:bg-sky-300"
          onClick={() => shareOnSocialMedia("twitter")}
          size={"icon"}
        >
          <FaTwitter size={25} />
        </Button>
        <Button
          className="bg-red-600 text-white hover:bg-red-500"
          onClick={() => shareOnSocialMedia("pinterest")}
          size={"icon"}
        >
          <FaPinterest size={25} />
        </Button>
        <Button
          className="bg-blue-700 text-white hover:bg-blue-600"
          onClick={() => shareOnSocialMedia("linkedin")}
          size={"icon"}
        >
          <FaLinkedin size={25} />
        </Button>
        <Button
          className="bg-green-500 text-white hover:bg-green-400"
          onClick={() => shareOnSocialMedia("whatsapp")}
          size={"icon"}
        >
          <FaWhatsapp size={25} />
        </Button>
      </div>
    </div>
  );
};

export default ShareProduct;
