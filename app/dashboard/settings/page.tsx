import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralSettings from "./_components/GeneralSettings";
import EmailSettings from "./_components/EmailSettings";
import BillingSettings from "./_components/BillingsSettings";
import IntegrationSettings from "./_components/IntegrationSettings";
import DashboardHeading from "@/components/dashboard/others/DashboardHeading";
import DashboardPageWrapper from "@/components/dashboard/others/DashboardPageWrapper";
import LayoutSettings from "./_components/LayoutSettings";
import ShippingMethodForm from "./_components/ShippingMethodForm";
import TaxRateForm from "./_components/TaxRateForm";
import CouponForm from "./_components/CouponForm";
import prisma from "@/lib/db";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function SettingsPage() {
  const generalSetting = await prisma.generalSettings.findMany({});
  const integrationSetting = await prisma.integrationSettings.findMany({});
  const emailSetting = await prisma.emailSettings.findMany({});
  const shippingSetting = await prisma.shippingMethod.findMany({});
  const taxRateSetting = await prisma.taxRate.findMany({});
  const couponSetting = await prisma.couponCode.findMany({});
  const billingSetting = await prisma.billingSettings.findMany({});

  return (
    <DashboardPageWrapper>
      <DashboardHeading title="Settings" subtitie="Configure your store here" />
      <Tabs defaultValue="general" className="space-y-8">
        <TabsList className="w-full flex items-center justify-start gap-4 overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="coupon">Coupon</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneralSettings initialData={generalSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingMethodForm initialData={shippingSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Rate Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <TaxRateForm initialData={taxRateSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coupon">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Code Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <CouponForm initialData={couponSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <LayoutSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <EmailSettings initialData={emailSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <BillingSettings initialData={billingSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <IntegrationSettings initialData={integrationSetting[0]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageWrapper>
  );
}
