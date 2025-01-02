'use client';

import React from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/app/actions/blog';
import ProtectedAdminRoute from '@/app/components/ProtectedAdminRoute';
import { BlogPost } from '@/app/lib/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const result = await getBlogPosts({ published: false });
      if (result.success) {
        setPosts(result.data || []);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    // Logic to create a new blog post
  };

  const handleUpdate = async (id: string) => {
    // Logic to update a blog post
  };

  const handleDelete = async (id: string) => {
    // Logic to delete a blog post
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedAdminRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>
        <button onClick={handleCreate} className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Create New Post
        </button>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <div className="flex justify-between items-center">
                <span>{post.title}</span>
                <div>
                  <button onClick={() => handleUpdate(post.id)} className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedAdminRoute>
  );
} 