'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth/AuthContext';
import { BlogPost } from '@/app/lib/types';

interface BlogListProps {
  posts: BlogPost[];
  showAuthor?: boolean;
}

export default function BlogList({ posts, showAuthor = true }: BlogListProps) {
  const { user } = useAuth();

  return (
    <div className="space-y-16">
      {posts.map((post) => (
        <article key={post.id} className="flex max-w-xl flex-col items-start">
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post.created_at} className="text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.category && (
              <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                {post.category}
              </span>
            )}
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {post.excerpt || post.content.slice(0, 160) + '...'}
            </p>
          </div>
          {showAuthor && post.author && (
            <div className="relative mt-8 flex items-center gap-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {post.author.avatar_url ? (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.full_name || post.author.username || ''}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    {(post.author.username?.[0] || 'A').toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {post.author.full_name || post.author.username}
                </p>
              </div>
            </div>
          )}
          {user?.id === post.author_id && (
            <div className="mt-4 flex gap-x-2">
              <Link
                href={`/blog/edit/${post.slug}`}
                className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Edit
              </Link>
              {!post.published && (
                <span className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Draft
                </span>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
} 