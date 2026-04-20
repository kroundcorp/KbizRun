'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams, redirect } from 'next/navigation';
import {
  ChevronLeft,
  Check,
  Video,
  Bookmark,
  Bot,
  Users,
  Award,
  FileText,
  Clock,
  ShieldCheck,
  HelpCircle,
  Star,
  ChevronRight,
} from 'lucide-react';
import { getPlan, plans, type PlanFeatureDetail } from '../data/pricing';

const ICONS: Record<PlanFeatureDetail['icon'], React.ReactNode> = {
  video: <Video className="h-5 w-5" />,
  bookmark: <Bookmark className="h-5 w-5" />,
  bot: <Bot className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  file: <FileText className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
};

const FAQS: [string, string][] = [
  ['이용권 기간은 어떻게 계산되나요?', '결제 즉시 이용이 시작되며, 결제 시점부터 명시된 일수 동안 이용 가능합니다.'],
  ['환불이 가능한가요?', '결제일로부터 7일 이내, 학습 진도율 10% 미만인 경우 전액 환불이 가능합니다. 그 외에는 잔여 이용기간을 일할계산하여 환불됩니다.'],
  ['여러 이용권을 중복 구매할 수 있나요?', '가능합니다. 기간이 자동으로 연장되며, 더 긴 기간의 상품을 구매하면 남은 기간에 합산됩니다.'],
  ['모바일에서도 이용할 수 있나요?', '네. 반응형 웹으로 설계되어 PC/태블릿/모바일 어디서나 동일한 콘텐츠를 이용할 수 있습니다.'],
  ['영상은 다운로드할 수 있나요?', '저작권 보호를 위해 다운로드는 제공되지 않으며, 스트리밍으로만 시청 가능합니다.'],
];

const TESTIMONIALS = [
  {
    name: '김**',
    age: '32세 · 공기업 준비',
    comment:
      '처음엔 조달 관련 지식이 전무했는데, 4단계 커리큘럼 따라가니까 3개월만에 한 번에 합격했습니다. 특히 AI 튜터가 새벽에도 답을 줘서 정말 좋았어요.',
    plan: 'quarter',
  },
  {
    name: '박**',
    age: '45세 · 건설회사 근무',
    comment:
      '실무 경력은 있어도 시험은 또 다르더라고요. 홍순후 교수님 강의 듣고 핵심을 잡았고, 모의고사 반복으로 감을 익혔습니다.',
    plan: 'half',
  },
  {
    name: '이**',
    age: '28세 · 공공기관 입사 준비',
    comment:
      '다른 인강도 들어봤는데, 여기 AI 문제 변형이 진짜입니다. 같은 유형을 난이도별로 풀어볼 수 있어서 제일 도움 됐어요.',
    plan: 'quarter',
  },
];

