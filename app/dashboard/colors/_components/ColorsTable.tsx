import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ColorActions from "./ColorActions";
import prisma from "@/lib/db";


export default async function ColorsTable() {

  const colors = await prisma.color.findMany({})

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
        {colors.map((color) => (
          <TableRow key={color.id}>
            <TableCell className="font-medium">{color.name}</TableCell>
            <TableCell>
              <div
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color.value }}
              ></div>
            </TableCell>
            <TableCell>{color.createdAt.toDateString()}</TableCell>
            <TableCell className="block ml-4">
             <ColorActions color={color} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
