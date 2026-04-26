'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, Package, ShoppingBag } from 'lucide-react';
import { books, Book } from '../data/books';

const categories: Array<{ key: 'all' | Book['category']; label: string }> = [
  { key: 'all', label: '전체' },
  { key: '기본서', label: '기본서' },
  { key: '문제집', label: '문제집' },
  { key: '요약서', label: '요약서' },
  { key: '세트', label: '세트' },
];

export default function Books() {
  const [filter, setFilter] = useState<'all' | Book['category']>('all');

  const filtered =
    filter === 'all' ? books : books.filter((b) => b.category === filter);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-blue-600 font-bold text-sm mb-2">BOOKS</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">교재 구매</h1>
            <p className="text-gray-500 text-sm md:text-base">
              40년 조달 전문가가 직접 집필·검수한 합격 교재를 만나보세요.
            </p>
          </div>
          <Link
            href="/books/cart"
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-gray-700"
          >
            <ShoppingBag className="h-4 w-4" />
            장바구니
          </Link>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
              filter === c.key
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((book) => (
          <Link
            key={book.id}
             href={`/books/${book.id}`}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all group"
          >
            <div
              className="aspect-[3/4] relative flex flex-col justify-between p-5"
              style={{ backgroundColor: book.coverBg }}
            >
              {book.badge && (
                <span className="self-start bg-white/90 text-gray-900 text-[10px] font-black px-2 py-1 rounded">
                  {book.badge}
                </span>
              )}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: book.coverAccent }}
              />
              <div className="text-white mt-auto">
                <div className="text-[10px] tracking-[0.2em] opacity-80 mb-2">
                  {book.category.toUpperCase()}
                </div>
                <h3 className="text-lg font-black leading-tight line-clamp-3">
                  {book.title}
                </h3>
                {book.subtitle && (
                  <p className="text-white/70 text-xs mt-2 line-clamp-2">
                    {book.subtitle}
                  </p>
                )}
                <p className="text-white/60 text-xs mt-3">{book.author}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-baseline gap-2 mb-2">
                {book.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {book.originalPrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-xl font-black text-gray-900">
                  {book.price.toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Package className="h-3.5 w-3.5" />
                <span>{book.pages}p</span>
                <span className="text-gray-300">·</span>
                <span>{book.publishedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
        <BookOpen className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600 leading-relaxed">
          <p className="font-bold text-gray-900 mb-1">
            교재 구매 안내
          </p>
          <ul className="space-y-1 list-disc pl-5">
            <li>결제 완료 후 영업일 기준 1~2일 이내 발송됩니다.</li>
            <li>세트 상품은 단품 합산 대비 최대 10% 할인가로 제공됩니다.</li>
            <li>교재 수령 후 14일 이내, 미개봉 상태에 한해 반품 가능합니다.</li>
            <li>주문서에서 배송지를 입력하고 결제 완료 후 마이페이지에서 배송 상태를 확인할 수 있습니다.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Check className="inline h-4 w-4 text-green-500" />
        <span className="ml-2 text-xs text-gray-500">
          공공조달관리사 기출/강의 이용권과 함께 구매 시 추가 할인 쿠폰 제공
        </span>
      </div>
    </main>
  );
}
