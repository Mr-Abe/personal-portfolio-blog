'use server';

import { createClient } from '../lib/supabase/server';
import { ContactMessage } from '../lib/types';
import Joi from 'joi';

// Define a schema for validation
const contactMessageSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().trim().min(1).max(100).required(),
  message: Joi.string().trim().min(1).max(1000).required(),
});

export async function submitContactForm(formData: Omit<ContactMessage, 'id' | 'read' | 'created_at' | 'archived'>) {
  // Validate formData
  const { error: validationError, value: validatedData } = contactMessageSchema.validate(formData, { abortEarly: false });

  if (validationError) {
    console.error('Validation error:', validationError.details);
    return {
      success: false,
      error: 'Invalid input data. Please check your entries and try again.',
    };
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
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