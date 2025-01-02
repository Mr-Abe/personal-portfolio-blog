'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth/AuthContext';
import BlogEditor from '@/app/components/blog/BlogEditor';
import { getBlogPost, updateBlogPost } from '@/app/actions/blog';
import { BlogPost } from '@/app/lib/types';

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!user) return;

      try {
        const result = await getBlogPost(params.slug);
        if (result.success) {
          if (result.data.author_id !== user.id) {
            setError('You do not have permission to edit this post');
            return;
          }
          setPost(result.data);
        } else {
          setError(result.error || null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [params.slug, user]);

  const handleSave = async (
    updatedPost: Omit<BlogPost, 'id' | 'author_id' | 'created_at' | 'updated_at' | 'author'>
  ) => {
    if (!user || !post) {
      setError('You must be logged in to edit this post');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await updateBlogPost(post.id, updatedPost, user.id);

      if (result.success) {
        router.push(`/blog/${updatedPost.slug}`);
      } else {
        setError(result.error || 'An error occurred while updating the post');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while updating the post');
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
              You must be logged in to edit blog posts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Error
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Post Not Found
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              The blog post you are trying to edit could not be found.
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
            Edit Blog Post
          </h1>
          <div className="mt-8">
            <BlogEditor post={post} onSave={handleSave} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
} 