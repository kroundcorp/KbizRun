'use client';

import React, { useState } from 'react';
import { Gift, Calendar, ChevronRight } from 'lucide-react';
import { events } from '../data/events';

const FILTERS = ['전체', 'active', 'upcoming', 'ended'] as const;
const LABEL: Record<(typeof FILTERS)[number], string> = {
  전체: '전체',
  active: '진행중',
  upcoming: '예정',
  ended: '종료',
};

export default function Events() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('전체');

  const filtered = filter === '전체' ? events : events.filter((e) => e.status === filter);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <div className="bg-gradient-to-br from-[#1a103c] to-[#37257a] rounded-3xl p-6 md:p-10 text-white mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-36 h-36 md:w-48 md:h-48 rounded-full bg-yellow-400/20"></div>
        <div className="absolute -right-20 -bottom-10 w-44 h-44 md:w-56 md:h-56 rounded-full bg-blue-400/10"></div>
        <div className="relative z-10 flex items-center gap-4 md:gap-6">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0">
            <Gift className="h-7 w-7 md:h-10 md:w-10 text-red-500" />
          </div>
          <div>
            <p className="text-purple-200 text-xs md:text-sm mb-1 md:mb-2">EVENT · 쿠폰 · 혜택</p>
            <h1 className="text-2xl md:text-3xl font-black mb-1 md:mb-2">KbizRun의 모든 이벤트</h1>
            <p className="text-sm md:text-base text-purple-100">합격을 응원하는 다양한 혜택을 놓치지 마세요.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 md:mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {LABEL[f]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="col-span-12 md:col-span-6 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:border-blue-300 transition-colors cursor-pointer group"
          >
            <div className={`aspect-[2/1] bg-gradient-to-br flex items-center justify-center relative ${
              e.color === 'purple' ? 'from-purple-400 to-purple-700' :
              e.color === 'red' ? 'from-red-400 to-orange-500' :
              e.color === 'blue' ? 'from-blue-400 to-indigo-600' :
              e.color === 'green' ? 'from-green-400 to-emerald-600' :
              'from-gray-300 to-gray-500'
            }`}>
              <span className="text-white text-xl font-black text-center leading-tight px-8">{e.title}</span>
              <span className="absolute top-4 left-4 bg-white/90 text-[11px] font-bold px-2 py-1 rounded text-gray-900">
                {e.tag}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                <Calendar className="h-3 w-3" /> {e.period}
              </p>
              <p className="text-sm text-gray-700 mb-4">{e.summary}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    e.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : e.status === 'upcoming'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {LABEL[e.status]}
                </span>
                <span className="text-xs text-gray-400 flex items-center group-hover:text-blue-600">
                  자세히 보기 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
