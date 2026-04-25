-- =====================================================
-- 6. RLS 정책
-- =====================================================

-- 개인 소유 테이블: RLS 활성화
alter table public.profiles          enable row level security;
alter table public.account_providers enable row level security;
alter table public.term_agreements   enable row level security;
alter table public.orders            enable row level security;
alter table public.order_items       enable row level security;
alter table public.payments          enable row level security;
alter table public.enrollments       enable row level security;
alter table public.lesson_progress   enable row level security;
alter table public.exam_attempts     enable row level security;

-- 공개 읽기 테이블: RLS 활성화 + SELECT 허용
alter table public.books    enable row level security;
alter table public.subjects enable row level security;
alter table public.courses  enable row level security;
alter table public.lessons  enable row level security;
alter table public.exams    enable row level security;
alter table public.banners  enable row level security;
alter table public.notices  enable row level security;

-- ---------- 본인 소유 ----------
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own providers" on public.account_providers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own agreements" on public.term_agreements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own orders read" on public.orders
  for select using (auth.uid() = user_id);

create policy "own orders insert" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "own order items" on public.order_items
  for select using (exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  ));

create policy "own payments" on public.payments
  for select using (exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  ));

create policy "own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

create policy "own progress" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own attempts" on public.exam_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- 공개 읽기 ----------
create policy "public read books" on public.books
  for select using (is_active = true);

create policy "public read subjects" on public.subjects
  for select using (true);

create policy "public read courses" on public.courses
  for select using (is_published = true);

create policy "public read lessons" on public.lessons
  for select using (true);

create policy "public read exams" on public.exams
  for select using (is_active = true);

create policy "public read banners" on public.banners
  for select using (
    is_active = true
    and (start_date is null or start_date <= current_date)
    and (end_date   is null or end_date   >= current_date)
  );

create policy "public read notices" on public.notices
  for select using (true);
