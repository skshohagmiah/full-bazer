"use client";
import { cn } from "@/lib/utils";
import { Contact, Home, Phone, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBlog } from "react-icons/fa";

const Navlinks = () => {
  const pathname = usePathname();

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
      isActive: pathname === "/blogs",
    },
    {
      name: "Contact",
      icon: <Contact />,
      href: "/contact",
      isActive: pathname === "/contact",
    },
  ];

  return (
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
  );
};

export default Navlinks;
