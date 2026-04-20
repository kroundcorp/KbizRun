'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Minus,
  Plus,
  Package,
  Calendar,
  Hash,
  User as UserIcon,
  Truck,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { getBookById } from '../data/books';

export default function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const book = bookId ? getBookById(bookId) : undefined;
  const [qty, setQty] = useState(1);
  const [showNotice, setShowNotice] = useState(false);
  const router = useRouter();

  if (!book) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">존재하지 않는 교재입니다.</p>
        <Link
           href="/books"
          className="inline-block bg-gray-900 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-gray-700"
        >
          교재 목록으로
        </Link>
      </main>
    );
  }

  const total = book.price * qty;
  const discount = book.originalPrice
    ? (book.originalPrice - book.price) * qty
    : 0;

  const handlePurchase = () => {
    setShowNotice(true);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        뒤로가기
      </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10">
        <div className="md:col-span-2">
          <div
            className="aspect-[3/4] relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 shadow-xl"
            style={{ backgroundColor: book.coverBg }}
          >
            {book.badge && (
              <span className="self-start bg-white/90 text-gray-900 text-xs font-black px-3 py-1 rounded">
                {book.badge}
              </span>
            )}
            <div
              className="absolute left-0 top-0 bottom-0 w-2"
              style={{ backgroundColor: book.coverAccent }}
            />
            <div className="text-white mt-auto">
              <div className="text-xs tracking-[0.2em] opacity-80 mb-3">
                {book.category.toUpperCase()}
              </div>
              <h2 className="text-3xl font-black leading-tight">
                {book.title}
              </h2>
              {book.subtitle && (
                <p className="text-white/80 mt-3">{book.subtitle}</p>
              )}
              <p className="text-white/60 text-sm mt-6">{book.author}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-6">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
              {book.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="text-gray-500 mt-2">{book.subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 border-y border-gray-200 py-5 mb-6">
            <span className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-gray-400" /> 저자
            </span>
            <span className="font-medium text-gray-900">{book.author}</span>
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" /> 출판사
            </span>
            <span className="font-medium text-gray-900">{book.publisher}</span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" /> 출간일
            </span>
            <span className="font-medium text-gray-900">{book.publishedAt}</span>
            <span className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-400" /> ISBN
            </span>
            <span className="font-medium text-gray-900">{book.isbn}</span>
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" /> 페이지
            </span>
            <span className="font-medium text-gray-900">{book.pages}p</span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              {book.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {book.originalPrice.toLocaleString()}원
                </span>
              )}
              <span className="text-3xl md:text-4xl font-black text-gray-900">
                {book.price.toLocaleString()}원
              </span>
              {book.originalPrice && (
                <span className="text-red-500 font-bold">
                  {Math.round(
                    ((book.originalPrice - book.price) / book.originalPrice) *
                      100
                  )}
                  %
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700">수량</span>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-500 hover:text-gray-900"
                  aria-label="수량 감소"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-2 text-sm font-bold tabular-nums min-w-[40px] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-900"
                  aria-label="수량 증가"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>할인 금액</span>
                <span className="text-red-500 font-bold">
                  -{discount.toLocaleString()}원
                </span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-700">총 결제금액</span>
              <span className="text-2xl font-black text-gray-900">
                {total.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={handlePurchase}
              className="bg-white text-[#2563eb] border-2 border-[#2563eb] font-bold py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              장바구니
            </button>
            <button
              type="button"
              onClick={handlePurchase}
              className="bg-[#2563eb] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              바로 구매
            </button>
          </div>

          {showNotice && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-6">
              <p className="font-bold mb-1">결제 시스템 준비중입니다</p>
              <p className="text-yellow-700">
                토스페이먼츠 연동 후 정식 오픈 예정입니다. 현재는 고객센터(1600-5933) 또는 contact@kbizrun.com 으로 문의 부탁드립니다.
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-400" />
              영업일 1~2일 발송
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-gray-400" />
              14일 이내 반품
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gray-400" />
              정품/정가 보장
            </div>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-black text-gray-900 mb-4">책 소개</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {book.description}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-gray-900 mb-4">이 책의 특징</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {book.features.map((f, i) => (
            <li
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 flex items-start gap-3"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-black shrink-0">
                {i + 1}
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-4">목차</h2>
        <ol className="bg-white border border-gray-200 rounded-2xl p-6 space-y-2 list-decimal pl-9 text-gray-800">
          {book.tableOfContents.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
