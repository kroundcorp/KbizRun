'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight, ChevronDown,
  FileText, CheckCircle2, BookOpen,
  MessageCircle, PlayCircle, Scale,
} from 'lucide-react';
import Link from 'next/link';
import HeroBanner from '../components/HeroBanner';
import { videos } from '../data/videos';
import { useAuth } from '../lib/AuthContext';
import {
  getBookCart,
  getDemoProfile,
  getFavoriteBooks,
  getLearningSummary,
  getLessonProgress,
  getUserCoupons,
  getWrongNoteCount,
  type DemoProfile,
} from '../lib/demoStore';

const RECOMMENDED_CONTENT = [
  {
    label: '제1장',
    title: '물품구매계약 일반',
    subtitle: '정부계약의 개요부터 계약 이행관리까지',
    tagline: '입찰·낙찰·계약관리 기본기를 먼저 정리',
    tags: ['정부계약', '입찰집행', '계약관리'],
    icon: <BookOpen className="h-5 w-5" />,
    color: 'blue',
    count: '4개 목차',
  },
  {
    label: '제3장',
    title: '예정가격작성 실무',
    subtitle: '예정가격 결정기준과 기초조사',
    tagline: '원가계산 용역의뢰까지 실무 흐름 이해',
    tags: ['예정가격', '기초조사', '원가계산'],
    icon: <FileText className="h-5 w-5" />,
    color: 'green',
    count: '3개 목차',
  },
  {
    label: '제4장',
    title: '주요 낙찰자 선정 제도',
    subtitle: '적격심사·협상계약·경쟁적 대화',
    tagline: '낙찰자 선정 방식별 절차와 평가 포인트 비교',
    tags: ['적격심사', '협상계약', '경쟁적대화'],
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: 'orange',
    count: '3개 제도',
  },
  {
    label: '부록',
    title: '공공조달 법률 이해',
    subtitle: '국가·지방계약 및 관련 법령 비교',
    tagline: '공공계약 민법, 조달사업법, 전자조달법까지 정리',
    tags: ['국가계약법', '지방계약법', '전자조달'],
    icon: <Scale className="h-5 w-5" />,
    color: 'slate',
    count: '6개 목차',
  },
] as const;

const CONTENT_STYLE: Record<(typeof RECOMMENDED_CONTENT)[number]['color'], {
  badge: string; accent: string; dot: string; hover: string; iconBg: string;
}> = {
  blue: { badge: 'bg-blue-50 text-blue-600', accent: 'group-hover:text-blue-600', dot: 'bg-blue-500', hover: 'hover:border-blue-300', iconBg: 'bg-blue-50 text-blue-500' },
  green: { badge: 'bg-green-50 text-green-600', accent: 'group-hover:text-green-600', dot: 'bg-green-500', hover: 'hover:border-green-300', iconBg: 'bg-green-50 text-green-600' },
  orange: { badge: 'bg-orange-50 text-orange-500', accent: 'group-hover:text-orange-500', dot: 'bg-orange-500', hover: 'hover:border-orange-300', iconBg: 'bg-orange-50 text-orange-500' },
  slate: { badge: 'bg-slate-100 text-slate-700', accent: 'group-hover:text-slate-700', dot: 'bg-slate-500', hover: 'hover:border-slate-300', iconBg: 'bg-slate-100 text-slate-700' },
};

interface HomeMemberState {
  profile: DemoProfile;
  cartCount: number;
  favoriteCount: number;
  couponCount: number;
  wrongCount: number;
  averageScore: number;
  watchedMinutes: number;
  recentVideoTitle: string;
  recentVideoHref: string;
}

const defaultMemberState: HomeMemberState = {
  profile: getDemoProfile(),
  cartCount: 0,
  favoriteCount: 0,
  couponCount: 0,
  wrongCount: 0,
  averageScore: 0,
  watchedMinutes: 0,
  recentVideoTitle: '필기 기본이론부터 시작하기',
  recentVideoHref: '/lectures',
};

