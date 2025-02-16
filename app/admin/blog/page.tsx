import { getBlogPosts } from '@/app/actions/blog';
import BlogList from '@/app/components/blog/BlogList';
import Link from 'next/link';

export default async function AdminBlogPage() {
  const result = await getBlogPosts({ published: false });

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Blog Posts
          </h1>
          <Link
            href="/blog/new"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Post
          </Link>
        </div>
        <div className="mt-8">
          {result.success ? (
            <BlogList posts={result.data || []} showAuthor={false} />
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {result.error || 'Failed to load blog posts'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 