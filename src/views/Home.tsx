'use client';

import React from 'react';
import {
  ChevronRight, ChevronDown,
  FileText, CheckCircle2, BookOpen, Gift,
  MessageCircle, PlayCircle, Star, Download,
  Target, Trophy,
} from 'lucide-react';
import Link from 'next/link';
import HeroBanner from '../components/HeroBanner';
import { steps, type StepColor } from '../data/steps';

const STEP_STYLE: Record<StepColor, {
  decor: string; badge: string; accent: string; dot: string; hover: string; iconBg: string;
}> = {
  blue: { decor: 'bg-blue-50', badge: 'bg-blue-50 text-blue-600', accent: 'group-hover:text-blue-600', dot: 'bg-blue-500', hover: 'hover:border-blue-300', iconBg: 'bg-blue-50 text-blue-500' },
  orange: { decor: 'bg-orange-50', badge: 'bg-orange-50 text-orange-500', accent: 'group-hover:text-orange-500', dot: 'bg-orange-500', hover: 'hover:border-orange-300', iconBg: 'bg-orange-50 text-orange-500' },
  green: { decor: 'bg-green-50', badge: 'bg-green-50 text-green-600', accent: 'group-hover:text-green-600', dot: 'bg-green-500', hover: 'hover:border-green-300', iconBg: 'bg-green-50 text-green-600' },
  red: { decor: 'bg-red-50', badge: 'bg-red-50 text-red-500', accent: 'group-hover:text-red-500', dot: 'bg-red-500', hover: 'hover:border-red-300', iconBg: 'bg-red-50 text-red-500' },
};

const STEP_ICON: Record<string, React.ReactNode> = {
  theory: <FileText className="h-5 w-5" />,
  'by-area': <Target className="h-5 w-5" />,
  practice: <CheckCircle2 className="h-5 w-5" />,
  final: <Trophy className="h-5 w-5" />,
};

