import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";


export default async function RecentOrdersSection() {

  
  const recentOrders: Order[] = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }, // Sort by createdAt descending
    include: { user:true }, // Include customer data
    take: 10,
  });

  return (
    <div className="p-4 border shadow-md rounded-md">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" /> Recent Orders
        </h2>
        <Link
          href="/dashboard/orders"
          className="text-blue-500 hover:underline"
        >
          View All
        </Link>
      </div>
      <Table>
        <TableHeader className="bg-slate-100 dark:bg-slate-800">
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="hover:text-primary-500"
                >
                  {order.id}
                </Link>
              </TableCell>
              <TableCell>{order.createdAt?.split("T")[0]}</TableCell>{" "}
              {/* Format date */}
              <TableCell>{order.user.name}</TableCell>
              <TableCell className="text-right">
                ${order.totalAmount / 100}
              </TableCell>{" "}
              {/* Assuming totalAmount is in cents */}
              <TableCell>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    order?.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : order?.status === "Processing"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Button variant={"outline"} size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
