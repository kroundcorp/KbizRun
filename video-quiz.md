# 영상 강의 중간 문제 출제 기능 (In-Video Quiz)

## 개요

영상 강의 시청 중 특정 시점에 학습 내용 확인을 위한 퀴즈가 자동으로 출제되는 인터랙티브 학습 기능

---

## 핵심 개념

### 1. 큐포인트 (Cue Point)
- 영상 내 특정 타임스탬프에 퀴즈가 트리거되는 지점
- 강사가 영상 편집 시 또는 업로드 후 설정 가능
- 형식: `HH:MM:SS` (예: `00:05:30` → 5분 30초 지점)

### 2. 인터럽트 방식
| 방식 | 설명 | 사용 시점 |
|------|------|----------|
| **Hard Stop** | 영상 일시정지, 문제 풀이 필수 | 핵심 개념 확인 |
| **Soft Stop** | 팝업 표시, 건너뛰기 가능 | 복습용 |
| **Overlay** | 영상 위 미니 퀴즈 표시 | 간단한 O/X 확인 |

### 3. 진행 차단 (Gating)
- 정답률 미달 시 다음 섹션 이동 제한
- 설정 옵션: 필수 통과 / 권장 / 자유 진행

---

## 기능 명세

### 학습자 경험 (UX Flow)

```
[영상 시청 시작]
       │
       ▼
[큐포인트 도달] ──────► [영상 자동 일시정지]
       │                        │
       │                        ▼
       │               [문제 모달 표시]
       │               ┌─────────────────┐
       │               │ Q. 계약체결의   │
       │               │ 필수 요건은?    │
       │               │ ① 입찰보증금   │
       │               │ ② 계약보증금   │ ◄─ 선택
       │               │ ③ 하자보증금   │
       │               │ ④ 선급금       │
       │               └─────────────────┘
       │                        │
       │                 [정답 제출]
       │                        │
       │         ┌──────────────┴──────────────┐
       │         ▼                             ▼
       │    [정답 표시]                   [오답 표시]
       │    ✓ 정답!                       ✗ 오답
       │    +10pt                         해설 보기 →
       │         │                             │
       │         └──────────────┬──────────────┘
       │                        ▼
       │               [영상 자동 재생]
       ▼
[다음 큐포인트로 계속...]
```

### 강사/관리자 기능

1. **큐포인트 설정기** (Cue Point Editor)
   - 영상 타임라인에서 드래그앤드롭으로 퀴즈 위치 지정
   - 미리보기 기능
   - 일괄 등록 (CSV/JSON 업로드)

2. **문제 연결**
   - 기존 문제 은행에서 선택
   - 해당 시점에 새 문제 직접 생성
   - AI 자동 생성 (해당 구간 스크립트 기반)

3. **분석 대시보드**
   - 큐포인트별 정답률
   - 평균 응답 시간
   - 건너뛰기 비율
   - 재시청 구간 분석

---

## 데이터 모델

### 테이블: `video_quiz_cues`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | UUID | PK |
| `video_id` | UUID | FK → videos |
| `quiz_id` | UUID | FK → quizzes |
| `timestamp_sec` | INTEGER | 트리거 시점 (초) |
| `interrupt_type` | ENUM | 'hard' / 'soft' / 'overlay' |
| `is_required` | BOOLEAN | 필수 통과 여부 |
| `order_index` | INTEGER | 표시 순서 |
| `created_at` | TIMESTAMP | 생성일시 |

### 테이블: `video_quiz_responses`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → users |
| `cue_id` | UUID | FK → video_quiz_cues |
| `answer_id` | UUID | 선택한 답안 |
| `is_correct` | BOOLEAN | 정답 여부 |
| `response_time_ms` | INTEGER | 응답 소요 시간 |
| `skipped` | BOOLEAN | 건너뛰기 여부 |
| `created_at` | TIMESTAMP | 응답 일시 |

---

## 기술 구현

### 프론트엔드 (React)

