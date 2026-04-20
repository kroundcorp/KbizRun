'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  X,
  Ticket,
  Loader2,
  AlertCircle,
  Check,
  Gift,
} from 'lucide-react';
import { lookupCoupon, type CouponLookupResult } from '../data/coupons';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CouponModal({ isOpen, onClose }: CouponModalProps) {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CouponLookupResult | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setSubmitting(false);
      setResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || submitting) return;
    setSubmitting(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setResult(lookupCoupon(code));
    setSubmitting(false);
  };

  const handleReset = () => {
    setCode('');
    setResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-[460px] overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              aria-label="닫기"
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <Ticket className="h-7 w-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  쿠폰인증센터
                </h2>
                <p className="text-gray-500 mt-2 text-[14px]">
                  보유하신 쿠폰 번호를 입력해 주세요.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 ml-1">
                    쿠폰 번호
                  </label>
                  <div className="relative">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="예) WELCOME-2026"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        if (result) setResult(null);
                      }}
                      autoFocus
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 font-mono tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {result && <ResultBanner result={result} />}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={submitting}
                    className="border border-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 disabled:opacity-50"
                  >
                    다시 입력
                  </button>
                  <button
                    type="submit"
                    disabled={!code.trim() || submitting}
                    className={`font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                      !code.trim() || submitting
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#2563eb] text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    쿠폰 확인
                  </button>
                </div>
              </form>

              <div className="mt-6 text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
                <p className="mb-1">• 쿠폰 번호는 영문 대문자·숫자·하이픈(-)으로 구성됩니다.</p>
                <p className="mb-1">• 사용한 쿠폰 또는 유효기간이 지난 쿠폰은 재사용 불가합니다.</p>
                <p>• 문의: 1600-5933 / contact@kbizrun.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ResultBanner({ result }: { result: CouponLookupResult }) {
  if (result.status === 'success') {
    const c = result.coupon;
    return (
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 space-y-2">
        <div className="flex items-center gap-2 text-blue-700 font-bold">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
          </div>
          사용 가능한 쿠폰입니다
        </div>
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Gift className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{c.title}</p>
              <p className="text-gray-600 text-sm mt-0.5">{c.benefit}</p>
              <p className="text-xs text-gray-400 mt-2 font-mono">
                {c.code} · 만료 {c.expiresAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result.status === 'used') {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-amber-900">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-bold mb-0.5">이미 사용된 쿠폰입니다</p>
          <p className="text-amber-800">
            해당 쿠폰은 이미 사용 완료된 번호입니다. 다른 쿠폰을 입력하거나 고객센터에 문의해 주세요.
          </p>
        </div>
      </div>
    );
  }

  if (result.status === 'expired') {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-amber-900">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-bold mb-0.5">유효기간이 지난 쿠폰입니다</p>
          <p className="text-amber-800">
            만료일: {result.coupon.expiresAt}. 최신 이벤트의 신규 쿠폰을 확인해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-700">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
      <div className="text-sm">
        <p className="font-bold mb-0.5">존재하지 않는 쿠폰 번호입니다</p>
        <p className="text-red-600">
          번호를 다시 확인해 주세요. 대소문자와 하이픈 위치까지 정확히 입력해야 합니다.
        </p>
      </div>
    </div>
  );
}
