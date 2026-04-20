'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  X,
  Menu,
  ChevronRight,
  Ticket,
  Gift,
  BookOpen,
  MessageSquare,
  Layers,
  LogIn,
  UserPlus,
} from 'lucide-react';
import AuthModal from './AuthModal';
import CouponModal from './CouponModal';
import { subjects } from '../data/subjects';
import {
  AUTH_MODAL_EVENT,
  COUPON_MODAL_EVENT,
  openAuthModal,
  openCouponModal,
  type AuthMode,
} from '../lib/modalEvents';

function TopBanner() {
  return (
    <div className="bg-[#1a103c] text-white text-xs sm:text-sm py-2.5 px-10 sm:px-4 relative flex justify-center items-center">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span className="hidden sm:inline text-gray-300">지금 가입하면 기출문제 2건 무료 제공!</span>
        <span className="font-bold text-sm sm:text-base">합격률이 오르는 이유! 지금 확인하세요</span>
        <Link
          href="/events"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap"
        >
          <span className="hidden sm:inline">가입하면 기출문제 2건 무료!</span>
          <span className="sm:hidden">기출 2건 무료!</span>
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

function MobileDrawer({
  isOpen,
  onClose,
  onAuthClick,
  onCouponClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuthClick: (mode: AuthMode) => void;
  onCouponClick: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const serviceItems: MobileNavItem[] = [
    { type: 'link', label: '전체 서비스', to: '/curriculum', icon: <Layers className="h-4 w-4" /> },
    { type: 'link', label: '이벤트', to: '/events', icon: <Gift className="h-4 w-4" /> },
    { type: 'link', label: '교재', to: '/books', icon: <BookOpen className="h-4 w-4" /> },
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
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색"
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <p className="text-[11px] font-bold text-gray-400 tracking-wider px-3 py-2">계정</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAuthClick('login');
                  onClose();
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-800"
              >
                <LogIn className="h-4 w-4" />
                로그인
              </button>
              <button
                onClick={() => {
                  onAuthClick('signup');
                  onClose();
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-bold text-gray-800"
              >
                <UserPlus className="h-4 w-4" />
                회원가입
              </button>
            </div>
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

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 py-3 lg:py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="BR 케이비즈런" className="h-7 lg:h-8 object-contain" />
          </Link>

          <div className="relative hidden lg:block flex-1 max-w-[420px] mx-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색"
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <button
              aria-label="검색"
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <Link
              href="/pricing"
              className="bg-[#2563eb] text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap"
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
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-end gap-5 xl:gap-6 py-2.5 text-sm text-gray-700">
            <button onClick={() => openCouponModal()} className="hover:text-blue-600 whitespace-nowrap">쿠폰인증센터</button>
            <Link href="/events" className="hover:text-blue-600">이벤트</Link>
            <Link href="/books" className="hover:text-blue-600">교재</Link>
            <Link href="/community" className="hover:text-blue-600">커뮤니티</Link>
            <Link href="/curriculum" className="hover:text-blue-600 whitespace-nowrap">전체 서비스</Link>
            <button onClick={() => openAuthModal('login')} className="hover:text-blue-600">로그인</button>
            <button onClick={() => openAuthModal('signup')} className="hover:text-blue-600">회원가입</button>
            <Link href="/pricing" className="bg-[#2563eb] text-white px-4 xl:px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
              이용권 구매
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAuthClick={(mode) => openAuthModal(mode)}
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
              <a href="#" className="hover:text-white transition-colors">회사소개</a>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
              <a href="#" className="text-white font-bold hover:text-blue-400 transition-colors">개인정보처리방침</a>
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

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const isExam = pathname.startsWith('/exam/') && !pathname.endsWith('/result');
  const isVideo = pathname.startsWith('/video/');

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  useEffect(() => {
    const onAuth = (e: Event) => {
      const mode = (e as CustomEvent<AuthMode>).detail ?? 'login';
      setAuthMode(mode);
      setAuthModalOpen(true);
    };
    const onCoupon = () => setCouponModalOpen(true);

    window.addEventListener(AUTH_MODAL_EVENT, onAuth as EventListener);
    window.addEventListener(COUPON_MODAL_EVENT, onCoupon);
    return () => {
      window.removeEventListener(AUTH_MODAL_EVENT, onAuth as EventListener);
      window.removeEventListener(COUPON_MODAL_EVENT, onCoupon);
    };
  }, []);

  const fullscreen = isExam || isVideo;

  return (
    <>
      {!fullscreen && <TopBanner />}
      {!fullscreen && <Header />}
      {children}
      {!fullscreen && <Footer />}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <CouponModal
        isOpen={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
      />
    </>
  );
}
