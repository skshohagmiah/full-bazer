"use client";
import { Package } from "lucide-react";

interface EmptyStateProps {
  label: string;
  icon?: React.ReactNode; // You can pass a different icon if needed
}

const EmptyState: React.FC<EmptyStateProps> = ({ label, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Icon */}
      {icon || (
        <div className="w-12 h-12 text-gray-500 mb-4">
          <Package size={50}/> 
        </div>
      )}

      {/* Label */}
      <p className="text-muted-foreground text-sm md:text-base text-center">
        {label}
      </p>
    </div>
  );
};

export default EmptyState;