export default function Home() {
  const { user, loading } = useAuth();
  const isLoggedIn = Boolean(user);
  const [memberState, setMemberState] = useState<HomeMemberState>(defaultMemberState);

  useEffect(() => {
    if (!user) return;
    const profile = getDemoProfile();
    const cartCount = getBookCart().reduce((total, item) => total + item.quantity, 0);
    const favoriteCount = getFavoriteBooks().length;
    const couponCount = getUserCoupons().filter((coupon) => !coupon.used).length;
    const wrongCount = getWrongNoteCount();
    const summary = getLearningSummary();
    const recentProgress = [...getLessonProgress()].sort(
      (a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime(),
    )[0];
    const recentVideo = recentProgress ? videos.find((video) => video.id === recentProgress.videoId) : undefined;

    setMemberState({
      profile,
      cartCount,
      favoriteCount,
      couponCount,
      wrongCount,
      averageScore: summary.averageScore,
      watchedMinutes: Math.round(summary.watchedSeconds / 60),
      recentVideoTitle: recentVideo?.title ?? '필기 기본이론부터 시작하기',
      recentVideoHref: recentVideo ? `/video/${recentVideo.id}` : '/lectures',
    });
  }, [user]);

  const firstName = useMemo(() => {
    return memberState.profile.name || user?.email?.split('@')[0] || '회원';
  }, [memberState.profile.name, user?.email]);

  return (
    <main className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 space-y-8">

        {/* Top Grid Section */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Left Sidebar - Upload Schedule */}
          <div className="col-span-12 lg:col-span-3 lg:order-1 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col">
            {isLoggedIn ? (
              <>
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-[11px] font-bold text-blue-600 mb-1">MY STUDY</p>
                    <h3 className="font-black text-gray-900">{firstName}님, 이어서 학습하세요</h3>
                  </div>
                  <Link href="/mypage" className="text-[11px] text-gray-400 flex items-center hover:text-gray-600">
                    내 정보 <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 mb-4">
                  <p className="text-xs text-blue-700 font-bold mb-1">정규가/협동조합 전용 상품</p>
                  <p className="text-sm text-gray-800 font-bold leading-snug">{memberState.recentVideoTitle}</p>
                  <Link href={memberState.recentVideoHref} className="mt-3 inline-flex text-xs font-bold text-blue-600 hover:underline">
                    학습 이어가기
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-lg font-black text-gray-900">{memberState.watchedMinutes}</p>
                    <p className="text-[10px] text-gray-500">학습분</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-lg font-black text-gray-900">{memberState.averageScore || '-'}</p>
                    <p className="text-[10px] text-gray-500">평균점수</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-lg font-black text-gray-900">{memberState.wrongCount}</p>
                    <p className="text-[10px] text-gray-500">오답</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">업로드 일정</h3>
                  <Link href="/lectures" className="text-[11px] text-gray-400 flex items-center hover:text-gray-600">
                    바로가기 <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <ul className="space-y-4 flex-1">
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">예상문제 샘플</span>
                    <span className="text-green-500 text-xs flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">실전 예상문제</span>
                    <span className="text-green-500 text-xs flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">AI 변형문제</span>
                    <span className="text-green-500 text-xs flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex justify-center">
                  <Link href="/signup" className="w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white hover:bg-blue-700">
                    회원가입하고 시작하기
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Center - Hero Banner */}
          <HeroBanner />

        </div>

        {/* Bottom Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {/* Card 1: 표준교재 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-5">표준교재</h3>
            
            <div className="space-y-2">
              <Link href="/books" className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">기본</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">공공조달 표준교재</span>
              </Link>
              <Link href="/books" className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">문제</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">예상문제집</span>
              </Link>
              <Link href="/books" className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">요약</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">핵심요약 교재</span>
              </Link>
              <Link href="/books" className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-purple-100 text-purple-600 text-[10px] font-bold px-1.5 py-0.5 rounded">패키지</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">올인원 교재 세트</span>
              </Link>
            </div>
          </div>

          {/* Card 2: 예상문제 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-5">📝 예상문제</h3>
            
            <div className="space-y-3">
              {isLoggedIn && (
                <Link href="/mypage?tab=wrong" className="block rounded-xl bg-orange-50 border border-orange-100 p-3.5 hover:bg-orange-100 group">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-orange-700 mb-1">내 오답노트</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    누적 오답 {memberState.wrongCount}개 · 평균 점수 {memberState.averageScore || '-'}점
                  </p>
                </Link>
              )}
              <Link href="/free-mock" className="block rounded-xl bg-gray-50 p-3.5 hover:bg-gray-100 group">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 mb-1">시험 모드</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  3문제를 모두 푼 후 채점합니다.<br />
                  최종 점수와 오답노트를 확인할 수 있어요.
                </p>
              </Link>
              <Link href="/free-mock" className="block rounded-xl bg-gray-50 p-3.5 hover:bg-gray-100 group">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 mb-1">학습 모드</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  문제를 풀 때마다 바로 정답과 해설을 확인합니다.<br />
                  틀린 문제만 모아서 복습할 수 있어요.
                </p>
              </Link>
            </div>
          </div>

          {/* Card 3: 영상 강의 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">영상 강의</h3>
              <Link href={isLoggedIn ? memberState.recentVideoHref : '/lectures'} className="text-[11px] text-blue-600 font-bold flex items-center hover:underline">
                {isLoggedIn ? '이어보기' : '전체 보기'} <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {isLoggedIn && (
                <Link href={memberState.recentVideoHref} className="block rounded-xl bg-blue-50 border border-blue-100 p-3.5 hover:bg-blue-100 group">
                  <p className="text-sm font-black text-gray-900 group-hover:text-blue-700 mb-1">최근 수강 강의</p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{memberState.recentVideoTitle}</p>
                </Link>
              )}
              <Link href="/lectures" className="block rounded-xl bg-gray-50 p-3.5 hover:bg-gray-100 group">
                <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 mb-2">필기</p>
                <ul className="space-y-1 text-xs text-gray-500 leading-relaxed">
                  <li>- 기본이론</li>
                  <li>- 핵심요약+문제풀이(CBT, 객관식)</li>
                  <li>- 모의고사&최종마무리</li>
                </ul>
              </Link>
              <Link href="/lectures" className="block rounded-xl bg-gray-50 p-3.5 hover:bg-gray-100 group">
                <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 mb-2">실기</p>
                <ul className="space-y-1 text-xs text-gray-500 leading-relaxed">
                  <li>- 기본이론</li>
                  <li>- 핵심요약+문제풀이(필답형)</li>
                  <li>- 모의고사&최종마무리</li>
                </ul>
              </Link>
            </div>
          </div>

          {/* Right Stack (Card 4 & 5) */}
          <div className="flex flex-col gap-4 md:gap-6">

            {/* Card 4: 교재 구매 */}
            <Link
               href={isLoggedIn ? '/mypage?tab=cart' : '/books'}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 cursor-pointer group block hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  교재 구매
                </h3>
                <span className="text-[11px] text-gray-400 flex items-center group-hover:text-gray-600">
                  {isLoggedIn ? '내 교재' : '바로가기'} <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {isLoggedIn
                  ? `장바구니 ${memberState.cartCount}개 · 찜한 교재 ${memberState.favoriteCount}개`
                  : '조달 전문가 집필 교재로 합격 준비'}
              </p>
            </Link>

            {/* Card 5: Event Banner */}
            <Link href={isLoggedIn ? '/mypage?tab=coupons' : '/events'} className="bg-[#1e3a8a] rounded-2xl p-6 shadow-sm flex-1 relative overflow-hidden cursor-pointer group block">
              <div className="relative z-10">
                <p className="text-blue-200 text-xs mb-1">{isLoggedIn ? '사용 가능한 혜택을 확인하세요.' : '회원님의 합격을 응원해요.'}</p>
                <h3 className="font-bold text-white text-lg leading-tight">
                  {isLoggedIn ? (
                    <>보유 쿠폰 {memberState.couponCount}개<br/>마이페이지에서 확인</>
                  ) : (
                    <>KbizRun이 준비한<br/>다양한 이벤트와 혜택</>
                  )}
                </h3>
              </div>
            </Link>

          </div>

        </div>

      </div>

      {/* Recommended Content Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900">추천 콘텐츠</h2>
              <p className="text-gray-500 text-sm">
                {isLoggedIn && !loading ? (
                  <>학습 기록 기반 <span className="font-bold text-gray-700">다음 추천 흐름</span></>
                ) : (
                  <>실제 목차 기반 <span className="font-bold text-gray-700">10장 + 부록 학습 흐름</span></>
                )}
              </p>
            </div>
            <Link href={isLoggedIn ? '/mypage' : '/curriculum'} className="text-sm text-gray-500 flex items-center hover:text-gray-800 whitespace-nowrap">
              {isLoggedIn ? '내 학습실' : '전체 서비스'} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_CONTENT.map((content) => {
              const st = CONTENT_STYLE[content.color];
              return (
                <Link
                  key={content.label}
                  href="/curriculum"
                  className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden group flex flex-col ${st.hover} transition-colors`}
                >
                  <div className="relative flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${st.iconBg}`}>
                      {content.icon}
                    </div>
                    <span className={`${st.badge} text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap`}>
                      {content.label}
                    </span>
                  </div>

                  <h3 className="relative text-xl font-black text-gray-900 mb-5">{content.title}</h3>

                  <div className="mb-5 min-h-[48px]">
                    <h4 className="font-bold text-gray-900 mb-1 leading-snug">{content.subtitle}</h4>
                    <p className="text-sm text-gray-600 leading-snug">{content.tagline}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {content.tags.map((t) => (
                      <span key={t} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs mt-auto pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
                      {content.count}
                    </span>
                    <span className={`text-gray-400 flex items-center gap-1 ${st.accent} whitespace-nowrap`}>
                      바로가기 <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        {/* Bottom 3 Columns Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-12">

          {/* Board */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">게시판</h3>
                <span className="text-gray-500 text-sm ml-1">이 문제 풀어주세요</span>
              </div>
              <Link href="/community" className="text-[11px] text-gray-400 flex items-center hover:text-gray-600">
                바로가기 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-4">
              <Link href="/community/1" className="block border-b border-gray-100 pb-4 cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-red-200 text-red-500 text-[10px] px-1.5 py-0.5 rounded">제1장</span>
                    <span className="text-xs text-gray-500">질문</span>
                  </div>
                  <span className="text-xs text-gray-400">조회 270 댓글 3</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1 group-hover:text-blue-600">
                  <span className="text-red-500 border border-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">N</span>
                  물품구매계약 입찰 및 낙찰제도 구분 기준
                </h4>
                <p className="text-sm text-gray-500 truncate">정부계약 개요와 입찰집행 절차가 실제 계약관리로 이어지는 흐름이 헷갈려서...</p>
              </Link>

              <Link href="/community/2" className="block pt-2 cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-orange-200 text-orange-500 text-[10px] px-1.5 py-0.5 rounded">제3장</span>
                    <span className="text-xs text-gray-500">질문</span>
                  </div>
                  <span className="text-xs text-gray-400">조회 287 댓글 6</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1 group-hover:text-blue-600">
                  <span className="text-red-500 border border-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">N</span>
                  예정가격 기초조사와 원가계산 용역의뢰 차이
                </h4>
                <p className="text-sm text-gray-500 truncate">예정가격 결정기준을 잡을 때 기초조사와 용역의뢰를 어떻게 구분하는지...</p>
              </Link>
            </div>
          </div>

          {/* Mentoring & Tip Stack */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            {/* Mentoring */}
            <Link href="/community/5" className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 relative overflow-hidden group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded border border-blue-100">Premium</span>
                  <span className="text-gray-600 text-sm">멘토링</span>
                </div>
                <span className="text-[11px] text-gray-400 flex items-center group-hover:text-gray-600">
                  바로가기 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-blue-600 mb-2">1:1 멘토링</h3>
              <p className="text-sm text-gray-700 mb-6">합격자 멘토와 1:1 밀착 학습 전략 수립</p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-green-500 text-xs flex items-center gap-1 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 상담 신청 가능
                </span>
                <button className="border border-gray-200 text-gray-500 text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-50">
                  미리보기 <PlayCircle className="h-3 w-3" />
                </button>
              </div>
            </Link>

            {/* Tip */}
            <Link href="/community/6" className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 relative overflow-hidden group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-50 text-orange-500 text-xs font-bold px-2 py-0.5 rounded border border-orange-100">BEST</span>
                  <span className="text-gray-600 text-sm">추천</span>
                </div>
                <span className="text-[11px] text-gray-400 flex items-center group-hover:text-gray-600">
                  APP에서 확인 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">목차 TIP</h3>
              <p className="text-sm text-gray-700 mb-6">장별 흐름으로 정리하는 <span className="font-bold">공공조달 학습 전략</span></p>
              
              <div className="mt-auto">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 물품구매계약, 예정가격, 낙찰자 선정
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
