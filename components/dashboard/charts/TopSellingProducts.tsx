
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/db";


export default async function TopSellingProductsTable() {

  const topSellingProducts = await prisma.product.findMany({
    where: {
      totalSales: {
        gt: 0, // Only include products with at least one sale
      },
    },
    orderBy: {
      totalSales: "desc", 
    },
    select: {
      name: true,
      totalSales: true,
    },
    take: 10, // Limit to top 10 products
  });

  return (
    <div className="p-4 border  rounded-md lg:col-span-3">
      <h2 className="text-2xl font-semibold my-4">Top Selling Products</h2>
      <Table>
        <TableCaption>A list of your top selling products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-right">Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topSellingProducts
            .sort((a, b) => b.totalSales - a.totalSales) // Sort by sales descending
            .map((product, index) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {product.name.length > 25
                    ? `${product.name}`
                    : product.name}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {product.totalSales}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
