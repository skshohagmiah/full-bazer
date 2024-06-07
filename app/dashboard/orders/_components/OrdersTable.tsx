"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import OrderActions from "./OrderActions";
import { Order, User } from "@prisma/client";

interface OrdersTableProps{
  orders: (Order & {user:User})[]
}

export default function OrdersTable({orders}:OrdersTableProps) {

  return (
    <Table className="border shadow-md rounded-md">
      <TableHeader className="bg-slate-100 dark:bg-slate-800">
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.user.name}</TableCell>
            <TableCell>{order.createdAt.toString()}</TableCell>
            <TableCell>{order.totalAmount}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:text-white",
                  order.status === "Pending" &&
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900",
                  order.status === "Processing" &&
                    "bg-blue-100 text-blue-800 dark:bg-blue-900",
                  order.status === "Shipped" &&
                    "bg-orange-100 text-orange-800 dark:bg-orange-900",
                  order.status === "Delivered" &&
                    "bg-green-100 text-green-800 dark:bg-green-900",
                  order.status === "Cancelled" &&
                    "bg-red-100 text-red-800 dark:bg-red-900"
                )}
              >
                {order.status}
              </span>
            </TableCell>
            <TableCell className="ml-4 block">
              <OrderActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
