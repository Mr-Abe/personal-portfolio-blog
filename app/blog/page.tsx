import Link from 'next/link';
import { getBlogPosts } from '../actions/blog';
import BlogList from '../components/blog/BlogList';
import { useAuth } from '../lib/auth/AuthContext';

export default async function BlogPage() {
  const result = await getBlogPosts();

  if (!result.success) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Error
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {result.error || 'Failed to load blog posts'}
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Thoughts, tutorials, and insights about software development and my journey from medicine to tech.
              </p>
            </div>
            <Link
              href="/blog/new"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              New Post
            </Link>
          </div>
          <div className="mt-10 space-y-16 border-t border-gray-200 dark:border-gray-700 pt-10">
            <BlogList posts={result.data || []} />
          </div>
        </div>
      </div>
    </div>
  );
}