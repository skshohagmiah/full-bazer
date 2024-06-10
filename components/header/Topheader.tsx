"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../others/MaxWidthWrapper";
import Logo from "../logo/Logo";
import SearchBar from "./SearchBar";
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
import MobileHeader from "./MobileHeader";
import { Button } from "../ui/button";
import UserAccount from "./UserAccount";
import { CurrentUser } from "@/lib/getCurrentUser";

/**
 * Topheader component
 *
 * This component is the main header of the application. It contains the logo,
 * navigation links, search bar, and user options. It also has a functionality
 * to show a search bar when the search icon is clicked.
 */

const Topheader = ({ currentUser }: { currentUser: CurrentUser}) => {
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
    <header
      className={cn(
        "sticky top-0 inset-x-0  bg-white dark:bg-slate-950 z-50",
        showMenu && "border-b-2 dark:border-slate-800"
      )}
    >
      <MaxWidthWrapper className="flex  items-center justify-between py-4 h-16 lg:h-24 px-4 lg:px-2">
        <div className="flex items-center gap-2">
          {/* Render the mobile header */}
          <MobileHeader />
          <Logo />
        </div>

        {/* Render the navigation links */}
        {showMenu && !showSearchBar ? (
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "group inline-flex items-center text-lg font-medium text-gray-600 dark:text-gray-200 hover:opacity-50 duration-200",
                    link.isActive && "underline underline-offset-4 text-black dark:text-white"
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
            <Button size={"icon"} variant={"link"}>
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
            <Button className="hidden lg:flex rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white items-center justify-center" size={'icon'} variant={'link'}>
              <Search           
              onClick={() => setShowSearchBar(true)}
            />
            </Button>
          ) : (
            showSearchBar && (
              <Button size={"icon"} variant={"link"}  className="hidden lg:flex rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-black dark:text-white items-center justify-center">
                {" "}
                <X
                  onClick={() => setShowSearchBar(false)}
                />
              </Button>
            )
          )}

          <div className="hidden lg:flex items-end justify-end">
            <ModeToggle />
          </div>
          <UserAccount user={currentUser}/>
          <ShoppingCart />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Topheader;
