'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/app/lib/types';

interface RecentBlogListProps {
  posts: BlogPost[];
}

export default function RecentBlogList({ posts }: RecentBlogListProps) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="group relative">
          <div className="relative h-48 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75">
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <h3 className="mt-2 text-md font-semibold leading-6 text-gray-900 dark:text-white">
            <Link href={`/blog/${post.slug}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {post.excerpt || post.content.slice(0, 80)}...
          </p>
        </article>
      ))}
    </div>
  );
} 