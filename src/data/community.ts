export interface Post {
  id: number;
  subject: string;
  type: '질문' | '팁' | '후기';
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
    subject: '조달법규',
    type: '질문',
    title: '수의계약 vs 일반경쟁입찰 구분 기준',
    author: '합격준비생',
    createdAt: '2026-04-15',
    views: 270,
    comments: 3,
    body: '국가계약법 시행령 제26조에 따른 수의계약 허용 요건이 헷갈려서 질문드립니다. 실제 실무 사례와 함께 설명해 주실 분 계신가요?',
    replies: [
      { author: '홍순후 교수', body: '먼저 경쟁 불가능성 판단 기준을 이해해야 합니다. 시행령 26조 1항의 사유들을 묶음으로 외워보세요.', createdAt: '2026-04-15' },
      { author: '기출 마스터', body: '최근 5년 기출에서 1항 5호가 2회 출제되었습니다.', createdAt: '2026-04-16' },
    ],
  },
  {
    id: 2,
    subject: '원가계산',
    type: '질문',
    title: '간접노무비 계산 방법 문의드립니다',
    author: '조달러1',
    createdAt: '2026-04-14',
    views: 287,
    comments: 6,
    body: '예정가격 작성 시 간접노무비율 산정 기준이 어디에 나오는지 궁금합니다.',
    replies: [],
  },
  {
    id: 3,
    subject: '입찰실무',
    type: '팁',
    title: '낙찰자 결정 방법 비교표 공유',
    author: '공기업합격자',
    createdAt: '2026-04-10',
    views: 621,
    comments: 18,
    body: '적격심사제, 종합심사제, 협상에 의한 계약 등 낙찰자 결정 방법을 한 장에 정리했습니다.',
    replies: [],
  },
  {
    id: 4,
    subject: '계약일반',
    type: '후기',
    title: '제4회 시험 합격 후기 — 3개월 단기 합격 노하우',
    author: 'kbizFan',
    createdAt: '2026-03-28',
    views: 1240,
    comments: 42,
    body: 'KbizRun 기출 무료 열람실로 시작해서 3개월 만에 합격했습니다. 제가 실제로 썼던 학습 루틴 공유합니다.',
    replies: [],
  },
];

export function getPost(id: number): Post | undefined {
  return posts.find((p) => p.id === id);
}
