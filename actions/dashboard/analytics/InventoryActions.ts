"use server";

import prisma from "@/lib/db";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

interface InventoryDataPoint {
  date: string;
  [productName: string]: number | string; 
}

export async function getInventoryData(
  period: "week" | "month"
): Promise<InventoryDataPoint[]> {
  let startDate, endDate;

  if (period === "week") {
    startDate = startOfWeek(new Date());
    endDate = endOfWeek(new Date());
  } else {
    startDate = startOfMonth(new Date());
    endDate = endOfMonth(new Date());
  }

  const products = await prisma.product.findMany({
    where: {
      totalSales: {
        gt: 0
      }
    },
    include: {
      variants: true,
    },
    orderBy: {
      totalSales: 'desc'
    }
  }); 
  

  const formattedData: InventoryDataPoint[] = [];

  // Iterate over days or weeks
  for (let i = 0; i <= (period === "week" ? 6 : 30); i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const dataPoint: InventoryDataPoint = { date: dateStr };

    // Calculate remaining stock for each product
    for (const product of products) {
      const totalSalesOnDate = await prisma.orderItem.aggregate({
        _sum: {
          quantity: true
        },
        where: {
          productVariant: {
            productId: product.id,
          },
          order: {
            isPaid: true,
            createdAt:{
              gte: date,
              lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            }
          }
        },
      });
      const variantStock = product.variants.reduce((acc, variant) => acc + variant.stock, 0)
      dataPoint[product.name] = variantStock - (totalSalesOnDate._sum.quantity || 0);
    }

    formattedData.push(dataPoint);
  }

  return formattedData;
}

