'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Bell,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Heart,
  HelpCircle,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  Truck,
  User,
} from 'lucide-react';
import { getBookById } from '../data/books';
import { subjects } from '../data/subjects';
import { videos } from '../data/videos';
import { useAuth } from '../lib/AuthContext';
import {
  getBookCart,
  getBookOrders,
  getCartTotal,
  getDemoProfile,
  getExamAttempts,
  getFavoriteBooks,
  getLearningSummary,
  getNotifications,
  getPaymentRecords,
  getSubjectProgress,
  getUserCoupons,
  getWrongNoteCount,
  markNotificationRead,
  registerUserCoupon,
  saveDemoProfile,
  toggleFavoriteBook,
  type BookCartItem,
  type BookOrder,
  type DemoProfile,
  type DemoNotification,
  type ExamAttempt,
  type UserCoupon,
} from '../lib/demoStore';

const TABS = [
  '내 강의실',
  '프로필',
  '찜한 교재',
  '쿠폰',
  '이용 가이드',
  '구매내역',
  '결제내역',
  '장바구니',
  '내 주문',
  '오답노트',
  '알림',
  '설정',
] as const;

const TAB_BY_QUERY: Record<string, (typeof TABS)[number]> = {
  classroom: '내 강의실',
  profile: '프로필',
  favorites: '찜한 교재',
  coupons: '쿠폰',
  guide: '이용 가이드',
  purchases: '구매내역',
  payments: '결제내역',
  cart: '장바구니',
  orders: '내 주문',
  wrong: '오답노트',
  notifications: '알림',
  settings: '설정',
};

