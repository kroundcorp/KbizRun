'use client';

import React from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  Layers,
  Scale,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  Lightbulb,
  FileText,
  PenLine,
  CalendarDays,
  Landmark,
  ChevronRight,
} from 'lucide-react';

const TARGETS = [
  {
    icon: <Building2 className="h-5 w-5" />,
    title: '공공기관 · 기업 실무자',
    desc: '공공조달 실무를 처음 담당하게 된 직원',
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: '입찰 · 계약 담당자',
    desc: '입찰·계약 업무나 이에 연관된 직무 수행자',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: '공공사업 참여 기업',
    desc: '공공사업 참여를 고려하는 기업 실무자',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: '예비 취업 · 창업 준비생',
    desc: '조달 절차의 전반적 흐름을 이해하고자 하는 분',
  },
];

const PURPOSE_AREAS = [
  { title: '공공조달 제도 및 법령의 기초 이해', icon: <Scale className="h-5 w-5" /> },
  { title: '조달 절차 전반의 구조적·논리적 흐름 파악', icon: <Layers className="h-5 w-5" /> },
  { title: '공공기관, 발주처, 기업 등의 역할 관계 이해', icon: <Building2 className="h-5 w-5" /> },
];

const EXAM_INFO = [
  { label: '관리 기관', value: '조달청' },
  { label: '시행 기관', value: '한국산업인력공단' },
  { label: '자격 등급', value: '단일 등급' },
  { label: '시험 방식', value: '수시검정 (연 1회 이상, 고용노동부 승인)' },
];

const SCHEDULE = [
  { type: '필기', apply: '9월 14일(월) ~ 9월 17일(목)', exam: '10월 3일(토)', result: '10월 12일(월)' },
  { type: '실기', apply: '10월 12일(월) ~ 10월 15일(목)', exam: '11월 14일(토)', result: '12월 18일(금)' },
];

const STUDY_STEPS = [
  {
    step: '01',
    title: '시험 구조와 범위 파악',
    desc: '필기/실기 구분, 출제영역, 합격 기준 이해',
  },
  {
    step: '02',
    title: '공공조달의 전체 흐름 학습',
    desc: '조달의 단계별 절차, 기관 간 역할분담, 제도적 목적 파악',
  },
  {
    step: '03',
    title: '구조 중심의 정리 학습',
    desc: '암기보다 논리 흐름 위주의 학습, 실무 시나리오 기반 이해',
  },
];

const GUIDE_CRITERIA = [
  '공식 시험 취지에 부합하며, 최신 법제 변화를 반영했는가',
  '공공조달 전 과정을 단계별로 구조화했는가',
  '첫 시행에 맞추어 실무감각과 논리적 이해를 함께 잡아주는가',
];

