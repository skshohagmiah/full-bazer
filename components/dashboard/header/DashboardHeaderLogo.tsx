'use client';
import Logo from "@/components/logo/Logo";
import useLayoutStore from "@/hooks/useLayoutStore";
import { cn } from "@/lib/utils";
import React from "react";

const DashboardHeaderLogo = () => {

    const {layoutType} = useLayoutStore()

  return (
    <div className={cn('block -my-6', layoutType === 'sidebar' && ' lg:hidden')}>
      <Logo />
    </div>
  );
};

export default DashboardHeaderLogo;
