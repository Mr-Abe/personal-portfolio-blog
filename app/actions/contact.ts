'use server';

import { createClient } from '../lib/supabase/server';
import { ContactMessage } from '../lib/types';

export async function submitContactForm(formData: Omit<ContactMessage, 'id' | 'read' | 'created_at'>) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          read: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit contact form. Please try again.',
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit contact form. Please try again.',
    };
  }
} 