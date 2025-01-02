import React from 'react';

export default function BlogPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights about software development and my journey from medicine to tech.
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 dark:border-gray-700 pt-10">
            {/* Placeholder blog posts - To be replaced with actual data from Supabase */}
            {[1, 2, 3].map((i) => (
              <article key={i} className="flex max-w-xl flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime="2024-01" className="text-gray-500">
                    January 2024
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                    Web Development
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    <a href={`/blog/post-${i}`}>
                      <span className="absolute inset-0" />
                      Sample Blog Post {i}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    This is a placeholder for a blog post about software development, career transition,
                    or technical tutorials. This will be replaced with actual content from Supabase.
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      <span className="absolute inset-0" />
                      Author Name
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">Software Engineer</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 