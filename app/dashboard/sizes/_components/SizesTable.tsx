
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SizeActions from "./SizeActions"; // Assuming you have a component to handle actions
import prisma from "@/lib/db";


export default async function SizesTable() {

  const sizes = await prisma.size.findMany({})

  return (
    <Table className="border shadow-md rounded-md">
      {/* TableHeader */}
      <TableHeader className="bg-slate-100 dark:bg-slate-800">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Created At</TableHead> 
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      {/* TableBody */}
      <TableBody>
        {sizes.map((size) => (
          <TableRow key={size.id}>
            <TableCell className="font-medium">{size.name}</TableCell>
            <TableCell>{size.value}</TableCell>
            <TableCell>{size.createdAt.toDateString()}</TableCell>
            <TableCell className="block ml-4">
              <SizeActions size={size} /> 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
