'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../lib/supabase/server';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the user is an admin
  if (!user || user.user_metadata.role !== 'admin') {
    redirect('/'); // Or redirect to a "not authorized" page
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Welcome to the admin dashboard. Here you can manage blog posts, projects, and comments.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/blog"
            className="group relative block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-8 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Posts</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your blog posts. Create, edit, and delete posts.
            </p>
          </a>
          <a
            href="/admin/projects"
            className="group relative block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-8 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your projects. Create, edit, and delete projects.
            </p>
          </a>
          <a
            href="/admin/comments"
            className="group relative block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-8 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comments</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage comments on your blog posts. Approve or delete comments.
            </p>
          </a>
          <a
            href="/admin/messages"
            className="group relative block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-8 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage contact messages. View and delete messages.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
} 