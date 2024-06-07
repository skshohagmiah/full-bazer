import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import BillboardsTable from "./_components/BillboardsTable";
import Pagination from "@/components/others/Pagination";
import BillboardSearch from "./_components/BillboardSearch";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import CreateButton from "@/components/dashboard/others/CreateButton";
import prisma from "@/lib/db";

const BannersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let billboards;
  let totalItems;

  const searchFilter = query
    ? {
        label: { contains: query },
      }
    : {};

  const whereClause = {
    ...searchFilter,
  };

  billboards = await prisma.billboard.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
  });

  totalItems = await prisma.billboard.count({
    where: whereClause,
  });

  return (
    <DashboardPageWrapper>
      <div className="flex items-center justify-between gap-2">
        <DashboardHeading
          title="Billboards"
          subtitie="Manage your all billboard here"
        />
        <CreateButton link="/dashboard/billboards/new" label="New  Billboard" />
      </div>
      <BillboardSearch />
      <BillboardsTable billboards={billboards} />
      {billboards.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No billboards found
        </p>
      )}
      <Pagination itemsPerPage={pageSize} totalItems={totalItems} />
    </DashboardPageWrapper>
  );
};

export default BannersPage;
