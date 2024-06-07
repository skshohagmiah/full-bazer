import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import ProductSearch from "./_components/ProductSearch";
import ProductsTable from "./_components/ProductsTable";
import Pagination from "@/components/others/Pagination";
import { Plus } from "lucide-react";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import CreateButton from "@/components/dashboard/others/CreateButton";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | Products",
  };
}
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category || "";
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let products;
  let totalItems;

  const searchFilter = query
    ? {
        OR: [
          { name: { contains: query } },
          { category: { name: { contains: query } } },
        ],
      }
    : {};

  const categoryFilter = category !== "" ? { categoryId: category } : {};

  const whereClause = {
    ...searchFilter,
    ...categoryFilter,
  };

  products = await prisma.product.findMany({
    where: whereClause,
    skip: skip,
    take: pageSize,
    include: {
      category: true,
      images: true,
      variants: {
        include: { color: true, size: true },
      },
    },
  });

  totalItems = await prisma.product.count({
    where: whereClause,
  });

  return (
    <DashboardPageWrapper>
      <div className="flex items-center justify-between gap-2">
        <DashboardHeading
          title="Products"
          subtitie="Manage your products here"
        />
        <CreateButton link="/dashboard/products/new" label="New Product" />
      </div>
      <ProductSearch />
      <ProductsTable products={products} />
      {products.length === 0 && (
        <p className="text-center text-rose-500 text-lg">No product found.</p>
      )}
      <Pagination itemsPerPage={pageSize} totalItems={totalItems} />
    </DashboardPageWrapper>
  );
}
