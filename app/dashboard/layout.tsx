import { auth } from "@/auth";
import DashboardLayoutWrapper from "@/components/dashboard/others/DashboardLayoutWrapper";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // Authenticate the user
  const session = await auth();
  
  // Get the current user
  const currentUser = await getCurrentUser();

  // Check if the user is authenticated and has a role of "CUSTOMER"
  if (!session?.user?.email || currentUser?.role === "CUSTOMER") {
    // If role is Customer, redirect the user to the homepage
    redirect("/");
  }

  // Render the layout with the child components
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
};

export default DashboardLayout;
