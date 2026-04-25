'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { User, Book, FileText, Heart, Bell, Settings, LogOut, ChevronRight, Package, Truck } from 'lucide-react';
import { subjects } from '../data/subjects';
import {
  getBookOrders,
  getDemoProfile,
  getExamAttempts,
  getLearningSummary,
  getSubjectProgress,
  getWrongNoteCount,
  type BookOrder,
  type DemoProfile,
  type ExamAttempt,
} from '../lib/demoStore';

const TABS = ['학습 현황', '이용권', '오답노트', '알림', '설정'] as const;

export default function MyPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('학습 현황');
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [orders, setOrders] = useState<BookOrder[]>([]);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [summary, setSummary] = useState({
    watchedSeconds: 0,
    answeredQuestions: 0,
    averageScore: 0,
    accuracy: 0,
  });

  useEffect(() => {
    setProfile(getDemoProfile());
    setOrders(getBookOrders());
    setAttempts(getExamAttempts());
    setWrongCount(getWrongNoteCount());
    setSummary(getLearningSummary());
  }, []);

  const subjectProgress = useMemo(
    () => subjects.map((subject) => ({ ...subject, progress: getSubjectProgress(subject.id) })),
    [summary.watchedSeconds],
  );

  const daysLeft = useMemo(() => {
    if (!profile?.planExpiresAt) return 0;
    const diff = new Date(profile.planExpiresAt).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [profile?.planExpiresAt]);

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
              {currentProfile.planName} · D-{daysLeft}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-2">
            {[
              { t: '학습 현황', i: <Book className="h-4 w-4" /> },
              { t: '이용권', i: <FileText className="h-4 w-4" /> },
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50">
              <LogOut className="h-4 w-4" /> 로그아웃
            </button>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9">
          <h1 className="text-2xl font-black text-gray-900 mb-6">마이페이지 · {tab}</h1>

          {tab === '학습 현황' && (
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

          {tab === '이용권' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <p className="text-xs text-gray-500 mb-1">현재 이용 중</p>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{currentProfile.planName}</h2>
                <p className="text-sm text-gray-500 mb-6">~ {formatDate(currentProfile.planExpiresAt)} · D-{daysLeft}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {['기출', '해설영상', 'AI 챗봇'].map((x) => (
                    <div key={x} className="bg-gray-50 rounded-xl p-4 text-center text-sm font-bold text-gray-700">
                      {x} 무제한
                    </div>
                  ))}
                </div>
                <Link href="/pricing" className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700">
                  기간 연장하기
                </Link>
              </div>
              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  교재 주문/배송
                </h2>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 mb-4">아직 교재 주문 내역이 없습니다.</p>
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
                          <span className="text-gray-500">배송지</span>
                          <span className="font-medium text-gray-900 truncate max-w-[60%]">
                            ({order.shipping.zipcode}) {order.shipping.address1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              {[
                '신규 기출 업로드 — 제5회 공공조달관리사',
                '내가 작성한 댓글에 답변이 달렸어요',
                '이용권이 7일 뒤 만료됩니다',
              ].map((t, i) => (
                <div key={i} className="p-5 flex items-center justify-between">
                  <p className="text-sm text-gray-800">{t}</p>
                  <span className="text-xs text-gray-400">방금 전</span>
                </div>
              ))}
            </div>
          )}

          {tab === '설정' && (
            <div className="bg-white rounded-3xl border border-gray-200 p-8 space-y-6">
              {[
                ['이름', currentProfile.name],
                ['이메일', currentProfile.email],
                ['휴대폰', currentProfile.phone],
                ['비밀번호', '변경하기'],
                ['마케팅 수신 동의', '동의'],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-b-0">
                  <span className="font-bold text-gray-700 text-sm">{k}</span>
                  <span className="text-sm text-gray-500">{v}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
