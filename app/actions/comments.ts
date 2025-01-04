'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getComments() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments').select('*');

  if (error) {
    console.error('Error getting comments:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deleteComment(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('comments').delete().eq('id', id);

  if (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/comments');
  return { success: true };
} 