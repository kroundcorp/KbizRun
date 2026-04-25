-- =====================================================
-- 5. 배너 / 공지 (정적 데이터 DB화)
-- =====================================================

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  link_url text,
  bg_color text,
  start_date date,
  end_date date,
  order_index integer default 0,
  is_active boolean default true
);

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  is_pinned boolean default false,
  published_at timestamptz default now()
);
