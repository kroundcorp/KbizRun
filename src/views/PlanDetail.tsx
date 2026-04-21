'use client';

import React, { useState } from 'react';
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
  Ticket,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';
import { getPlan, plans, type PlanFeatureDetail } from '../data/pricing';
import { lookupCoupon } from '../data/coupons';

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
  ['협동조합 전용 쿠폰은 어떻게 받나요?', '소속 협동조합의 담당자로부터 전용 쿠폰 번호를 발급받습니다. 쿠폰 1개당 1인 인증·1회 결제에 사용할 수 있습니다.'],
  ['모바일에서도 이용할 수 있나요?', '네. 반응형 웹으로 설계되어 PC/태블릿/모바일 어디서나 동일한 콘텐츠를 이용할 수 있습니다.'],
  ['영상은 다운로드할 수 있나요?', '저작권 보호를 위해 다운로드는 제공되지 않으며, 스트리밍으로만 시청 가능합니다.'],
];

type CoopCouponState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'verified'; code: string }
  | { status: 'error'; message: string };

export default function PlanDetail() {
  const { planId } = useParams<{ planId: string }>();
  const router = useRouter();
  const plan = planId ? getPlan(planId) : undefined;

  const [coopInput, setCoopInput] = useState('');
  const [coopState, setCoopState] = useState<CoopCouponState>({ status: 'idle' });

  if (!plan) redirect('/pricing');

  const discountAmount = plan.originalPrice ? plan.originalPrice - plan.price : 0;
  const discountRate = plan.originalPrice ? Math.round((discountAmount / plan.originalPrice) * 100) : 0;
  const isFree = plan.price === 0;
  const requiresCoupon = !!plan.requiresCoupon;
  const coopVerified = coopState.status === 'verified';
  const canBuy = !requiresCoupon || coopVerified;

  const otherPlans = plans.filter((p) => p.id !== plan.id);

  const handleVerifyCoop = () => {
    const code = coopInput.trim().toUpperCase();
    if (!code) {
      setCoopState({ status: 'error', message: '쿠폰 번호를 입력해주세요.' });
      return;
    }
    setCoopState({ status: 'loading' });
    setTimeout(() => {
      const result = lookupCoupon(code);
      if (result.status === 'not_found') {
        setCoopState({ status: 'error', message: '존재하지 않는 쿠폰 번호입니다.' });
        return;
      }
      if (result.status === 'used') {
        setCoopState({ status: 'error', message: '이미 사용된 쿠폰입니다.' });
        return;
      }
      if (result.status === 'expired') {
        setCoopState({ status: 'error', message: '유효기간이 만료된 쿠폰입니다.' });
        return;
      }
      if (result.coupon.kind !== 'coop') {
        setCoopState({
          status: 'error',
          message: '협동조합 전용 쿠폰이 아닙니다. 협동조합에서 발급받은 쿠폰을 입력해주세요.',
        });
        return;
      }
      setCoopState({ status: 'verified', code: result.coupon.code });
    }, 500);
  };

  const handleResetCoop = () => {
    setCoopInput('');
    setCoopState({ status: 'idle' });
  };

  const handleBuy = () => {
    if (!canBuy) return;
    if (requiresCoupon && coopState.status === 'verified') {
      try {
        sessionStorage.setItem(
          `coop-verify-${plan.id}`,
          JSON.stringify({ code: coopState.code, verifiedAt: new Date().toISOString() }),
        );
      } catch {}
      router.push(`/checkout/${plan.id}?coop=${encodeURIComponent(coopState.code)}`);
      return;
    }
    router.push(`/checkout/${plan.id}`);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 pb-32">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/pricing" className="hover:text-blue-600">이용권</Link>
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
          <div
            className={`relative overflow-hidden rounded-3xl p-6 md:p-8 text-white ${
              requiresCoupon
                ? 'bg-gradient-to-br from-[#3b1e5b] via-[#6d28d9] to-[#a21caf]'
                : 'bg-gradient-to-br from-[#1a103c] to-[#37257a]'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="relative">
              {plan.badge && (
                <span
                  className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                    requiresCoupon
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                      : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              {plan.tagline && (
                <p className="text-purple-200 text-sm font-medium mb-2">{plan.tagline}</p>
              )}
              <h1 className="text-2xl md:text-4xl font-black mb-3 leading-tight">{plan.name}</h1>
              <p className="text-sm md:text-base text-purple-100 leading-relaxed max-w-xl">
                {plan.description}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-purple-200">
                <Clock className="h-3.5 w-3.5" />
                <span>이용 기간 {plan.duration} ({plan.durationDays}일)</span>
              </div>
            </div>
          </div>

          {requiresCoupon && (
            <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 md:p-8 shadow-lg shadow-purple-100">
              <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-purple-600" />
                협동조합 전용 쿠폰 인증
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {plan.couponNote ??
                  '협동조합에서 발급받은 전용 쿠폰 번호를 입력해 인증 후 결제할 수 있습니다.'}
              </p>

              {coopVerified ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-green-900 mb-1">쿠폰 인증이 완료되었습니다</p>
                      <p className="text-sm text-green-800 mb-3">
                        <span className="font-mono font-bold">{coopState.code}</span> · 협동조합
                        전용 쿠폰으로 특별가 결제가 가능합니다.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetCoop}
                        className="text-xs text-green-700 font-bold underline hover:text-green-900"
                      >
                        다른 쿠폰으로 인증
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={coopInput}
                        onChange={(e) => {
                          setCoopInput(e.target.value.toUpperCase());
                          if (coopState.status === 'error') setCoopState({ status: 'idle' });
                        }}
                        placeholder="예) COOP-2026"
                        autoComplete="off"
                        spellCheck={false}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 font-mono tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyCoop}
                      disabled={!coopInput.trim() || coopState.status === 'loading'}
                      className={`font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                        !coopInput.trim() || coopState.status === 'loading'
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20'
                      }`}
                    >
                      {coopState.status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                      쿠폰 인증
                    </button>
                  </div>
                  {coopState.status === 'error' && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2 text-red-700">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <p className="text-sm">{coopState.message}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherPlans.map((p) => (
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
          <div
            className={`sticky top-6 bg-white rounded-3xl border-2 p-6 shadow-xl ${
              requiresCoupon ? 'border-purple-200 shadow-purple-100' : 'border-blue-200 shadow-blue-100'
            }`}
          >
            <div className="mb-4">
              {plan.badge && (
                <span
                  className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 ${
                    requiresCoupon
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500'
                      : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <h3 className="font-black text-gray-900 text-lg leading-snug">{plan.name}</h3>
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
              <p className="text-3xl font-black text-gray-900 tabular-nums">
                {isFree ? '무료' : `${plan.price.toLocaleString()}원`}
              </p>
              {plan.originalPrice && (
                <p
                  className={`text-xs font-bold mt-1 ${
                    requiresCoupon ? 'text-purple-700' : 'text-blue-600'
                  }`}
                >
                  {discountAmount.toLocaleString()}원 즉시 할인
                </p>
              )}
            </div>

            <ul className="space-y-2.5 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      requiresCoupon ? 'text-purple-500' : 'text-blue-500'
                    }`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {requiresCoupon && !coopVerified && (
              <div className="mb-4 rounded-xl bg-purple-50 border border-purple-200 px-3 py-2.5 flex items-start gap-2">
                <Lock className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                <p className="text-xs text-purple-800 leading-relaxed">
                  결제를 진행하려면 상단에서{' '}
                  <span className="font-bold">협동조합 전용 쿠폰 인증</span>을 완료해주세요.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleBuy}
              disabled={!canBuy}
              className={`w-full font-bold py-3.5 rounded-xl transition-colors shadow-lg ${
                !canBuy
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : requiresCoupon
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200'
                  : 'bg-[#2563eb] text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {isFree
                ? '무료로 시작하기'
                : requiresCoupon && !coopVerified
                ? '쿠폰 인증 필요'
                : '결제하기'}
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
            <p className="text-xl font-black text-gray-900 tabular-nums">
              {isFree ? '무료' : `${plan.price.toLocaleString()}원`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleBuy}
            disabled={!canBuy}
            className={`flex-1 max-w-[240px] font-bold py-3.5 rounded-xl transition-colors ${
              !canBuy
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : requiresCoupon
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-[#2563eb] text-white hover:bg-blue-700'
            }`}
          >
            {isFree
              ? '무료로 시작하기'
              : requiresCoupon && !coopVerified
              ? '쿠폰 인증 필요'
              : '결제하기'}
          </button>
        </div>
      </div>
    </main>
  );
}
