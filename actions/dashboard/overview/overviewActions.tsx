"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";


export async function getTotalRevenue(period: "month" | "year" = "month") {
  const session = await auth();
  if (!session?.user) {
    return { totalRevenue: 0, revenueGrowth: 0 };
  }

  const endDate = endOfMonth(new Date());
  const startDate = startOfMonth(
    period === "month" ? subMonths(endDate, 1) : subMonths(endDate, 12)
  );

  try {
    // Total revenue for the current period
    const aggregateResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    const totalRevenue = aggregateResult._sum.totalAmount || 0;

    // Total revenue for the previous period
    const previousAggregateResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        createdAt: {
          gte: startOfMonth(subMonths(startDate, 1)),
          lte: endOfMonth(subMonths(startDate, 1)),
        },
      },
    });
    const previousRevenue = previousAggregateResult._sum.totalAmount || 0;

    // Calculate growth percentage
    const revenueGrowth = previousRevenue === 0
      ? 0
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

    return { totalRevenue, revenueGrowth };
  } catch (error) {
    console.error("[TOTAL_REVENUE_GET]", error);
    return { totalRevenue: 0, revenueGrowth: 0 };
  }
}

// Function to fetch total sales
export async function getTotalSales() {
  const session = await auth();
  if (!session?.user) {
    return {totalSales:0, salesGrowth:0};
  }

  const endDate = endOfMonth(new Date());
  const startDate = startOfMonth(subMonths(endDate, 1));

  try {
    // Total sales for the current period
    const salesCount = await prisma.orderItem.count({
      where: {
        order: { userId: session.user.id,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
         },
      },
    });

    // Total sales for the previous period
    const previousSalesCount = await prisma.orderItem.count({
      where: {
        order: {
          userId: session.user.id,
          createdAt: {
            gte: startOfMonth(subMonths(startDate, 1)),
            lte: endOfMonth(subMonths(startDate, 1)),
          },
        },
      },
    });

    // Calculate growth percentage
    const salesGrowth =
      previousSalesCount === 0
        ? 0
        : ((salesCount - previousSalesCount) / previousSalesCount) * 100;

    return {totalSales:salesCount, salesGrowth};
  } catch (error) {
    console.error("[TOTAL_SALES_GET]", error);
    return {totalSales:0, salesGrowth:0};
  }
}


export async function getTotalCustomers() {
  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(currentDate, 1));

  try {
    // Total customers for the current month
    const currentMonthCustomers = await prisma.user.count({
      where: {
        role: "CUSTOMER",
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    // Total customers for the previous month
    const previousMonthCustomers = await prisma.user.count({
      where: {
        role: "CUSTOMER",
        createdAt: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
      },
    });

    // Calculate growth percentage
    const customerGrowth =
      previousMonthCustomers === 0
        ? 0
        : ((currentMonthCustomers - previousMonthCustomers) /
            previousMonthCustomers) *
          100;

    return { totalCustomers: currentMonthCustomers, customerGrowth };
  } catch (error) {
    console.error("[TOTAL_CUSTOMERS_GET]", error);
    return { totalCustomers: 0, customerGrowth: 0 };
  }
}

export async function getTotalProductsInStock() {
  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));
  const endOfPreviousMonth = endOfMonth(subMonths(currentDate, 1));

  try {
    // Total products in stock (sum of quantities) for the current month
    const currentMonthTotal = await prisma.product.aggregate({
      _sum: {
        stock: true, // Sum the 'stock' field instead of 'quantity'
      },
      where: {
        createdAt: { gte: startOfCurrentMonth, lte: endOfCurrentMonth },
      },
    });
    const totalProducts = currentMonthTotal._sum.stock || 0;

    // Total products in stock for the previous month
    const previousMonthTotal = await prisma.product.aggregate({
      _sum: {
        stock: true,
      },
      where: {
        createdAt: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
      },
    });
    const previousProducts = previousMonthTotal._sum.stock || 0;

    // Calculate growth percentage
    const productGrowth =
      previousProducts === 0
        ? 0
        : ((totalProducts - previousProducts) / previousProducts) * 100;

    return { totalProducts, productGrowth };
  } catch (error) {
    console.error("[TOTAL_PRODUCTS_IN_STOCK_GET]", error);
    return { totalProducts: 0, productGrowth: 0 };
  }
}