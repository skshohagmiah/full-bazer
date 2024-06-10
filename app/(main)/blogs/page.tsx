import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import BlogsHeading from "./_components/BlogsHeading";
import MaxWidthWrapper from "@/components/others/MaxWidthWrapper";
import BlogCard from "./_components/BlogCard";
import prisma from "@/lib/db";
import BlogCategories from "./_components/BlogCategories";
import EmptyState from "@/components/others/EmptyState";

export default async function Blog() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  const categories = await prisma.category.findMany({});

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
      <BlogsHeading />
      <MaxWidthWrapper className="py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* All Blog Posts (Grid) */}
          <div className="lg:w-3/4 space-y-6">
            {/* Display all filtered posts */}
            <div className="flex flex-col gap-8">
              {blogs.length === 0 && (
                <EmptyState label="No blog post found!"/>
              )}
              {blogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Categories Section */}
            <BlogCategories categories={categories} />

            {/* Recent Posts Section */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {blogs.map((post) => (
                  <Link
                    href={`/blog/${post.title}`}
                    key={post.id}
                    className="flex items-start gap-3"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={post.thumbnailImage || ""}
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
                        {format(
                          new Date(post.createdAt.toDateString()),
                          "MMM d, yyyy"
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
