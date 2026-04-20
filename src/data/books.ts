export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  publishedAt: string;
  pages: number;
  price: number;
  originalPrice?: number;
  coverBg: string;
  coverAccent: string;
  badge?: string;
  category: '기본서' | '문제집' | '요약서' | '세트';
  isbn: string;
  description: string;
  features: string[];
  tableOfContents: string[];
  inStock: boolean;
}

export const books: Book[] = [
  {
    id: 'procurement-basic-2026',
    title: '공공조달관리사 기본서 2026',
    subtitle: '34년 조달 전문가 직강 교재',
    author: '홍순후',
    publisher: '케이비즈글로벌교육원',
    publishedAt: '2026-03-15',
    pages: 832,
    price: 42000,
    originalPrice: 48000,
    coverBg: '#1e40af',
    coverAccent: '#93c5fd',
    badge: 'BEST',
    category: '기본서',
    isbn: '979-11-000-1111-1',
    description:
      '공공조달관리사 시험의 전 범위를 체계적으로 정리한 기본서입니다. 조달청 34년 경력의 홍순후 교수가 집필 및 검수하여 최신 법령과 실무 사례를 완벽 반영했습니다.',
    features: [
      '2026년 개정법령 100% 반영',
      '조달 전문가 직접 집필·검수',
      '영역별 핵심 요약 + 예상문제 수록',
      '온라인 강의 쿠폰 제공(1개월)',
    ],
    tableOfContents: [
      '제1편 조달법규 총론',
      '제2편 국가계약법',
      '제3편 지방계약법',
      '제4편 원가계산',
      '제5편 입찰실무',
      '부록: 최신 개정법령 요약',
    ],
    inStock: true,
  },
  {
    id: 'procurement-workbook-2026',
    title: '공공조달관리사 기출문제집 2026',
    subtitle: '최근 10회 기출 + 해설',
    author: '홍순후',
    publisher: '케이비즈글로벌교육원',
    publishedAt: '2026-03-20',
    pages: 520,
    price: 28000,
    originalPrice: 32000,
    coverBg: '#b91c1c',
    coverAccent: '#fca5a5',
    badge: 'NEW',
    category: '문제집',
    isbn: '979-11-000-1111-2',
    description:
      '최근 10회 기출문제와 출제 빈도 높은 변형 문제를 수록한 실전 문제집입니다. 상세한 해설과 함께 오답 노트 양식도 제공합니다.',
    features: [
      '기출 10회 + 변형 1,200문항',
      '전 문항 상세 해설',
      '영역별 출제빈도 분석',
      '오답 노트 양식 다운로드',
    ],
    tableOfContents: [
      '기출문제편 (제1회 ~ 제10회)',
      '유형별 변형문제',
      '해설편',
      '오답 분석 노트',
    ],
    inStock: true,
  },
  {
    id: 'procurement-summary-2026',
    title: '공공조달관리사 핵심 요약서',
    subtitle: '시험 직전 마무리용',
    author: '홍순후',
    publisher: '케이비즈글로벌교육원',
    publishedAt: '2026-03-25',
    pages: 240,
    price: 18000,
    coverBg: '#0f766e',
    coverAccent: '#5eead4',
    category: '요약서',
    isbn: '979-11-000-1111-3',
    description:
      '시험 직전 2주 동안 마무리 정리용으로 최적화된 핵심 요약서입니다. 출제 포인트 위주로 압축하여 단기간 합격에 집중할 수 있도록 구성했습니다.',
    features: [
      '시험 직전 2주 완성',
      '출제 포인트 압축 정리',
      '영역별 빈출 키워드',
      '실전 체크리스트 수록',
    ],
    tableOfContents: [
      '조달법규 핵심 요약',
      '국가·지방계약법 비교',
      '원가계산 공식 정리',
      '빈출 암기 카드',
    ],
    inStock: true,
  },
  {
    id: 'procurement-full-set-2026',
    title: '공공조달관리사 올인원 세트 2026',
    subtitle: '기본서 + 문제집 + 요약서',
    author: '홍순후',
    publisher: '케이비즈글로벌교육원',
    publishedAt: '2026-03-25',
    pages: 1592,
    price: 79000,
    originalPrice: 88000,
    coverBg: '#6d28d9',
    coverAccent: '#c4b5fd',
    badge: 'SET 10%↓',
    category: '세트',
    isbn: '979-11-000-1111-0',
    description:
      '기본서, 기출문제집, 핵심 요약서를 묶은 합격 올인원 세트입니다. 세트 구매 시 온라인 강의 쿠폰 3개월권이 함께 제공됩니다.',
    features: [
      '기본서 + 문제집 + 요약서 구성',
      '세트 10% 할인 적용',
      '온라인 강의 3개월 쿠폰 증정',
      '합격 보장 무료 재수강 쿠폰',
    ],
    tableOfContents: [
      '기본서 832p',
      '기출문제집 520p',
      '핵심 요약서 240p',
      '부록: 합격자 노트 PDF',
    ],
    inStock: true,
  },
];

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
