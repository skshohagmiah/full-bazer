import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import React from "react";
import CategoriesTable from "./_components/CategoriesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Pagination from "@/components/others/Pagination";
import CategorySearch from "./_components/CategorySearch";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import CreateButton from "@/components/dashboard/others/CreateButton";
import prisma from "@/lib/db";

const CategoriesPage = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let categories;
  let totalItems;

  const searchFilter = query
    ? {
        OR: [
          { name: { contains: query } },
        ],
      }
    : {};


  const whereClause = {
    ...searchFilter,
  };

  categories = await prisma.category.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
  });

  totalItems = await prisma.product.count({
    where: whereClause,
  });


  return (
    <DashboardPageWrapper>
      <div className="flex items-center justify-between gap-2">
        <DashboardHeading
          title="Categories"
          subtitie="Add or remove categories here"
        />
        <CreateButton label="New Category" link="/dashboard/categories/new"/>
      </div>
      <CategorySearch />
      <CategoriesTable categories={categories} />
      <Pagination  itemsPerPage={10} totalItems={5}/>
    </DashboardPageWrapper>
  );
};

export default CategoriesPage;
