'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Star, HelpCircle, ChevronRight, Ticket, Info } from 'lucide-react';
import { plans } from '../data/pricing';

export default function Pricing() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-blue-600 font-bold text-sm mb-2">PRICING</p>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
          합격까지 함께하는 이용권
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          필기·실기를 한 번에 대비하는 올인원 이용권. 협동조합 조합원은 전용 쿠폰으로 특별가 제공.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[880px] mx-auto mb-10 md:mb-14">
        {plans.map((plan) => {
          const isCoop = !!plan.requiresCoupon;
          const discountRate = plan.originalPrice
            ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)
            : 0;
          return (
            <Link
              key={plan.id}
              href={`/pricing/${plan.id}`}
              className={`relative rounded-3xl p-8 border-2 transition-all group flex flex-col ${
                isCoop
                  ? 'border-purple-300 bg-gradient-to-br from-white to-purple-50/50 hover:border-purple-500 hover:-translate-y-1 shadow-lg shadow-purple-100'
                  : 'border-blue-600 bg-white shadow-xl shadow-blue-100'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md ${
                    isCoop
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="font-black text-gray-900 text-lg mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-500 mb-5">{plan.duration}</p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-400 line-through">
                      {plan.originalPrice.toLocaleString()}원
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                      {discountRate}% OFF
                    </span>
                  </div>
                )}
                <p className="text-4xl font-black text-gray-900 tabular-nums">
                  {plan.price.toLocaleString()}
                  <span className="text-xl font-bold text-gray-600 ml-1">원</span>
                </p>
                {plan.tagline && (
                  <p
                    className={`text-xs font-medium mt-2 ${
                      isCoop ? 'text-purple-700' : 'text-blue-600'
                    }`}
                  >
                    {plan.tagline}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        isCoop ? 'text-purple-500' : 'text-blue-500'
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {isCoop && (
                <div className="mb-4 rounded-xl bg-purple-50 border border-purple-200 px-3 py-2.5 flex items-start gap-2">
                  <Ticket className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-purple-800 leading-relaxed">
                    결제 전 <span className="font-bold">협동조합 전용 쿠폰 인증</span>이 필요합니다.
                  </p>
                </div>
              )}

              <button
                type="button"
                className={`w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  isCoop
                    ? 'bg-purple-600 text-white group-hover:bg-purple-700'
                    : 'bg-[#2563eb] text-white group-hover:bg-blue-700'
                }`}
              >
                {isCoop ? '쿠폰 인증 후 결제' : '자세히 보기'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900 leading-7">
          <p className="font-bold mb-0.5">협동조합 전용 쿠폰 안내</p>
          <p className="text-blue-800">
            협동조합 소속 조합원은 소속 조합으로부터 전용 쿠폰 번호를 발급받아 결제 시 입력하면
            특별가(490,000원)로 이용권을 구매할 수 있습니다. 쿠폰 관련 문의는{' '}
            <span className="font-bold">1600-5933</span> 또는{' '}
            <span className="font-bold">contact@kbizrun.com</span>으로 연락 주세요.
          </p>
        </div>
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
            ['협동조합 전용 쿠폰은 어디서 받나요?', '소속 협동조합을 통해 발급되며, 결제 시 쿠폰 번호 입력란에 입력하면 인증됩니다.'],
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
