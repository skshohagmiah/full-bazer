
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTotalCustomers, getTotalProductsInStock, getTotalRevenue, getTotalSales } from "@/actions/dashboard/overview/overviewActions";

export default async function OverviewCards() {
  // Fetch data (directly in the Server Component)
  const { totalRevenue, revenueGrowth } = await getTotalRevenue("month");
  const { totalSales, salesGrowth } = await getTotalSales();
  const { totalProducts, productGrowth } = await getTotalProductsInStock();
  const {customerGrowth,totalCustomers} = await getTotalCustomers();


  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Replace with your desired currency code
    }).format(value);
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            {revenueGrowth > 0 ? (
              <span>
                <ArrowUp className="h-4 w-4 inline-block text-green-500 mr-1" />
                {revenueGrowth.toFixed(2)}% increase
              </span>
            ) : revenueGrowth < 0 ? (
              <span>
                <ArrowDown className="h-4 w-4 inline-block text-red-500 mr-1" />
                {Math.abs(revenueGrowth).toFixed(2)}% decrease
              </span>
            ) : (
              "No change from last month"
            )}
          </p>
        </CardContent>
      </Card>

      {/* Total Sales */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSales}</div>
          <p className="text-xs text-muted-foreground">
            {salesGrowth > 0 ? (
              <span>
                <ArrowUp className="h-4 w-4 inline-block text-green-500 mr-1" />
                {salesGrowth.toFixed(2)}% increase
              </span>
            ) : salesGrowth < 0 ? (
              <span>
                <ArrowDown className="h-4 w-4 inline-block text-red-500 mr-1" />
                {Math.abs(salesGrowth).toFixed(2)}% decrease
              </span>
            ) : (
              "No change from last month"
            )}
          </p>
        </CardContent>
      </Card>

      {/* Total Customers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
          <p
            className={cn(
              "text-xs",
              customerGrowth > 0 ? "text-green-600" : "text-destructive",
            )}
          >
            {customerGrowth > 0 ? (
              <span>
                <ArrowUp className="h-4 w-4 inline-block text-green-500 mr-1" />
                {customerGrowth.toFixed(2)}% increase
              </span>
            ) : customerGrowth < 0 ? (
              <span>
                <ArrowDown className="h-4 w-4 inline-block text-destructive mr-1" />
                {Math.abs(customerGrowth).toFixed(2)}% decrease
              </span>
            ) : (
              "No change from last month"
            )}
          </p>
        </CardContent>
      </Card>

  {/* Total Products in Carts */}
  <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products in Stock</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p
            className={cn(
              "text-xs",
              productGrowth > 0 ? "text-green-600" : "text-destructive",
            )}
          >
            {productGrowth > 0 ? (
              <span>
                <ArrowUp className="h-4 w-4 inline-block text-green-500 mr-1" />
                {productGrowth.toFixed(2)}% increase
              </span>
            ) : productGrowth < 0 ? (
              <span>
                <ArrowDown className="h-4 w-4 inline-block text-destructive mr-1" />
                {Math.abs(productGrowth).toFixed(2)}% decrease
              </span>
            ) : (
              "No change from last month"
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