function ProfessorProfile() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 lg:p-12 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
      {/* Left: Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-[#f0f4f8] rounded-2xl overflow-hidden border border-gray-100">
          <img
            src="/hong.png"
            alt="홍순후 교수"
            className="absolute bottom-0 w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-2/3">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <span className="text-blue-600 font-bold text-xs md:text-sm bg-blue-50 px-3 py-1 rounded-full mb-3 md:mb-4 inline-block border border-blue-100">국내 유일, 조달 전문가 검수</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">홍순후 교수</h2>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 leading-tight">대체 불가능한 34년 경력의 조달 전문가 × AI 기술의 결합</p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            국내 유일, 조달 전문가 직접 검수한 콘텐츠로<br className="hidden md:block" />
            <span className="md:hidden"> </span>시험에 나오는 것만 정확하게 학습합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Career */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 약력
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2024 - 현재</span><span className="text-gray-800 font-medium">법무법인 이제 고문</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2023 - 2024</span><span className="text-gray-800 font-medium">(사)정부조달컴퓨터협회 부회장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2018 - 2020</span><span className="text-gray-800 font-medium">조달청 조달교육원 원장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2017 - 2018</span><span className="text-gray-800 font-medium">조달청 조달품질원 조사분석과장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">1989 - 2017</span><span className="text-gray-800 font-medium">조달청</span></li>
            </ul>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 학습 시스템
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> 
                <span>핵심만 요약한 전용 교재</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> 
                <span>영상 강의 중 적시 문제 출제</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> 
                <span>실전과 동일한 환경의 모의고사</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> 
                <span>조달 전문가의 노하우를 학습한 AI 챗봇</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 space-y-8">

        {/* Top Grid Section */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Left Sidebar - Upload Schedule */}
          <div className="col-span-12 lg:col-span-3 lg:order-1 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">업로드 일정</h3>
              <a href="#" className="text-[11px] text-gray-400 flex items-center hover:text-gray-600">
                바로가기 <ChevronRight className="h-3 w-3" />
              </a>
            </div>
            
            <ul className="space-y-4 flex-1">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">기출 무료열람실</span>
                <span className="text-green-500 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                </span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">기출유사</span>
                <span className="text-green-500 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                </span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">기출변형</span>
                <span className="text-green-500 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 완료
                </span>
              </li>
            </ul>
            
            <div className="mt-6 flex justify-center">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center - Hero Banner */}
          <HeroBanner />

        </div>

        {/* Bottom Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {/* Card 1: 무료이용 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-5">무료이용</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">1회</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">미리보는<br/>제1회 기출</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                <div className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">모의</div>
                <span className="text-sm font-medium text-gray-800 leading-tight">무료<br/>모의고사</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:bg-gray-100">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-800">회차별 기출문제</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:bg-gray-100">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-800">기출 무료열람실</span>
              </div>
            </div>
          </div>

          {/* Card 2: 과목별 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-5">과목별</h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-2">
              <Link href="/subject/procurement-laws" className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">⭐</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">기출유사문제</span>
              </Link>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">🎯</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">예상문제</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group col-span-2">
                <span className="text-xl group-hover:scale-110 transition-transform">👑</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">핵심 유형공략</span>
              </div>
            </div>
          </div>

          {/* Card 3: 영역별 집중공략 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-5">영역별 집중공략</h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-2">
              <Link href="/subject/procurement-laws" className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">📋</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 leading-tight">조달법규<br/>MASTER</span>
              </Link>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">📙</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">계약일반 핵심</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">📘</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">원가계산 변형</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">📕</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">입찰실무 공략</span>
              </div>
            </div>
          </div>

          {/* Right Stack (Card 4 & 5) */}
          <div className="flex flex-col gap-4 md:gap-6">

            {/* Card 4: 교재 구매 */}
            <Link
               href="/books"
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 cursor-pointer group block hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  교재 구매
                </h3>
                <span className="text-[11px] text-gray-400 flex items-center group-hover:text-gray-600">
                  바로가기 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <p className="text-sm text-gray-500">조달 전문가 집필 교재로 합격 준비</p>
            </Link>

            {/* Card 5: Event Banner */}
            <div className="bg-[#1e3a8a] rounded-2xl p-6 shadow-sm flex-1 relative overflow-hidden cursor-pointer group">
              <div className="relative z-10">
                <p className="text-blue-200 text-xs mb-1">회원님의 합격을 응원해요.</p>
                <h3 className="font-bold text-white text-lg leading-tight">
                  KbizRun이 준비한<br/>다양한 이벤트와 혜택
                </h3>
              </div>
              <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-[#1e3a8a] group-hover:scale-110 transition-transform">
                <Gift className="h-8 w-8 text-red-500" />
              </div>
            </div>

          </div>

        </div>

        {/* Quick Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-4">
          <Link href="/subject/procurement-laws" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between cursor-pointer group hover:border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">영역별 학습</h4>
                <p className="text-xs text-gray-500">국내최다 문제은행</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500" />
          </Link>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between cursor-pointer group hover:border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">최신 개정법령</h4>
                  <span className="bg-green-100 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                </div>
                <p className="text-xs text-gray-500">반영 자료 완비</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between cursor-pointer group hover:border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">서비스 안내</h4>
                <p className="text-xs text-gray-500">합격률 올리는 활용법</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recommended Content Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900">추천 콘텐츠</h2>
              <p className="text-gray-500 text-sm">빈틈없는 <span className="font-bold text-gray-700">4단계 시험대비 전략</span></p>
            </div>
            <Link href="/curriculum" className="text-sm text-gray-500 flex items-center hover:text-gray-800 whitespace-nowrap">
              전체 서비스 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const st = STEP_STYLE[s.color];
              const hasContent = s.examCount !== null;
              return (
                <Link
                  key={s.id}
                   href={`/step/${s.id}`}
                  className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden group flex flex-col ${st.hover} transition-colors`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${st.decor} rounded-bl-full opacity-50 group-hover:scale-110 transition-transform pointer-events-none`}></div>

                  <div className="relative flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${st.iconBg}`}>
                      {STEP_ICON[s.id]}
                    </div>
                    <span className={`${st.badge} text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap`}>
                      <Star className="h-3 w-3 fill-current" />
                      {s.stepLabel}
                    </span>
                  </div>

                  <h3 className="relative text-xl font-black text-gray-900 mb-5">{s.title}</h3>

                  <div className="mb-5 min-h-[48px]">
                    <h4 className="font-bold text-gray-900 mb-1 leading-snug">{s.subtitle}</h4>
                    <p className="text-sm text-gray-600 leading-snug">{s.tagline}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.tags.map((t) => (
                      <span key={t} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs mt-auto pt-3 border-t border-gray-100">
                    <span className={`flex items-center gap-1.5 ${hasContent ? 'text-gray-500' : 'text-gray-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${hasContent ? st.dot : 'bg-gray-300'}`}></span>
                      {hasContent ? `문제지 ${s.examCount!.toLocaleString()}+` : '문제지 준비중'}
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

          {/* K-Talk */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">K톡</h3>
                <span className="text-gray-500 text-sm ml-1">이 문제 풀어주세요</span>
              </div>
              <a href="#" className="text-[11px] text-gray-400 flex items-center hover:text-gray-600">
                바로가기 <ChevronRight className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4 cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-red-200 text-red-500 text-[10px] px-1.5 py-0.5 rounded">조달법규</span>
                    <span className="text-xs text-gray-500">질문</span>
                  </div>
                  <span className="text-xs text-gray-400">조회 270 댓글 3</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1 group-hover:text-blue-600">
                  <span className="text-red-500 border border-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">N</span>
                  수의계약 vs 일반경쟁입찰 구분 기준
                </h4>
                <p className="text-sm text-gray-500 truncate">국가계약법 시행령 제26조에 따른 수의계약 허용 요건이 헷갈려서...</p>
              </div>

              <div className="pt-2 cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-orange-200 text-orange-500 text-[10px] px-1.5 py-0.5 rounded">원가계산</span>
                    <span className="text-xs text-gray-500">질문</span>
                  </div>
                  <span className="text-xs text-gray-400">조회 287 댓글 6</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1 group-hover:text-blue-600">
                  <span className="text-red-500 border border-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">N</span>
                  간접노무비 계산 방법 문의드립니다
                </h4>
                <p className="text-sm text-gray-500 truncate">예정가격 작성 시 간접노무비율 산정 기준이 어디에 나오는지...</p>
              </div>
            </div>
          </div>

          {/* Mentoring & Tip Stack */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            {/* Mentoring */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
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
            </div>

            {/* Tip */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex-1 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-50"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-50 text-orange-500 text-xs font-bold px-2 py-0.5 rounded border border-orange-100">BEST</span>
                  <span className="text-gray-600 text-sm">추천</span>
                </div>
                <span className="text-[11px] text-gray-400 flex items-center group-hover:text-gray-600">
                  APP에서 확인 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">풀이 TIP</h3>
              <p className="text-sm text-gray-700 mb-6">전문가처럼 알려주는 <span className="font-bold">문제 풀이 전략</span></p>
              
              <div className="mt-auto">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 영역별 학습, 실전대비, 직전대비
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Professor Profile Section */}
        <ProfessorProfile />

      </div>
    </main>
  );
}
