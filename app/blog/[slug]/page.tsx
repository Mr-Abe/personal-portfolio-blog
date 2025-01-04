import { notFound } from 'next/navigation';
import { getBlogPost } from '../../actions/blog';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import YouTube from 'react-youtube';

const extractVideoId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const result = await getBlogPost(params.slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <article>
            <header>
              <div className="relative">
                {post.image_url ? (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover dark:bg-gray-800"
                  />
                ) : (
                  <div className="h-12 w-full rounded-2xl bg-gray-100 dark:bg-gray-800" />
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.created_at} className="text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                  {post.category && (
                    <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                      {post.category}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                {post.author && (
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {post.author.avatar_url ? (
                        <Image
                          src={post.author.avatar_url}
                          alt={post.author.full_name || post.author.username || ''}
                          className="h-10 w-10 rounded-full"
                          width={40}
                          height={40}
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
              </div>
            </header>

            <div className="mt-16 prose dark:prose-invert max-w-none">
              {post.youtube_url && (
                <div className="aspect-w-16 aspect-h-9 mb-8">
                  <YouTube videoId={extractVideoId(post.youtube_url) || ''} opts={{ width: '100%', playerVars: { modestbranding: 1 } }} />
                </div>
              )}
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