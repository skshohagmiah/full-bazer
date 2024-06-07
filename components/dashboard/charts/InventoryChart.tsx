"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInventoryData } from "@/actions/dashboard/analytics/InventoryActions";
import { useState, useEffect } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function InventoryChart({
  period,
}: {
  period: "week" | "month";
}) {
  const [chartData, setChartData] = useState<
    //@ts-ignore
    { date: string ; [productName: string]: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInventoryData(period);
      //@ts-ignore
      setChartData(data);
    };

    fetchData();
  }, [period]);

  const getUniqueProductNames = () => {
    // Check if chartData has data before iterating
    if (chartData.length === 0) return [];
    const productNames = new Set<string>();
    chartData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "date") {
          productNames.add(key);
        }
      });
    });
    return Array.from(productNames);
  };

  const uniqueProductNames = getUniqueProductNames();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Inventory Levels</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        {chartData && chartData.length > 0 && ( // Additional check for empty data
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                {uniqueProductNames.map((productName, index) => (
                  <linearGradient
                    key={productName}
                    id={`color${productName.replace(/\s+/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS[index % COLORS.length]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS[index % COLORS.length]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              {uniqueProductNames.map((productName, index) => (
                <Area
                  key={productName}
                  type="monotone"
                  dataKey={productName}
                  stroke={COLORS[index % COLORS.length]}
                  fillOpacity={1}
                  fill={`url(#color${productName.replace(/\s+/g, "")})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
