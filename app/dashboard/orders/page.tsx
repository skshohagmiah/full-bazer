import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import OrdersTable from "./_components/OrdersTable";
import OrderSearch from "./_components/OrderSearch";
import Pagination from "@/components/others/Pagination";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { auth } from "@/auth";
import { Order } from "@prisma/client";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | Orders",
  };
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Extract search parameters from the URL query string
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status || "all";

  // Define pagination variables
  const pageSize = 10; // items per page
  const skip = (page - 1) * pageSize;

  // Initialize variables to store orders and total number of items
  let orders;
  let totalItems;

  // Construct the search filter based on the search query
  const searchFilter = query
    ? {
        OR: [
          { user: { name: { contains: query } } },
        ],
      }
    : {};

  // Construct the status filter based on the selected status
  const statusFilter = status !== "all" ? { status } : {};

  // Construct the where clause by combining the search and status filters
  const whereClause = {
    ...searchFilter,
    ...statusFilter,
  };

  // Fetch orders based on the search parameters
  orders = await prisma.order.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  // Count the total number of items based on the search parameters
  totalItems = await prisma.order.count({
    where: whereClause,
  });

  // Calculate the total number of pages
  const pages = Math.ceil(totalItems / pageSize);

  // Render the OrdersPage component
  return (
    <DashboardPageWrapper>
      {/* Render the page heading */}
      <DashboardHeading title="Orders" subtitie="Manage your all orders here" />
      {/* Render the search component */}
      <OrderSearch />
      {/* Render the table component displaying the orders */}
      <OrdersTable orders={orders} />
      {/* Render a message if no orders are found */}
      {orders.length === 0 && <p className="text-center">No orders found.</p>}
      {/* Render the pagination component */}
      <Pagination itemsPerPage={pageSize} totalItems={totalItems} />
    </DashboardPageWrapper>
  );
}
