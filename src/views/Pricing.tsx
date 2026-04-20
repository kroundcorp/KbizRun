'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Star, HelpCircle, ChevronRight } from 'lucide-react';
import { plans } from '../data/pricing';

export default function Pricing() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-blue-600 font-bold text-sm mb-2">PRICING</p>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">합격까지 함께하는 이용권</h1>
        <p className="text-gray-500 text-sm md:text-base">34년 경력 전문가 검수 콘텐츠 + AI 튜터, 한 번에 누리세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
        {plans.map((plan) => {
          const isBest = plan.highlight;
          const isFree = plan.price === 0;
          return (
            <Link
              key={plan.id}
               href={`/pricing/${plan.id}`}
              className={`relative rounded-3xl p-8 border-2 bg-white transition-all group flex flex-col ${
                isBest
                  ? 'border-blue-600 shadow-xl shadow-blue-100 lg:scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:-translate-y-1'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-500 mb-5">{plan.duration}</p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    {plan.originalPrice.toLocaleString()}원
                  </p>
                )}
                <p className="text-3xl font-black text-gray-900">
                  {isFree ? '무료' : `${plan.price.toLocaleString()}원`}
                </p>
                {plan.tagline && (
                  <p className="text-xs text-blue-600 font-medium mt-2">{plan.tagline}</p>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  isBest
                    ? 'bg-blue-600 text-white group-hover:bg-blue-700'
                    : 'bg-gray-50 text-gray-700 group-hover:bg-blue-600 group-hover:text-white'
                }`}
              >
                {isFree ? '무료 체험' : '자세히 보기'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-current" /> 이용권에 포함된 것
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { t: '전 과목 기출', s: '8과목, 회차별 수록' },
            { t: '해설 영상', s: '홍순후 교수 직강' },
            { t: 'AI 챗봇', s: '24/7 즉시 답변' },
            { t: '실전 모의고사', s: '실제 시험과 동일' },
          ].map((i, k) => (
            <div key={k}>
              <h3 className="font-bold text-gray-900 mb-1">{i.t}</h3>
              <p className="text-sm text-gray-500">{i.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
        <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5" /> 자주 묻는 질문
        </h2>
        <div className="space-y-4">
          {[
            ['이용권 기간은 어떻게 계산되나요?', '결제 즉시 이용이 시작되며, 구매 시점부터 명시된 일수 동안 이용할 수 있습니다.'],
            ['환불이 가능한가요?', '결제일로부터 7일 이내, 학습 진도율 10% 미만인 경우 전액 환불이 가능합니다.'],
            ['여러 이용권을 중복 구매할 수 있나요?', '가능하며, 기간이 자동으로 연장됩니다.'],
          ].map(([q, a], i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-blue-100">
              <p className="font-bold text-gray-900 mb-1">Q. {q}</p>
              <p className="text-sm text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
