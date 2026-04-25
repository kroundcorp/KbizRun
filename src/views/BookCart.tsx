'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { getBookById } from '../data/books';
import { getBookCart, getCartTotal, replaceBookCart, type BookCartItem } from '../lib/demoStore';

export default function BookCart() {
  const router = useRouter();
  const [items, setItems] = useState<BookCartItem[]>([]);

  useEffect(() => {
    setItems(getBookCart());
  }, []);

  const total = useMemo(() => getCartTotal(items), [items]);

  const updateItems = (next: BookCartItem[]) => {
    setItems(next);
    replaceBookCart(next);
  };

  const changeQty = (bookId: string, delta: number) => {
    updateItems(
      items
        .map((item) =>
          item.bookId === bookId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (bookId: string) => {
    updateItems(items.filter((item) => item.bookId !== bookId));
  };

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

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">장바구니</h1>
          <p className="text-sm text-gray-500 mt-1">교재 수량과 결제 예정 금액을 확인하세요.</p>
        </div>
        <Link href="/books" className="text-sm font-bold text-blue-600 hover:underline">
          교재 더 보기
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="font-black text-gray-900 mb-2">담긴 교재가 없습니다</h2>
          <p className="text-sm text-gray-500 mb-6">필요한 교재를 선택해 장바구니에 담아보세요.</p>
          <Link
            href="/books"
            className="inline-flex bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            교재 목록으로
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-12 lg:col-span-8 space-y-3">
            {items.map((item) => {
              const book = getBookById(item.bookId);
              if (!book) return null;
              return (
                <div key={item.bookId} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
                  <div
                    className="w-20 h-28 rounded-xl shrink-0"
                    style={{ backgroundColor: book.coverBg, borderLeft: `6px solid ${book.coverAccent}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-blue-600 mb-1">{book.category}</p>
                    <Link href={`/books/${book.id}`} className="font-black text-gray-900 hover:text-blue-600">
                      {book.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{book.publisher} · {book.pages}p</p>
                    <div className="flex items-center justify-between gap-4 mt-5">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => changeQty(item.bookId, -1)}
                          className="p-2 text-gray-500 hover:text-gray-900"
                          aria-label="수량 감소"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => changeQty(item.bookId, 1)}
                          className="p-2 text-gray-500 hover:text-gray-900"
                          aria-label="수량 증가"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.bookId)}
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-gray-500">{book.price.toLocaleString()}원</p>
                    <p className="font-black text-gray-900 mt-1">
                      {(book.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          <aside className="col-span-12 lg:col-span-4">
            <div className="sticky top-6 bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-xl shadow-blue-100">
              <h2 className="font-black text-gray-900 mb-5">주문 요약</h2>
              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">상품 수</span>
                  <span className="font-bold text-gray-900">{items.length}종</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">배송비</span>
                  <span className="font-bold text-gray-900">무료</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-5">
                <span className="font-bold text-gray-700">총 결제금액</span>
                <span className="text-2xl font-black text-gray-900">{total.toLocaleString()}원</span>
              </div>
              <Link
                href="/books/checkout"
                className="block w-full text-center bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700"
              >
                주문서 작성
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
