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
import { Trash, Edit } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CategoryActions from "./CategoryActions";
import { Category } from "@prisma/client";


export default function CategoriesTable({categories}:{categories:Category[]}) {

  return (
    <div className="border shadow-md">
      <Table>
        <TableHeader className="bg-slate-100 dark:bg-slate-800">
          <TableRow>
            <TableHead>Image</TableHead> {/* Added for image */}
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell> {/* Image Cell */}
                <div className="relative h-10 w-10">
                  <Image
                    fill
                    src={category.imageUrl || ''}
                    alt={category.name}
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="block ml-4">
                <CategoryActions categoryId={category.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
