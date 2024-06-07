import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils/formatCurrency.ts
import { BillingSettings } from "@prisma/client";
import prisma from "./db";

// Function to fetch currency from database
async function getCurrency() {
  try {
    const billingSetting = await prisma.billingSettings.findFirst();
    return billingSetting?.currency || 'USD'; // Default to USD if not found
  } catch (error) {
    console.error("Error fetching currency:", error);
    return "USD";
  }
}

// Function to format currency
export const formatCurrency = async (value: number) => {
  const currency = await getCurrency(); // Get the currency from your database

  return new Intl.NumberFormat("en-US", { // Use the appropriate locale
    style: "currency",
    currency: currency,
  }).format(value);
};
