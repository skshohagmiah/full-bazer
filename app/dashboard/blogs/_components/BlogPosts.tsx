"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import BlogActions from "./BlogActions";
import { BlogPost } from "@prisma/client";

export default function BlogPosts({ blogs }: { blogs: BlogPost[] }) {
  return (
    <div className="p-4 border shadow-md rounded-md">
      {blogs.length === 0 && (
        <p className="text-center text-gray-500">No blog posts found.</p>
      )}
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="relative aspect-video">
                <Image
                  fill
                  src={post.thumbnailImage || ""}
                  alt={post.title}
                  className="object-cover rounded-t-md"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.excerpt.length > 100
                  ? `${post.excerpt.slice(0, 100)}...`
                  : post.excerpt}
              </CardDescription>
              <p className="text-sm text-gray-500 mt-2">
                Published: {format(post.createdAt, "MMM d, yyyy")}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
              <Link href={`/blogs/${post.id}`}>
                <Button className="w-full" variant="outline">
                  Read More
                </Button>
              </Link>
              <BlogActions blogId={post.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
