"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Play,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "all"
  ); // Default to "all"

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("status", selectedStatus);
    router.push(`?${params.toString()}`); // Update URL with the selected status
  }, [selectedStatus, router, searchParams]);

  return (
    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <div className="flex items-center">
            <span className="mr-2 h-4 w-4"></span>
            All orders
          </div>
        </SelectItem>
        <SelectItem value="pending">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Pending
          </div>
        </SelectItem>
        <SelectItem value="processing">
          <div className="flex items-center">
            <Play className="mr-2 h-4 w-4" />
            Processing
          </div>
        </SelectItem>
        <SelectItem value="shipped">
          <div className="flex items-center">
            <Truck className="mr-2 h-4 w-4" />
            Shipped
          </div>
        </SelectItem>
        <SelectItem value="delivered">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Delivered
          </div>
        </SelectItem>
        <SelectItem value="cancelled">
          <div className="flex items-center">
            <XCircle className="mr-2 h-4 w-4" />
            Cancelled
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
