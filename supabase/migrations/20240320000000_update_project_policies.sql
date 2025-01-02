-- Drop existing policies
drop policy if exists "Projects are viewable by everyone" on public.projects;
drop policy if exists "Projects are editable by admin" on public.projects;

-- Create new policies
create policy "Projects are viewable by everyone" on public.projects
  for select using (true);

create policy "Anyone can create projects" on public.projects
  for insert to public
  with check (true);

create policy "Admin can update projects" on public.projects
  for update to public
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  ));

create policy "Admin can delete projects" on public.projects
  for delete to public
  using (auth.uid() in (
    select id from public.profiles where username = 'admin'
  )); 