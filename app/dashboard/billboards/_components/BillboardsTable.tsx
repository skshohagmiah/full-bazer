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
          <TableHead>Link</TableHead>
          <TableHead>Created At</TableHead> 
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      {/* TableBody */}
      <TableBody className="">
        {billboards.map((billboard) => (
          <TableRow key={billboard.id}>
            <TableCell className="relative h-20 w-32 mr-4">
              <Image
                fill
                src={billboard.imageUrl}
                alt={'billboard image'}
                className="object-contain rounded-md"
              />
            </TableCell>
            <TableCell>{billboard.link}</TableCell>
            <TableCell>{billboard.createdAt.toDateString()}</TableCell>
            <TableCell className="flex">
                <BillboardActions billboardId={billboard.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
