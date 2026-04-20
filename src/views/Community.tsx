'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Search, Plus } from 'lucide-react';
import { posts } from '../data/community';
import { subjects } from '../data/subjects';

const TYPES = ['전체', '질문', '팁', '후기'] as const;

export default function Community() {
  const [type, setType] = useState<(typeof TYPES)[number]>('전체');
  const [subject, setSubject] = useState<string>('전체');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (type !== '전체' && p.type !== type) return false;
      if (subject !== '전체' && p.subject !== subject) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [type, subject, query]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8 flex items-center justify-between">
        <div>
          <p className="text-blue-600 font-bold text-xs mb-1">COMMUNITY</p>
          <h1 className="text-3xl font-black text-gray-900 mb-1 flex items-center gap-3">
            <MessageCircle className="h-7 w-7 text-purple-600" /> K톡
          </h1>
          <p className="text-gray-500">전문가와 합격자가 함께하는 조달 커뮤니티</p>
        </div>
        <button className="bg-blue-600 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> 글쓰기
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 font-bold mb-3">글 유형</p>
            <div className="space-y-1">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg ${
                    type === t ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 font-bold mb-3">과목</p>
            <div className="space-y-1">
              <button
                onClick={() => setSubject('전체')}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg ${
                  subject === '전체' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                전체
              </button>
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSubject(s.name)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg ${
                    subject === s.name ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목으로 검색"
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {filtered.length === 0 && (
              <div className="p-10 text-center text-gray-400 text-sm">조건에 맞는 글이 없습니다.</div>
            )}
            {filtered.map((p) => (
              <Link
                key={p.id}
                 href={`/community/${p.id}`}
                className="block p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="border border-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{p.subject}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      p.type === '질문' ? 'bg-blue-50 text-blue-600' : p.type === '팁' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {p.type}
                  </span>
                  <span className="text-[10px] text-gray-400">· {p.createdAt}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 truncate">{p.body}</p>
                <div className="mt-2 text-[11px] text-gray-400 flex gap-3">
                  <span>작성자 {p.author}</span>
                  <span>조회 {p.views}</span>
                  <span>댓글 {p.comments}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
