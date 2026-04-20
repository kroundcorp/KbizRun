'use client';

import React, { useState } from 'react';
import {
  ChevronRight, FileText,
  MessageCircle, Download,
  Clock, BookOpen, HelpCircle,
  PlayCircle, Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { getSubject } from '../data/subjects';
import { getExamsForSubject } from '../data/exams';
import { getVideosForSubject } from '../data/videos';

const TABS = ['기출문제', '핵심요약', '강의', '오답노트'] as const;
type Tab = (typeof TABS)[number];

export default function SubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [tab, setTab] = useState<Tab>('기출문제');

  if (!subjectId) redirect('/');
  const subject = getSubject(subjectId);
  if (!subject) redirect('/');

  const exams = getExamsForSubject(subjectId);
  const lectureVideos = getVideosForSubject(subjectId);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link  href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>자격증</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-900 font-medium">{subject.name}</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded border border-blue-100">
                  과목 {subject.index}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
                  <span>{subject.icon}</span>
                  {subject.name}
                </h1>
              </div>
              <p className="text-sm md:text-base text-gray-600">{subject.description}</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <p className="text-xs text-gray-500 mb-1">나의 학습 진도율</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-32 md:w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${subject.progress}%` }} />
                  </div>
                  <span className="text-sm font-bold text-blue-600">{subject.progress}%</span>
                </div>
              </div>
              {exams.length > 0 ? (
                <Link
                   href={`/exam/${exams[0].id}`}
                  className="bg-blue-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 whitespace-nowrap"
                >
                  이어서 학습
                </Link>
              ) : (
                <button disabled className="bg-gray-200 text-gray-500 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold cursor-not-allowed text-sm md:text-base whitespace-nowrap">
                  준비중
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
            <div className="flex border-b border-gray-200 gap-5 md:gap-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 md:pb-4 text-base md:text-lg whitespace-nowrap ${
                    tab === t
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                      : 'text-gray-500 font-medium hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === '기출문제' && (
              <div className="space-y-4">
                {exams.length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
                    아직 등록된 기출문제가 없습니다. 곧 업로드될 예정입니다.
                  </div>
                )}
                {exams.map((exam, idx) => {
                  const statusSet: ('not-started' | 'completed' | 'in-progress')[] = [
                    'not-started',
                    'completed',
                    'completed',
                    'in-progress',
                  ];
                  const status = statusSet[idx % statusSet.length];
                  return (
                    <div
                      key={exam.id}
                      className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 hover:border-blue-300 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors shrink-0">
                            <FileText className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                                {exam.year}년
                              </span>
                              <h3 className="font-bold text-gray-900 text-sm md:text-base">{exam.title}</h3>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exam.durationMin}분</span>
                              <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {exam.questions.length}문항</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 shrink-0">
                          {status === 'completed' && (
                            <div className="text-right mr-4">
                              <p className="text-[10px] text-gray-400">최고 점수</p>
                              <p className="text-sm font-bold text-green-600">85점</p>
                            </div>
                          )}
                          {status === 'in-progress' && (
                            <div className="text-right mr-4">
                              <p className="text-[10px] text-gray-400">진행중</p>
                              <p className="text-sm font-bold text-blue-600">15%</p>
                            </div>
                          )}
                          <Link
                             href={`/exam/${exam.id}`}
                            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                              status === 'completed'
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                            }`}
                          >
                            {status === 'completed' ? '다시 풀기' : status === 'in-progress' ? '계속 풀기' : '문제 풀기'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === '핵심요약' && (
              <div className="space-y-4">
                {['법령 구조 한 눈에 보기', '핵심 용어 30선', '자주 틀리는 조문 정리'].map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between hover:border-blue-300 cursor-pointer">
                    <div>
                      <p className="text-[11px] text-gray-400 mb-1">핵심요약 #{i + 1}</p>
                      <h3 className="font-bold text-gray-900">{t}</h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300" />
                  </div>
                ))}
              </div>
            )}

            {tab === '강의' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lectureVideos.length === 0 && (
                  <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
                    아직 등록된 강의 영상이 없습니다. 곧 업로드될 예정입니다.
                  </div>
                )}
                {lectureVideos.map((v) => (
                  <Link
                    key={v.id}
                     href={`/video/${v.id}`}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#1a103c] to-[#37257a] flex items-center justify-center text-white relative">
                      <PlayCircle className="h-14 w-14 text-white/90 group-hover:scale-110 transition-transform" />
                      {v.cuePoints.length > 0 && (
                        <span className="absolute top-3 right-3 bg-purple-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                          <Sparkles className="h-3 w-3" />
                          퀴즈 {v.cuePoints.length}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                        {Math.ceil(v.durationSec / 60)}분
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-xs text-gray-500">{v.instructor}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {tab === '오답노트' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 mb-4">아직 오답 기록이 없습니다.</p>
                <p className="text-sm text-gray-400">문제를 풀어 틀린 문제가 자동으로 쌓입니다.</p>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-[#1a103c] to-[#37257a] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{subject.name} AI 튜터</h3>
                    <p className="text-[10px] text-purple-200">24시간 실시간 답변 가능</p>
                  </div>
                </div>
                <p className="text-sm text-purple-100 mb-6 leading-relaxed">
                  궁금한 점을 자유롭게 물어보세요. 34년 경력 조달 전문가의 노하우가 담긴 AI가 답합니다.
                </p>
                <div className="bg-white/10 rounded-xl p-3 mb-4 border border-white/10">
                  <p className="text-xs text-purple-200 italic">"최근 개정된 조문 중 시험 빈출 주제는?"</p>
                </div>
                <button className="w-full bg-white text-[#37257a] font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors">
                  AI에게 질문하기
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-500" />
                학습 자료실
              </h3>
              <div className="space-y-3">
                {[
                  `2024 ${subject.name} 핵심 요약집.pdf`,
                  `빈출 조문 체크리스트.docx`,
                  '최신 개정법령 비교표.pdf',
                ].map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group"
                  >
                    <span className="text-xs text-gray-700 truncate pr-4">{file}</span>
                    <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-blue-900 text-sm">도움이 필요하신가요?</h3>
              </div>
              <p className="text-xs text-blue-700 mb-4 leading-relaxed">
                학습 중 이해가 안 가는 부분이 있다면 커뮤니티에 질문을 남겨보세요. 전문가와 합격자들이 답변해 드립니다.
              </p>
              <Link  href="/community" className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1">
                커뮤니티 바로가기 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
