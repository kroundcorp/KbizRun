# DESIGN.md

K-BizRun UI 디자인 시스템.

## 디자인 원칙

1. **신뢰 우선** — 국가자격증 교육 플랫폼. 과한 애니메이션/현란한 색보다 정돈된 여백과 타이포가 우선.
2. **Toss 스타일 미니멀** — 파란 primary, 부드러운 radius, 충분한 여백, 두꺼운 본문 폰트.
3. **정보 밀도 vs 공백의 균형** — Home은 카드 레이아웃으로 많은 정보를 담되 그리드 간격 `gap-6` 유지.
4. **가독성 최우선** — 본문 14~15px, 카드 제목은 font-bold 이상.

## 컬러 시스템

### Primary (브랜드)
- **파랑 `#2563eb`** (blue-600) — CTA 버튼, 포커스 링, 링크 호버, 강조 텍스트
- **네이비 `#1e3a8a`** (blue-900) — 이벤트 배너 배경, 어두운 강조

### 서브 (히어로/배너별 톤)
| 색상 | Hex | 용도 |
|---|---|---|
| Purple | `#37257a` | 히어로 배너 1 (신규가입 이벤트) |
| Indigo | `#1e40af` | 배너 (무료 모의고사) |
| Teal | `#0f766e` | 배너 (멘토링) |
| Red | `#b91c1c` | 배너 (할인), 경고 |
| Violet | `#6d28d9` | 배너 (커리큘럼) |

### 중립
- 배경 전역: `#f8f9fa`
- 카드 배경: `#ffffff`
- 보더: `gray-100` / `gray-200`
- 본문: `gray-700` / `gray-800`
- 보조 텍스트: `gray-500`
- 푸터 배경: `#1e293b` (slate-800)
- 최상단 배너: `#1a103c` (딥 퍼플)

### 상태
- 성공/완료: `green-500` / `green-600`
- 경고/주의: `amber-500` / `#fff8d6` 배경
- 에러: `red-500`, 테두리 `red-300`

### 소셜 브랜드
- 카카오: `#FEE500` bg + `#3c1e1e` text
- 네이버: `#03C75A`
- 구글: 화이트 + `gray-200` 보더

## 타이포그래피

- 기본 폰트: **시스템 sans** (`font-sans` — Tailwind 기본)
- 제목:
  - H1 페이지 타이틀: `text-3xl md:text-4xl font-black`
  - H2 섹션: `text-2xl font-bold`
  - 카드 제목: `text-lg font-bold`
- 본문: `text-[15px] leading-7` 또는 `text-sm` (14px)
- 소형 메타: `text-xs` (12px)
- **tabular-nums** 사용: 숫자 카운터 (배너 N/M, 가격)

## 간격 & 그리드

- 페이지 컨테이너: `max-w-[1200px] mx-auto px-4`
- 섹션 간: `py-8` ~ `py-12`
- 카드 간: `gap-6`
- 카드 내부 패딩: `p-5` (작은), `p-6`(기본), `p-8`(큰)

## 반경 (Border Radius)

| 크기 | 클래스 | 용도 |
|---|---|---|
| sm | `rounded-md` (6px) | 칩, 작은 배지 |
| md | `rounded-lg` (8px) | 2차 버튼, 입력 필드 (일부) |
| lg | `rounded-xl` (12px) | 알림 박스 |
| xl | `rounded-2xl` (16px) | **카드(기본)** + 입력 필드 |
| 2xl | `rounded-3xl` (24px) | 모달 본체, 히어로 카드 |
| full | `rounded-full` | 필/카운터/아이콘 버튼 |

## 섀도우

- 기본 카드: `shadow-sm`
- 선택/호버 카드: `shadow-xl shadow-blue-100` (블루 그림자)
- 모달: `shadow-2xl`
- CTA 버튼: `shadow-lg shadow-blue-500/20` (컬러 섀도우)

## 컴포넌트 패턴

### 기본 카드
```tsx
<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
  ...
</div>
```

### CTA 버튼 (Primary)
```tsx
<button className="bg-[#2563eb] text-white font-bold py-4 rounded-2xl
                   hover:bg-blue-700 transition-all active:scale-[0.98]
                   shadow-lg shadow-blue-500/20">
  가입하기
</button>
```

### Secondary 버튼
```tsx
<button className="bg-white text-[#2563eb] border-2 border-[#2563eb]
                   font-bold py-4 rounded-xl hover:bg-blue-50">
  자세히 보기
</button>
```

### Disabled 버튼
```tsx
<button disabled
        className="bg-gray-200 text-gray-400 cursor-not-allowed">
```

### 입력 필드 (기본)
```tsx
<div className="relative">
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input className="w-full bg-gray-50 border border-gray-200 rounded-2xl
                    py-4 pl-12 pr-4
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    focus:border-blue-500 transition-all" />
</div>
```

