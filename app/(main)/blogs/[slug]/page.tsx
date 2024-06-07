'use client';
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy data for the blog
const blog = {
  id: "1",
  title: "A Journey Through the Mountains",
  author: {
    name: "John Doe",
    avatar: "/placeholder.png",
  },
  publicationDate: "May 23, 2024",
  featuredImage: "/shoes.jpg",
  content: `
    <p>Traveling through the mountains can be one of the most exhilarating experiences. The crisp air, the stunning vistas, and the sense of adventure combine to create unforgettable memories.</p>
    <p>Mountains are not just physical landscapes but a journey into one's soul. They challenge our limits, reveal our strengths, and inspire awe with their grandeur. From the snow-capped peaks of the Himalayas to the rugged terrains of the Rockies, every mountain has its own story to tell.</p>
    <h2>Highlights of the Journey</h2>
    <p>During this journey, we encountered serene lakes, dense forests, and majestic wildlife. Each moment was a reminder of the beauty and unpredictability of nature.</p>
    <h2>Essential Tips</h2>
    <ul>
      <li>Plan your route in advance and carry a map.</li>
      <li>Pack essentials including food, water, and a first-aid kit.</li>
      <li>Dress in layers to adapt to changing weather conditions.</li>
    </ul>
  `,
  tags: ["Travel", "Adventure", "Nature"],
  comments: [
    {
      user: "Alice",
      avatar: "/avatars/alice.jpg",
      comment: "This was such an inspiring read! I feel like packing my bags and heading to the mountains right now.",
      date: "May 24, 2024",
    },
    {
      user: "Bob",
      avatar: "/avatars/bob.jpg",
      comment: "Great tips! I especially agree with packing in layers. Mountains can be so unpredictable.",
      date: "May 25, 2024",
    },
  ],
};

const BlogDetailsPage = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          user: "Guest",
          avatar: "/avatars/default-avatar.jpg",
          comment,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setComment("");
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 text-black dark:text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">{blog.author.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {blog.publicationDate}
              </p>
            </div>
          </div>
          <div className="relative h-96 w-full rounded-md overflow-hidden mb-8">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div
            className="prose dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <Separator className="my-8" />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex space-x-2">
            {blog.tags.map((tag, index) => (
              <Button key={index} variant="outline" className="px-3 py-1 rounded">
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.map((comment, index) => (
            <Card key={index} className="mb-4 flex items-center justify-center gap-2">
              <CardHeader className="flex items-center flex-row space-x-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.user} />
                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{comment.user}</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{comment.date}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-center">{comment.comment}</p>
              </CardContent>
            </Card>
          ))}
          <div className="mt-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2"
            />
            <Button onClick={handleAddComment}>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
