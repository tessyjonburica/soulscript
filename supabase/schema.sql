-- Create the posts table
create table public.posts (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  excerpt text null,
  content text not null, -- HTML content
  cover_image text null,
  published boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint posts_pkey primary key (id),
  constraint posts_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create Policy: Everyone can view published posts
create policy "Public posts are viewable by everyone."
  on public.posts for select
  using ( published = true );

-- Create Policy: Authenticated users (Admin) can do everything
create policy "Admins can do everything."
  on public.posts for all
  using ( auth.role() = 'authenticated' );

-- Create bucket for images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

-- Policy for images: Public view
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- Policy for images: Admin upload
create policy "Admin Upload"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
