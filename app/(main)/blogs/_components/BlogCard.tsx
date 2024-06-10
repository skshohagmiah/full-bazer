import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BlogPost, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BlogCard = ({ post }: { post: (BlogPost & {author:User}) }) => {
    return (
      <Card className="flex flex-col gap-2 md:flex-row rounded-lg overflow-hidden shadow-md">
        {/* Image */}
        <div className="md:w-1/3 relative aspect-[4/3] md:aspect-auto">
          <Image
            src={post.thumbnailImage || ''}
            alt={post.title}
            fill
            className="object-cover rounded-t-md md:rounded-l-md hover:scale-110 transition-all ease-in-out duration-300"
          />
        </div>
  
        {/* Content */}
        <div className="p-4 md:w-2/3 space-y-2">
          {/* Title and Category */}
          <Link
            href={`/blogs/${post.title}`}
            className="text-lg font-semibold hover:text-primary-500 dark:hover:text-primary-400 line-clamp-2"
          >
            {post.title}
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            By {post.author.name} on {post.createdAt.toDateString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {post.content}
          </p>
  
          {/* Read More Button */}
          <Link href={`/blogs/${post.title}`} className="mt-4 block">
            <Button variant="outline">Read More</Button>
          </Link>
        </div>
      </Card>
    );
  };

export default BlogCard