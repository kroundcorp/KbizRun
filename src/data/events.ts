export interface EventItem {
  id: number;
  title: string;
  tag: string;
  period: string;
  summary: string;
  status: 'active' | 'upcoming' | 'ended';
  color: string;
}

export const events: EventItem[] = [
  { id: 1, title: '신규가입 EVENT — 기출문제 2건 무료', tag: 'HOT', period: '2026.03.01 ~ 2026.03.31', summary: '가입만 해도 회차별 기출 2건 + 해설 PDF 증정', status: 'active', color: 'purple' },
  { id: 2, title: '4월 이용권 20% 할인', tag: 'SALE', period: '2026.04.01 ~ 2026.04.30', summary: '전 과목 3개월/6개월 이용권 20% 할인', status: 'active', color: 'red' },
  { id: 3, title: '합격 후기 이벤트', tag: 'EVENT', period: '2026.04.01 ~ 2026.05.15', summary: '합격 인증 시 아마존 기프트카드 5만원 증정', status: 'active', color: 'blue' },
  { id: 4, title: '5월 가정의 달 출석체크 이벤트', tag: '예정', period: '2026.05.01 ~ 2026.05.31', summary: '매일 출석하고 포인트 받기', status: 'upcoming', color: 'green' },
  { id: 5, title: '신학기 스터디 모임 모집', tag: '종료', period: '2026.02.01 ~ 2026.02.28', summary: '온라인 스터디 그룹 매칭', status: 'ended', color: 'gray' },
];
