export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id: string;
  author?: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
  published: boolean;
  featured: boolean;
  category?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  image_url: string | null;
  youtube_url: string | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  technologies: string[];
  featured: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export type AuthUser = {
  id: string;
  email?: string;
  user_metadata: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
  isAdmin?: boolean;
};

export interface Comment {
  id: string;
  post_id: string;
  author: string;
  message: string;
  created_at: string;
}