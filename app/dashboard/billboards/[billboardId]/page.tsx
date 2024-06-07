import React from "react";
import BillboardForm from "../_components/BillboardForm";
import prisma from "@/lib/db";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";

const UpdateBillboardPage = async ({
  searchParams,
}: {
  searchParams: { billboardId: string };
}) => {
  const billboard = await prisma.billboard.findFirst({
    where: {
      id: searchParams.billboardId,
    },
  });

  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent
        links={[
          { text: "Dashboard", link: "/dashboard" },
          { text: "Billboards", link: "/dashboard/billboards" },
        ]}
        pageText={billboard?.label || "new billboard"}
      />

      <DashboardHeading title='Update Billboard' subtitie="Update billboard"/>
      <BillboardForm billboard={billboard!} />
    </DashboardPageWrapper>
  );
};

export default UpdateBillboardPage;
