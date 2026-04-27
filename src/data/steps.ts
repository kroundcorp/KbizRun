export type StepColor = 'blue' | 'orange' | 'green' | 'red';

export interface StepResource {
  title: string;
  type: 'pdf' | 'video' | 'exam' | 'note';
  size?: string;
}

export interface Step {
  id: string;
  order: number;
  stepLabel: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  color: StepColor;
  tags: string[];
  examCount: number | null;
  period: string;
  recommendedFor: string[];
  goals: string[];
  howToUse: string[];
  suggestedSubjectIds: string[];
  resources: StepResource[];
  nextStepId?: string;
  prevStepId?: string;
}

export const steps: Step[] = [
  {
    id: 'theory',
    order: 1,
    stepLabel: 'STEP 01',
    title: '이론학습',
    subtitle: '법령 이해부터 구조화까지',
    description:
      '공공조달의 뼈대를 이루는 국가계약법·시행령·시행규칙과 계약예규의 위계를 이해하고, 과목별 핵심 개념을 구조화합니다. 뒤에 이어질 영역별 학습과 실전대비의 기반이 되는 단계입니다.',
    tagline: '기초를 다지는 첫 단계',
    color: 'blue',
    tags: ['처음 영역 진입', '헷갈리는 법규 정리'],
    examCount: 13000,
    period: '학습 초반 2~3주',
    recommendedFor: [
      '공공조달관리사 시험이 처음이신 분',
      '법령 구조가 헷갈리는 분',
      '기본서를 어디부터 봐야 할지 막막한 분',
    ],
    goals: [
      '국가계약법 체계 (법·시행령·시행규칙·예규)를 한 눈에 이해',
      '8개 과목의 핵심 용어와 기본 개념 구조화',
      '조달·계약 실무의 큰 그림을 잡고 뒤 단계로 이어가기',
    ],
    howToUse: [
      '추천 과목 순서대로 기본 강의를 시청합니다.',
      '강의 중간 퀴즈(In-Video Quiz)로 주요 개념을 즉시 확인합니다.',
      '핵심 요약 PDF를 출력하여 마무리 복습용으로 활용합니다.',
    ],
    suggestedSubjectIds: ['procurement-laws', 'contract-general'],
    resources: [
      { title: '8과목 핵심 요약집 v1.0', type: 'pdf', size: '3.4MB' },
      { title: '조달법규 1강 ~ 4강 (법령 체계 개관)', type: 'video' },
      { title: '법령 구조 한 눈에 보기 (노트)', type: 'note' },
    ],
    nextStepId: 'by-area',
  },
  {
    id: 'by-area',
    order: 2,
    stepLabel: 'STEP 02',
    title: '영역별 학습',
    subtitle: '동일 유형을 난이도별로 풀며',
    description:
      '이론학습에서 배운 내용을 영역별로 쪼개어 난이도 점진 상승 방식으로 훈련합니다. AI가 출제 기준과 최신 법령을 반영해 만든 예상·유사 문제를 풀며 유형 감을 잡는 단계입니다.',
    tagline: '점진적으로 실력 향상',
    color: 'orange',
    tags: ['유형별 감 잡기', '풀이 패턴 익히기'],
    examCount: 82000,
    period: '학습 중반 3~5주',
    recommendedFor: [
      '이론 1회독은 마쳤지만 문제 풀이가 낯선 분',
      '약점 영역을 집중적으로 보강하고 싶은 분',
      '동일 유형을 반복해 자동 반응 속도를 높이고 싶은 분',
    ],
    goals: [
      '과목·영역별 출제 패턴을 몸에 익히기',
      '난이도 1(쉬움) → 3(어려움) 순차 풀이로 성장 곡선 확보',
      '오답노트 자동 누적으로 약점 영역 시각화',
    ],
    howToUse: [
      '영역별 예상문제 세트부터 시작하여 난이도 1 → 3 순으로 풀이합니다.',
      '틀린 문제는 자동으로 오답노트에 누적되며, 해설 영상으로 복습합니다.',
      '같은 유형 AI 변형 문제로 풀이 자동 반응 속도를 올립니다.',
    ],
    suggestedSubjectIds: ['cost-calculation', 'bidding-practice', 'contract-review'],
    resources: [
      { title: '영역별 예상문제집', type: 'exam' },
      { title: 'AI 변형문제 세트 ×20회', type: 'exam' },
      { title: '자주 틀리는 조문 정리 v2.0', type: 'pdf', size: '2.1MB' },
    ],
    prevStepId: 'theory',
    nextStepId: 'practice',
  },
  {
    id: 'practice',
    order: 3,
    stepLabel: 'STEP 03',
    title: '실전대비',
    subtitle: '실전에 강해지는',
    description:
      '시험 1~2주 전 실전 감각을 최대치로 끌어올리는 단계입니다. 최다빈출 문제와 고난도 문제로 구성된 32,500+ 실전 문제를 시간 제한 모드로 풀며 시험장과 동일한 환경을 경험합니다.',
    tagline: '최다빈출/고난도 문제 집중 훈련',
    color: 'green',
    tags: ['시험 1~2주 전', '실전 적응력 높이기'],
    examCount: 32500,
    period: '시험 1~2주 전',
    recommendedFor: [
      '영역별 훈련이 마무리되어 실전 적응이 필요한 분',
      '시간 압박 상황에서의 풀이력을 올리고 싶은 분',
      '고난도 문제의 출제 포인트를 짚고 넘어가고 싶은 분',
    ],
    goals: [
      '시험장과 동일한 CBT 환경에서 전 과목 연속 풀이 경험',
      '시간 안배 감각 (과목당 평균 1분 20초) 체득',
      '고난도·함정 문항 출제 포인트 숙지',
    ],
    howToUse: [
      '실전 모의고사를 주 1~2회 치르며 누적 점수 그래프를 확인합니다.',
      '오답 해설 영상으로 고난도 함정 포인트를 체크합니다.',
      '해당 주 오답 비율이 높은 영역은 STEP 02로 잠시 돌아가 보완합니다.',
    ],
    suggestedSubjectIds: ['negotiated-contract', 'international', 'materials-mgmt'],
    resources: [
      { title: '실전 모의고사 회차 1~4', type: 'exam' },
      { title: '고난도 예상문제 TOP 100', type: 'exam' },
      { title: '최근 개정법령 비교표 v3', type: 'pdf', size: '1.8MB' },
    ],
    prevStepId: 'by-area',
    nextStepId: 'final',
  },
  {
    id: 'final',
    order: 4,
    stepLabel: 'STEP 04',
    title: '직전대비',
    subtitle: '시험전 핵심 요약',
    description:
      '시험 1~3일 전 최종 점검 단계입니다. 짧은 시간 안에 전 과목을 한 번 더 스캔하고, 파이널 모의고사로 실제 시험과 동일한 난이도로 최종 점수를 예측합니다.',
    tagline: '파이널 모의고사로 최종 점검',
    color: 'red',
    tags: ['시험 1~3일 전', '점수확인 & 약점체크'],
    examCount: null,
    period: '시험 1~3일 전',
    recommendedFor: [
      '시험 직전 정리·최종 점수 예측이 필요한 분',
      '약점 영역에 마지막 펀치를 넣고 싶은 분',
      '시험장 멘탈 관리 체크리스트가 필요한 분',
    ],
    goals: [
      '전 과목 핵심 요약 1시간 스캔으로 기억 리프레시',
      '파이널 모의고사 점수 ≥ 합격선(60점) 확인',
      '시험장 준비물·유의사항 체크리스트 확보',
    ],
    howToUse: [
      'D-3 ~ D-1 기간에 파이널 모의고사를 1회 치릅니다.',
      '점수·영역별 정답률 리포트로 마지막 약점을 집중 복습합니다.',
      'D-Day 준비물·컨디션 체크리스트를 따라 시험장에 입실합니다.',
    ],
    suggestedSubjectIds: ['procurement-laws', 'contract-general', 'bidding-practice'],
    resources: [
      { title: '파이널 모의고사', type: 'exam' },
      { title: '시험 직전 체크리스트', type: 'pdf' },
      { title: '약점 영역 3분 요약 영상', type: 'video' },
    ],
    prevStepId: 'practice',
  },
];

export function getStep(id: string): Step | undefined {
  return steps.find((s) => s.id === id);
}
