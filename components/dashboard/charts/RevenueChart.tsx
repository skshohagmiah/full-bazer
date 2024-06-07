"use client"; // This indicates it's a client component

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { getRevenue } from "@/actions/dashboard/analytics/RevenueAnalyticsActions";

interface RevenueChartProps {
  period: "day" | "week" | "month";
}

interface ChartDataPoint {
  date: string;
  revenue: number;
}

export default function RevenueChart({ period }: RevenueChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "short" });

  useEffect(() => {
    const fetchRevenueData = async () => {
      const data = await getRevenue(period); // Fetch data using the provided period
      setChartData(data! || []); 
    };
    fetchRevenueData();
  }, [period]); // Re-fetch when the period changes

  const formatXAxisTick = (day: number) => {
    const displayMonth = day % 5 === 1 || day === currentDate.getDate();
    return `${day}${displayMonth ? ` ${currentMonth}` : ""}`;
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl">
          {period === "day" ? "Today's" : ""}
          {period === "week" ? "Weekly" : ""}
          {period === "month" ? "Monthly" : ""} Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisTick}
              tick={{ fontSize: 12 }}
              height={80}
              interval={0}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: "white", color: "black" }}
              labelFormatter={(value) => `${value}`}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
            />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
