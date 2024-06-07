"use client";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Shirt, Baby, Tag, Home, Store, Info, Phone, Filter } from "lucide-react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import { usePathname } from "next/navigation";
import { FaBlog } from "react-icons/fa";
import { cn } from "@/lib/utils";

const NavigationHeader = () => {
  const pathname = usePathname();

  const categories = [
    { name: "Men", icon: <Shirt />, href: "/category/men" },
    { name: "Women", icon: <Shirt />, href: "/category/women" },
    { name: "Kids", icon: <Baby />, href: "/category/kids" },
  ];

  const navLinks = [
    { name: "Home", icon: <Home />, href: "/", isActive: pathname === "/" },
    {
      name: "Shop",
      icon: <Store />,
      href: "/shop",
      isActive: pathname === "/shop",
    },
    {
      name: "Blogs",
      icon: <FaBlog />,
      href: "/blogs",
      isActive: pathname === "/blog",
    },
    {
      name: "About",
      icon: <Info />,
      href: "/about",
      isActive: pathname === "/about",
    },
    {
      name: "Contact",
      icon: <Phone />,
      href: "/contact",
      isActive: pathname === "/contact",
    },
  ];

  return (
    <header className="bg-blue-500 dark:bg-slate-600 text-white shadow-md hidden lg:block">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center">
          {/* Category Hover */}
          <HoverCard>
            <HoverCardTrigger asChild className="bg-green-400 dark:bg-slate-700 py-4 px-8">
              <Link
                href="#"
                className="group flex items-center gap-2 text-lg font-medium hover:text-blue-200"
              >
                <Filter className="h-6 w-6 group-hover:text-blue-200" /> Shop By
                Categories
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="grid gap-4 p-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center gap-2 text-sm hover:text-blue-200"
                  >
                    {category.icon}
                    {category.name}
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Navigation Links */}
          <nav className="flex space-x-8 text-base">
            <ul className="flex items-center gap-6 px-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex items-center text-gray-100 gap-2 font-medium hover:text-blue-200",
                      link.isActive && "underline underline-offset-4 text-white"
                    )}
                  >
                    {/* {link.icon} */}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default NavigationHeader;
