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
  requiresCoupon?: boolean;
  couponNote?: string;
}

const ALL_IN_ONE_FEATURES: string[] = [
  '필기 전 과목 강의·요약·기출 무제한',
  '실기 필답형 대비 강의 및 예상문제',
  '실전 모의고사 8회 · AI 변형문제',
  '1:1 멘토링 3회 + AI 튜터 무제한',
  '합격 보장 재수강 1회',
];

const ALL_IN_ONE_DETAILED: PlanFeatureDetail[] = [
  { icon: 'video', title: '필기·실기 전 강의', description: '홍순후 교수 직강 4단계 커리큘럼 + 실기 필답형 전용 강의.' },
  { icon: 'file', title: '실전 모의고사 8회', description: '실제 시험과 동일한 난이도·구성의 필기/실기 모의고사.' },
  { icon: 'bot', title: 'AI 튜터 무제한', description: '24시간 실시간 답변, 틀린 문제 해설·유사문제 자동 생성.' },
  { icon: 'users', title: '1:1 멘토링 3회', description: '학습 초반·중반·직전 3단계 멘토링으로 합격 전략 설계.' },
  { icon: 'award', title: '합격 보장 재수강', description: '첫 응시 불합격 시 다음 시험일까지 이용기간 자동 연장.' },
  { icon: 'shield', title: '필기+실기 통합 학습', description: '필기 합격 후 실기 대비까지 한 번에 완결되는 통합 설계.' },
];

const ALL_IN_ONE_INCLUDES = { subjects: 8, lectures: 220, mockExams: 8, mentoring: 3 };

export const plans: Plan[] = [
  {
    id: 'all-in-one',
    name: '필기+실기 대비 올인원',
    price: 1290000,
    duration: '필기·실기 시험 완결형',
    durationDays: 365,
    features: ALL_IN_ONE_FEATURES,
    highlight: true,
    badge: '정규가',
    tagline: '필기부터 실기까지 한 번에',
    description:
      '공공조달관리사 필기·실기 시험을 한 번에 대비할 수 있는 정규 올인원 이용권입니다. 4단계 커리큘럼 전 과정과 실기 필답형 대비까지 모두 포함됩니다.',
    recommendedFor: [
      '공공조달관리사 필기·실기 시험을 한 번에 대비하려는 분',
      '기초부터 실전·직전까지 체계적으로 학습하고 싶은 분',
      '합격 보장 재수강으로 확실하게 준비하고 싶은 분',
    ],
    detailedFeatures: ALL_IN_ONE_DETAILED,
    includes: ALL_IN_ONE_INCLUDES,
    refundPolicy: [
      '결제일로부터 7일 이내 + 학습 진도율 10% 미만일 때 전액 환불',
      '그 외에는 잔여 이용기간 일할계산 환불 (수수료 없음)',
      '1:1 멘토링 미사용 시 회당 금액 포함 환불',
      '환불 신청: 1600-5933 / contact@kbizrun.com',
    ],
  },
  {
    id: 'coop-all-in-one',
    name: '[협동조합 전용] 필기+실기 대비 올인원',
    price: 490000,
    originalPrice: 1290000,
    duration: '필기·실기 시험 완결형',
    durationDays: 365,
    features: ALL_IN_ONE_FEATURES,
    badge: '협동조합 전용',
    tagline: '협동조합 조합원 특별 할인가',
    description:
      '협동조합 소속 조합원을 위한 특별 할인 이용권입니다. 정규가 1,290,000원 상품을 490,000원에 제공하며, 결제 전 협동조합 전용 쿠폰 인증이 필요합니다.',
    recommendedFor: [
      '협동조합 소속 조합원 중 공공조달관리사 자격을 준비하는 분',
      '기관 제휴 쿠폰을 발급받은 기업·단체 소속 수강생',
      '필기+실기 전 과정을 최저가로 준비하고 싶은 분',
    ],
    detailedFeatures: ALL_IN_ONE_DETAILED,
    includes: ALL_IN_ONE_INCLUDES,
    refundPolicy: [
      '결제일로부터 7일 이내 + 학습 진도율 10% 미만일 때 전액 환불',
      '쿠폰 인증으로 결제된 이용권은 해당 조합원 본인만 이용 가능합니다',
      '환불 신청: 1600-5933 / contact@kbizrun.com',
    ],
    requiresCoupon: true,
    couponNote: '협동조합에서 발급받은 전용 쿠폰 번호를 입력해 인증 후 결제할 수 있습니다.',
  },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
