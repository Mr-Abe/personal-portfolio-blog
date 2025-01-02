import { createBrowserClient } from '@supabase/ssr';
import { Database } from './database.types';
import { ContactMessage, Profile } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Blog post helpers
export async function getBlogPosts({ published = true } = {}) {
  const query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (published) {
    query.eq('published', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Project helpers
export async function getProjects({ featured = false } = {}) {
  const query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (featured) {
    query.eq('featured', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Contact form helper
export async function submitContactForm(message: Omit<ContactMessage, 'id' | 'created_at' | 'read' | 'archived'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ ...message, read: false, archived: false }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Profile helpers
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
} 