-- Create profiles table that extends the auth.users table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blog posts table
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  author_id uuid references public.profiles(id) on delete cascade not null,
  published boolean default false,
  featured boolean default false,
  category text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text not null,
  content text,
  image_url text,
  github_url text,
  demo_url text,
  technologies text[],
  featured boolean default false,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contact messages table
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Published blog posts are viewable by everyone" on public.blog_posts
  for select using (published = true);

create policy "Blog posts are editable by author" on public.blog_posts
  for all using (auth.uid() = author_id);

create policy "Projects are viewable by everyone" on public.projects
  for select using (true);

create policy "Projects are editable by admin" on public.projects
  for all using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

-- Update contact message policies
drop policy if exists "Contact messages can be created by anyone" on public.contact_messages;
drop policy if exists "Contact messages are viewable by admin" on public.contact_messages;

create policy "Anyone can create contact messages" on public.contact_messages
  for insert to public
  with check (true);

create policy "Admin can view contact messages" on public.contact_messages
  for select to public
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

create policy "Admin can update contact messages" on public.contact_messages
  for update to public
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();