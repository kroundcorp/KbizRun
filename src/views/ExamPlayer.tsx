'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams, redirect } from 'next/navigation';
import { Clock, ChevronLeft, ChevronRight, Flag, X } from 'lucide-react';
import { getExam } from '../data/exams';

export default function ExamPlayer() {
  const { examId } = useParams<{ examId: string }>();
  const router = useRouter();
  const exam = examId ? getExam(examId) : undefined;

  const totalSeconds = useMemo(() => (exam ? exam.durationMin * 60 : 0), [exam]);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!exam) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          submit();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam]);

  if (!exam) redirect('/');

  const q = exam.questions[current];

  const submit = () => {
    const payload = exam.questions.map((question) => ({
      id: question.id,
      selected: answers[question.id] ?? null,
      correct: question.answer,
    }));
    sessionStorage.setItem(`exam-result-${exam.id}`, JSON.stringify(payload));
    router.push(`/exam/${exam.id}/result`);
  };

  const mmss = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          <Link  href={`/subject/${exam.subjectId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-800">
            <X className="h-5 w-5" />
            <span className="text-sm">종료</span>
          </Link>
          <div>
            <h1 className="font-bold text-gray-900">{exam.title}</h1>
            <p className="text-xs text-gray-500 text-center">
              {current + 1} / {exam.questions.length}문항
            </p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold">
            <Clock className="h-4 w-4" />
            {mmss(remaining)}
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-6 py-5 md:py-8 grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        <main className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-200 p-5 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">문제 {current + 1}</span>
                <span className="text-xs text-gray-500">{q.subject}</span>
              </div>
              <button
                onClick={() => setFlagged({ ...flagged, [q.id]: !flagged[q.id] })}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  flagged[q.id] ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Flag className="h-3 w-3" /> {flagged[q.id] ? '표시됨' : '다시 볼 문제'}
              </button>
            </div>

            <p className="text-lg text-gray-900 leading-relaxed mb-8 whitespace-pre-line">{q.stem}</p>

            <div className="space-y-3">
              {q.choices.map((choice, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [q.id]: i })}
                    className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                      selected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 bg-white text-gray-800'
                    }`}
                  >
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{choice}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> 이전
              </button>
              {current < exam.questions.length - 1 ? (
                <button
                  onClick={() => setCurrent(current + 1)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700"
                >
                  다음 <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700"
                >
                  제출하기
                </button>
              )}
            </div>
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">OMR 카드</h3>
              <span className="text-xs text-gray-500">
                {answeredCount} / {exam.questions.length} 완료
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {exam.questions.map((question, i) => {
                const answered = answers[question.id] !== undefined;
                const isFlagged = flagged[question.id];
                const isCurrent = current === i;
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrent(i)}
                    className={`aspect-square rounded-lg text-sm font-bold border transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600'
                        : answered
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-white text-gray-400 border-gray-200'
                    } ${isFlagged ? 'ring-2 ring-yellow-300' : ''}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={submit}
              className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700"
            >
              답안 제출
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm text-xs text-gray-500 space-y-2">
            <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-600 inline-block"></span> 현재 문항</p>
            <p className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-200 inline-block"></span> 답안 표기됨</p>
            <p className="flex items-center gap-2"><span className="w-3 h-3 rounded ring-2 ring-yellow-300 inline-block"></span> 다시 볼 문제</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
