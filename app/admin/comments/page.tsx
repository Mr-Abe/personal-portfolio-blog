'use client';

import React from 'react';
import { getComments, deleteComment } from '@/app/actions/comments';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export default async function AdminCommentsPage() {
  const result = await getComments();

  const handleDelete = async (id: string) => {
    const deleteResult = await deleteComment(id);
    if (deleteResult.success) {
      revalidatePath('/admin/comments');
    } else {
      console.error('Error deleting comment:', deleteResult.error);
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Comments
        </h1>
        <div className="mt-8">
          {result.success && result.data && result.data.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {result.data.map((comment) => (
                <li key={comment.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.author}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.message}
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {result.success ? 'No comments found' : result.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 