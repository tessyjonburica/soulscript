-- Create categories table
create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  created_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.categories enable row level security;

-- Create Policy: Everyone can view categories
create policy "Categories are viewable by everyone."
  on public.categories for select
  using ( true );

-- Create Policy: Authenticated users (Admin) can manage categories
create policy "Admins can manage categories."
  on public.categories for all
  using ( auth.role() = 'authenticated' );

-- Insert default categories
insert into public.categories (name, slug)
values 
  ('Content Strategy', 'content-strategy'),
  ('Conversion Copywriting', 'conversion-copywriting'),
  ('SEO Writing', 'seo-writing'),
  ('Brand Voice', 'brand-voice');
