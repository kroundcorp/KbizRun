'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Search as SearchIcon } from 'lucide-react';
import { searchSite, type SearchCategory } from '../data/search';

const CATEGORIES: Array<'전체' | SearchCategory> = ['전체', '교육과정', '교재', '영상강의', '예상문제', '게시판', '이용권', '자격소개'];

const CATEGORY_STYLE: Record<SearchCategory, string> = {
  교육과정: 'bg-blue-50 text-blue-700',
  교재: 'bg-emerald-50 text-emerald-700',
  영상강의: 'bg-purple-50 text-purple-700',
  예상문제: 'bg-orange-50 text-orange-700',
  게시판: 'bg-slate-100 text-slate-700',
  이용권: 'bg-rose-50 text-rose-700',
  자격소개: 'bg-indigo-50 text-indigo-700',
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [input, setInput] = useState(initialQuery);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('전체');

  const results = useMemo(() => searchSite(initialQuery), [initialQuery]);
  const filtered = useMemo(
    () => category === '전체' ? results : results.filter((item) => item.category === category),
    [category, results],
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = input.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-10">
      <section className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 md:p-10 text-white mb-8">
        <p className="text-blue-100 font-bold text-sm mb-3">SITE SEARCH</p>
        <h1 className="text-3xl md:text-5xl font-black mb-4">통합 검색</h1>
        <p className="text-sm md:text-lg text-blue-50 leading-relaxed">
          교육과정, 교재, 영상강의, 예상문제, 게시판, 이용권을 한 번에 검색합니다.
        </p>
      </section>

      <form onSubmit={submit} className="bg-white rounded-3xl border border-gray-200 p-4 md:p-5 shadow-sm mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoFocus
            placeholder="예: 예정가격, MAS, 교재, 모의고사, 멘토링"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-28 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
            검색
          </button>
        </div>
      </form>

      {initialQuery ? (
        <>
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">“{initialQuery}”</span> 검색 결과 {filtered.length}건
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((item) => {
              const count = item === '전체' ? results.length : results.filter((result) => result.category === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    category === item ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item} {count}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Link key={item.id} href={item.href} className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:-translate-y-0.5 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black mb-2 ${CATEGORY_STYLE[item.category]}`}>
                      {item.category}
                    </span>
                    <h2 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 shrink-0 mt-5" />
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-3xl border border-gray-200 bg-white py-16 text-center">
                <p className="font-bold text-gray-900 mb-2">검색 결과가 없습니다.</p>
                <p className="text-sm text-gray-500">다른 키워드로 다시 검색해 주세요.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <h2 className="font-black text-gray-900 mb-4">추천 검색어</h2>
          <div className="flex flex-wrap gap-2">
            {['예정가격', '물품구매계약', 'MAS', '협상에 의한 계약', '모의고사', '기본서', '멘토링'].map((keyword) => (
              <Link key={keyword} href={`/search?q=${encodeURIComponent(keyword)}`} className="rounded-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100">
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
