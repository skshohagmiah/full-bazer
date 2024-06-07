"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import SingleOrderActions from "../_components/SingleOrderActions";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Product {
  name: string;
  image?: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  createdAt: Date;
  total: string;
  status: string;
  orderItems: OrderItem[];
  billingAddress: Address;
  shippingAddress: Address;
}

const dummyOrder: Order = {
  id: "ORD-12345",
  customer: {
    name: "John Doe",
    email: "johndoe@example.com",
  },
  createdAt: new Date("2024-05-18T10:30:00"),
  total: "$285.99",
  status: "Shipped",
  orderItems: [
    {
      id: "OI-001",
      product: {
        name: "Product A - iPhone 15 Pro Max",
        image: "/product-a.jpg", // Assuming you have an image for Product A
      },
      quantity: 2,
      price: "$199.99",
    },
    {
      id: "OI-002",
      product: { name: "Product B - Laptop Case", image: "/product-b.jpg" }, // Image for Product B
      quantity: 1,
      price: "$25.99",
    },
    {
      id: "OI-003",
      product: {
        name: "Product C - Wireless Headphones",
        image: "/product-c.jpg", // Image for Product C
      },
      quantity: 1,
      price: "$59.99",
    },
  ],
  billingAddress: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  shippingAddress: {
    street: "456 Elm St",
    city: "Othercity",
    state: "NY",
    zip: "67890",
  },
};

export default function OrderDetailsPage() {
  return (
    <DashboardPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/orders", text: "orders" },
        ]}
        pageText="id"
      />

      <DashboardHeading
        title="Order Details"
        subtitie="Get all information about the order"
      />

      {/* Order Summary */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Order ID: {dummyOrder.id}</CardDescription>
        </CardHeader>
        <CardContent className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Customer:</p>
            <p>{dummyOrder.customer.name}</p>
            </div>
            <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Email:</p>
            <p>{dummyOrder.customer.email}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Order Date:</p>
            <p>{dummyOrder.createdAt.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Total:</p>
            <p>{dummyOrder.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items (with product images) */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyOrder.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>
                    {item.product.image && (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-md"
                      />
                    )}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Shipping and Billing Addresses */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Shipping & Billing</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Shipping Address</h3>
            <p>{dummyOrder.shippingAddress.street}</p>
            <p>
              {dummyOrder.shippingAddress.city},{" "}
              {dummyOrder.shippingAddress.state}{" "}
              {dummyOrder.shippingAddress.zip}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Billing Address</h3>
            <p>{dummyOrder.billingAddress.street}</p>
            <p>
              {dummyOrder.billingAddress.city},{" "}
              {dummyOrder.billingAddress.state} {dummyOrder.billingAddress.zip}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order Actions (with Delete button) */}
      <SingleOrderActions />
    </DashboardPageWrapper>
  );
}
