import {
  getCustomerAcquisitonData,
  getCustomerSatisfactionData,
} from "@/actions/dashboard/analytics/CustomerAnalyticsActions";
import { getSalesByCategoryData } from "@/actions/dashboard/analytics/SalesByCategoryActions";
import CustomerAnalyticsSection from "@/components/dashboard/charts/CustomerAnalytics";
import InventoryChart from "@/components/dashboard/charts/InventoryChart";
import RecentOrdersSection from "@/components/dashboard/charts/RecentOrders";
import RevenueChart from "@/components/dashboard/charts/RevenueChart";
import SalesByCategoryPieChart from "@/components/dashboard/charts/SalesByCategoryChart";
import TopSellingProductsChart from "@/components/dashboard/charts/TopSellingProducts";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import OverviewCards from "@/components/dashboard/overview/OverviewCards";
import React from "react";

/**
 * This component renders the main dashboard page.
 * It fetches and renders various analytics and charts for the dashboard.
 */

const DashboardPage = async () => {
  // Fetch customer acquisition data
  const customerAcquisitionData = await getCustomerAcquisitonData();

  // Fetch customer satisfaction data
  const formattedSatisfactionData = await getCustomerSatisfactionData();

  // Fetch top categories by sales
  const categoryData = await getSalesByCategoryData();

  return (
    // Main dashboard section
    <section className="min-h-screen h-full w-full py-4 md:py-6 px-4 md:px-8 space-y-8">
      {/* Dashboard heading */}
      <DashboardHeading
        title="Overview"
        subtitie="See all important information at a glance"
      />

      {/* Overview cards */}
      <OverviewCards />

      {/* Customer analytics section */}
      <CustomerAnalyticsSection
        formattedSatisfactionData={formattedSatisfactionData}
        customerAcquisitionData={customerAcquisitionData}
      />

      {/* Revenue chart */}
      <RevenueChart period="day" />

      {/* Top selling products and sales by category charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <TopSellingProductsChart />
        <SalesByCategoryPieChart categoryData={categoryData!} />
      </div>

      {/* Inventory chart */}
      <InventoryChart period="week" />

      {/* Recent orders section */}
      <RecentOrdersSection />
    </section>
  );
};

export default DashboardPage;
