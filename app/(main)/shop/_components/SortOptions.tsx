import React, { useState } from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { List, Grid } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const SortOptions = () => {

    const [view, setView] = useState("grid"); // For toggling between grid and list views

  return (
    <div className="mb-4 w-full flex flex-col md:flex-row items-center justify-between gap-2">
    <div className="flex items-center mb-4 md:mb-0">
      <label htmlFor="sort" className="mr-2 font-semibold whitespace-nowrap">
        Sort by:
      </label>
      <Select  defaultValue="">
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fucik">Select</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Button
        onClick={() => setView("grid")}
        className={`mr-2 ${
          view === "grid" ? "bg-gray-800 text-white" : ""
        }`}
      >
        <Grid className="w-4 h-4 mr-1" />
        Grid View
      </Button>
      <Button
        onClick={() => setView("list")}
        className={`${view === "list" ? "bg-gray-800 text-white" : ""}`}
      >
        <List className="w-4 h-4 mr-1" />
        List View
      </Button>
    </div>
  </div>
  )
}

export default SortOptions