"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const searchTypes = [
  { value: "products", label: "Products" },
  { value: "orders", label: "Orders" },
  { value: "categories", label: "Categories" },
  { value: "users", label: "Users" },
  // ... add more types as needed
];

/**
 * DashboardSearchBar component that allows the user to search within the dashboard.
 * It provides a search bar with a dropdown to select the type of search.
 */
export default function DashboardSearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("products");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;

    router.push(`/dashboard/${selectedType}?query=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative hidden md:flex items-center max-w-md w-full pl-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 border"
    >
      {/* Search input with a search icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        className="form-input block w-full pl-10 pr-4 py-2 sm:text-sm sm:leading-6 rounded-lg focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search type select dropdown */}
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="rounded-lg focus:outline-none ring-offset-background focus:ring-0 border-none focus:ring-offset-0 w-fit mr-1">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent className="w-fit mr-1">
          {searchTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" variant={'ghost'} className="text-blue-500 hover:text-blue-600 px-4">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
