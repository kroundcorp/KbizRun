'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, CheckCircle2, Target, Trophy } from 'lucide-react';
import { subjects } from '../data/subjects';

const STEPS = [
  { id: 'theory', step: '01', title: '이론학습', desc: '법령 이해부터 구조화까지', icon: <FileText className="h-6 w-6" />, color: 'blue' },
  { id: 'by-area', step: '02', title: '영역별 학습', desc: '동일 유형을 난이도별로 풀며 점진 향상', icon: <Target className="h-6 w-6" />, color: 'orange' },
  { id: 'practice', step: '03', title: '실전대비', desc: '최다빈출·고난도 문제 집중 훈련', icon: <CheckCircle2 className="h-6 w-6" />, color: 'green' },
  { id: 'final', step: '04', title: '직전대비', desc: '파이널 모의고사로 최종 점검', icon: <Trophy className="h-6 w-6" />, color: 'red' },
];

export default function Curriculum() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-blue-600 font-bold text-sm mb-2">CURRICULUM</p>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">4단계 시험대비 전략</h1>
        <p className="text-gray-500 text-sm md:text-base">이론 → 영역별 → 실전 → 직전, 단계별로 합격률이 오릅니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
        {STEPS.map((s) => (
          <Link
            key={s.step}
             href={`/step/${s.id}`}
            className="bg-white rounded-3xl border border-gray-200 p-5 md:p-6 hover:-translate-y-1 hover:border-blue-300 transition-all group"
          >
            <div
              className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 ${
                s.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                s.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                s.color === 'green' ? 'bg-green-50 text-green-500' :
                'bg-red-50 text-red-500'
              }`}
            >
              {s.icon}
            </div>
            <p className="text-[11px] font-bold text-gray-400 mb-1">STEP {s.step}</p>
            <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">8개 과목 한눈에 보기</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {subjects.map((s) => (
          <Link
            key={s.id}
             href={`/subject/${s.id}`}
            className="flex items-center gap-4 md:gap-5 bg-white rounded-2xl border border-gray-200 p-4 md:p-5 hover:border-blue-300 group"
          >
            <span className="text-3xl">{s.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">과목 {s.index}</span>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{s.name}</h3>
              </div>
              <p className="text-xs text-gray-500">{s.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500" />
          </Link>
        ))}
      </div>
    </main>
  );
}
