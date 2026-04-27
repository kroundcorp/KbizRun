export interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  link?: string;
}

export const bannerSlides: BannerSlide[] = [
  {
    id: 'event-new-signup',
    badge: '3/31일까지! 신규가입 이벤트 진행',
    title: '합격률이 오르는 이유!\n지금 확인하세요!',
    subtitle: '가입하면 예상문제 샘플 무료',
    bgColor: '#37257a',
    link: '/events',
  },
  {
    id: 'free-mock',
    badge: '무료 체험',
    title: '공공조달관리사 기출\n무료로 풀어보기',
    subtitle: '실제 시험과 동일한 환경의 모의고사',
    bgColor: '#1e40af',
    link: '/free-mock',
  },
  {
    id: 'mentoring',
    badge: 'Premium 멘토링',
    title: '1:1 합격자 멘토와\n맞춤 학습 전략',
    subtitle: '합격률을 2배로 높이는 밀착 관리',
    bgColor: '#0f766e',
    link: '/mentoring',
  },
  {
    id: 'pricing',
    badge: '얼리버드 30% OFF',
    title: '연간 이용권\n최대 30% 할인',
    subtitle: '한 번 결제로 1년 내내 학습',
    bgColor: '#b91c1c',
    link: '/pricing',
  },
  {
    id: 'curriculum',
    badge: 'NEW',
    title: '최신 개정법령\n완벽 반영 커리큘럼',
    subtitle: '국내 유일 조달 전문가 검수',
    bgColor: '#6d28d9',
    link: '/curriculum',
  },
];
