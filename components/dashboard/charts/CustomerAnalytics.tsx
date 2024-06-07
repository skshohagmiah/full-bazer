'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend as PieLegend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface CustomerAnalyticsSectionProps{
  customerAcquisitionData:{
    name: string;
    newCustomers: number;
    returningCustomers: number;
}[],
formattedSatisfactionData:any
}

export default function CustomerAnalyticsSection({customerAcquisitionData,formattedSatisfactionData}:CustomerAnalyticsSectionProps) {

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {/* Bar Chart - Customer Acquisition */}
      <Card className="lg:col-span-8">
        <CardHeader>
          <CardTitle className="text-2xl">Customer Acquisition</CardTitle>
          <CardDescription>
            New vs. Returning Customers (Last 6 Months)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerAcquisitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="newCustomers"
                stackId="a" // Stacked bars
                fill="#8884d8"
                name="New Customers"
              />
              <Bar
                dataKey="returningCustomers"
                stackId="a" // Stacked bars
                fill="#82ca9d"
                name="Returning Customers"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Customer Satisfaction */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-2xl">Customer Satisfaction</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedSatisfactionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {formattedSatisfactionData.map((_:any, index:number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <PieLegend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
