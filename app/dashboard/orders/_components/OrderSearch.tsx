"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import OrderSort from "./OrderSort";

const OrderSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | null>(searchParams.get("query"));

  useEffect(() => {
    // Update the query parameter in the URL as the user types
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query"); // Remove query parameter if it's empty
    }
    router.push(`?${params.toString()}`);
  }, [query, router, searchParams]);

  return (
    <div className="flex items-center justify-between gap-2">
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full max-w-md border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <Input
          placeholder="Search order by id"
          className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="" type="submit" variant={"ghost"}>
          <Search />
        </Button>
      </form>
      {/* order sorting here */}
      <OrderSort />
    </div>
  );
};

export default OrderSearch;
