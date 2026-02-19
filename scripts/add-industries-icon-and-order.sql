-- Run this SQL in Supabase SQL Editor to add missing columns

-- Add icon column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' and table_name = 'services' and column_name = 'icon'
  ) then
    alter table public.services add column icon text;
  end if;
end $$;

-- Add order column if only order_index exists
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' and table_name = 'services' and column_name = 'order'
  ) then
    alter table public.services add column "order" int default 0;
  end if;
end $$;

-- Optional: backfill order from order_index when order is null
update public.services set "order" = coalesce("order", order_index, 0);


