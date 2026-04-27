import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  FileCheck2,
  FileText,
  HardHat,
  Layers,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface CurriculumSection {
  label?: string;
  title: string;
  items?: string[];
}

interface CurriculumChapter {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
  sections: CurriculumSection[];
}

const curriculumChapters: CurriculumChapter[] = [
  {
    id: 'goods-contract-general',
    label: '제1장',
    title: '물품구매계약 일반',
    description: '정부계약의 기본 구조부터 입찰·계약 이행관리까지 학습합니다.',
    icon: <BookOpen className="h-5 w-5" />,
    accent: 'bg-blue-50 text-blue-600 border-blue-100',
    sections: [
      { title: '정부계약의 개요' },
      { title: '구매계약 입찰 및 낙찰제도' },
      { title: '입찰집행 절차' },
      { title: '계약체결 이행 및 관리' },
    ],
  },
  {
    id: 'goods-notice',
    label: '제2장',
    title: '물품구매계약 공고서 작성',
    description: '입찰공고 작성·변경·집행과 취소 및 재공고입찰을 다룹니다.',
    icon: <FileText className="h-5 w-5" />,
    accent: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    sections: [
      { title: '입찰공고 개요' },
      { title: '입찰공고 및 변경 공고' },
      { title: '입찰집행' },
      { title: '입찰의 취소 및 재공고입찰' },
    ],
  },
  {
    id: 'estimated-price',
    label: '제3장',
    title: '예정가격작성 실무',
    description: '예정가격 결정기준, 기초조사, 원가계산 용역의뢰 실무를 정리합니다.',
    icon: <Calculator className="h-5 w-5" />,
    accent: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    sections: [
      { title: '예정가격 결정기준' },
      { title: '예정가격 기초조사' },
      { title: '원가계산 용역의뢰' },
    ],
  },
  {
    id: 'award-systems',
    label: '제4장',
    title: '주요 낙찰자 선정 제도',
    description: '적격심사, 협상계약, 경쟁적 대화 방식의 절차와 평가를 비교합니다.',
    icon: <Award className="h-5 w-5" />,
    accent: 'bg-amber-50 text-amber-600 border-amber-100',
    sections: [
      {
        label: '제4-1',
        title: '물품구매 적격심사',
        items: ['적격심사 개요', '적격심사 절차', '낙찰자 결정', '중소기업자간 경쟁제품 계약이행능력심사'],
      },
      {
        label: '제4-2',
        title: '협상에 의한 계약',
        items: ['개요', '입찰공고 및 제안서', '기술(제안서) 평가', '협상절차 및 계약체결'],
      },
      {
        label: '제4-3',
        title: '경쟁적 대화에 의한 계약',
        items: ['개요(근거 및 절차)', '입찰공고 및 기본 제안요청서', '경쟁적 대화 및 최종 제안서 평가'],
      },
    ],
  },
  {
    id: 'contract-management',
    label: '제5장',
    title: '계약체결 및 관리',
    description: '계약체결 절차, 계약관리 쟁점, 검사·검수와 대금지급을 학습합니다.',
    icon: <FileCheck2 className="h-5 w-5" />,
    accent: 'bg-rose-50 text-rose-600 border-rose-100',
    sections: [
      { title: '계약체결 개요' },
      { title: '계약체결 절차' },
      {
        title: '계약관리',
        items: ['계약해석의 우선순위', '선금지급', '계약금액의 조정', '계약의 해제 및 해지', '부정당업자 제재', '보증금(입찰, 계약, 하자보수)'],
      },
      {
        title: '검사·검수 및 대금지급',
        items: ['검사·검수 개요', '대금지급', '대금지급 시 유의사항'],
      },
    ],
  },
  {
    id: 'mas',
    label: '제6장',
    title: '다수공급자계약(MAS) 제도',
    description: 'MAS 체결·운영, 2단계경쟁, 계약관리와 카탈로그계약을 다룹니다.',
    icon: <Layers className="h-5 w-5" />,
    accent: 'bg-violet-50 text-violet-600 border-violet-100',
    sections: [
      { title: '다수공급자계약(MAS) 개요' },
      { title: '다수공급자계약 체결과 운영 절차' },
      { title: '다수공급자계약 2단계경쟁' },
      { title: '다수공급자계약 계약관리' },
      { title: '카탈로그계약과 디지털서비스 카탈로그계약' },
    ],
  },
  {
    id: 'quality-management',
    label: '제7장',
    title: '공공조달 품질관리',
    description: '직접생산확인, 품질점검, 안전관리물자와 품질보증조달물품을 정리합니다.',
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    sections: [
      { title: '공공조달 품질관리 개요' },
      {
        title: '직접생산확인 및 품질점검',
        items: ['직접생산확인제도', '품질점검제도', '납품검사(조달물자검사제도)'],
      },
      { title: '안전관리물자 지정제도' },
      { title: '품질보증조달물품 지정제도' },
    ],
  },
  {
    id: 'technology-quality-products',
    label: '제8장',
    title: '공공조달 기술품질 제품',
    description: '벤처나라, 혁신제품, 우수제품 지정제도의 핵심 요건을 확인합니다.',
    icon: <Sparkles className="h-5 w-5" />,
    accent: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
    sections: [
      { title: '벤처나라 등록제도' },
      { title: '혁신제품 지정제도' },
      { title: '우수제품 지정제도' },
    ],
  },
  {
    id: 'service-contract',
    label: '제9장',
    title: '용역계약',
    description: '용역계약의 입찰·낙찰제도와 주요 집행방법, 이행관리를 학습합니다.',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    accent: 'bg-slate-100 text-slate-700 border-slate-200',
    sections: [
      { title: '용역계약 일반 개요' },
      { title: '용역계약 입찰 및 낙찰제도' },
      { title: '주요 일반용역계약 집행방법 및 절차' },
      { title: '용역 이행 및 관리' },
    ],
  },
  {
    id: 'construction-contract',
    label: '제10장',
    title: '공사계약관리',
    description: '공사계약 일반, 건설엔지니어링, 공사계약과 공사단계를 살펴봅니다.',
    icon: <HardHat className="h-5 w-5" />,
    accent: 'bg-orange-50 text-orange-600 border-orange-100',
    sections: [
      { title: '공사계약 일반 개요' },
      { title: '건설엔지니어링' },
      { title: '공사계약' },
      { title: '공사단계' },
    ],
  },
  {
    id: 'appendix-laws',
    label: '부록',
    title: '공공조달 법률 이해',
    description: '국가·지방계약, 민법, 조달사업, 전자조달 및 공공기관 계약규칙을 비교합니다.',
    icon: <Scale className="h-5 w-5" />,
    accent: 'bg-gray-100 text-gray-700 border-gray-200',
    sections: [
      { title: '공공조달(국가 및 지방) 법령의 이해' },
      { title: '공공계약 관련 민법 규정의 이해' },
      { title: '조달사업법령의 이해' },
      { title: '전자조달법령의 이해' },
      { title: '공기업·준정부기관 계약사무규칙' },
      { title: '국가계약법과 지방계약법의 주요 차이점' },
    ],
  },
];

