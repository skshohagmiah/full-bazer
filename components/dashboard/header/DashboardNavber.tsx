"use client";
import { Fragment, useState, useRef, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";



const DashboardNavbar = () => {
  
  const pathname = usePathname();
  const containerRef = useRef<HTMLUListElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  
  
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
  
  // Check for overflow on initial render and resize
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200; // Adjust the scroll amount as needed
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth", // Add smooth scrolling
      });
    }
  };

  return (
    <div className="relative hidden lg:flex flex-col shadow-md">
      <nav className="bg-transparent px-6 py-2 relative flex items-center w-full max-w-screen-2xl mx-auto ">
        <ul
          ref={containerRef}
          className="flex items-center justify-between hide-scrollbar overflow-x-auto scroll-smooth w-full py-2 space-x-2"
        >
          {dashboardLinks.map((item) => (
            <li key={item.label}>
              <Link
                className={cn(
                  "group relative flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  item.isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
                href={item.link}
              >
                {item.icon}
                {item.label}
             
              </Link>
            </li>
          ))}
        </ul>

        {/* Scroll Buttons (Conditionally Rendered) */}
        {showScrollButtons && ( // Show buttons only when overflowing
          <Fragment>
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-background p-2 rounded-full opacity-50 hover:opacity-100 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-background p-2 rounded-full opacity-50 hover:opacity-100 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </Fragment>
        )}
      </nav>
      <Separator className="hidden dark:block" />
    </div>
  );
};

export default DashboardNavbar;