export default function AboutCertification() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#37257a] text-white px-6 py-10 md:px-12 md:py-16 mb-10 md:mb-14">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full mb-5">
            <BadgeCheck className="h-4 w-4" />
            2026 신설 국가자격
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            공공조달관리사
            <br />
            자격 개요
          </h1>
          <p className="text-base md:text-lg text-blue-100 leading-relaxed">
            공공조달 제도와 절차를 체계적으로 이해하고,
            <br className="hidden md:block" />
            실무를 효율적으로 수행하기 위한 전문가 인증 자격
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* 공공조달관리사란? */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">ABOUT</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">공공조달관리사란?</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <p className="text-gray-800 text-[15px] md:text-base leading-8 mb-4">
            공공조달관리사는 공공조달 제도와 절차를 체계적으로 이해하고,
            실제 행정 및 기업 현장에서의 조달 업무를 효율적으로 수행하기 위한
            <span className="font-bold text-blue-700"> 전문가를 인증하는 자격</span>입니다.
          </p>
          <p className="text-gray-700 text-[15px] leading-8">
            단순히 법령이나 규정을 암기하는 수준을 넘어,{' '}
            <span className="font-bold">공공조달 전 과정의 구조와 흐름을 이해하는 능력</span>을
            갖추고 있는지를 평가하는 데 초점이 맞춰져 있습니다.
          </p>
        </div>
      </section>

      {/* 자격의 목적과 기준 */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">PURPOSE</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">자격의 목적과 기준</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-4">
          <p className="text-gray-700 text-[15px] leading-8">
            이 자격은 공공조달 시스템을 전체적으로 파악해, 각 기관과 기업이 수행하는
            조달 관련 과정을 하나의 관리체계로 이해할 수 있도록 돕는 것을 목표로 합니다.
            특히 다음과 같은 영역을 중심으로 구성됩니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PURPOSE_AREAS.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-blue-300 hover:-translate-y-1 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                {a.icon}
              </div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
                AREA {String(i + 1).padStart(2, '0')}
              </p>
              <p className="text-base font-bold text-gray-900 leading-relaxed">{a.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm text-blue-900 leading-7">
            즉, 공공조달을 하나의{' '}
            <span className="font-bold">'관리영역(Management Domain)'</span>으로
            정리하고 체계화하는 능력을 검정합니다.
          </p>
        </div>
      </section>

      {/* 자격 신설의 배경 */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">BACKGROUND</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">자격 신설의 배경</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm space-y-4">
          <p className="text-gray-700 text-[15px] leading-8">
            최근 공공조달의 규모와 중요성이 빠르게 확대되었지만, 이를 종합적으로
            이해할 수 있는 학습 기준은 충분히 마련되지 않았습니다. 기존 자격체계는
            업무 단위별로 분절되어 있어, 조달 전체를 하나의 시스템으로 이해하기
            어렵다는 한계가 있었습니다.
          </p>
          <p className="text-gray-800 text-[15px] leading-8">
            이에 따라 <span className="font-bold text-blue-700">공공조달관리사 자격</span>은,
            공공조달 전 과정의 구조적 이해를 지원하고, 관련 종사자 및 기업 실무자가
            시스템적 사고를 기반으로 조달업무를 수행할 수 있도록 하기 위해 신설된
            국가자격입니다.
          </p>
        </div>
      </section>

      {/* 이런 분들에게 적합합니다 */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">FOR YOU</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">이런 분들에게 적합합니다</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {TARGETS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-start gap-4 hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-7">
            이 자격은 특정 직무 수행을 전제하기보다는, 공공조달을 이해하는{' '}
            <span className="font-bold">'기준선'을 확립하기 위한 학습형 자격</span>입니다.
          </p>
        </div>
      </section>

      {/* 시험 정보 */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">EXAM INFO</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">시험 정보</h2>
        </div>

        {/* 시행 개요 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Landmark className="h-5 w-5 text-blue-600" />
            <h3 className="text-base md:text-lg font-bold text-gray-900">시행 개요</h3>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-700 text-[15px] leading-8 mb-5">
              공공조달관리사 시험은 국가기술자격(서비스 분야)의 하나로,
              한국산업인력공단에서 시행합니다. 시험은 필기와 실기로 구성되며,
              공공조달 제도의 이해도와 실무 수행 능력을 검정합니다.
            </p>
            <dl className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {EXAM_INFO.map((row) => (
                <div key={row.label} className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr]">
                  <dt className="bg-gray-50 px-4 md:px-5 py-3 text-sm font-bold text-gray-700">
                    {row.label}
                  </dt>
                  <dd className="px-4 md:px-5 py-3 text-sm text-gray-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 2026년도 시행 일정 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <h3 className="text-base md:text-lg font-bold text-gray-900">
              2026년도 시행 일정 <span className="text-sm font-medium text-gray-500">(예시)</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-blue-50/60">
                <tr className="text-left text-gray-700">
                  <th className="px-5 py-3 font-bold">구분</th>
                  <th className="px-5 py-3 font-bold">원서접수</th>
                  <th className="px-5 py-3 font-bold">시험일</th>
                  <th className="px-5 py-3 font-bold">합격자 발표</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SCHEDULE.map((s) => (
                  <tr key={s.type} className="text-gray-800 tabular-nums">
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-md text-xs font-bold ${
                          s.type === '필기'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {s.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">{s.apply}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">{s.exam}</td>
                    <td className="px-5 py-4">{s.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-6 py-3 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
            ※ 원서 접수 및 시험장 정보는 시행 공고문을 통해 별도 안내됩니다.
          </p>
        </div>

        {/* 필기 / 실기 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider">STAGE 1</p>
                <h3 className="text-lg font-black text-gray-900">필기</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                CBT
              </span>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                객관식
              </span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                공공조달과 법·제도 이해
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                공공조달 계획수립 및 분석
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                공공계약관리
              </li>
            </ul>
            <p className="text-xs text-gray-500 pt-4 border-t border-gray-100">
              조달 관련 법령과 절차 이해도를 평가
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <PenLine className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider">STAGE 2</p>
                <h3 className="text-lg font-black text-gray-900">실기</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md">
                필답형
              </span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-purple-500 mt-0.5 shrink-0" />
                공공조달관리 실무
              </li>
            </ul>
            <p className="text-xs text-gray-500 pt-4 border-t border-gray-100">
              실제 업무 상황에서의 수행력·관리능력을 측정
            </p>
          </div>
        </div>
      </section>

      {/* 학습 가이드 */}
      <section className="mb-10 md:mb-14">
        <div className="mb-5">
          <p className="text-blue-600 font-bold text-sm mb-2">STUDY GUIDE</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">학습 가이드</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-6">
          <p className="text-gray-700 text-[15px] leading-8">
            공공조달관리사는{' '}
            <span className="font-bold">도입 초기 자격</span>으로, 기존의 출제 데이터나
            기출문제가 거의 없습니다. 따라서 초반에는{' '}
            <span className="font-bold text-blue-700">
              "무엇을 공부할 것인가"보다 시험의 기준과 전체 구조를 파악하는 것
            </span>
            이 가장 중요합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {STUDY_STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-blue-300 hover:-translate-y-1 transition-all"
            >
              <p className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
                STEP {s.step}
              </p>
              <h3 className="text-lg font-black text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">
            교재 및 강의 선택 기준
          </h3>
          <ul className="space-y-3">
            {GUIDE_CRITERIA.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3"
              >
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-800 leading-7">{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing + CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white px-6 py-10 md:px-12 md:py-14">
        <div className="relative z-10 max-w-2xl">
          <p className="text-blue-200 text-sm font-bold mb-3">FUTURE-READY QUALIFICATION</p>
          <h2 className="text-2xl md:text-3xl font-black leading-snug mb-4">
            공공성과 절차 중심의 행정·비즈니스 환경에서
            <br className="hidden md:block" />
            점점 더 중요해질 미래형 자격
          </h2>
          <p className="text-blue-100 text-[15px] md:text-base leading-8 mb-6">
            공공조달을 이해하는 새로운 기준을 제시하는 공공조달관리사.
            <br className="hidden md:block" />
            K-Biz Run과 함께 구조적 이해를 기반으로 합격을 준비하세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 bg-white text-[#2563eb] font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              커리큘럼 보기
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/free-mock"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              무료 모의고사 체험
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </main>
  );
}
