import prisma from "@/lib/db";
import React from "react";
import SizeForm from "../_components/SIzeForm";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

const SizeIdPage = async ({
  searchParams,
}: {
  searchParams: { sizeId: string };
}) => {
  const size = await prisma.size.findFirst({
    where: {
      id: searchParams.sizeId,
    },
  });

  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/sizes", text: "sizes" },
        ]}
        pageText="new"
      />
      <DashboardHeading
        title="Update Size"
        subtitie="Update size for the product"
      />
      <SizeForm size={size!} />
    </DashboardPageWrapper>
  );
};

export default SizeIdPage;
