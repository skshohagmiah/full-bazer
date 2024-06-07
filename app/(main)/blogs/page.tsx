"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import BlogsHeading from "./_components/BlogsHeading";
// import { Blog } from "@prisma/client";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  avatarUrl: string;
  category: string;
  imageUrl: string;
  slug: string;
}

// Dummy data for blog posts (replace with your actual data)
const dummyBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Sustainable Fashion",
    description:
      "Explore how eco-conscious brands are revolutionizing the fashion industry.",
    publishedAt: "May 15, 2024",
    author: "Alice Johnson",
    avatarUrl: "https://github.com/shadcn.png",
    category: "Fashion",
    imageUrl: "https://source.unsplash.com/random/?fashion",
    slug: "rise-of-sustainable-fashion",
  },
  {
    id: 2,
    title: "The Impact of AI on E-commerce",
    description:
      "Discover the ways artificial intelligence is transforming online shopping.",
    publishedAt: "May 10, 2024",
    author: "Bob Smith",
    avatarUrl: "https://github.com/shadcn.png",
    category: "Technology",
    imageUrl: "https://source.unsplash.com/random/?ai",
    slug: "impact-ai-on-ecommerce",
  },
  // ... add more blog posts
];

// Dummy data for categories
const dummyCategories: string[] = [
  "Fashion",
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Health",
  "Beauty",
  "Home Decor",
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="flex flex-col gap-2 md:flex-row rounded-lg overflow-hidden shadow-md">
      {/* Image */}
      <div className="md:w-1/3 relative aspect-[4/3] md:aspect-auto">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover rounded-t-md md:rounded-l-md hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:w-2/3 space-y-2">
        {/* Title and Category */}
        <Link
          href={`/blogs/${post.slug}`}
          className="text-lg font-semibold hover:text-primary-500 dark:hover:text-primary-400 line-clamp-2"
        >
          {post.title}
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          By {post.author} on {post.publishedAt}
        </p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {post.description}
        </p>

        {/* Read More Button */}
        <Link href={`/blogs/${post.slug}`} className="mt-4 block">
          <Button variant="outline">Read More</Button>
        </Link>
      </div>
    </Card>
  );
};

export default function Blog() {
  const [categories, setCategories] = useState(dummyCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPosts = dummyBlogPosts.filter((post) => {
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

 

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
      <BlogsHeading />
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* All Blog Posts (Grid) */}
          <div className="lg:w-3/4 space-y-6">
            {/* Display all filtered posts */}
            <div className="flex flex-col gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Categories Section */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${category}`}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white",
                      category === selectedCategory &&
                        "text-primary-500 dark:text-primary-400"
                    )}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      setSelectedCategory(category); // Update the selected category
                    }}
                  >
                    {category}
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts Section */}
            <Card>
                <CardHeader>
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
                </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {filteredPosts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.id}
                    className="flex items-start gap-3"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
