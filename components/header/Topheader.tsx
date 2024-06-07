"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import Logo from "../logo/Logo";
import SearchBar from "./SearchBar";
import UserOptions from "./UserOptions";
import { ModeToggle } from "../others/ModeToggle";
import ShoppingCart from "./ShoppingCart";
import { cn } from "@/lib/utils";
import {
  Shirt,
  Baby,
  Tag,
  Home,
  Store,
  Info,
  Phone,
  Filter,
  Search,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";
import MobileSearchBar from "./MobileSearchBar";
import MobileHeader from "./MobileHeader";
import { Button } from "../ui/button";

/**
 * Topheader component
 *
 * This component is the main header of the application. It contains the logo,
 * navigation links, search bar, and user options. It also has a functionality
 * to show a search bar when the search icon is clicked.
 */

const Topheader = () => {
  // State variables to control the visibility of the menu and search bar
  const [showMenu, setShowMenu] = React.useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Get the current pathname
  const pathname = usePathname();

  // Define the navigation links
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

  // Add event listener to scroll event to control the visibility of the menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    /**
     * Render the header component
     */
    <header
      className={cn(
        "sticky top-0 inset-x-0  bg-white dark:bg-slate-950 z-50",
        showMenu && "border-b-2 dark:border-slate-800"
      )}
    >
      <MaxWidthWrapper className="flex  items-center justify-between py-4 h-20 lg:h-24 px-4 lg:px-2">
        <Logo />

        {/* Render the navigation links */}
        {showMenu && !showSearchBar ? (
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "group inline-flex items-center text-base font-medium hover:opacity-50 duration-200",
                    link.isActive && "underline underline-offset-4 "
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="hidden lg:block">
            <SearchBar />
          </div>
        )}

        {/* Render the search bar */}
        {showSearchBar && (
          <div className="absolute inset-0 z-50 bg-white flex items-center justify-center gap-2 w-full h-ful dark:bg-slate-950 lg:hidden px-2">
            <SearchBar />
            <Button size={'icon'} variant={'link'}>
                {" "}
                <X
                  onClick={() => setShowSearchBar(false)}
                  className="whitespace-nowrap w-6 h-6"
                />
              </Button>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          {/* Show the search icon on smaller screens */}
          <Search
            className="block lg:hidden"
            onClick={() => setShowSearchBar(true)}
          />

          {/* Show the search icon and close icon on larger screens */}
          {showMenu && !showSearchBar ? (
            <Search
              className="hidden lg:block"
              onClick={() => setShowSearchBar(true)}
            />
          ) : (
            showSearchBar && (
              <Button size={'icon'} variant={'link'}>
                {" "}
                <X
                  onClick={() => setShowSearchBar(false)}
                  className="whitespace-nowrap w-6 h-6"
                />
              </Button>
            )
          )}

          <div className="hidden lg:block">
            {/* Render the dark mode toggle */}
            <ModeToggle />

            {/* Render the user options */}
            <UserOptions />
          </div>

          {/* Render the shopping cart */}
          <ShoppingCart />

          {/* Render the mobile header */}
          <MobileHeader />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Topheader;