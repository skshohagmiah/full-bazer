import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import React from "react";
import SizesTable from "./_components/SizesTable";
import CreateButton from "@/components/dashboard/others/CreateButton";
import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

const SizesPage = () => {
  return (
    <DashbaordPageWrapper>
      <div className="flex items-center justify-between gap-2">
        <DashboardHeading title="Sizes" subtitie="Manage product sizes here" />
        <CreateButton label="New Size" link="/dashboard/sizes/new" />
      </div>
      <SizesTable />
    </DashbaordPageWrapper>
  );
};

export default SizesPage;
