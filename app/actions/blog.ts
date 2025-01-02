'use server';

import { createClient } from '../lib/supabase/server';
import { BlogPost } from '../lib/types';
import { revalidatePath } from 'next/cache';

export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'author_id' | 'created_at' | 'updated_at' | 'author'>,
  authorId: string
) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...post, author_id: authorId }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/blog');
    return { success: true, data };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create blog post',
    };
  }
}

export async function updateBlogPost(
  id: string,
  post: Omit<BlogPost, 'id' | 'author_id' | 'created_at' | 'updated_at' | 'author'>,
  authorId: string
) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('author_id', authorId)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update blog post',
    };
  }
}

export async function deleteBlogPost(id: string, authorId: string) {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .eq('author_id', authorId);

    if (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete blog post',
    };
  }
}

export async function getBlogPost(slug: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog post',
    };
  }
}

export async function getBlogPosts({ published = true } = {}) {
  const supabase = createClient();

  try {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (published) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts',
    };
  }
}