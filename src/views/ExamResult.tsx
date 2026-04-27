'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, TrendingUp, MessageCircle } from 'lucide-react';
import { getExam } from '../data/exams';
import { getLatestAttempt } from '../lib/demoStore';

type ResultItem = { id: number; selected: number | null; correct: number };

export default function ExamResult() {
  const { examId } = useParams<{ examId: string }>();
  const exam = examId ? getExam(examId) : undefined;

  const result = useMemo<ResultItem[]>(() => {
    if (!exam) return [];
    try {
      const raw = sessionStorage.getItem(`exam-result-${exam.id}`);
      if (raw) return JSON.parse(raw);
    } catch {}
    const attempt = getLatestAttempt(exam.id);
    if (attempt) {
      return attempt.answers.map((item) => ({
        id: item.questionId,
        selected: item.selected,
        correct: item.correct,
      }));
    }
    return exam.questions.map((q) => ({ id: q.id, selected: null, correct: q.answer }));
  }, [exam]);

  if (!exam) redirect('/');

  const correct = result.filter((r) => r.selected === r.correct).length;
  const total = exam.questions.length;
  const score = Math.round((correct / total) * 100);
  const wrong = total - correct;

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      <Link
         href={`/subject/${exam.subjectId}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> 과목 페이지로 돌아가기
      </Link>

      <div className="bg-gradient-to-br from-[#1a103c] to-[#37257a] rounded-3xl p-6 md:p-10 text-white mb-6 md:mb-8 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <p className="text-purple-200 text-xs md:text-sm mb-2">{exam.title}</p>
            <h1 className="text-3xl md:text-4xl font-black mb-2">채점 결과</h1>
            <p className="text-sm md:text-base text-purple-100">{total}문항 중 {correct}문항 정답 · {wrong}문항 오답</p>
          </div>
          <div className="flex items-center md:justify-end">
            <div className="md:text-right">
              <p className="text-purple-200 text-xs mb-1">내 점수</p>
              <p className="text-5xl md:text-6xl font-black">
                {score}<span className="text-xl md:text-2xl text-purple-200 ml-1">점</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500">정답</p>
            <p className="text-xl font-bold text-gray-900">{correct}문항</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500">오답</p>
            <p className="text-xl font-bold text-gray-900">{wrong}문항</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500">합격 예측</p>
            <p className="text-xl font-bold text-gray-900">{score >= 60 ? '합격' : '재도전 필요'}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">문항별 해설</h2>
      <div className="space-y-4">
        {exam.questions.map((q, idx) => {
          const r = result.find((x) => x.id === q.id);
          const selected = r?.selected ?? null;
          const isCorrect = selected === q.answer;
          return (
            <div key={q.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">Q{idx + 1}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isCorrect ? '정답' : '오답'}
                  </span>
                </div>
              </div>
              <p className="text-gray-900 font-medium mb-4 leading-relaxed">{q.stem}</p>
              <ul className="space-y-2 mb-4">
                {q.choices.map((c, i) => {
                  const isAnswer = i === q.answer;
                  const isSelected = i === selected;
                  return (
                    <li
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-xl text-sm border ${
                        isAnswer
                          ? 'border-green-200 bg-green-50 text-green-800'
                          : isSelected
                          ? 'border-red-200 bg-red-50 text-red-800'
                          : 'border-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white border text-xs flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1">{c}</span>
                      {isAnswer && <span className="text-[10px] font-bold text-green-700">정답</span>}
                      {isSelected && !isAnswer && <span className="text-[10px] font-bold text-red-700">내 선택</span>}
                    </li>
                  );
                })}
              </ul>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
                <span className="font-bold mr-2">해설</span>
                {q.explanation}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-10">
        <Link
           href={`/exam/${exam.id}`}
          className="flex-1 bg-blue-600 text-white text-center font-bold py-4 rounded-2xl hover:bg-blue-700"
        >
          다시 풀기
        </Link>
        <Link
           href={`/subject/${exam.subjectId}`}
          className="flex-1 bg-white border border-gray-200 text-gray-700 text-center font-bold py-4 rounded-2xl hover:bg-gray-50"
        >
          다른 회차 풀기
        </Link>
        <Link
           href="/community"
          className="flex items-center justify-center gap-2 bg-purple-50 border border-purple-100 text-purple-700 px-6 font-bold py-4 rounded-2xl hover:bg-purple-100"
        >
          <MessageCircle className="h-4 w-4" /> 오답 질문하기
        </Link>
      </div>
    </main>
  );
}
