import { books } from './books';
import { posts } from './community';
import { plans } from './pricing';
import { videos } from './videos';

export type SearchCategory = '교육과정' | '교재' | '영상강의' | '예상문제' | '게시판' | '이용권' | '자격소개';

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  description: string;
  href: string;
  keywords: string[];
}

const curriculumItems: SearchItem[] = [
  {
    id: 'curriculum-goods-contract-general',
    category: '교육과정',
    title: '제1장 물품구매계약 일반',
    description: '정부계약의 개요, 입찰 및 낙찰제도, 입찰집행 절차, 계약체결 이행 및 관리',
    href: '/curriculum',
    keywords: ['정부계약', '입찰', '낙찰', '계약관리', '물품구매'],
  },
  {
    id: 'curriculum-goods-notice',
    category: '교육과정',
    title: '제2장 물품구매계약 공고서 작성',
    description: '입찰공고 개요, 변경 공고, 입찰집행, 취소 및 재공고입찰',
    href: '/curriculum',
    keywords: ['입찰공고', '변경공고', '재공고입찰'],
  },
  {
    id: 'curriculum-estimated-price',
    category: '교육과정',
    title: '제3장 예정가격작성 실무',
    description: '예정가격 결정기준, 기초조사, 원가계산 용역의뢰',
    href: '/curriculum',
    keywords: ['예정가격', '기초조사', '원가계산'],
  },
  {
    id: 'curriculum-award-systems',
    category: '교육과정',
    title: '제4장 주요 낙찰자 선정 제도',
    description: '물품구매 적격심사, 협상에 의한 계약, 경쟁적 대화에 의한 계약',
    href: '/curriculum',
    keywords: ['적격심사', '협상', '경쟁적 대화', '낙찰자 선정'],
  },
  {
    id: 'curriculum-contract-management',
    category: '교육과정',
    title: '제5장 계약체결 및 관리',
    description: '계약체결 절차, 계약관리, 검사·검수 및 대금지급',
    href: '/curriculum',
    keywords: ['계약체결', '선금', '보증금', '대금지급', '검사', '검수'],
  },
  {
    id: 'curriculum-mas',
    category: '교육과정',
    title: '제6장 다수공급자계약(MAS) 제도',
    description: 'MAS 개요, 체결과 운영 절차, 2단계경쟁, 계약관리, 카탈로그계약',
    href: '/curriculum',
    keywords: ['MAS', '다수공급자계약', '2단계경쟁', '카탈로그'],
  },
  {
    id: 'curriculum-quality-management',
    category: '교육과정',
    title: '제7장 공공조달 품질관리',
    description: '직접생산확인, 품질점검, 납품검사, 안전관리물자, 품질보증조달물품',
    href: '/curriculum',
    keywords: ['품질관리', '직접생산확인', '품질점검', '납품검사'],
  },
  {
    id: 'curriculum-technology-products',
    category: '교육과정',
    title: '제8장 공공조달 기술품질 제품',
    description: '벤처나라 등록제도, 혁신제품 지정제도, 우수제품 지정제도',
    href: '/curriculum',
    keywords: ['벤처나라', '혁신제품', '우수제품'],
  },
  {
    id: 'curriculum-service-contract',
    category: '교육과정',
    title: '제9장 용역계약',
    description: '용역계약 일반, 입찰 및 낙찰제도, 일반용역 집행방법 및 절차, 용역 이행관리',
    href: '/curriculum',
    keywords: ['용역계약', '일반용역', '용역 이행'],
  },
  {
    id: 'curriculum-construction-contract',
    category: '교육과정',
    title: '제10장 공사계약관리',
    description: '공사계약 일반, 건설엔지니어링, 공사계약, 공사단계',
    href: '/curriculum',
    keywords: ['공사계약', '건설엔지니어링', '공사단계'],
  },
  {
    id: 'curriculum-appendix-laws',
    category: '교육과정',
    title: '부록 공공조달 법률 이해',
    description: '국가 및 지방계약 법령, 민법, 조달사업법, 전자조달법, 공공기관 계약규칙',
    href: '/curriculum',
    keywords: ['국가계약법', '지방계약법', '민법', '조달사업법', '전자조달법'],
  },
];

export const searchItems: SearchItem[] = [
  {
    id: 'certification',
    category: '자격소개',
    title: '공공조달관리사 자격소개',
    description: '40년 경력 조달 전문가와 AI 기술이 결합된 공공조달관리사 학습 로드맵',
    href: '/certification',
    keywords: ['자격증', '자격소개', '홍순후', '40년', 'AI'],
  },
  ...curriculumItems,
  ...books.map((book) => ({
    id: `book-${book.id}`,
    category: '교재' as const,
    title: book.title,
    description: `${book.subtitle ?? ''} ${book.description}`,
    href: `/books/${book.id}`,
    keywords: [book.category, book.author, book.publisher, book.isbn, ...book.features, ...book.tableOfContents],
  })),
  ...videos.map((video) => ({
    id: `video-${video.id}`,
    category: '영상강의' as const,
    title: video.title,
    description: video.description,
    href: `/video/${video.id}`,
    keywords: [video.instructor, '필기', '실기', '기본이론', '핵심요약', '문제풀이', '모의고사'],
  })),
  {
    id: 'free-mock',
    category: '예상문제',
    title: '예상문제 시험 모드·학습 모드',
    description: '3문제 시험 모드, 즉시 정답과 해설을 확인하는 학습 모드, 오답노트 복습',
    href: '/free-mock',
    keywords: ['시험 모드', '학습 모드', '오답노트', 'CBT', '객관식', '문제풀이'],
  },
  ...posts.map((post) => ({
    id: `post-${post.id}`,
    category: '게시판' as const,
    title: post.title,
    description: post.body,
    href: `/community/${post.id}`,
    keywords: [post.subject, post.type, post.author],
  })),
  ...plans.map((plan) => ({
    id: `plan-${plan.id}`,
    category: '이용권' as const,
    title: plan.name,
    description: `${plan.tagline ?? ''} ${plan.description ?? ''}`,
    href: `/pricing/${plan.id}`,
    keywords: [...plan.features, ...(plan.recommendedFor ?? []), plan.price.toLocaleString()],
  })),
];

export function searchSite(query: string): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);

  return searchItems
    .map((item) => {
      const haystack = [
        item.category,
        item.title,
        item.description,
        ...item.keywords,
      ].join(' ').toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'ko'))
    .map(({ item }) => item);
}