```typescript
interface VideoCuePoint {
  id: string;
  timestampSec: number;
  quizId: string;
  interruptType: 'hard' | 'soft' | 'overlay';
  isRequired: boolean;
}

// Video Player Hook
const useVideoQuiz = (videoId: string) => {
  const [cuePoints, setCuePoints] = useState<VideoCuePoint[]>([]);
  const [currentCue, setCurrentCue] = useState<VideoCuePoint | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleTimeUpdate = (currentTime: number) => {
    const activeCue = cuePoints.find(
      cue => Math.abs(cue.timestampSec - currentTime) < 0.5
    );
    if (activeCue && !completedCues.has(activeCue.id)) {
      setCurrentCue(activeCue);
      setShowQuizModal(true);
      videoRef.current?.pause();
    }
  };

  return { cuePoints, currentCue, showQuizModal, handleTimeUpdate };
};
```

### 영상 플레이어 연동

| 플레이어 | 지원 방식 |
|----------|----------|
| **Video.js** | `timeupdate` 이벤트 + 커스텀 플러그인 |
| **React Player** | `onProgress` 콜백 활용 |
| **YouTube IFrame** | `YT.PlayerState` API 연동 |
| **Vimeo** | Player SDK `timeupdate` 이벤트 |

### API 엔드포인트

```
GET  /api/videos/{videoId}/cues       # 큐포인트 목록 조회
POST /api/videos/{videoId}/cues       # 큐포인트 생성
PUT  /api/cues/{cueId}                # 큐포인트 수정
DELETE /api/cues/{cueId}              # 큐포인트 삭제

POST /api/cues/{cueId}/responses      # 퀴즈 응답 제출
GET  /api/videos/{videoId}/analytics  # 분석 데이터 조회
```

---

## 사용자 시나리오

### 시나리오 1: 핵심 개념 확인

> **상황**: "계약의 종류" 강의 (15분)  
> **설정**: 5분, 10분 지점에 Hard Stop 퀴즈  
> **효과**: 주요 개념 학습 후 즉시 확인, 오답 시 구간 복습 유도

### 시나리오 2: 집중도 유지

> **상황**: 긴 이론 강의 (45분)  
> **설정**: 7분 간격으로 Soft Stop 퀴즈  
> **효과**: 지루함 방지, 학습자 참여 유도

### 시나리오 3: 자가 진단

> **상황**: 모의시험 대비 강의  
> **설정**: 각 문제 유형 설명 후 Overlay 퀴즈  
> **효과**: 실전 감각 훈련, 시험 형식 익숙해지기

---

## 기대 효과

| 지표 | 예상 효과 |
|------|----------|
| **학습 완료율** | +25~40% (인터랙션으로 이탈 감소) |
| **내용 이해도** | +30% (즉각적 피드백 효과) |
| **재시청률** | +15% (오답 구간 자동 안내) |
| **학습 시간** | 영상 시간 대비 +20% (퀴즈 풀이 시간) |

---

## 구현 우선순위

### Phase 1: MVP (2주)
- [ ] 기본 큐포인트 데이터 모델
- [ ] Hard Stop 방식 구현
- [ ] 단일 선택 문제 지원
- [ ] 정답/오답 즉시 피드백

### Phase 2: 확장 (2주)
- [ ] Soft Stop, Overlay 방식 추가
- [ ] 강사용 큐포인트 설정 UI
- [ ] 응답 데이터 저장

### Phase 3: 고도화 (2주)
- [ ] 분석 대시보드
- [ ] AI 문제 자동 생성 연동
- [ ] 적응형 학습 (오답 시 난이도 조절)
- [ ] 구간 반복 재생 기능

---

## 참고 자료

- [Kaltura In-Video Quizzing](https://corp.kaltura.com/video-solutions/video-quizzing/)
- [Panopto Interactive Videos](https://www.panopto.com/features/interactive-video/)
- [H5P Interactive Video](https://h5p.org/interactive-video)

---

*문서 작성일: 2026-04-20*  
*작성자: AI Coding Agent*
