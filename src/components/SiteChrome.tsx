'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  X,
  Menu,
  ChevronRight,
  Ticket,
  Gift,
  BookOpen,
  FileText,
  MessageSquare,
  Layers,
  LogIn,
  LogOut,
  User as UserIcon,
  BadgeCheck,
} from 'lucide-react';
import CouponModal from './CouponModal';
import UserMenu from './UserMenu';
import { subjects } from '../data/subjects';
import { COUPON_MODAL_EVENT, openCouponModal } from '../lib/modalEvents';
import { AuthProvider, useAuth } from '../lib/AuthContext';

function TopBanner() {
  return (
    <div className="bg-[#1a103c] text-white text-xs sm:text-sm py-2.5 px-10 sm:px-4 relative flex justify-center items-center">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span className="hidden sm:inline text-gray-300">지금 가입하면 예상문제 샘플 무료 제공!</span>
        <span className="font-bold text-sm sm:text-base">합격률이 오르는 이유! 지금 확인하세요</span>
        <Link
          href="/events"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap"
        >
          <span className="hidden sm:inline">가입하면 예상문제 샘플 무료!</span>
          <span className="sm:hidden">샘플 무료!</span>
          <span className="bg-white text-blue-600 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ml-1">EVENT</span>
        </Link>
      </div>
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

interface MobileNavItem {
  type: 'button' | 'link';
  label: string;
  to?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function SearchForm({
  onSearch,
  compact = false,
}: {
  onSearch?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    onSearch?.();
  };

  return (
    <form onSubmit={submit} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="검색"
        className={`w-full bg-gray-50 border border-gray-200 rounded-full pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          compact ? 'py-2.5 pr-4' : 'py-2.5 pr-14'
        }`}
      />
      {!compact && (
        <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700">
          검색
        </button>
      )}
    </form>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  onCouponClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCouponClick: () => void;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const serviceItems: MobileNavItem[] = [
    { type: 'link', label: '자격소개', to: '/certification', icon: <BadgeCheck className="h-4 w-4" /> },
    { type: 'link', label: '전체 서비스', to: '/curriculum', icon: <Layers className="h-4 w-4" /> },
    { type: 'link', label: '이벤트', to: '/events', icon: <Gift className="h-4 w-4" /> },
    { type: 'link', label: '교재', to: '/books', icon: <BookOpen className="h-4 w-4" /> },
    { type: 'link', label: '인강', to: '/lectures', icon: <FileText className="h-4 w-4" /> },
    { type: 'link', label: '커뮤니티', to: '/community', icon: <MessageSquare className="h-4 w-4" /> },
    { type: 'button', label: '쿠폰인증센터', icon: <Ticket className="h-4 w-4" />, onClick: onCouponClick },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[84%] max-w-[340px] bg-white z-50 shadow-2xl transition-transform lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={onClose}>
            <img src="/logo.png" alt="BR 케이비즈런" className="h-7 object-contain" />
          </Link>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-5 border-b border-gray-100">
          <SearchForm compact onSearch={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <p className="text-[11px] font-bold text-gray-400 tracking-wider px-3 py-2">계정</p>
            {user ? (
              <div className="space-y-2">
                <Link
                  href="/mypage"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-800"
                >
                  <UserIcon className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{user.email}</span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-600"
                >
                  <LogOut className="h-4 w-4 text-gray-500" />
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-800"
              >
                <LogIn className="h-4 w-4 text-gray-500" />
                로그인/회원가입
              </Link>
            )}
          </div>

          <div className="p-3">
            <p className="text-[11px] font-bold text-gray-400 tracking-wider px-3 py-2">서비스</p>
            <div className="flex flex-col">
              {serviceItems.map((item, i) => {
                const content = (
                  <>
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </>
                );
                if (item.type === 'link') {
                  return (
                    <Link key={i} href={item.to!} onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50">
                      {content}
                    </Link>
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-left"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 tracking-wider px-3 py-2">과목</p>
            <div className="flex flex-col">
              {subjects.map((s) => {
                const href = `/subject/${s.id}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={s.id}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 ${
                      isActive ? 'text-blue-600 font-bold' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-xl shrink-0">{s.icon}</span>
                    <span className="text-sm">{s.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <Link
            href="/pricing"
            onClick={onClose}
            className="block w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl text-center hover:bg-blue-700 transition-colors"
          >
            이용권 구매
          </Link>
        </div>
      </aside>
    </>
  );
}

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname() ?? '';
  const isHomeActive = pathname === '/';
  const isCertificationActive = pathname.startsWith('/certification');

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 py-3 lg:py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="BR 케이비즈런" className="h-7 lg:h-8 object-contain" />
          </Link>

          <div className="hidden lg:block flex-1 max-w-[420px] mx-8">
            <SearchForm />
          </div>

          <div className="hidden lg:flex items-center gap-5 text-sm text-gray-700 shrink-0">
            <button
              type="button"
              onClick={() => openCouponModal()}
              className="hover:text-blue-600 whitespace-nowrap"
            >
              쿠폰인증센터
            </button>
            <Link href="/events" className="hover:text-blue-600 whitespace-nowrap">
              이벤트
            </Link>
            <span className="w-px h-4 bg-gray-300" aria-hidden="true"></span>
            {loading ? (
              <span className="h-9 w-9 bg-gray-100 rounded-full animate-pulse" aria-hidden="true" />
            ) : user ? (
              <UserMenu />
            ) : (
              <Link href="/login" className="hover:text-blue-600 whitespace-nowrap">
                로그인/회원가입
              </Link>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <Link
              href="/search"
              aria-label="검색"
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Link>
            <Link
              href="/pricing"
              className="bg-[#2563eb] text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap hover:bg-blue-700 transition-colors"
            >
              이용권
            </Link>
            <button
              aria-label="메뉴 열기"
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-4 py-2.5">
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  isHomeActive ? 'bg-[#2563eb] text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                홈
              </Link>
              <Link
                href="/certification"
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  isCertificationActive ? 'bg-[#2563eb] text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                자격소개
              </Link>
            </div>
            <div className="w-px h-4 bg-gray-300 mx-2 shrink-0"></div>

            <div className="flex items-center gap-5 xl:gap-6 text-sm text-gray-700">
              <Link href="/curriculum" className="hover:text-blue-600 whitespace-nowrap font-bold text-gray-900">교육과정</Link>
              <Link href="/books" className="hover:text-blue-600">교재</Link>
              <Link href="/lectures" className="hover:text-blue-600 whitespace-nowrap">인강</Link>
              <Link href="/community" className="hover:text-blue-600">커뮤니티</Link>
              <Link href="/curriculum" className="hover:text-blue-600 whitespace-nowrap">전체 서비스</Link>
            </div>

            <Link
              href="/pricing"
              className="ml-auto bg-[#2563eb] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              이용권 구매
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCouponClick={() => openCouponModal()}
      />
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1e293b] text-gray-300 py-10 md:py-12 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 border-b border-gray-700 pb-8">
          <div>
            <Link href="/" className="mb-4 block">
              <img src="/logo.png" alt="BR 케이비즈런" className="h-7 md:h-8 object-contain brightness-0 invert opacity-90" />
            </Link>
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm font-medium">
              <Link href="/certification" className="hover:text-white transition-colors">회사소개</Link>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="/terms?doc=privacy" className="text-white font-bold hover:text-blue-400 transition-colors">개인정보처리방침</Link>
              <Link href="/community" className="hover:text-white transition-colors">고객센터</Link>
            </div>
          </div>
        </div>

        <div className="text-[11px] md:text-xs text-gray-400 space-y-2 leading-relaxed">
          <p>
            <span className="font-bold text-gray-300">(주)케이비즈글로벌교육원</span>
            <span className="mx-2 text-gray-600">|</span>대표이사: 홍성석
            <span className="mx-2 text-gray-600">|</span>사업자등록번호: 631-81-04153
          </p>
          <p>주소: 서울특별시 영등포구 양평로 94, 3층</p>
          <p>
            통신판매업신고: 제2026-서울영등포-0897호
            <span className="mx-2 text-gray-600">|</span>개인정보보호책임자: 안세일
          </p>
          <p>
            고객센터: <a href="tel:1600-5933" className="hover:text-gray-300">1600-5933</a>
            <span className="hidden md:inline"> (평일 09:00 ~ 18:00, 점심시간 12:00 ~ 13:00, 주말 및 공휴일 휴무)</span>
            <span className="block md:inline md:ml-2">이메일: <a href="mailto:contact@kbizrun.com" className="hover:text-gray-300">contact@kbizrun.com</a></span>
          </p>
          <p className="md:hidden text-gray-500">평일 09:00~18:00 · 점심 12:00~13:00 · 주말/공휴일 휴무</p>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>본 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며, 무단 전재, 복사, 배포 등을 금합니다.</p>
          <p className="mt-2">Copyright © Kbiz Global Education Corp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SiteChromeInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const isExam = pathname.startsWith('/exam/') && !pathname.endsWith('/result');
  const isVideo = pathname.startsWith('/video/');
  const isAuth = pathname === '/login' || pathname === '/signup';

  const [couponModalOpen, setCouponModalOpen] = useState(false);

  useEffect(() => {
    const onCoupon = () => setCouponModalOpen(true);
    window.addEventListener(COUPON_MODAL_EVENT, onCoupon);
    return () => {
      window.removeEventListener(COUPON_MODAL_EVENT, onCoupon);
    };
  }, []);

  const fullscreen = isExam || isVideo;

  return (
    <>
      {!fullscreen && <TopBanner />}
      {!fullscreen && <Header />}
      {children}
      {!fullscreen && !isAuth && <Footer />}

      <CouponModal
        isOpen={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
      />
    </>
  );
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SiteChromeInner>{children}</SiteChromeInner>
    </AuthProvider>
  );
}
