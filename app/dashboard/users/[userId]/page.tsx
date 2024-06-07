
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import DashbaordPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import BreadcrumbComponent from "@/components/others/BreadcrumbComponent";
import prisma from "@/lib/db";
import UserStatusChange from "../_components/UserStatusChange";


export default async function UserDetailsPage({searchParams}:{searchParams:{userId:string}}) {

  const user = await prisma.user.findFirst({
    where:{
      id:searchParams.userId
    },
    include:{
      billingAddress:true,
      orders:true,
      reviews:true,
      shippingAddress:true,
      comments:true
    }
  })


  console.log(searchParams.userId,user)

  return (
    <DashbaordPageWrapper>
      <BreadcrumbComponent
        links={[
          { link: "/dashboard", text: "dashboard" },
          { link: "/dashboard/users", text: "users" },
        ]}
        pageText={user?.name || 'user'}
      />

      <DashboardHeading
        title="User Details"
        subtitie="Get all information for this user"
      />

      {/* User Profile */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <Avatar className="mr-4">
              {user?.image && (
                <AvatarImage src={user.image} alt={user.name} />
              )}
              <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
          <UserStatusChange userId={user?.id || ''}/>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Role:</p>
            <p>{user?.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium mt-2">Joined:</p>
            <p className="mt-2">{user?.createdAt.toDateString()}</p>
          </div>
          {user?.shippingAddress && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium">Address:</p>
                  <p>{user.shippingAddress.street}</p>
                  <p>
                    {user.shippingAddress.city}, {user.shippingAddress.state}, {user.shippingAddress.postalCode}, {user.shippingAddress.phone}, {user.shippingAddress.country}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Order History */}
      <div className="mt-6 border rounded-md p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <ShoppingCart className="mr-2 h-4 w-4" /> Order History
        </h2>

        {user?.orders && user?.orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.createdAt.toDateString()}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </DashbaordPageWrapper>
  );
}
