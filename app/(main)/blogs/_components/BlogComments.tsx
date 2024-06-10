"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Comment, User } from "@prisma/client";
import React, { useState } from "react";

interface BlogCommentsProps {
  comments: (Comment & {
    user: User;
  })[];
}

const BlogComments = ({ comments }: BlogCommentsProps) => {
  const [comment, setComment] = useState("");

  const handleAddComment = () => {};

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map((comment, index) => (
        <Card
          key={index}
          className="mb-4 flex flex-col md:flex-row items-center justify-center gap-2"
        >
          <CardHeader className="flex items-center flex-row space-x-4">
            <Avatar>
              <AvatarImage
                src={comment.user.image || ""}
                alt={comment.user.name}
              />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{comment.user.name}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {comment.createdAt.toDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {comment.content}
            </p>
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
  );
};

export default BlogComments;
