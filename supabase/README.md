# Supabase Migrations

K-BizRun Supabase 스키마. 파일명은 `YYYYMMDDHHMMSS_설명.sql` 형식.

## 파일 구성

| 순서 | 파일 | 내용 |
|---|---|---|
| 1 | `20260421000001_auth_profiles.sql` | profiles, account_providers, term_agreements + 트리거 |
| 2 | `20260421000002_books_orders_payments.sql` | books, orders, order_items, payments |
| 3 | `20260421000003_lms.sql` | subjects, courses, lessons, enrollments, lesson_progress |
| 4 | `20260421000004_exams.sql` | exams, questions, exam_attempts |
| 5 | `20260421000005_banners_notices.sql` | banners, notices |
| 6 | `20260421000006_rls_policies.sql` | 모든 테이블 RLS + 정책 (가장 마지막에 적용) |

## 적용 방법

### A. Supabase CLI (권장)
```bash
npm i -g supabase
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push
```

### B. 대시보드 수동 실행
Supabase Dashboard → SQL Editor → 위 순서대로 파일 내용 복붙 실행

## 타입 생성 (적용 후)
```bash
supabase gen types typescript --project-id <PROJECT_REF> > src/types/database.ts
```
