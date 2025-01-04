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

-- Enable Row Level Security (RLS) for projects
alter table public.projects enable row level security;

-- Create policies for projects
create policy "Projects are viewable by everyone" on public.projects
  for select using (true);

create policy "Admin can create projects" on public.projects
  for insert to authenticated
  with check (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

create policy "Admin can update projects" on public.projects
  for update to authenticated
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

create policy "Admin can delete projects" on public.projects
  for delete to authenticated
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  )); 