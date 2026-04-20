# CLAUDE.md

K-BizRun 프로젝트에서 Claude Code가 따라야 할 지침입니다.

## 프로젝트 개요

**K-Biz Run (kbizrun.com)** — 공공조달관리사 국가자격증 LMS 플랫폼
운영: (주)케이비즈글로벌교육원 (대표: 홍성석)

## 기술 스택

- **빌드/런타임**: Vite 6 + React 19 + TypeScript 5.8
- **라우팅**: React Router DOM 7
- **스타일**: Tailwind CSS 4 (`@tailwindcss/vite` 플러그인, JIT)
- **아이콘**: lucide-react
- **애니메이션**: motion (구 framer-motion)
- **AI SDK (선택)**: @google/genai

**백엔드/DB 없음.** 모든 데이터는 `src/data/*.ts`의 정적 모듈 또는 `public/`의 md 파일에서 가져옵니다. Phase 2에서 Supabase + Toss Payments 연동 예정.

## 개발 명령

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run preview
npm run lint     # tsc --noEmit
```

**AI=1 환경변수**: `AI=1 npm run build` 같이 접두어를 붙여서 실행할 수 있게 되어 있지만, 이 리포엔 별도 처리 로직이 없습니다. 일반 실행으로 충분합니다.

## 디렉터리 구조

```
src/
├── App.tsx                  # 라우트 정의, Header/Footer/SiteChrome
├── main.tsx                 # React 엔트리
├── index.css                # Tailwind import + 커스텀 스크롤바만
├── components/              # 재사용 컴포넌트 (AuthModal, HeroBanner, LegalDocView, LegalDocModal)
├── pages/                   # 페이지 컴포넌트
│   └── admin/              # 관리자 페이지 (인증 가드 없음, Phase 2 P2에서 추가)
├── data/                    # 정적 데이터 모듈 (subjects, books, terms, banners, ...)
└── lib/                     # 유틸 (validation 등)

public/
├── logo.png
├── hong.png                 # 교수 사진 (9.3MB — 최적화 필요)
└── terms/                   # 이용약관/개인정보/마케팅 md 문서 (버전 파일명: <type>-YYYY-MM-DD.md)
```

## 핵심 정책 (변경 금지)

### 1. 인증 — A안 (계정 연결, account linking)

**이메일 1개 = 유저 1개.** 여러 로그인 수단(이메일/카카오/네이버/구글)이 같은 이메일로 들어오면 하나의 계정에 링크.

- 첫 가입 시 사용한 방식이 primary provider
- 다른 방식으로 접근 시: "이미 {primary provider}로 가입된 이메일입니다" 안내 후 로그인 성공 시 링크
- 프론트 mock: `src/lib/validation.ts`의 `mockExistingAccounts` — Phase 2에서 Supabase 조회로 교체

### 2. 약관 버전 관리

약관이 개정되어도 **이전 버전 상시 조회 가능**해야 합니다.

- 새 버전 추가: `public/terms/<docType>-YYYY-MM-DD.md` 생성 + `src/data/terms.ts`의 배열에 항목 추가 + 이전 항목의 `isCurrent`를 `false`로
- `LegalDocView` 컴포넌트가 자동으로 드롭다운에 노출
- 현재 3종: `terms`, `privacy`, `marketing` — 모두 2026-04-01 버전

### 3. 이번 단계 범위 — 프론트엔드만 완성

백엔드/DB/실결제/OAuth/SMS는 **Phase 2**. 현재는 UI 완성도 + mock 데이터 기반 데모가 목표.

결제 진입점: `src/pages/BookDetail.tsx::handlePurchase` (현재 "준비중" 안내만)
소셜 로그인 진입점: `src/components/AuthModal.tsx::handleSocialDemo` (현재 안내만)

## 코딩 컨벤션

- **TypeScript strict 모드.** 모든 prop 타입 명시.
- **함수형 컴포넌트 + hooks.** 클래스 컴포넌트 사용 금지.
- **Tailwind 유틸리티 우선.** 인라인 `style={}`는 동적 색상(배너 배경 등) 같은 불가피한 경우에만.
- **주석 최소화.** 의도가 자명하지 않을 때만. 파일별 헤더 주석 금지.
- **파일명**: 컴포넌트는 PascalCase, 유틸/데이터는 camelCase.
- **상수 텍스트는 한국어** (운영 서비스 언어).

## 자주 하는 실수 (지양)

- ❌ 약관 문서를 코드에 하드코딩 — **항상 `public/terms/*.md`를 fetch해서 렌더**
- ❌ 새 페이지 만들 때 `Header`/`Footer`를 중복 배치 — `App.tsx`의 `SiteChrome`이 처리
- ❌ 모달 z-index를 임의 지정 — AuthModal은 z-50, LegalDocModal은 z-[60] (중첩 전제), AllBannersModal은 z-[55]
- ❌ Admin 경로 `/admin/*` 추가할 때 인증 가드 없이 배포 — 현재 가드 없음, 민감 기능 넣지 말 것
- ❌ `public/hong.png` (9.3MB) 같은 대용량 원본 커밋 — WebP/리사이즈 후 사용

## 레이아웃 규칙

- 페이지 기본 컨테이너: `max-w-[1200px] mx-auto px-4`
- 배경색: 전역 `bg-[#f8f9fa]` (App.tsx), 카드는 `bg-white`
- 시험/관리자 페이지는 Header/Footer 숨김 (`App.tsx::SiteChrome` 로직 참조)

## 변경이 잦은 정책

아래는 빠르게 바뀔 수 있으니 수정 전 확인:

- **푸터 사업자 정보** (`src/App.tsx::Footer`): 통신판매업 신고번호, 주소, 전화번호
- **이벤트 배너 문구** (`src/data/banners.ts`): 프로모션 기간
- **교재 가격/재고** (`src/data/books.ts`): 현재 더미 4종

## 작업 체크리스트

새 기능/페이지 추가 시:
1. [ ] `src/data/`에 정적 데이터 모듈 추가 (필요하면)
2. [ ] `src/pages/`에 페이지 컴포넌트
3. [ ] `src/App.tsx`에 `<Route>` 등록
4. [ ] Header nav / Home 카드 / Footer 링크 중 필요한 곳 연결
5. [ ] `npm run lint` (tsc --noEmit) 통과
6. [ ] `npm run build` 성공
7. [ ] `DESIGN.md` 스타일 가이드 준수 확인

## 로드맵 (상세: `KBizRun_기능정의서_v3.0.md`)

- **Phase 1 (~2026-05)**: 프론트 완성 (P1 가입폼 완료 / P2~P4 진행 중)
- **Phase 2 (2026-05)**: Supabase + Toss Payments + OAuth
- **Phase 3 (2026-06)**: QA, 콘텐츠, 정식 오픈

## 참고 문서

- `KBizRun_기능정의서_v3.0.md` — 전체 기능 정의 + v2.0 대비 변경 이력
- `DESIGN.md` — UI 디자인 시스템, 컬러/타이포/컴포넌트 패턴
- `public/terms/*.md` — 법적 문서 원본

## 문의

- 기획/사업: 홍성석 CEO
- 기술: 안세일 본부장
- 백엔드: 조동화
- 고객센터: 1600-5933 / contact@kbizrun.com
