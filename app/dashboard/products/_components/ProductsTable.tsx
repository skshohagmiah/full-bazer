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

import ProductActions from "./ProductActions";
import {
  Category,
  Image as ProductImage,
  Product,
  ProductVariant,
  Size,
  Color,
} from "@prisma/client";

interface ProductsTableProps {
  products: (Product & {
    category: Category;
    images: ProductImage[];
    variants: (ProductVariant & { color: Color | null; size: Size | null })[];
  })[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="">
      <Table className="border">
        <TableHeader className="bg-slate-100 dark:bg-slate-800">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative h-10 w-10">
                  <Image
                    fill
                    src={product.images[0].url || ""}
                    alt={product.name}
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product?.variants[0]?.size?.name}</TableCell>
              <TableCell>{product?.variants[0]?.color?.name}</TableCell>
              <TableCell className="block ml-4">
                <ProductActions productId={product.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
