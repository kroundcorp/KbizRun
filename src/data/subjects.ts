export interface Subject {
  id: string;
  index: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
}

export const subjects: Subject[] = [
  {
    id: 'procurement-laws',
    index: '01',
    name: '조달법규',
    description: '공공조달의 기초가 되는 국가계약법 및 관련 법령을 마스터합니다.',
    icon: '📋',
    color: 'blue',
    progress: 45,
  },
  {
    id: 'contract-general',
    index: '02',
    name: '계약일반',
    description: '공공계약의 체결부터 이행, 변경, 종료까지 전 과정을 학습합니다.',
    icon: '📙',
    color: 'orange',
    progress: 22,
  },
  {
    id: 'cost-calculation',
    index: '03',
    name: '원가계산',
    description: '예정가격 작성과 원가계산의 실전 감각을 기릅니다.',
    icon: '📘',
    color: 'green',
    progress: 0,
  },
  {
    id: 'bidding-practice',
    index: '04',
    name: '입찰실무',
    description: '입찰공고부터 낙찰자 선정까지 실무 프로세스를 익힙니다.',
    icon: '📕',
    color: 'red',
    progress: 10,
  },
  {
    id: 'contract-review',
    index: '05',
    name: '계약심사',
    description: '계약심사위원회 운영과 심사 기준을 학습합니다.',
    icon: '📗',
    color: 'purple',
    progress: 0,
  },
  {
    id: 'negotiated-contract',
    index: '06',
    name: '협상계약',
    description: '기술 협상과 가격 협상의 전략을 익힙니다.',
    icon: '🤝',
    color: 'yellow',
    progress: 0,
  },
  {
    id: 'international',
    index: '07',
    name: '국제조달',
    description: 'WTO GPA, FTA 정부조달 협정과 국제입찰 절차를 다룹니다.',
    icon: '🌐',
    color: 'indigo',
    progress: 0,
  },
  {
    id: 'materials-mgmt',
    index: '08',
    name: '물자관리',
    description: '물품 구매, 재고, 조달청 MAS 제도까지 다룹니다.',
    icon: '📦',
    color: 'pink',
    progress: 0,
  },
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
