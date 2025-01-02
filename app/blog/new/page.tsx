'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth/AuthContext';
import BlogEditor from '@/app/components/blog/BlogEditor';
import { createBlogPost } from '@/app/actions/blog';

export default function NewBlogPost() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (post: any) => {
    if (!user) {
      setError('You must be logged in to create a blog post');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createBlogPost(post, user.id);

      if (result.success) {
        router.push(`/blog/${post.slug}`);
      } else {
        setError(result.error || null);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while creating the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Access Denied
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              You must be logged in to create a blog post.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Create New Blog Post
          </h1>
          <div className="mt-8">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-300">
                {error}
              </div>
            )}
            <BlogEditor onSave={handleSave} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
} 