export default function Curriculum() {
  const chapterCount = curriculumChapters.filter((chapter) => chapter.label !== '부록').length;
  const sectionCount = curriculumChapters.reduce((total, chapter) => total + chapter.sections.length, 0);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-6 py-8 md:px-10 md:py-12 text-white mb-8 md:mb-10 overflow-hidden relative">
        <div className="relative">
          <p className="text-blue-100 font-bold text-sm mb-3">CURRICULUM</p>
          <h1 className="text-3xl md:text-5xl font-black mb-4">공공조달 전체 목차</h1>
          <p className="text-sm md:text-lg text-blue-50 max-w-3xl leading-relaxed">
            물품구매계약 일반부터 공사계약관리, 공공조달 법률 이해까지 10개 장과 부록 순서로 학습합니다.
          </p>
          <div className="grid grid-cols-3 gap-3 md:max-w-lg mt-7">
            <div className="rounded-2xl bg-white/15 border border-white/20 p-4">
              <p className="text-2xl font-black">{chapterCount}</p>
              <p className="text-xs text-blue-100">정규 장</p>
            </div>
            <div className="rounded-2xl bg-white/15 border border-white/20 p-4">
              <p className="text-2xl font-black">{sectionCount}</p>
              <p className="text-xs text-blue-100">주요 목차</p>
            </div>
            <div className="rounded-2xl bg-white/15 border border-white/20 p-4">
              <p className="text-2xl font-black">1</p>
              <p className="text-xs text-blue-100">법률 부록</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">학습 목차</h2>
        <p className="text-sm text-gray-500">각 장의 핵심 주제와 세부 항목을 한눈에 확인하세요.</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {curriculumChapters.map((chapter) => (
          <article
            key={chapter.id}
            className={`bg-white rounded-3xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow ${
              chapter.label === '부록' ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className={`h-11 w-11 rounded-2xl border flex items-center justify-center shrink-0 ${chapter.accent}`}>
                {chapter.icon}
              </div>
              <div>
                <p className="text-xs font-black text-blue-600 mb-1">{chapter.label}</p>
                <h3 className="text-lg md:text-xl font-black text-gray-900">{chapter.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{chapter.description}</p>
              </div>
            </div>

            <ol className="space-y-3">
              {chapter.sections.map((section, index) => (
                <li key={`${chapter.id}-${section.title}`} className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-white text-[11px] font-black text-gray-500 border border-gray-200">
                      {section.label ?? index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 leading-snug">{section.title}</p>
                      {section.items && (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {section.items.map((item) => (
                            <li key={item} className="rounded-full bg-white border border-gray-200 px-2.5 py-1 text-xs text-gray-500">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>
    </main>
  );
}
