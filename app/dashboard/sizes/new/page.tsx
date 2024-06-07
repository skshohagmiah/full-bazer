import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import React from "react";
import SizeForm from "../_components/SIzeForm";

const AddSizePage = () => {
  return (
    <DashbaordPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/sizes", text: "sizes" },
        ]}
        pageText="new"
      />
      <DashboardHeading
        title="New Size"
        subtitie="Create new size for the product"
      />
      <SizeForm />
    </DashbaordPageWrapper>
  );
};

export default AddSizePage;
