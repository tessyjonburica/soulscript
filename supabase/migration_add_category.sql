-- Add category column to posts table
alter table public.posts add column category text default 'General';
