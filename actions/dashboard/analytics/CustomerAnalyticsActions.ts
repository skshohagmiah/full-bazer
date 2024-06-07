"use server";

import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import prisma from "@/lib/db";

export async function getCustomerAcquisitonData() {
  const currentDate = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) =>
    subMonths(currentDate, i)
  ).reverse(); // Last 6 months in descending order

  const customerAcquisitionData = await Promise.all(
    lastSixMonths.map(async (month) => {
      const newCustomers = await prisma.user.count({
        where: {
          role: "CUSTOMER",
          createdAt: {
            gte: startOfMonth(month),
            lte: endOfMonth(month),
          },
        },
      });

      const returningCustomers = await prisma.user.count({
        where: {
          role: "CUSTOMER",
          createdAt: {
            lt: startOfMonth(month), // Created before the month
          },
          AND: {
            orders: {
              some: {
                createdAt: {
                  gte: startOfMonth(month),
                  lte: endOfMonth(month),
                },
              },
            },
          },
        },
      });

      return {
        name: month.toLocaleString("default", { month: "short" }),
        newCustomers,
        returningCustomers,
      };
    })
  );

  return customerAcquisitionData;
}



export async function getCustomerSatisfactionData() {
    const customerSatisfactionData = await prisma.review.groupBy({
        by: ["rating"],
        _count: true,
      });
    
      const formattedSatisfactionData = customerSatisfactionData.map((item) => ({
        name: `${item.rating} Stars`,
        count: item._count,
      }));

      return  formattedSatisfactionData
}