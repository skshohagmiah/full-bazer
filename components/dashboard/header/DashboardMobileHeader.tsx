"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ImageIcon,
  Newspaper,
  Expand,
  Droplet,
  Tag,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardMobileHeader = () => {
  const pathname = usePathname();

  const dashboardLinks = [
    {
      label: "Overview",
      link: "/dashboard",
      icon: <LayoutDashboard />,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Orders",
      link: "/dashboard/orders",
      icon: <ShoppingCart />,
      isActive: pathname.includes("/dashboard/orders"),
    },
    {
      label: "Products",
      link: "/dashboard/products",
      icon: <Package />,
      isActive: pathname.includes("/dashboard/products"),
    },
    {
      label: "Categories",
      link: "/dashboard/categories",
      icon: <Tag />,
      isActive: pathname.includes("/dashboard/categories"),
    },
    {
      label: "Billboards",
      link: "/dashboard/billboards",
      icon: <ImageIcon />,
      isActive: pathname.includes("/dashboard/billboards"),
    },
    {
      label: "Blogs",
      link: "/dashboard/blogs",
      icon: <Newspaper />,
      isActive: pathname.includes("/dashboard/blogs"),
    },
    {
      label: "Sizes",
      link: "/dashboard/sizes",
      icon: <Expand />,
      isActive: pathname.includes("/dashboard/sizes"),
    },
    {
      label: "Colors",
      link: "/dashboard/colors",
      icon: <Droplet />,
      isActive: pathname.includes("/dashboard/colors"),
    },
    {
      label: "Users",
      link: "/dashboard/users",
      icon: <Users />,
      isActive: pathname.includes("/dashboard/users"),
    },
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <Settings />,
      isActive: pathname.includes("/dashboard/settings"),
    },
  ];

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <div>
            <ul className="space-y-2  overflow-y-auto mt-2">
              {dashboardLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    className={cn(
                      "group flex items-center gap-4 py-2 px-6 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition duration-200",
                      item.isActive && "bg-gray-50 dark:bg-slate-800",
                      "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    )}
                    href={item.link}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardMobileHeader;
