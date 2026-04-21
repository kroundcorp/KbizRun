'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams, redirect, useSearchParams } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Tag,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Info,
  Ticket,
} from 'lucide-react';
import { getPlan } from '../data/pricing';
import { lookupCoupon } from '../data/coupons';

type PayMethod = 'card' | 'kakaopay' | 'naverpay' | 'tosspay' | 'transfer';

interface PayMethodOption {
  id: PayMethod;
  label: string;
  desc: string;
  accent: string;
}

const PAY_METHODS: PayMethodOption[] = [
  { id: 'card', label: '신용·체크카드', desc: '국내 모든 카드사 지원 · 일시불/할부', accent: 'bg-blue-500' },
  { id: 'kakaopay', label: '카카오페이', desc: '카카오톡으로 간편결제', accent: 'bg-yellow-400' },
  { id: 'naverpay', label: '네이버페이', desc: '네이버 아이디로 간편결제', accent: 'bg-green-500' },
  { id: 'tosspay', label: '토스페이', desc: '토스 앱으로 간편결제', accent: 'bg-sky-500' },
  { id: 'transfer', label: '실시간 계좌이체', desc: '계좌에서 즉시 이체', accent: 'bg-gray-500' },
];

type CouponState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; code: string; discountPct: number }
  | { status: 'error'; message: string };

function parseCouponBenefit(benefit: string): number {
  // "전 강의 15% 할인" / "연간 이용권 30% 할인" → percent
  const m = benefit.match(/(\d+)%/);
  return m ? Number(m[1]) : 0;
}

