"use client";
import React from "react";
import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import DashboardNavber from "@/components/dashboard/header/DashboardNavber";
import DashbaoardSidebar from "@/components/dashboard/sidebar/DashbaoardSidebar";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import useLayoutStore from "@/hooks/useLayoutStore";
import { cn } from "@/lib/utils";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { layoutType } = useLayoutStore();


  return (
    <div className="flex w-full">
      {layoutType === "sidebar" && <DashbaoardSidebar />}
      <div className="flex flex-col w-full">
        <DashboardHeader />
        {layoutType === "navbar" && <DashboardNavber />}
        <main
          className={cn(
            " w-full",
            layoutType === "navbar" && "max-w-screen-2xl mx-auto"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
