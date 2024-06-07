"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
 
export default function UserSearch() {
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
    router.push("?" + params.toString()); // Navigate to the updated URL
  }, [query, router, searchParams]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center w-full max-w-md border mt-4 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <Input
          placeholder="Search user by name"
          className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className=""
          variant={"ghost"}
          onClick={() => {}}
        >
          <Search />
        </Button>
      </div>
    </div>
  );
}
