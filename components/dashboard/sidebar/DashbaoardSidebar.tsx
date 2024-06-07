"use client";
import { useState } from "react";
import Logo from "@/components/logo/Logo";
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

const DashboardSidebar = () => {
  const pathname = usePathname();

  const dashboardLinks = [
    {
      label: "Overview",
      link: "/dashboard",
      icon: <LayoutDashboard className="shrink-0" />,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Orders",
      link: "/dashboard/orders",
      icon: <ShoppingCart className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/orders"),
    },
    {
      label: "Products",
      link: "/dashboard/products",
      icon: <Package className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/products"),
    },
    {
      label: "Categories",
      link: "/dashboard/categories",
      icon: <Tag className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/categories"),
    },
    {
      label: "Billboards",
      link: "/dashboard/billboards",
      icon: <ImageIcon className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/billboards"),
    },
    {
      label: "Blogs",
      link: "/dashboard/blogs",
      icon: <Newspaper className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/blogs"),
    },
    {
      label: "Sizes",
      link: "/dashboard/sizes",
      icon: <Expand className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/sizes"),
    },
    {
      label: "Colors",
      link: "/dashboard/colors",
      icon: <Droplet className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/colors"),
    },
    {
      label: "Users",
      link: "/dashboard/users",
      icon: <Users className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/users"),
    },
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="shrink-0"/>,
      isActive: pathname.includes("/dashboard/settings"),
    },
  ];

  return (
    <aside className=" hidden bg-gray-100  w-80 h-screen sticky top-0 left-0 lg:flex flex-col dark:bg-slate-900">
      <div className="p-4 my-[5px] flex items-center justify-start text-gray-200">
        <Logo />
      </div>
      <Separator className="w-[70%] mx-auto block" />
      <ul className="space-y-2 py-4 md:py-6  w-full overflow-y-auto">
        {dashboardLinks.map((item) => (
          <li key={item.label} className="w-full flex items-center justify-center">
            <Link
              className={cn(
                "group flex items-center justify-start gap-4 py-2 px-6 w-full  hover:bg-gray-200 dark:hover:bg-accent transition duration-200 shrink-0",
                item.isActive
                ? "bg-gray-200 dark:bg-accent text-accent-foreground"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              href={item.link}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
