'use server';

import { createClient } from '../lib/supabase/server';
import { Project } from '../lib/types';
import { revalidatePath } from 'next/cache';

export async function createProject(
  project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/portfolio');
    return { success: true, data };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create project',
    };
  }
}

export async function updateProject(
  id: string,
  project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...project, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${project.slug}`);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update project',
    };
  }
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/portfolio');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete project',
    };
  }
}

export async function getProject(slug: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch project',
    };
  }
}

export async function getProjects() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch projects',
    };
  }
} 