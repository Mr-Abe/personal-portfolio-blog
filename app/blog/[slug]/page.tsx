import { getBlogPost } from '@/app/actions/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await getBlogPost(params.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col items-start">
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
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              )}
              {post.author && (
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
            </header>

            <div className="mt-16 prose dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                ← Back to blog
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 