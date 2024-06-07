"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

import { Separator } from "../ui/separator";
import { Category, GeneralSettings } from "@prisma/client";

// interface FooterProps {
//   categories: Category[];
//   settings: GeneralSettings;
// }

const Footer = () => {

  return (
    <footer className="bg-background mt-4  py-12 sm:py-16 dark:bg-slate-800 bg-white">
      <MaxWidthWrapper className="px-4 lg:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-8">
          {/* About Us */}
          <div className="space-y-4 ">
            <h4 className="text-lg font-bold">About Us</h4>
            <p className="text-sm text-muted-foreground">
              {/* {settings.generalSettings.description} */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolores molestiae perspiciatis expedita sunt at reiciendis magnam labore explicabo quos ipsum amet rerum asperiores quae, officia ad mollitia, numquam commodi?
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p className="flex items-center text-sm text-muted-foreground gap-2">
              <Mail className="h-4 w-4" />
               {/* {settings.emailSettings.senderEmail} */}
               shohagmiah2100@gmail.com
            </p>
            <p className="flex items-center text-sm text-muted-foreground gap-2">
              <Phone className="h-4 w-4" /> 1-800-555-1212
            </p>
            <p className="flex items-center text-sm text-muted-foreground gap-2">
              <MapPin className="h-4 w-4" /> 123 Main Street, Anytown, CA 12345
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold">Quick Links</h4>
           <div className="flex flex-col gap-2">
           <Link
              href="/shop"
              className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/orders"
              className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
            >
              Order History
            </Link>
            <Link
              href="/cart"
              className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
            >
              Cart
            </Link>
           </div>
            {/* Add more quick links as needed */}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold">Categories</h4>
            {['Men', 'Women', 'Kids'].map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8 dark:bg-gray-500" />

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          {/* Add your social media links here */}
          <Link href="#">
            <Facebook className="h-6 w-6 text-muted-foreground hover:text-gray-900 dark:hover:text-white" />
          </Link>
          <Link href="#">
            <Twitter className="h-6 w-6 text-muted-foreground hover:text-gray-900 dark:hover:text-white" />
          </Link>
          <Link href="#">
            <Instagram className="h-6 w-6 text-muted-foreground hover:text-gray-900 dark:hover:text-white" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} 
          {/* {settings?.generalSettings?.name}. */}
          Full Bazer
          All rights reserved.
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
