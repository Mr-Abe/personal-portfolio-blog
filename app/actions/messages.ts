'use server';

import { createClient } from '../lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getContactMessages({
  page = 1,
  limit = 10,
  sortBy = 'created_at',
  sortOrder = 'desc',
  search = '',
}: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}) {
  const supabase = await createClient();

  try {
    let query = supabase
      .from('contact_messages')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%,message.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order(sortBy as string, { ascending: sortOrder === 'asc' });
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching contact messages:', error);
      return { success: false, error: error.message, count: 0, data: [] };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch messages',
      count: 0,
      data: [],
    };
  }
}

export async function deleteContactMessage(id: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);

    if (error) {
      console.error('Error deleting contact message:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete message',
    };
  }
}

export async function markMessageAsRead(id: string, read: boolean) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read })
      .eq('id', id);

    if (error) {
      console.error('Error marking message as read/unread:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    console.error('Error marking message as read/unread:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark message as read/unread',
    };
  }
} 