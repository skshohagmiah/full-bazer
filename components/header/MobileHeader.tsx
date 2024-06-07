import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {

  Menu,

} from "lucide-react";
import {

  Home,
  Store,
  Info,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { FaBlog } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import UserPopover from "../dashboard/header/UserPopover";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "../others/ModeToggle";

/**
 * MobileHeader component renders a mobile navigation menu.
 * It displays a list of navigation links and user account options.
 * The menu is toggled by a Menu icon button.
 * The component is only visible on mobile devices.
 */


const MobileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Define the navigation links
  const navLinks = [
    // Home link
    { name: "Home", icon: <Home />, href: "/", isActive: pathname === "/" },
    // Shop link
    {
      name: "Shop",
      icon: <Store className="mr-2 h-4 w-4" />,
      href: "/shop",
      isActive: pathname === "/shop",
    },
    // Blogs link
    {
      name: "Blogs",
      icon: <FaBlog className="mr-2 h-4 w-4" />,
      href: "/blogs",
      isActive: pathname === "/blog",
    },
    // About link
    {
      name: "About",
      icon: <Info className="mr-2 h-4 w-4" />,
      href: "/about",
      isActive: pathname === "/about",
    },
    // Contact link
    {
      name: "Contact",
      icon: <Phone className="mr-2 h-4 w-4" />,
      href: "/contact",
      isActive: pathname === "/contact",
    },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile menu */}
      <Sheet>
        {/* Menu toggle button */}
        <SheetTrigger className="flex items-center justify-center">
          <Menu />
        </SheetTrigger>
        {/* Menu content */}
        <SheetContent className="flex justify-center" side={'left'}>
          <SheetHeader className="w-full">
            <SheetDescription className="w-full">
              {/* Navigation links */}
              <ul className="flex flex-col items-start gap-2 w-full">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {/* Navigation link */}
                    <Link
                      href={link.href}
                      className={cn(
                        "group inline-flex items-center text-sm font-medium hover:opacity-50 duration-200 gap-2 ml-2",
                        link.isActive && "underline underline-offset-4"
                      )}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
                <Separator />
                <div className="flex items-center gap-2">
                  {/* Theme toggle */}
                  <ModeToggle /> Theme
                </div>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileHeader;
