import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BlogsHeading from "../_components/BlogsHeading";
import prisma from "@/lib/db";
import BlogComments from "../_components/BlogComments";

const BlogDetailsPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const blog = await prisma.blogPost.findFirst({
    where: {
      title: slug,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      comments: {
        include: { user: true },
      },
    },
  });

  return (
    <section className="bg-white dark:bg-slate-950 text-black dark:text-white">
      <BlogsHeading />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage
                src={blog?.author.image || ""}
                alt={blog?.author.name}
              />
              <AvatarFallback>{blog?.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">{blog?.author.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {blog?.createdAt.toDateString()}
              </p>
            </div>
          </div>
          <div className="relative h-96 w-full rounded-md overflow-hidden mb-8">
            <Image
              src={blog?.thumbnailImage || ""}
              alt={blog?.title || ""}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div
            className="prose dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: blog?.content! }}
          />
        </div>
        <Separator className="my-8" />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex space-x-2">
            {blog?.tags.map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                className="px-3 py-1 rounded"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="my-8" />
        <BlogComments comments={blog?.comments!} />
      </div>
    </section>
  );
};

export default BlogDetailsPage;
