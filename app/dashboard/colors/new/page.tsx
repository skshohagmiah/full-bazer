import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import React from "react";
import ColorForm from "../_components/ColorForm";

const AddSizePage = () => {
  return (
    <DashbaordPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/colors", text: "colors" },
        ]}
        pageText="new"
      />
      <DashboardHeading
        title="New Color"
        subtitie="Create new color for the product"
      />
      <ColorForm />
    </DashbaordPageWrapper>
  );
};

export default AddSizePage;
