export interface Post {
  id: number;
  subject: string;
  type: '질문' | '팁' | '후기' | '멘토링' | '추천';
  title: string;
  author: string;
  createdAt: string;
  views: number;
  comments: number;
  body: string;
  replies?: { author: string; body: string; createdAt: string }[];
}

export const posts: Post[] = [
  {
    id: 1,
    subject: '제1장',
    type: '질문',
    title: '물품구매계약 입찰 및 낙찰제도 구분 기준',
    author: '합격준비생',
    createdAt: '2026-04-15',
    views: 270,
    comments: 3,
    body: '정부계약 개요와 입찰집행 절차가 실제 계약관리로 이어지는 흐름이 헷갈려서 질문드립니다.',
    replies: [
      { author: '홍순후 교수', body: '먼저 정부계약의 원칙을 잡고, 입찰공고 → 입찰집행 → 낙찰자 결정 → 계약체결 순서로 연결해 보세요.', createdAt: '2026-04-15' },
      { author: '기출 마스터', body: '제1장에서는 입찰과 낙찰제도, 계약체결 이행관리의 순서가 함께 출제될 가능성이 높습니다.', createdAt: '2026-04-16' },
    ],
  },
  {
    id: 2,
    subject: '제3장',
    type: '질문',
    title: '예정가격 기초조사와 원가계산 용역의뢰 차이',
    author: '조달러1',
    createdAt: '2026-04-14',
    views: 287,
    comments: 6,
    body: '예정가격 결정기준을 잡을 때 기초조사와 용역의뢰를 어떻게 구분하는지 궁금합니다.',
    replies: [],
  },
  {
    id: 3,
    subject: '제4장',
    type: '팁',
    title: '주요 낙찰자 선정 제도 비교표 공유',
    author: '공기업합격자',
    createdAt: '2026-04-10',
    views: 621,
    comments: 18,
    body: '적격심사제, 종합심사제, 협상에 의한 계약 등 낙찰자 결정 방법을 한 장에 정리했습니다.',
    replies: [],
  },
  {
    id: 4,
    subject: '합격후기',
    type: '후기',
    title: '제4회 시험 합격 후기 — 3개월 단기 합격 노하우',
    author: 'kbizFan',
    createdAt: '2026-03-28',
    views: 1240,
    comments: 42,
    body: 'KbizRun 예상문제 샘플로 시작해서 체계적으로 학습했습니다. 제가 실제로 쓰는 학습 루틴 공유합니다.',
    replies: [],
  },
  {
    id: 5,
    subject: '멘토링',
    type: '멘토링',
    title: '1:1 멘토링 신청 전 준비하면 좋은 질문',
    author: 'KbizRun 운영팀',
    createdAt: '2026-04-18',
    views: 188,
    comments: 4,
    body: '현재 학습 진도, 약한 장, 시험 목표일을 정리해 오시면 멘토링 시간에 더 구체적인 학습 전략을 세울 수 있습니다.',
    replies: [],
  },
  {
    id: 6,
    subject: '추천',
    type: '추천',
    title: '목차 TIP — 제1장·제3장·제4장을 먼저 잡는 이유',
    author: '홍순후 교수',
    createdAt: '2026-04-19',
    views: 342,
    comments: 9,
    body: '물품구매계약 일반, 예정가격작성 실무, 낙찰자 선정 제도는 다른 장과 연결되는 핵심 축입니다. 먼저 흐름을 잡으면 MAS, 품질관리, 용역·공사계약까지 이해가 쉬워집니다.',
    replies: [],
  },
];

export function getPost(id: number): Post | undefined {
  return posts.find((p) => p.id === id);
}
