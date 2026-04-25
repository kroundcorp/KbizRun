-- =====================================================
-- 2. 교재 / 주문 / 결제 (Toss Payments)
-- =====================================================

create table public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  price integer not null,
  sale_price integer,
  stock integer default 0,
  cover_image_url text,
  description text,
  is_active boolean default true,
  published_at date,
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid not null references public.profiles(id),
  status text not null check (status in ('pending','paid','shipped','delivered','cancelled','refunded')),
  total_amount integer not null,
  recipient_name text not null,
  recipient_phone text not null,
  address_zipcode text not null,
  address_line1 text not null,
  address_line2 text,
  memo text,
  created_at timestamptz default now(),
  paid_at timestamptz,
  shipped_at timestamptz
);
create index on public.orders (user_id, created_at desc);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  book_id uuid not null references public.books(id),
  quantity integer not null check (quantity > 0),
  unit_price integer not null
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  toss_payment_key text unique,
  toss_order_id text unique,
  method text,
  status text not null,
  amount integer not null,
  approved_at timestamptz,
  raw_response jsonb,
  created_at timestamptz default now()
);
