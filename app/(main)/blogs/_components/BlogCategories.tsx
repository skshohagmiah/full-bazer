'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

const BlogCategories = ({categories}:{categories:Category[]}) => {

    const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/blog?category=${category.name}`}
            className={cn(
              "text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white",
              category.name === selectedCategory &&
                "text-primary-500 dark:text-primary-400"
            )}
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              setSelectedCategory(category.name); // Update the selected category
            }}
          >
            {category.name}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default BlogCategories;
