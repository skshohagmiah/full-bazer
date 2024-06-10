import React from "react";
import BillboardForm from "../_components/BillboardForm";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

const NewBillboardPage = () => {
  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/billboards", text: "billboards" },
        ]}
        pageText="new"
      />
      <DashboardHeading
        title="New Billboard"
        subtitie="Create a new billboard"
      />
      <BillboardForm billboard={null}/>
    </DashboardPageWrapper>
  );
};

export default NewBillboardPage;
