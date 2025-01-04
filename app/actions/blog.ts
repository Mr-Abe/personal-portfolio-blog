'use server';

import { createClient } from '../lib/supabase/server';
import { BlogPost } from '../lib/types';
import { revalidatePath } from 'next/cache';

export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'author_id' | 'created_at' | 'updated_at' | 'author'>,
  authorId: string
) {
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        *,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `
      )
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

export async function getFeaturedBlogPosts() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        *,
        image_url,
        youtube_url,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `
      )
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured blog posts:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch featured blog posts',
    };
  }
}

export async function getRecentBlogPosts(limit: number = 3) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        `
        *,
        image_url,
        youtube_url,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `
      )
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent blog posts:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch recent blog posts',
    };
  }
}

export async function getBlogPosts({ page = 1, pageSize = 6, published }: { page?: number; pageSize?: number; published?: boolean } = {}) {
  const supabase = await createClient();

  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('blog_posts')
      .select(
        `
        *,
        author:profiles(
          id,
          username,
          full_name,
          avatar_url
        )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(from, to);

    if (published !== undefined) {
      query = query.eq('published', published);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data, count: count !== null ? count : 0 };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts',
    };
  }
}