### 에러 상태 입력
- 보더: `border-red-300`
- 포커스 링: `focus:ring-red-500/20 focus:border-red-500`
- 아래 헬퍼 텍스트: `text-xs text-red-500` + `AlertCircle` 아이콘

### 배지
```tsx
<span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
  현행
</span>
```

### 알림 배너 (4가지 톤)
| 종류 | 배경 | 보더 | 텍스트 | 아이콘 |
|---|---|---|---|---|
| Info (파랑) | `bg-blue-50` | `border-blue-100` | `text-blue-800` | `Info` |
| Warning (노랑) | `bg-yellow-50` | `border-yellow-200` | `text-yellow-800` | `AlertCircle` |
| Conflict (amber) | `bg-amber-50` | `border-amber-200` | `text-amber-900` | `AlertCircle` |
| Error (빨강) | `bg-red-50` | `border-red-200` | `text-red-700` | `AlertCircle` |

## 모달 레이어

동시에 여러 모달이 뜰 수 있으니 z-index 중첩 규칙:

| 모달 | z-index | 용도 |
|---|---|---|
| AuthModal | `z-50` | 로그인/가입 |
| AllBannersModal | `z-[55]` | 히어로 배너 전체보기 |
| LegalDocModal | `z-[60]` | 약관 보기 (AuthModal 위에도 올라감) |

**공통 구조:**
- 백드롭: `bg-black/60` ~ `black/70` + `backdrop-blur-sm`
- motion 진입: `scale: 0.95, y: 20` → `scale: 1, y: 0`
- 최대 크기: 폼형 `max-w-[480px]`, 문서형 `max-w-[720~880px]`
- 스크롤: `max-h-[85~90vh] flex flex-col`, 내부 `overflow-y-auto custom-scrollbar`

## 아이콘

- 라이브러리: **lucide-react** 단독 (다른 아이콘 셋 섞지 말 것)
- 기본 크기: `h-5 w-5` (20px), 소형 `h-4 w-4`, 아주 작음 `h-3 w-3`
- 텍스트와 함께 쓸 때: `flex items-center gap-2` + 색상 매칭

## 애니메이션

- 진입/퇴장: **motion** (framer-motion) — 모달/토글류
- 호버: `transition-colors` / `transition-transform` + `hover:` 유틸리티
- 클릭 반응: `active:scale-[0.98]` (CTA에만)

## 반응형 브레이크포인트

현재 코드 대부분 데스크톱 우선. 모바일 점검 필요(Phase 1 P4).

| 접두어 | 최소 폭 | 용도 |
|---|---|---|
| (기본) | 0 | 모바일 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크톱 |

그리드 패턴: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## 스크롤바

커스텀 스크롤바(얇은 회색) 사용 시 `custom-scrollbar` 클래스 (정의: `src/index.css`).

## 폼 검증 UX (P1 완료)

- 필드 `blur` 후에만 에러 표시 (타이핑 중에는 숨김)
- 에러: 보더 + 아래 헬퍼 텍스트 2단 표시
- 비밀번호 강도: 입력 시작되면 4개 체크 리스트(8자·영문·숫자·특수) 실시간 점등
- 제출 버튼: 유효성 전체 통과 시에만 활성화
- 제출 중: `<Loader2 className="animate-spin" />` + 버튼 잠금

## 아이콘 & 이모지 사용 규칙

- 코드 편집/사용자 UI에서 **절대 임의 이모지 추가 금지** (단, 교재 표지/과목 인덱스처럼 디자인 요소로 사전 계획된 건 제외)
- 상태 표시는 lucide 아이콘으로 통일 (`Check`, `AlertCircle`, `Info`, `X`, `ChevronRight` 등)

## 접근성 (추후 점검 필요)

- 모든 클릭 가능 요소에 `type="button"` (form submit 방지)
- 아이콘 전용 버튼에 `aria-label`
- 모달: Escape 닫기 지원 (LegalDocModal, AllBannersModal 구현됨)
- 색 대비: 회색 텍스트(`gray-400` 이하)는 장식용으로만

## 폰트 로딩

별도 웹폰트 미사용. 시스템 폰트(`-apple-system`, `"Segoe UI"`, `Roboto`...) 사용. 필요 시 `Pretendard` 도입 고려 (Phase 2).

## 브랜드 자산

- 로고: `public/logo.png` (헤더/푸터 공용). 다크 배경에서는 `brightness-0 invert opacity-90` 필터
- 교수 사진: `public/hong.png` (**최적화 필요**)

## 변경 시 주의

- 색상 추가 전: 이미 정의된 팔레트에서 재사용 가능한지 먼저 확인
- 새 반경/섀도우/패딩 수치 금지 — 위 표의 값만 사용
- 새 컴포넌트 패턴 만들기 전: `AuthModal`, `HeroBanner`, `LegalDocView` 참고해 일관성 유지
