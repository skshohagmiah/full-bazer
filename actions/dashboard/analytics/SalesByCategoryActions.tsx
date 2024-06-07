'use server';

import prisma from "@/lib/db";

interface CategorySalesData {
    name: string; // Category name
    value: number; // Total sales for the category
  }

export async function getSalesByCategoryData() {
    const categories = await prisma.category.findMany();
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          isPaid: true,
        },
      },
      include: {
        productVariant: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  
    const salesByCategoryData: CategorySalesData[] = categories.map(
      (category) => {
        const categorySales = orderItems.filter(
          (item) => item.productVariant.product.categoryId === category.id
        );
  
        const totalSales = categorySales.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
  
        return {
          name: category.name,
          value: totalSales,
        };
      }
    );
  
  
    const formattedData =
      salesByCategoryData?.length > 0
        ? salesByCategoryData.map((item) => ({
            name: item.name,
            value: item.value,
          }))
        : [];

    return formattedData
}