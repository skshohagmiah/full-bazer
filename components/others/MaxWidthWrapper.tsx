import { cn } from "@/lib/utils";
import React from "react";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-2", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
