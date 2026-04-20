export interface PlanFeatureDetail {
  icon: 'video' | 'bookmark' | 'bot' | 'users' | 'award' | 'file' | 'clock' | 'shield';
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  durationDays: number;
  features: string[];
  highlight?: boolean;
  badge?: string;
  tagline?: string;
  description?: string;
  recommendedFor?: string[];
  detailedFeatures?: PlanFeatureDetail[];
  includes?: { subjects: number; lectures: number; mockExams: number; mentoring: number };
  refundPolicy?: string[];
}

export const plans: Plan[] = [
  {
    id: 'trial',
    name: '체험 이용권',
    price: 0,
    duration: '7일',
    durationDays: 7,
    features: ['기출 1회 무료 열람', '핵심 요약 샘플', 'AI 챗봇 체험 5회'],
    tagline: '먼저 맛보고 결정하세요',
    description:
      'K-Biz Run을 처음 만나보시는 분을 위한 7일 무료 체험 이용권입니다. 핵심 콘텐츠 샘플과 AI 튜터를 제한적으로 이용해볼 수 있습니다.',
    recommendedFor: [
      '공공조달관리사 시험이 처음이라 콘텐츠 퀄리티가 궁금한 분',
      '본격 등록 전 강의·문제 스타일을 체크하고 싶은 분',
      'AI 튜터의 답변 수준을 먼저 확인하고 싶은 분',
    ],
    detailedFeatures: [
      { icon: 'file', title: '기출 1회 무료', description: '최신 회차 기출문제 1세트를 풀어볼 수 있습니다.' },
      { icon: 'bookmark', title: '핵심 요약 샘플', description: '8과목 중 조달법규 핵심 요약 1종을 열람할 수 있습니다.' },
      { icon: 'bot', title: 'AI 챗봇 체험 5회', description: '홍순후 교수 지식을 학습한 AI 튜터에 최대 5회 질문할 수 있습니다.' },
    ],
    includes: { subjects: 1, lectures: 2, mockExams: 0, mentoring: 0 },
    refundPolicy: ['체험 이용권은 무료이므로 환불 대상이 아닙니다.'],
  },
  {
    id: 'monthly',
    name: '1개월 이용권',
    price: 39000,
    originalPrice: 49000,
    duration: '30일',
    durationDays: 30,
    features: ['전 과목 기출/기출유사 무제한', '해설 영상 무제한', 'AI 챗봇 무제한'],
    tagline: '단기 집중 학습자',
    description:
      '시험까지 남은 시간이 짧거나, 이미 1회 응시한 경험이 있는 분께 적합합니다. 30일 동안 K-Biz Run의 모든 콘텐츠를 무제한으로 이용할 수 있습니다.',
    recommendedFor: [
      '시험까지 1개월 정도 남은 분',
      '기초는 갖췄고 기출 중심으로 마무리하고 싶은 분',
      '합격 여부를 빠르게 확인하고 싶은 분',
    ],
    detailedFeatures: [
      { icon: 'video', title: '8과목 해설 영상 무제한', description: '홍순후 교수 직강 전 강의를 무제한 수강할 수 있습니다.' },
      { icon: 'file', title: '전 회차 기출·기출유사 무제한', description: '회차별 기출 전체와 AI 변형 문제를 이용할 수 있습니다.' },
      { icon: 'bot', title: 'AI 튜터 무제한', description: '24시간 실시간 답변 가능한 AI 튜터에 무제한 질문할 수 있습니다.' },
      { icon: 'clock', title: '30일 수강 기간', description: '결제일로부터 30일 동안 모든 콘텐츠를 이용할 수 있습니다.' },
    ],
    includes: { subjects: 8, lectures: 40, mockExams: 2, mentoring: 0 },
    refundPolicy: [
      '결제일로부터 7일 이내 + 학습 진도율 10% 미만일 때 전액 환불',
      '그 외에는 잔여 이용기간 일할계산 환불 (수수료 없음)',
      '환불 신청: 1600-5933 / contact@kbizrun.com',
    ],
  },
  {
    id: 'quarter',
    name: '3개월 이용권',
    price: 99000,
    originalPrice: 147000,
    duration: '90일',
    durationDays: 90,
    features: ['전 과목 전 콘텐츠', '실전 모의고사 4회', '1:1 멘토링 1회'],
    highlight: true,
    badge: 'BEST',
    tagline: '가장 많이 선택하는 표준 플랜',
    description:
      '대부분의 합격자가 선택한 이용권입니다. 기초부터 실전까지 4단계 커리큘럼(이론·영역별·실전·직전)을 한 번에 경험할 수 있습니다.',
    recommendedFor: [
      '공공조달관리사 시험을 처음 준비하는 분',
      '체계적으로 기초부터 실전까지 학습하고 싶은 분',
      '합격 확률을 최대한 높이고 싶은 분',
    ],
    detailedFeatures: [
      { icon: 'video', title: '8과목 전 강의 + 요약영상', description: '4단계 커리큘럼(이론·영역별·실전·직전) 전 과정 제공.' },
      { icon: 'file', title: '실전 모의고사 4회', description: '실제 시험과 동일한 난이도·구성의 모의고사 4회분.' },
      { icon: 'users', title: '1:1 멘토링 1회', description: '홍순후 교수 또는 합격자 멘토와 30분 1:1 상담.' },
      { icon: 'bot', title: 'AI 튜터 무제한', description: '24시간 실시간 답변 가능.' },
      { icon: 'bookmark', title: '오답노트 자동생성', description: '틀린 문제가 자동으로 오답노트에 누적됩니다.' },
      { icon: 'clock', title: '90일 수강 기간', description: '결제일로부터 90일 동안 이용 가능.' },
    ],
    includes: { subjects: 8, lectures: 120, mockExams: 4, mentoring: 1 },
    refundPolicy: [
      '결제일로부터 7일 이내 + 학습 진도율 10% 미만일 때 전액 환불',
      '그 외에는 잔여 이용기간 일할계산 환불',
      '1:1 멘토링 미사용 시 멘토링 1회 (3만원 상당) 금액 포함 환불',
      '환불 신청: 1600-5933 / contact@kbizrun.com',
    ],
  },
  {
    id: 'half',
    name: '6개월 이용권',
    price: 179000,
    originalPrice: 294000,
    duration: '180일',
    durationDays: 180,
    features: ['전 과목 전 콘텐츠', '실전 모의고사 8회', '1:1 멘토링 3회', '합격 보장 재수강 1회'],
    badge: 'VALUE',
    tagline: '합격 보장 재수강 포함',
    description:
      '2개 시험 회차를 충분히 대비할 수 있는 장기 플랜입니다. 합격 보장 재수강 1회가 포함되어, 첫 응시 불합격 시 다음 회차까지 이용 기간이 연장됩니다.',
    recommendedFor: [
      '시험까지 시간이 넉넉하게 남은 분',
      '한 번에 확실히 합격하고 싶은 분',
      '여러 회차에 걸쳐 도전할 계획이신 분',
    ],
    detailedFeatures: [
      { icon: 'video', title: '8과목 전 강의', description: '4단계 커리큘럼 전 과정 + 심화 특강 포함.' },
      { icon: 'file', title: '실전 모의고사 8회', description: '월 1~2회 새로 출제되는 모의고사 8회분.' },
      { icon: 'users', title: '1:1 멘토링 3회', description: '학습 초반·중반·직전 3단계 멘토링.' },
      { icon: 'award', title: '합격 보장 재수강 1회', description: '첫 응시 불합격 시 다음 시험일까지 자동 연장.' },
      { icon: 'bot', title: 'AI 튜터 무제한', description: '24시간 실시간 답변 가능.' },
      { icon: 'shield', title: '180일 수강 기간', description: '결제일로부터 180일 + 합격 보장 연장.' },
    ],
    includes: { subjects: 8, lectures: 160, mockExams: 8, mentoring: 3 },
    refundPolicy: [
      '결제일로부터 7일 이내 + 학습 진도율 10% 미만일 때 전액 환불',
      '그 외에는 잔여 이용기간 일할계산 환불',
      '합격 보장 재수강은 최초 시험 응시 확인 후 자동 적용',
      '환불 신청: 1600-5933 / contact@kbizrun.com',
    ],
  },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
