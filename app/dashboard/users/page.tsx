import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import React from "react";
import UsersTable from "./_components/UsersTable";
import Pagination from "@/components/others/Pagination";
import UserSearch from "./_components/UserSearch";
import prisma from "@/lib/db";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let users;
  let totalItems;

  const searchFilter = query
    ? {
        OR: [{ name: { contains: query } }],
      }
    : {};

  const whereClause = {
    ...searchFilter,
  };

  users = await prisma.user.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
  });

  totalItems = await prisma.user.count({
    where: whereClause,
  });

  return (
    <DashbaordPageWrapper>
      <DashboardHeading title="Users" subtitie="Get all users details here" />
      <UserSearch />
      <UsersTable users={users} />
      <Pagination itemsPerPage={pageSize} totalItems={totalItems} />
    </DashbaordPageWrapper>
  );
};

export default UsersPage;