const PHONE_PATTERN = /^01[016789]-?\d{3,4}-?\d{4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout() {
  const { planId } = useParams<{ planId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = planId ? getPlan(planId) : undefined;

  const coopCode = searchParams?.get('coop')?.toUpperCase() ?? null;
  const coopVerified = useMemo(() => {
    if (!plan?.requiresCoupon) return true;
    if (!coopCode) return false;
    const lookup = lookupCoupon(coopCode);
    return lookup.status === 'success' && lookup.coupon.kind === 'coop';
  }, [plan, coopCode]);

  useEffect(() => {
    if (plan?.requiresCoupon && !coopVerified) {
      router.replace(`/pricing/${plan.id}`);
    }
  }, [plan, coopVerified, router]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<CouponState>({ status: 'idle' });

  const [payMethod, setPayMethod] = useState<PayMethod>('card');

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePurchase, setAgreePurchase] = useState(false);
  const [agreePg, setAgreePg] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const allAgreed = agreePurchase && agreePg && agreeThirdParty;

  if (!plan) redirect('/pricing');

  const isFree = plan.price === 0;

  const couponDiscount = useMemo(() => {
    if (coupon.status !== 'success') return 0;
    return Math.floor((plan.price * coupon.discountPct) / 100);
  }, [coupon, plan.price]);

  const originalTotal = plan.originalPrice ?? plan.price;
  const instantDiscount = (plan.originalPrice ?? plan.price) - plan.price;
  const finalTotal = Math.max(0, plan.price - couponDiscount);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCoupon({ status: 'error', message: '쿠폰 코드를 입력해주세요.' });
      return;
    }
    setCoupon({ status: 'loading' });
    setTimeout(() => {
      const result = lookupCoupon(couponInput);
      if (result.status === 'success') {
        const pct = parseCouponBenefit(result.coupon.benefit);
        if (pct === 0) {
          setCoupon({ status: 'error', message: '이 쿠폰은 이용권 할인에 사용할 수 없습니다.' });
          return;
        }
        setCoupon({ status: 'success', code: result.coupon.code, discountPct: pct });
      } else if (result.status === 'used') {
        setCoupon({ status: 'error', message: '이미 사용된 쿠폰입니다.' });
      } else if (result.status === 'expired') {
        setCoupon({ status: 'error', message: '유효기간이 만료된 쿠폰입니다.' });
      } else {
        setCoupon({ status: 'error', message: '존재하지 않는 쿠폰 코드입니다.' });
      }
    }, 450);
  };

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreePurchase(next);
    setAgreePg(next);
    setAgreeThirdParty(next);
  };

  const validate = (): string | null => {
    if (!name.trim()) return '주문자 이름을 입력해주세요.';
    if (!EMAIL_PATTERN.test(email)) return '올바른 이메일 주소를 입력해주세요.';
    if (!PHONE_PATTERN.test(phone.replace(/\s/g, ''))) return '올바른 휴대폰 번호를 입력해주세요.';
    if (!allAgreed) return '필수 약관에 모두 동의해주세요.';
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);

    setTimeout(() => {
      const orderNo = `KB${new Date().getFullYear()}${String(Date.now()).slice(-8)}`;
      const startedAt = new Date();
      const expiresAt = new Date(startedAt.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
      const order = {
        orderNo,
        planId: plan.id,
        planName: plan.name,
        durationDays: plan.durationDays,
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
        payMethod,
        couponCode: coupon.status === 'success' ? coupon.code : null,
        couponDiscount,
        instantDiscount,
        originalTotal,
        finalTotal,
        startedAt: startedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
      sessionStorage.setItem(`order-${orderNo}`, JSON.stringify(order));
      sessionStorage.setItem('latest-order-no', orderNo);
      router.push(`/checkout/${plan.id}/complete?order=${orderNo}`);
    }, 1200);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link  href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link  href="/pricing" className="hover:text-blue-600">이용권</Link>
        <ChevronRight className="h-3 w-3" />
        <Link  href={`/pricing/${plan.id}`} className="hover:text-blue-600">{plan.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium">결제</span>
      </div>

      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        뒤로가기
      </button>

      <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">결제</h1>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-5">주문자 정보</h2>
            <div className="space-y-4">
              <Field label="이름" required>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="input"
                />
              </Field>
              <Field label="이메일" required hint="결제 영수증과 계정 안내가 전송됩니다.">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="input"
                />
              </Field>
              <Field label="휴대폰 번호" required hint="010-1234-5678">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="input"
                />
              </Field>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-500" />
              쿠폰 / 프로모션 코드
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  if (coupon.status === 'error' || coupon.status === 'success') {
                    setCoupon({ status: 'idle' });
                  }
                }}
                placeholder="쿠폰 코드 입력 (예: WELCOME-2026)"
                className="input flex-1 uppercase tracking-wider"
                disabled={coupon.status === 'success'}
              />
              {coupon.status === 'success' ? (
                <button
                  type="button"
                  onClick={() => {
                    setCoupon({ status: 'idle' });
                    setCouponInput('');
                  }}
                  className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 shrink-0"
                >
                  제거
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={coupon.status === 'loading'}
                  className="px-5 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-700 disabled:opacity-60 shrink-0 min-w-[80px] flex items-center justify-center"
                >
                  {coupon.status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : '적용'}
                </button>
              )}
            </div>

            {coupon.status === 'success' && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
                <Check className="h-4 w-4" />
                <span>
                  <strong>{coupon.code}</strong> 적용 — {coupon.discountPct}% 할인 ({couponDiscount.toLocaleString()}원)
                </span>
              </div>
            )}
            {coupon.status === 'error' && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="h-4 w-4" />
                <span>{coupon.message}</span>
              </div>
            )}
            <p className="text-[11px] text-gray-400 mt-3">
              * 체험용 쿠폰: <code className="bg-gray-100 px-1.5 py-0.5 rounded">WELCOME-2026</code> (15% 할인)
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              결제 수단
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PAY_METHODS.map((m) => {
                const active = payMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayMethod(m.id)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                      active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 ${m.accent} rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0`}
                    >
                      {m.label.slice(0, 2)}
                    </span>
                    <div className="flex-1">
                      <p className={`font-bold ${active ? 'text-blue-900' : 'text-gray-900'}`}>{m.label}</p>
                      <p className="text-[11px] text-gray-500">{m.desc}</p>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                      }`}
                    >
                      {active && <Check className="h-4 w-4 text-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-500 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <p>
                결제는 토스페이먼츠를 통해 안전하게 처리됩니다. 현재는 데모 모드이며, Phase 2 정식 오픈 후 실결제가 가능합니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-5">결제 동의</h2>
            <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl cursor-pointer mb-3 border border-blue-100">
              <input
                type="checkbox"
                checked={agreeAll}
                onChange={handleAgreeAll}
                className="w-5 h-5 rounded accent-blue-600"
              />
              <span className="font-bold text-gray-900">전체 동의</span>
            </label>
            <div className="space-y-1">
              <AgreeRow
                checked={agreePurchase}
                onChange={setAgreePurchase}
                label="구매조건 확인 및 결제 진행 동의"
                required
              />
              <AgreeRow
                checked={agreePg}
                onChange={setAgreePg}
                label="전자지급결제대행 서비스 이용약관 동의 (토스페이먼츠)"
                required
              />
              <AgreeRow
                checked={agreeThirdParty}
                onChange={setAgreeThirdParty}
                label="개인정보 제3자 제공 동의 (결제대행사·배송사)"
                required
              />
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">
              <Link  href="/terms" className="underline hover:text-gray-600">이용약관 전문 보기</Link>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 bg-white rounded-3xl border-2 border-blue-200 p-6 shadow-xl shadow-blue-100 space-y-5">
            <div>
              {plan.badge && (
                <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-black text-gray-900 text-lg">{plan.name}</h3>
              <p className="text-xs text-gray-500">이용 기간 {plan.duration}</p>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-2.5 text-sm">
              <Row label="정가" value={`${originalTotal.toLocaleString()}원`} muted />
              {instantDiscount > 0 && (
                <Row
                  label="즉시 할인"
                  value={`-${instantDiscount.toLocaleString()}원`}
                  accent="text-red-500"
                />
              )}
              {couponDiscount > 0 && (
                <Row
                  label={`쿠폰 할인 (${coupon.status === 'success' ? coupon.discountPct : 0}%)`}
                  value={`-${couponDiscount.toLocaleString()}원`}
                  accent="text-red-500"
                />
              )}
            </div>

            <div className="border-t border-gray-100 pt-5 flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-700">최종 결제금액</span>
              <span className="text-2xl font-black text-gray-900">
                {isFree ? '무료' : `${finalTotal.toLocaleString()}원`}
              </span>
            </div>

            {submitError && (
              <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#2563eb] text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  결제 진행 중...
                </>
              ) : isFree ? (
                '무료로 시작하기'
              ) : (
                `${finalTotal.toLocaleString()}원 결제하기`
              )}
            </button>

            <div className="pt-4 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-500">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                SSL 암호화 결제 · 안전거래
              </p>
              <p className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                7일 이내 진도율 10% 미만 시 전액 환불
              </p>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          background: white;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .input:disabled {
          background: #f9fafb;
          color: #9ca3af;
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="text-[11px] text-gray-400 mt-1 block">{hint}</span>}
    </label>
  );
}

function AgreeRow({
  checked,
  onChange,
  label,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded accent-blue-600"
        />
        <span className="text-sm text-gray-700">
          {required && <span className="text-blue-600 font-bold mr-1">[필수]</span>}
          {label}
        </span>
      </div>
      <button
        type="button"
        className="text-xs text-gray-400 hover:text-gray-600 underline"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        보기
      </button>
    </label>
  );
}

function Row({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className={`${muted ? 'text-gray-500' : 'text-gray-700'}`}>{label}</span>
      <span className={`font-bold tabular-nums ${accent ?? 'text-gray-900'}`}>{value}</span>
    </div>
  );
}
