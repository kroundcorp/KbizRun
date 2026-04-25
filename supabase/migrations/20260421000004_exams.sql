-- =====================================================
-- 4. 시험 / 문제은행
-- =====================================================

create table public.exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject_id uuid references public.subjects(id),
  duration_minutes integer not null,
  pass_score integer default 60,
  is_active boolean default true
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid references public.exams(id),
  subject_id uuid references public.subjects(id),
  type text not null check (type in ('multiple_choice','ox','short_answer')),
  question_text text not null,
  choices jsonb,
  correct_answer jsonb not null,
  explanation text,
  difficulty integer default 1,
  created_at timestamptz default now()
);

create table public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  exam_id uuid not null references public.exams(id),
  started_at timestamptz default now(),
  submitted_at timestamptz,
  score integer,
  passed boolean,
  answers jsonb
);
create index on public.exam_attempts (user_id, exam_id);
