'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, PlayCircle, Gift } from 'lucide-react';
import { exams } from '../data/exams';

export default function FreeMock() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 md:p-10 mb-8 md:mb-10 relative overflow-hidden">
        <div className="absolute right-4 md:right-10 top-4 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full flex items-center justify-center">
          <Gift className="h-8 w-8 md:h-12 md:w-12 text-red-500" />
        </div>
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">무료 체험</span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-2 pr-20 md:pr-0">무료 모의고사</h1>
        <p className="text-gray-700 text-base md:text-lg">회원가입만 하면 예상문제 샘플을 즉시 풀어볼 수 있어요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.slice(0, 2).map((e) => (
          <div key={e.id} className="bg-white rounded-3xl border border-gray-200 p-8 hover:border-blue-300 transition-colors">
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded border border-blue-100">무료</span>
            <h2 className="text-xl font-black text-gray-900 mt-3 mb-3">{e.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {e.durationMin}분</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {e.questions.length}문항</span>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              실제 시험과 동일한 환경에서 풀어보고 즉시 채점 결과와 해설을 확인하세요.
            </p>
            <Link
               href={`/exam/${e.id}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700"
            >
              <PlayCircle className="h-4 w-4" /> 지금 풀어보기
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#1e3a8a] rounded-3xl p-10 text-white text-center">
        <h2 className="text-2xl font-black mb-3">더 많은 문제가 필요하신가요?</h2>
        <p className="text-blue-100 mb-6">이용권 구매 시 필기·실기 예상문제와 모의고사 전체가 열립니다.</p>
        <Link
           href="/pricing"
          className="inline-block bg-white text-[#1e3a8a] font-bold px-8 py-3 rounded-xl hover:bg-blue-50"
        >
          이용권 보러가기
        </Link>
      </div>
    </main>
  );
}