export default function MyPage() {
  const searchParams = useSearchParams();
  const { signOut } = useAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]>('내 강의실');
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [profileForm, setProfileForm] = useState<DemoProfile>(getDemoProfile());
  const [orders, setOrders] = useState<BookOrder[]>([]);
  const [cart, setCart] = useState<BookCartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [couponInput, setCouponInput] = useState('');
  const [couponNotice, setCouponNotice] = useState('');
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [summary, setSummary] = useState({
    watchedSeconds: 0,
    answeredQuestions: 0,
    averageScore: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const loadedProfile = getDemoProfile();
    setProfile(loadedProfile);
    setProfileForm(loadedProfile);
    setOrders(getBookOrders());
    setCart(getBookCart());
    setFavoriteIds(getFavoriteBooks());
    setCoupons(getUserCoupons());
    setNotifications(getNotifications());
    setAttempts(getExamAttempts());
    setWrongCount(getWrongNoteCount());
    setSummary(getLearningSummary());
  }, []);

  useEffect(() => {
    const requestedTab = searchParams.get('tab');
    if (requestedTab && TAB_BY_QUERY[requestedTab]) {
      setTab(TAB_BY_QUERY[requestedTab]);
    }
  }, [searchParams]);

  const subjectProgress = useMemo(
    () => subjects.map((subject) => ({ ...subject, progress: getSubjectProgress(subject.id) })),
    [summary.watchedSeconds],
  );

  const formatStudyTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  const latestAttempt = attempts[0];
  const currentProfile = profile ?? getDemoProfile();
  const cartTotal = getCartTotal(cart);
  const favoriteBooks = favoriteIds.map((id) => getBookById(id)).filter((book): book is NonNullable<typeof book> => Boolean(book));
  const payments = getPaymentRecords();

  const saveProfile = () => {
    saveDemoProfile(profileForm);
    setProfile(profileForm);
  };

  const submitCoupon = () => {
    const result = registerUserCoupon(couponInput);
    setCoupons(result.coupons);
    setCouponNotice(result.message);
    if (result.ok) setCouponInput('');
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-black mb-4">
              K
            </div>
            <h3 className="font-bold text-gray-900">{currentProfile.name} 님</h3>
            <p className="text-xs text-gray-500 mt-1">{currentProfile.email}</p>
            <div className="mt-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg py-2">
              교재 구매 · 정규가/협동조합 전용
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-2">
              {[
              { t: '내 강의실', i: <GraduationCap className="h-4 w-4" /> },
              { t: '프로필', i: <User className="h-4 w-4" /> },
              { t: '찜한 교재', i: <Heart className="h-4 w-4" /> },
              { t: '쿠폰', i: <Ticket className="h-4 w-4" /> },
              { t: '이용 가이드', i: <HelpCircle className="h-4 w-4" /> },
              { t: '구매내역', i: <Package className="h-4 w-4" /> },
              { t: '결제내역', i: <CreditCard className="h-4 w-4" /> },
              { t: '장바구니', i: <ShoppingCart className="h-4 w-4" /> },
              { t: '내 주문', i: <Truck className="h-4 w-4" /> },
              { t: '오답노트', i: <Heart className="h-4 w-4" /> },
              { t: '알림', i: <Bell className="h-4 w-4" /> },
              { t: '설정', i: <Settings className="h-4 w-4" /> },
            ].map((m) => (
              <button
                key={m.t}
                onClick={() => setTab(m.t as (typeof TABS)[number])}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  tab === m.t ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {m.i} {m.t}
              </button>
            ))}
            <button
              type="button"
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" /> 로그아웃
            </button>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <h1 className="text-2xl font-black text-gray-900 mb-6">마이페이지 · {tab}</h1>

          {tab === '내 강의실' && (
            <>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { t: '누적 학습시간', v: formatStudyTime(summary.watchedSeconds) },
                  { t: '푼 문제 수', v: `${summary.answeredQuestions}문항` },
                  { t: '평균 정답률', v: `${summary.accuracy}%` },
                ].map((k, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                    <p className="text-xs text-gray-500 mb-1">{k.t}</p>
                    <p className="text-2xl font-black text-gray-900">{k.v}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900">영상 강의</h2>
                  <Link href="/lectures" className="text-sm text-blue-600 font-bold flex items-center hover:underline">
                    영상 강의 전체 보기 <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    ['필기', '기본이론 · 핵심요약+문제풀이(CBT, 객관식) · 모의고사&최종마무리'],
                    ['실기', '기본이론 · 핵심요약+문제풀이(필답형) · 모의고사&최종마무리'],
                  ].map(([title, desc]) => (
                    <Link key={title} href="/lectures" className="rounded-2xl bg-gray-50 border border-gray-100 p-4 hover:border-blue-200">
                      <p className="font-black text-gray-900 mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <h2 className="font-bold text-gray-900 mb-4">최근 강의</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {videos.slice(0, 4).map((video) => (
                  <Link key={video.id} href={`/video/${video.id}`} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300">
                    <p className="font-bold text-gray-900 mb-1">{video.title}</p>
                    <p className="text-xs text-gray-500">{video.instructor} · {Math.ceil(video.durationSec / 60)}분</p>
                  </Link>
                ))}
              </div>

              <h2 className="font-bold text-gray-900 mb-4">과목별 진도</h2>
              <div className="space-y-3">
                {subjectProgress.map((s) => (
                  <Link
                    key={s.id}
                     href={`/subject/${s.id}`}
                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300"
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-2">{s.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{s.progress}%</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300" />
                  </Link>
                ))}
              </div>
            </>
          )}

          {tab === '프로필' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8 space-y-5">
              <h2 className="font-black text-gray-900 mb-4">프로필 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['name', '이름'],
                  ['email', '이메일'],
                  ['phone', '휴대폰'],
                ].map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="text-xs font-bold text-gray-500">{label}</span>
                    <input
                      value={profileForm[key as keyof DemoProfile]}
                      onChange={(event) => setProfileForm((current) => ({ ...current, [key]: event.target.value }))}
                      className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>
                ))}
                <div className="rounded-2xl bg-gray-50 p-4 md:col-span-2">
                  <p className="text-xs font-bold text-gray-500 mb-1">구매 가능 상품</p>
                  <p className="font-bold text-gray-900">교재 구매 · 정규가 · 협동조합 전용</p>
                </div>
              </div>
              <button type="button" onClick={saveProfile} className="bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700">
                프로필 저장
              </button>
            </div>
          )}

          {tab === '찜한 교재' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-4">찜한 교재</h2>
              {favoriteBooks.length === 0 ? (
                <div className="py-8 text-center">
                  <Heart className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                  <p className="font-bold text-gray-900 mb-2">아직 찜한 교재가 없습니다.</p>
                  <p className="text-sm text-gray-500 mb-5">관심 있는 표준교재와 문제집을 찜해두고 다시 확인하세요.</p>
                  <Link href="/books" className="inline-flex bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700">
                    교재 둘러보기
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteBooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between rounded-2xl border border-gray-200 p-4">
                      <Link href={`/books/${book.id}`} className="font-bold text-gray-900 hover:text-blue-600">{book.title}</Link>
                      <button type="button" onClick={() => setFavoriteIds(toggleFavoriteBook(book.id))} className="text-xs font-bold text-red-500 hover:underline">
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === '쿠폰' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-4">쿠폰</h2>
              <div className="flex gap-2 mb-4">
                <input
                  value={couponInput}
                  onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                  placeholder="쿠폰 코드 입력"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button type="button" onClick={submitCoupon} className="bg-gray-900 text-white font-bold px-5 rounded-xl hover:bg-gray-700">
                  등록
                </button>
              </div>
              {couponNotice && <p className="text-sm text-blue-600 mb-4">{couponNotice}</p>}
              <div className="space-y-3">
                {coupons.length === 0 ? (
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                    <p className="font-bold text-gray-900">보유 쿠폰 0건</p>
                    <p className="text-sm text-gray-500 mt-1">예: WELCOME-2026, COOP-2026 쿠폰을 등록할 수 있습니다.</p>
                  </div>
                ) : (
                  coupons.map((coupon) => (
                    <div key={coupon.code} className="rounded-2xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-gray-900">{coupon.title}</p>
                        <span className="text-xs font-black text-blue-600">{coupon.code}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{coupon.benefit}</p>
                      <p className="text-xs text-gray-400 mt-2">만료일 {coupon.expiresAt}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === '이용 가이드' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-5">이용 가이드</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['영상 강의', '필기/실기 강의는 기본이론 → 핵심요약+문제풀이 → 모의고사 순서로 수강하세요.', '/lectures'],
                  ['예상문제', '시험 모드와 학습 모드를 선택해 점수 확인 또는 즉시 해설 확인이 가능합니다.', '/free-mock'],
                  ['교재 구매', '표준교재와 요약 교재를 장바구니에 담아 주문할 수 있습니다.', '/books'],
                  ['오답노트', '틀린 문제는 시험 결과 화면과 마이페이지에서 다시 확인할 수 있습니다.', '/mypage?tab=wrong'],
                ].map(([title, desc, href]) => (
                  <Link key={title} href={href} className="rounded-2xl bg-gray-50 border border-gray-100 p-5 hover:border-blue-200">
                    <p className="font-bold text-gray-900 mb-2">{title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(tab === '구매내역' || tab === '내 주문') && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                {tab}
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-4">아직 구매 내역이 없습니다.</p>
                  <Link href="/books" className="inline-flex bg-gray-900 text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-700">
                    교재 구매하기
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.orderNo} className="border border-gray-200 rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-black text-gray-900">{order.orderNo}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.createdAt)} · {order.items.length}종</p>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                          <Truck className="h-3.5 w-3.5" />
                          배송 준비중
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {order.items[0]?.title}
                        {order.items.length > 1 ? ` 외 ${order.items.length - 1}건` : ''}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">결제금액</span>
                        <span className="font-bold text-gray-900">₩{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === '결제내역' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                결제내역
              </h2>
              {payments.length === 0 ? (
                <p className="text-sm text-gray-500">아직 결제 내역이 없습니다.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {payments.map((payment) => (
                    <div key={payment.id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{payment.label}</p>
                        <p className="text-xs text-gray-500">{formatDate(payment.paidAt)} · {payment.method} · {payment.id}</p>
                      </div>
                      <span className="font-black text-gray-900">₩{payment.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === '장바구니' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
                장바구니
              </h2>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-4">장바구니가 비어 있습니다.</p>
                  <Link href="/books" className="inline-flex bg-gray-900 text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-700">
                    교재 담으러 가기
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const book = getBookById(item.bookId);
                    if (!book) return null;
                    return (
                      <div key={item.bookId} className="flex items-center justify-between rounded-2xl border border-gray-200 p-4">
                        <div>
                          <p className="font-bold text-gray-900">{book.title}</p>
                          <p className="text-xs text-gray-500">수량 {item.quantity}개</p>
                        </div>
                        <span className="font-black text-gray-900">₩{(book.price * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-bold text-gray-700">합계</span>
                    <span className="text-xl font-black text-gray-900">₩{cartTotal.toLocaleString()}</span>
                  </div>
                  <Link href="/books/cart" className="block text-center bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700">
                    장바구니 상세 보기
                  </Link>
                </div>
              )}
            </div>
          )}

          {tab === '오답노트' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 mb-2">
                  최근 틀린 문제 {wrongCount}문항이 쌓여있어요.
                </p>
                <Link href={latestAttempt ? `/exam/${latestAttempt.examId}/result` : '/free-mock'} className="inline-block mt-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700">
                  {latestAttempt ? '최근 해설 다시 보기' : '무료 모의고사 풀기'}
                </Link>
              </div>
              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h2 className="font-black text-gray-900 mb-4">시험 이력</h2>
                {attempts.length === 0 ? (
                  <p className="text-sm text-gray-500">아직 저장된 시험 결과가 없습니다.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {attempts.map((attempt) => (
                      <Link key={attempt.id} href={`/exam/${attempt.examId}/result`} className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded-xl">
                        <div>
                          <p className="font-bold text-gray-900">{attempt.title}</p>
                          <p className="text-xs text-gray-500">{formatDate(attempt.submittedAt)} · {attempt.correctCount}/{attempt.totalCount} 정답</p>
                        </div>
                        <span className="text-xl font-black text-gray-900">{attempt.score}점</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === '알림' && (
            <div className="bg-white rounded-3xl border border-gray-200 divide-y divide-gray-100">
              {notifications.map((item) => (
                <div key={item.id} className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className={`text-sm ${item.read ? 'text-gray-500' : 'text-gray-900 font-bold'}`}>{item.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(item.createdAt)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(markNotificationRead(item.id))}
                    className="text-xs font-bold text-blue-600 hover:underline disabled:text-gray-300"
                    disabled={item.read}
                  >
                    {item.read ? '읽음' : '읽음 처리'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === '설정' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8 space-y-6">
              <h2 className="font-black text-gray-900">설정</h2>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="font-bold text-gray-700 text-sm">비밀번호</span>
                <Link href="/login" className="text-sm font-bold text-blue-600 hover:underline">재로그인 후 변경</Link>
              </div>
              <label className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="font-bold text-gray-700 text-sm">마케팅 수신 동의</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-blue-600" />
              </label>
              <button type="button" onClick={() => signOut()} className="bg-red-50 text-red-600 font-bold px-5 py-3 rounded-xl hover:bg-red-100">
                로그아웃
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