export default function PlanDetail() {
  const { planId } = useParams<{ planId: string }>();
  const router = useRouter();
  const plan = planId ? getPlan(planId) : undefined;

  if (!plan) redirect('/pricing');

  const discountAmount = plan.originalPrice ? plan.originalPrice - plan.price : 0;
  const discountRate = plan.originalPrice ? Math.round((discountAmount / plan.originalPrice) * 100) : 0;
  const isFree = plan.price === 0;

  const otherPlans = plans.filter((p) => p.id !== plan.id);
  const relevantTestimonials = TESTIMONIALS.filter((t) => t.plan === plan.id);
  const testimonialsToShow = relevantTestimonials.length >= 2 ? relevantTestimonials : TESTIMONIALS;

  const handleBuy = () => {
    if (isFree) {
      router.push(`/checkout/${plan.id}`);
    } else {
      router.push(`/checkout/${plan.id}`);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 pb-32">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link  href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link  href="/pricing" className="hover:text-blue-600">이용권</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium">{plan.name}</span>
      </div>

      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        이용권 목록으로
      </button>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        <section className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-gradient-to-br from-[#1a103c] to-[#37257a] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="relative">
              {plan.badge && (
                <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {plan.badge}
                </span>
              )}
              {plan.tagline && (
                <p className="text-purple-200 text-sm font-medium mb-2">{plan.tagline}</p>
              )}
              <h1 className="text-3xl md:text-4xl font-black mb-3">{plan.name}</h1>
              <p className="text-sm md:text-base text-purple-100 leading-relaxed max-w-xl">{plan.description}</p>
              <div className="flex items-center gap-2 mt-4 text-xs text-purple-200">
                <Clock className="h-3.5 w-3.5" />
                <span>이용 기간 {plan.duration} ({plan.durationDays}일)</span>
              </div>
            </div>
          </div>

          {plan.recommendedFor && plan.recommendedFor.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                이런 분께 추천해요
              </h2>
              <ul className="space-y-3">
                {plan.recommendedFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {plan.detailedFeatures && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5">포함 혜택</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.detailedFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      {ICONS[f.icon]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plan.includes && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5">한 눈에 보는 제공 콘텐츠</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '과목', value: plan.includes.subjects, unit: '개' },
                  { label: '강의', value: plan.includes.lectures, unit: '강' },
                  { label: '모의고사', value: plan.includes.mockExams, unit: '회' },
                  { label: '1:1 멘토링', value: plan.includes.mentoring, unit: '회' },
                ].map((s) => (
                  <div key={s.label} className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center">
                    <p className="text-xs text-blue-600 font-bold mb-1">{s.label}</p>
                    <p className="text-3xl font-black text-gray-900">
                      {s.value}
                      <span className="text-sm text-gray-500 ml-1">{s.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {testimonialsToShow.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5">합격자 후기</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonialsToShow.slice(0, 2).map((t, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">"{t.comment}"</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {t.name} · {t.age}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plan.refundPolicy && plan.refundPolicy.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                환불·연장 정책
              </h2>
              <ul className="space-y-2.5">
                {plan.refundPolicy.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100">
            <h2 className="text-lg font-black text-blue-900 mb-5 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> 자주 묻는 질문
            </h2>
            <div className="space-y-3">
              {FAQS.map(([q, a], i) => (
                <details key={i} className="bg-white rounded-xl p-4 border border-blue-100 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    <span>Q. {q}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>

          {otherPlans.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-4">다른 이용권도 살펴보세요</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherPlans.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                     href={`/pricing/${p.id}`}
                    className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.duration}</p>
                    <p className="text-xl font-black text-gray-900">
                      {p.price === 0 ? '무료' : `${p.price.toLocaleString()}원`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 bg-white rounded-3xl border-2 border-blue-200 p-6 shadow-xl shadow-blue-100">
            <div className="mb-4">
              {plan.badge && (
                <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-black text-gray-900 text-lg">{plan.name}</h3>
              <p className="text-xs text-gray-500">{plan.duration}</p>
            </div>

            <div className="mb-5 pb-5 border-b border-gray-100">
              {plan.originalPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-400 line-through">
                    {plan.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-red-500 font-bold text-sm">{discountRate}%</span>
                </div>
              )}
              <p className="text-3xl font-black text-gray-900">
                {isFree ? '무료' : `${plan.price.toLocaleString()}원`}
              </p>
              {plan.originalPrice && (
                <p className="text-xs text-blue-600 font-bold mt-1">
                  {discountAmount.toLocaleString()}원 즉시 할인
                </p>
              )}
            </div>

            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleBuy}
              className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              {isFree ? '무료로 시작하기' : '결제하기'}
            </button>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-1.5 text-[11px] text-gray-500">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                  7일 이내 진도율 10% 미만 시 전액 환불
                </p>
                <p className="flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5 text-blue-500" />
                  AI 튜터 24시간 실시간 답변
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 shadow-2xl z-40">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">{plan.duration}</p>
            <p className="text-xl font-black text-gray-900">
              {isFree ? '무료' : `${plan.price.toLocaleString()}원`}
            </p>
          </div>
          <button
            onClick={handleBuy}
            className="flex-1 max-w-[240px] bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {isFree ? '무료로 시작하기' : '결제하기'}
          </button>
        </div>
      </div>
    </main>
  );
}
