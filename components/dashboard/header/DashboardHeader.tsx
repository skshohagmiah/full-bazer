'use client';
import React from "react";
import Notification from "./Notification";
import UserPopover from "./UserPopover";
import { ModeToggle } from "@/components/others/ModeToggle";
import { Separator } from "@/components/ui/separator";
import DashboardMobileHeader from "./DashboardMobileHeader";
import DashboardSearchBar from "./DashboardSearchbar";
import DashboardHeaderLogo from "./DashboardHeaderLogo";
import useLayoutStore from "@/hooks/useLayoutStore";
import { cn } from "@/lib/utils";

const DashboardHeader = () => {
  const {layoutType} = useLayoutStore()
  return (
    <header className="bg-white dark:bg-slate-950 sticky top-0 inset-x-0 z-50">
      <div className={cn("flex items-center justify-between py-4 px-4 md:px-8", layoutType === 'navbar' && 'max-w-screen-2xl mx-auto')}>
        <DashboardHeaderLogo />
        <DashboardSearchBar />
        <div className="flex items-center justify-end gap-2 md:gap-3">
          <ModeToggle />
          <Notification />
          <UserPopover />
          <DashboardMobileHeader />
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default DashboardHeader;
