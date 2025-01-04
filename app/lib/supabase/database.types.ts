export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string
          avatar_url: string | null
          website: string | null
          bio: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name: string
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string
          excerpt: string
          published: boolean
          author_id: string
          cover_image: string | null
          tags: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content: string
          excerpt: string
          published?: boolean
          author_id: string
          cover_image?: string | null
          tags?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          published?: boolean
          author_id?: string
          cover_image?: string | null
          tags?: string[]
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          content: string | null
          image_url: string | null
          github_url: string | null
          demo_url: string | null
          technologies: string[] | null
          featured: boolean
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          content?: string | null
          image_url?: string | null
          github_url?: string | null
          demo_url?: string | null
          technologies?: string[] | null
          featured?: boolean
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          content?: string | null
          image_url?: string | null
          github_url?: string | null
          demo_url?: string | null
          technologies?: string[] | null
          featured?: boolean
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          subject: string
          message: string
          read: boolean
          archived: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          subject: string
          message: string
          read?: boolean
          archived?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          read?: boolean
          archived?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 