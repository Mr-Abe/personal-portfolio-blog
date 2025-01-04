'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/lib/auth/AuthContext';
import { BlogPost } from '@/app/lib/types';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id' | 'author_id' | 'created_at' | 'updated_at' | 'author'>) => Promise<void>;
  isSubmitting?: boolean;
}

export default function BlogEditor({ post, onSave, isSubmitting = false }: BlogEditorProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category || '',
    tags: post?.tags?.join(', ') || '',
    published: post?.published || false,
    featured: post?.featured || false,
    image_url: post?.image_url || '',
    youtube_url: post?.youtube_url || '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await onSave({
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      tags,
      published: formData.published,
      featured: formData.featured,
      image_url: formData.image_url,
      youtube_url: formData.youtube_url,
    });
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-900 dark:text-white">
            Slug
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-900 dark:text-white">
            Excerpt
          </label>
          <div className="mt-2">
            <textarea
              name="excerpt"
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-900 dark:text-white">
            Content
          </label>
          <div className="mt-2 prose dark:prose-invert max-w-none">
            <SimpleMDE
              value={formData.content}
              onChange={handleContentChange}
              options={{
                spellChecker: false,
                status: false,
                minHeight: '300px',
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            YouTube URL
          </label>
          <input
            type="text"
            id="youtubeUrl"
            name="youtube_url"
            value={formData.youtube_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-900 dark:text-white">
            Tags (comma-separated)
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
              Published
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800"
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
              Featured
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`ml-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isSubmitting && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
} 