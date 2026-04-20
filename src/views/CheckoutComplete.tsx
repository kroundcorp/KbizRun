'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, redirect } from 'next/navigation';
import { CheckCircle2, Copy, BookOpen, User, Receipt, ArrowRight, Calendar, Download } from 'lucide-react';

interface Order {
  orderNo: string;
  planId: string;
  planName: string;
  durationDays: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  payMethod: string;
  couponCode: string | null;
  couponDiscount: number;
  instantDiscount: number;
  originalTotal: number;
  finalTotal: number;
  startedAt: string;
  expiresAt: string;
}

const PAY_LABEL: Record<string, string> = {
  card: '신용·체크카드',
  kakaopay: '카카오페이',
  naverpay: '네이버페이',
  tosspay: '토스페이',
  transfer: '실시간 계좌이체',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function CheckoutComplete() {
  const params = useSearchParams();
  const orderNo = params.get('order');

  const order = useMemo<Order | null>(() => {
    if (!orderNo) return null;
    try {
      const raw = sessionStorage.getItem(`order-${orderNo}`);
      return raw ? (JSON.parse(raw) as Order) : null;
    } catch {
      return null;
    }
  }, [orderNo]);

  if (!order) redirect('/pricing');

  const handleCopyOrderNo = () => {
    navigator.clipboard.writeText(order.orderNo).catch(() => {});
  };

  const isFree = order.finalTotal === 0;

  return (
    <main className="max-w-[960px] mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
          {isFree ? '무료 체험이 활성화되었습니다' : '결제가 완료되었습니다'}
        </h1>
        <p className="text-gray-500">
          {order.buyerName}님, K-Biz Run과 함께 합격까지 달려볼까요?
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a103c] to-[#37257a] text-white px-6 md:px-8 py-5 md:py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[11px] text-purple-200 font-medium mb-1">주문번호</p>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider">{order.orderNo}</span>
                <button
                  type="button"
                  onClick={handleCopyOrderNo}
                  className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center"
                  aria-label="주문번호 복사"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-purple-200 font-medium mb-1">결제 완료일</p>
              <p className="font-bold">{formatDate(order.startedAt)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <InfoCard
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            label="구매 이용권"
            value={order.planName}
            sub={`${order.durationDays}일`}
          />
          <InfoCard
            icon={<Calendar className="h-5 w-5 text-green-500" />}
            label="이용 기간"
            value={`${formatDate(order.startedAt)}`}
            sub={`~ ${formatDate(order.expiresAt)}`}
          />
          <InfoCard
            icon={<Receipt className="h-5 w-5 text-purple-500" />}
            label="결제 수단"
            value={PAY_LABEL[order.payMethod] ?? order.payMethod}
            sub={isFree ? '무료 체험' : `${order.finalTotal.toLocaleString()}원`}
          />
        </div>

        <div className="border-t border-gray-100 px-6 md:px-8 py-5 md:py-6 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">결제 내역</h3>
          <div className="space-y-2 text-sm">
            <Row label="정가" value={`${order.originalTotal.toLocaleString()}원`} muted />
            {order.instantDiscount > 0 && (
              <Row label="즉시 할인" value={`-${order.instantDiscount.toLocaleString()}원`} accent="text-red-500" />
            )}
            {order.couponDiscount > 0 && (
              <Row
                label={`쿠폰 할인${order.couponCode ? ` (${order.couponCode})` : ''}`}
                value={`-${order.couponDiscount.toLocaleString()}원`}
                accent="text-red-500"
              />
            )}
            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-baseline">
              <span className="font-bold text-gray-900">최종 결제금액</span>
              <span className="text-xl font-black text-gray-900">
                {isFree ? '무료' : `${order.finalTotal.toLocaleString()}원`}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 md:px-8 py-5 md:py-6">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">주문자 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[11px] text-gray-500 mb-1">이름</p>
              <p className="font-medium text-gray-900">{order.buyerName}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">이메일</p>
              <p className="font-medium text-gray-900 truncate">{order.buyerEmail}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">휴대폰</p>
              <p className="font-medium text-gray-900">{order.buyerPhone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
           href="/curriculum"
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
        >
          <BookOpen className="h-6 w-6 text-blue-500 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600">학습 시작하기</h4>
          <p className="text-xs text-gray-500">커리큘럼에서 첫 과목을 골라보세요.</p>
        </Link>
        <Link
           href="/mypage"
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
        >
          <User className="h-6 w-6 text-purple-500 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600">내 강의실</h4>
          <p className="text-xs text-gray-500">이용권·진도·수강내역을 확인합니다.</p>
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:-translate-y-0.5 transition-all group text-left"
        >
          <Download className="h-6 w-6 text-green-500 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600">영수증 인쇄</h4>
          <p className="text-xs text-gray-500">PDF로 저장하거나 인쇄할 수 있습니다.</p>
        </button>
      </div>

      <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-blue-900 mb-1">바로 학습을 시작해 보세요</h3>
          <p className="text-sm text-blue-700">
            첫 강의는 <strong>조달법규 1강 — 국가계약법 체계 개관</strong>부터 권장드립니다.
          </p>
        </div>
        <Link
           href="/subject/procurement-laws"
          className="inline-flex items-center gap-1 bg-[#2563eb] text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          바로 학습하기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        결제 관련 문의: 1600-5933 (평일 09:00~18:00) · contact@kbizrun.com
      </p>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
        <p className="font-bold text-gray-900 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
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
    <div className="flex justify-between">
      <span className={muted ? 'text-gray-500' : 'text-gray-700'}>{label}</span>
      <span className={`font-bold tabular-nums ${accent ?? 'text-gray-900'}`}>{value}</span>
    </div>
  );
}
