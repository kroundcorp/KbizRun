-- =====================================================
-- 3. LMS (과목 / 강의 / 수강 / 진도)
-- =====================================================

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  description text,
  order_index integer default 0
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references public.subjects(id),
  title text not null,
  instructor text,
  total_lessons integer default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  video_url text,
  duration_seconds integer,
  order_index integer not null,
  is_free_preview boolean default false
);
create index on public.lessons (course_id, order_index);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  course_id uuid not null references public.courses(id),
  enrolled_at timestamptz default now(),
  expires_at timestamptz,
  unique(user_id, course_id)
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  lesson_id uuid not null references public.lessons(id),
  watched_seconds integer default 0,
  completed boolean default false,
  last_watched_at timestamptz default now(),
  unique(user_id, lesson_id)
);
