'use server';
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";


export async function getRevenue(period: "day" | "week" | "month" = "month") {
    const session = await auth();
    if (!session?.user) {
      return null;
    }
  
    let startDate, endDate;
    const currentDate = new Date();
  
    switch (period) {
      case "day":
        startDate = currentDate;
        endDate = currentDate;
        break;
      case "week":
        startDate = startOfWeek(currentDate);
        endDate = endOfWeek(currentDate);
        break;
      case "month":
      default:
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
    }
  
    // Fetch revenue data from database (replace with your actual logic)
    const aggregateResult = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: {
        totalAmount: true,
      },
      where: {
        isPaid: true,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    const data = aggregateResult.map(item => ({
      date: format(item.createdAt, 'dd/MM/yy'),
      revenue: item._sum.totalAmount || 0
    }));
    return data
  }