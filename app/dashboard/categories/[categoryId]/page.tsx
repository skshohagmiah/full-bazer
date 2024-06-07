import prisma from "@/lib/db";
import React from "react";
import CategoryForm from "../_components/CategoryForm";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

const CategoryIdPage = async ({
  searchParams,
}: {
  searchParams: { categoryId: string };
}) => {
  // Fetch the category data from the database using the categoryId.
  const category = await prisma.category.findFirst({
    where: { id: searchParams.categoryId },
  });

  return (
    <DashboardPageWrapper>
      {/* Render the breadcrumb component with the necessary links and page text. */}
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/categories", text: "categories" },
        ]}
        pageText={category?.name || "new category"}
      />
      {/* Render the dashboard heading component with the necessary title and subtitie. */}
      <DashboardHeading
        title="Update Category"
        subtitie="Update the category"
      />
      {/* Render the CategoryForm component with the category data as initial data. */}
      <CategoryForm initialData={category} />
    </DashboardPageWrapper>
  );
};

export default CategoryIdPage;
