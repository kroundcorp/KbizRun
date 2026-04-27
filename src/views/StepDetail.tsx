'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams, redirect } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Target,
  BookOpen,
  FileText,
  PlayCircle,
  NotebookPen,
  Download,
  Star,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getStep, steps, type StepColor, type StepResource } from '../data/steps';
import { getSubject } from '../data/subjects';

const COLOR: Record<StepColor, { ring: string; bg: string; soft: string; text: string; gradient: string; badge: string; hover: string }> = {
  blue: {
    ring: 'border-blue-500',
    bg: 'bg-blue-600',
    soft: 'bg-blue-50',
    text: 'text-blue-600',
    gradient: 'from-blue-600 to-indigo-600',
    badge: 'bg-blue-50 text-blue-600',
    hover: 'hover:border-blue-300',
  },
  orange: {
    ring: 'border-orange-500',
    bg: 'bg-orange-500',
    soft: 'bg-orange-50',
    text: 'text-orange-500',
    gradient: 'from-orange-500 to-red-500',
    badge: 'bg-orange-50 text-orange-500',
    hover: 'hover:border-orange-300',
  },
  green: {
    ring: 'border-green-500',
    bg: 'bg-green-600',
    soft: 'bg-green-50',
    text: 'text-green-600',
    gradient: 'from-green-500 to-emerald-600',
    badge: 'bg-green-50 text-green-600',
    hover: 'hover:border-green-300',
  },
  red: {
    ring: 'border-red-500',
    bg: 'bg-red-500',
    soft: 'bg-red-50',
    text: 'text-red-500',
    gradient: 'from-red-500 to-pink-600',
    badge: 'bg-red-50 text-red-500',
    hover: 'hover:border-red-300',
  },
};

const RESOURCE_ICON: Record<StepResource['type'], React.ReactNode> = {
  pdf: <FileText className="h-5 w-5" />,
  video: <PlayCircle className="h-5 w-5" />,
  exam: <BookOpen className="h-5 w-5" />,
  note: <NotebookPen className="h-5 w-5" />,
};

const RESOURCE_HREF: Record<StepResource['type'], string> = {
  pdf: '/books',
  video: '/lectures',
  exam: '/free-mock',
  note: '/mypage?tab=wrong',
};

export default function StepDetail() {
  const { stepId } = useParams<{ stepId: string }>();
  const router = useRouter();
  const step = stepId ? getStep(stepId) : undefined;

  if (!step) redirect('/curriculum');

  const color = COLOR[step.color];
  const prev = step.prevStepId ? getStep(step.prevStepId) : undefined;
  const next = step.nextStepId ? getStep(step.nextStepId) : undefined;
  const subjects = step.suggestedSubjectIds.map(getSubject).filter(Boolean) as NonNullable<ReturnType<typeof getSubject>>[];

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link  href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link  href="/curriculum" className="hover:text-blue-600">교육과정</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium">{step.title}</span>
      </div>

      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        뒤로가기
      </button>

      <section className={`rounded-3xl overflow-hidden bg-gradient-to-br ${color.gradient} text-white p-6 md:p-10 relative mb-6 md:mb-8`}>
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full">
              <Star className="h-3 w-3 fill-current" />
              {step.stepLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <Calendar className="h-3 w-3" />
              {step.period}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3 leading-tight">{step.title}</h1>
          <p className="text-base md:text-xl text-white/90 font-medium mb-3 md:mb-4">{step.subtitle}</p>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">{step.description}</p>

          {step.examCount !== null && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">{step.examCount.toLocaleString()}+</span> 문제 준비 완료
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6 mb-8">
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
              <Star className={`h-5 w-5 ${color.text} fill-current`} />
              이런 분께 추천해요
            </h2>
            <ul className="space-y-3">
              {step.recommendedFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className={`mt-0.5 w-6 h-6 ${color.badge} rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
              <Target className={`h-5 w-5 ${color.text}`} />
              학습 목표
            </h2>
            <ul className="space-y-3">
              {step.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Check className={`h-5 w-5 mt-0.5 shrink-0 ${color.text}`} />
                  <span className="leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-5">이 단계 학습법</h2>
            <ol className="space-y-4">
              {step.howToUse.map((how, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${color.bg} text-white flex items-center justify-center font-black shrink-0`}>
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1.5">{how}</p>
                </li>
              ))}
            </ol>
          </div>

          {subjects.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <BookOpen className={`h-5 w-5 ${color.text}`} />
                추천 학습 과목
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subjects.map((s) => (
                  <Link
                    key={s.id}
                     href={`/subject/${s.id}`}
                    className={`flex items-center gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-4 ${color.hover} hover:bg-white transition-all group`}
                  >
                    <span className="text-3xl">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          과목 {s.index}
                        </span>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 truncate">{s.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{s.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-900 mb-5">제공 자료</h2>
            <div className="space-y-2">
              {step.resources.map((r, i) => (
                <Link
                  key={i}
                  href={RESOURCE_HREF[r.type]}
                  className={`flex items-center gap-4 rounded-2xl p-4 border transition-colors border-gray-200 bg-white ${color.hover} cursor-pointer`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color.soft} ${color.text}`}
                  >
                    {RESOURCE_ICON[r.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-gray-900">{r.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wider">
                      {r.type}
                      {r.size && ` · ${r.size}`}
                    </p>
                  </div>
                  <Download className="h-4 w-4 text-gray-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 space-y-4">
            <div className={`rounded-3xl ${color.soft} border-2 ${color.ring} p-6 border-opacity-20`}>
              <p className={`text-[11px] font-black ${color.text} mb-1 tracking-wider`}>{step.stepLabel}</p>
              <h3 className="font-black text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{step.tagline}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {step.tags.map((t, i) => (
                  <span key={i} className="bg-white text-gray-600 text-[11px] font-medium px-2 py-1 rounded border border-gray-200">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200/70 text-xs text-gray-600 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  권장 시기: {step.period}
                </p>
                {step.examCount !== null && (
                  <p className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                    문제 {step.examCount.toLocaleString()}+ 세트
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-5 space-y-3">
              {prev && (
                <Link
                   href={`/step/${prev.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronLeft className="h-4 w-4 text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider">이전 단계</p>
                      <p className="font-bold text-gray-900 text-sm truncate">{prev.title}</p>
                    </div>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                   href={`/step/${next.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors border border-blue-100 group"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-blue-600 tracking-wider">다음 단계</p>
                    <p className="font-bold text-gray-900 text-sm truncate">{next.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-500 shrink-0" />
                </Link>
              )}
            </div>

            <Link
               href="/pricing"
              className="block bg-[#2563eb] text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-center"
            >
              이용권으로 전 단계 학습하기
            </Link>
          </div>
        </aside>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-black text-gray-900 mb-5">4단계 전체 보기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isCurrent = s.id === step.id;
            const c = COLOR[s.color];
            return (
              <Link
                key={s.id}
                 href={`/step/${s.id}`}
                className={`rounded-2xl p-4 border-2 transition-all ${
                  isCurrent ? `${c.ring} ${c.soft}` : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className={`text-[10px] font-black tracking-wider mb-1 ${c.text}`}>{s.stepLabel}</p>
                <p className="font-bold text-gray-900">{s.title}</p>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{s.tagline}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
