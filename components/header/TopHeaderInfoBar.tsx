'use client';

import React from "react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const TopHeaderInfoBar = () => {

  const pathName = usePathname();

  if(pathName !== '/') return null

  return (
    <div className="bg-green-500 py-1">
      <MaxWidthWrapper>
        <div className="flex flex-wrap items-center justify-between text-sm md:gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm md:text-lg font-medium text-white whitespace-nowrap">
              Free shipping on orders over $50
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-6 text-sm md:text-base">
            <p className="flex items-center gap-2 text-white hover:text-gray-200 transition">
              <Mail className="w-6 h-6 md:w-8 md:h-8 p-1 rounded-full" />
              shohagmia2100@gmail.com
            </p>
            <p className="flex items-center gap-2 text-white hover:text-gray-200 transition">
              <Phone className="w-6 h-6 md:w-8 md:h-8 p-1 rounded-full" />
              +0239340382
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TopHeaderInfoBar;
