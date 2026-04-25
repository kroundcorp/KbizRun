'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Loader2, MapPin, Package, Truck } from 'lucide-react';
import { getBookById } from '../data/books';
import {
  createBookOrder,
  getBookCart,
  getBookOrders,
  getCartTotal,
  getDemoProfile,
  type BookCartItem,
  type BookOrder,
  type ShippingAddress,
} from '../lib/demoStore';

declare global {
  interface Window {
    daum?: {
      Postcode: new (opts: {
        oncomplete: (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
        }) => void;
      }) => { open: () => void };
    };
  }
}

type PayMethod = 'card' | 'kakaopay' | 'naverpay' | 'transfer';

const PAY_LABEL: Record<PayMethod, string> = {
  card: '신용·체크카드',
  kakaopay: '카카오페이',
  naverpay: '네이버페이',
  transfer: '계좌이체',
};

const initialShipping: ShippingAddress = {
  recipientName: '',
  recipientPhone: '',
  zipcode: '',
  address1: '',
  address2: '',
  memo: '',
};

export default function BookCheckout() {
  const router = useRouter();
  const params = useSearchParams();
  const orderNo = params.get('order');
  const [cart, setCart] = useState<BookCartItem[]>([]);
  const [order, setOrder] = useState<BookOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [shipping, setShipping] = useState<ShippingAddress>(initialShipping);
  const [payMethod, setPayMethod] = useState<PayMethod>('card');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postcodeLoading, setPostcodeLoading] = useState(false);

  useEffect(() => {
    const profile = getDemoProfile();
    setShipping((prev) => ({
      ...prev,
      recipientName: profile.name,
      recipientPhone: profile.phone,
    }));
    if (orderNo) {
      setOrder(getBookOrders().find((item) => item.orderNo === orderNo) ?? null);
    } else {
      setCart(getBookCart());
    }
    setHydrated(true);
  }, [orderNo]);

  const total = useMemo(() => getCartTotal(cart), [cart]);
  const validItems = cart.filter((item) => getBookById(item.bookId));

  if (orderNo && hydrated && !order) redirect('/books');

  const validate = () => {
    if (validItems.length === 0) return '주문할 교재가 없습니다.';
    if (!shipping.recipientName.trim()) return '받는 분 이름을 입력해주세요.';
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(shipping.recipientPhone.replace(/\s/g, ''))) {
      return '올바른 휴대폰 번호를 입력해주세요.';
    }
    if (!shipping.zipcode || !shipping.address1) return '배송 주소를 입력해주세요.';
    return null;
  };

  const openPostcode = () => {
    setPostcodeLoading(true);
    const open = () => {
      setPostcodeLoading(false);
      if (!window.daum?.Postcode) {
        setError('우편번호 검색 스크립트를 불러오지 못했습니다. 주소를 직접 입력해주세요.');
        return;
      }
      new window.daum.Postcode({
        oncomplete: (data) => {
          setShipping((prev) => ({
            ...prev,
            zipcode: data.zonecode,
            address1: data.roadAddress || data.jibunAddress,
          }));
          setError(null);
        },
      }).open();
    };

    if (window.daum?.Postcode) {
      open();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = open;
    script.onerror = () => {
      setPostcodeLoading(false);
      setError('우편번호 검색 스크립트를 불러오지 못했습니다. 주소를 직접 입력해주세요.');
    };
    document.body.appendChild(script);
  };

  const submit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      const next = createBookOrder({ items: validItems, shipping, payMethod });
      router.push(`/books/checkout?order=${next.orderNo}`);
    }, 700);
  };

  if (order) {
    return (
      <main className="max-w-[900px] mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">교재 주문이 완료되었습니다</h1>
          <p className="text-gray-500">{order.orderNo} · 결제 확인 후 배송 준비가 시작됩니다.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-6">
          <h2 className="font-black text-gray-900 mb-4">배송 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="받는 분" value={order.shipping.recipientName} />
            <Info label="연락처" value={order.shipping.recipientPhone} />
            <Info label="주소" value={`(${order.shipping.zipcode}) ${order.shipping.address1} ${order.shipping.address2}`} wide />
            <Info label="배송 상태" value="배송 준비중" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8">
          <h2 className="font-black text-gray-900 mb-4">주문 교재</h2>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.bookId} className="py-3 flex justify-between gap-4 text-sm">
                <span className="font-bold text-gray-900">{item.title} × {item.quantity}</span>
                <span className="text-gray-700">{(item.unitPrice * item.quantity).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-4 flex justify-between font-black">
            <span>총 결제금액</span>
            <span>{order.totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/mypage" className="flex-1 text-center bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700">
            마이페이지에서 배송 확인
          </Link>
          <Link href="/books" className="flex-1 text-center bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50">
            교재 더 보기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1100px] mx-auto px-4 py-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        뒤로가기
      </button>
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">교재 주문서</h1>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              배송지 입력
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="받는 분" required>
                <input value={shipping.recipientName} onChange={(e) => setShipping({ ...shipping, recipientName: e.target.value })} className="input" />
              </Field>
              <Field label="휴대폰 번호" required>
                <input value={shipping.recipientPhone} onChange={(e) => setShipping({ ...shipping, recipientPhone: e.target.value })} className="input" placeholder="010-0000-0000" />
              </Field>
              <Field label="우편번호" required>
                <div className="flex gap-2">
                  <input value={shipping.zipcode} onChange={(e) => setShipping({ ...shipping, zipcode: e.target.value })} className="input" />
                  <button
                    type="button"
                    onClick={openPostcode}
                    disabled={postcodeLoading}
                    className="shrink-0 inline-flex items-center gap-1 bg-gray-900 text-white font-bold px-4 rounded-xl hover:bg-gray-700 disabled:opacity-60"
                  >
                    {postcodeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    검색
                  </button>
                </div>
              </Field>
              <Field label="기본 주소" required>
                <input value={shipping.address1} onChange={(e) => setShipping({ ...shipping, address1: e.target.value })} className="input" />
              </Field>
              <Field label="상세 주소">
                <input value={shipping.address2} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} className="input" />
              </Field>
              <Field label="배송 요청사항">
                <input value={shipping.memo} onChange={(e) => setShipping({ ...shipping, memo: e.target.value })} className="input" placeholder="문 앞에 놓아주세요" />
              </Field>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <h2 className="font-black text-gray-900 mb-5">결제 수단</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(PAY_LABEL) as PayMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPayMethod(method)}
                  className={`p-4 rounded-2xl border-2 text-sm font-bold ${
                    payMethod === method ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {PAY_LABEL[method]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-xl shadow-blue-100">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              주문 상품
            </h2>
            {validItems.length === 0 ? (
              <p className="text-sm text-gray-500 mb-5">장바구니가 비어 있습니다.</p>
            ) : (
              <div className="space-y-3 border-b border-gray-100 pb-5 mb-5">
                {validItems.map((item) => {
                  const book = getBookById(item.bookId);
                  if (!book) return null;
                  return (
                    <div key={item.bookId} className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-700">{book.title} × {item.quantity}</span>
                      <span className="font-bold text-gray-900 shrink-0">{(book.price * item.quantity).toLocaleString()}원</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-bold text-gray-700">총 결제금액</span>
              <span className="text-2xl font-black text-gray-900">{total.toLocaleString()}원</span>
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 mb-3">{error}</p>}
            <button
              type="button"
              onClick={submit}
              disabled={submitting || validItems.length === 0}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {total.toLocaleString()}원 결제하기
            </button>
            <p className="text-[11px] text-gray-400 mt-3">현재는 MVP 데모 결제이며 주문/배송 상태는 마이페이지에 저장됩니다.</p>
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
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? 'md:col-span-2' : undefined}>
      <p className="text-[11px] text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
