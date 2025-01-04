import { getFeaturedBlogPosts, getRecentBlogPosts, getBlogPosts } from '../actions/blog';
import FeaturedBlogList from '../components/blog/FeaturedBlogList';
import RecentBlogList from '../components/blog/RecentBlogList';
import BlogList from '../components/blog/BlogList';
import Link from 'next/link';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const featuredPostsResult = await getFeaturedBlogPosts();
  const recentPostsResult = await getRecentBlogPosts(3);
  const olderPostsResult = await getBlogPosts({ page, pageSize: 6 });

  const totalPages = olderPostsResult.success ? Math.ceil((olderPostsResult.count || 0) / 6) : 0;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Posts
          </h2>
          {featuredPostsResult.success ? (
            <FeaturedBlogList posts={featuredPostsResult.data || []} />
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {featuredPostsResult.error || 'Failed to load featured blog posts'}
            </p>
          )}
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Recent Posts
          </h2>
          {recentPostsResult.success ? (
            <RecentBlogList posts={recentPostsResult.data || []} />
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {recentPostsResult.error || 'Failed to load recent blog posts'}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            All Posts
          </h2>
          {olderPostsResult.success ? (
            <>
              <BlogList posts={olderPostsResult.data || []} />
              {/* Pagination */}
              <div className="mt-10 flex justify-center">
                {page > 1 && (
                  <Link href={`/blog?page=${page - 1}`} className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white">
                    <div className="flex items-center -mx-1">
                      <span className="mx-1">previous</span>
                    </div>
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}`}
                    className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform rounded-md ${
                      page === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {page < totalPages && (
                  <Link href={`/blog?page=${page + 1}`} className="px-4 py-2 mx-1 text-gray-700 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white">
                    <div className="flex items-center -mx-1">
                      <span className="mx-1">Next</span>
                    </div>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {olderPostsResult.error || 'Failed to load blog posts'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}