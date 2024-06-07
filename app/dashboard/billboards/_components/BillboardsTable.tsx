"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { cn } from "@/lib/utils";
import BillboardActions from "./BillboardActions";
import { Billboard, Category } from "@prisma/client";


interface BillboardsTableProps{
  billboards:Billboard[]
}

export default function BillboardsTable({billboards}:BillboardsTableProps) {

  return (
    <Table className="border shadow-md rounded-md">
      {/* TableHeader */}
      <TableHeader className="bg-slate-100 dark:bg-slate-800">
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Created At</TableHead> 
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      {/* TableBody */}
      <TableBody>
        {billboards.map((billboard) => (
          <TableRow key={billboard.id}>
            <TableCell className="relative h-10 w-10">
              <Image
                fill
                src={billboard.imageUrl}
                alt={billboard.label}
                className="object-cover rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{billboard.label}</TableCell>
            <TableCell>{billboard.createdAt.toDateString()}</TableCell>
            <TableCell>{billboard.startDate?.toDateString()}</TableCell>
            <TableCell>
              {billboard.endDate?.toDateString() || "Ongoing"} {/* Display "Ongoing" if endDate is null */}
            </TableCell>
            <TableCell className="flex">
                <BillboardActions billboardId={billboard.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
