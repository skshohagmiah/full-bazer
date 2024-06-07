"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Order, User } from "@prisma/client";
// import EmptyState from "@/components/empty-state";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import EmptyState from "@/components/others/EmptyState";

interface OrderWithUser extends Order {
  user: User;
}

const dummyOrders: OrderWithUser[] = []

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderWithUser[]>(dummyOrders);
  const router = useRouter()
  return (
    <MaxWidthWrapper className=" py-12 px-4 my-4 bg-white dark:bg-slate-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <EmptyState label="You have no orders yet." /> // Empty state component
      ) : (
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-left">Payment</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="w-fit"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(order.totalAmount / 100)}
                </TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "shipped"
                        ? "secondary"
                        : order.status === "processing"
                        ? "warning"
                        : order.status === "pending"
                        ? "accent"
                        : order.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" onClick={() => router.push(`/order/${order.id}`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </MaxWidthWrapper>
  );
}
