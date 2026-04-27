'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { X, CheckCircle2, Clock, HelpCircle, User, ChevronRight, PlayCircle } from 'lucide-react';
import { getVideo, getVideosForSubject, formatTimestamp, type VideoCuePoint } from '../data/videos';
import { getSubject } from '../data/subjects';
import VideoQuizModal from '../components/VideoQuizModal';
import { getLessonProgressMap, saveLessonProgress } from '../lib/demoStore';

const STORAGE_KEY = (videoId: string) => `video-cues-${videoId}`;

type CueResponse = {
  cueId: string;
  selectedId: string | null;
  isCorrect: boolean;
  responseMs: number;
  skipped: boolean;
  answeredAt: number;
};

function loadResponses(videoId: string): Record<string, CueResponse> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY(videoId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveResponses(videoId: string, map: Record<string, CueResponse>) {
  try {
    sessionStorage.setItem(STORAGE_KEY(videoId), JSON.stringify(map));
  } catch {
    // ignore
  }
}

export default function VideoPlayer() {
  const { videoId } = useParams<{ videoId: string }>();
  const video = videoId ? getVideo(videoId) : undefined;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressSaveRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [savedStart, setSavedStart] = useState<number | null>(null);
  const [continueNotice, setContinueNotice] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [activeCue, setActiveCue] = useState<VideoCuePoint | null>(null);
  const [responses, setResponses] = useState<Record<string, CueResponse>>(() =>
    videoId ? loadResponses(videoId) : {},
  );

  const cuePoints = useMemo(() => {
    if (!video) return [];
    return [...video.cuePoints].sort((a, b) => a.timestampSec - b.timestampSec);
  }, [video]);

  const subject = video ? getSubject(video.subjectId) : undefined;
  const siblings = video ? getVideosForSubject(video.subjectId) : [];

  useEffect(() => {
    if (!videoId) return;
    saveResponses(videoId, responses);
  }, [videoId, responses]);

  useEffect(() => {
    if (!video) return;
    const initial = loadResponses(video.id);
    setResponses(initial);
    const saved = getLessonProgressMap()[video.id];
    setHasAccess(true);
    setSavedStart(saved?.completed ? null : saved?.watchedSeconds ?? null);
    setContinueNotice(Boolean(saved && !saved.completed && saved.watchedSeconds > 10));
  }, [video]);

  if (!videoId) redirect('/');
  if (!video) redirect('/');

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || activeCue) return;
    const t = el.currentTime;
    setCurrentTime(t);
    const baseDuration = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : video.durationSec;
    const completed = baseDuration > 0 && t >= baseDuration * 0.9;
    if (Math.floor(t) - progressSaveRef.current >= 5 || completed) {
      progressSaveRef.current = Math.floor(t);
      saveLessonProgress({
        videoId: video.id,
        subjectId: video.subjectId,
        watchedSeconds: Math.floor(t),
        durationSeconds: Math.floor(baseDuration),
        completed,
        lastWatchedAt: new Date().toISOString(),
      });
    }
    const hit = cuePoints.find(
      (cue) => !responses[cue.id] && cue.interruptType === 'hard' && t + 0.25 >= cue.timestampSec,
    );
    if (hit) {
      el.pause();
      setActiveCue(hit);
    }
  };

  const handleLoadedMetadata = () => {
    const el = videoRef.current;
    if (!el) return;
    setDuration(el.duration);
    if (savedStart && savedStart > 3 && savedStart < el.duration - 5) {
      el.currentTime = savedStart;
      setCurrentTime(savedStart);
    }
  };

  const handleCueComplete = (result: {
    cueId: string;
    selectedId: string | null;
    isCorrect: boolean;
    responseMs: number;
    skipped: boolean;
  }) => {
    setResponses((prev) => ({
      ...prev,
      [result.cueId]: { ...result, answeredAt: Date.now() },
    }));
    setActiveCue(null);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        // autoplay may be blocked after user interaction, fine
      });
    }, 150);
  };

  const seekTo = (sec: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = sec;
    setContinueNotice(false);
    el.play().catch(() => {});
  };

  const totalCues = cuePoints.length;
  const answered = cuePoints.filter((c) => responses[c.id] && !responses[c.id].skipped).length;
  const correctCount = cuePoints.filter((c) => responses[c.id]?.isCorrect).length;
  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <header className="bg-[#0b1220] border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          <Link
             href={`/subject/${video.subjectId}`}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm shrink-0"
          >
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">강의 목록으로</span>
          </Link>
          <div className="text-center min-w-0 flex-1">
            <p className="text-[11px] text-gray-500 truncate">{subject?.name}</p>
            <h1 className="text-xs md:text-sm font-bold truncate">{video.title}</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-xs text-gray-400 shrink-0">
            <span className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4 text-purple-400" />
              <span className="hidden sm:inline">퀴즈 </span>{answered}/{totalCues}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              정답 {correctCount}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-6 py-4 md:py-6 grid grid-cols-12 gap-4 md:gap-6">
        <main className="col-span-12 lg:col-span-8 space-y-4">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative">
            <video
              ref={videoRef}
              src={video.videoUrl}
              controls
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() =>
                saveLessonProgress({
                  videoId: video.id,
                  subjectId: video.subjectId,
                  watchedSeconds: Math.floor(duration || video.durationSec),
                  durationSeconds: Math.floor(duration || video.durationSec),
                  completed: true,
                  lastWatchedAt: new Date().toISOString(),
                })
              }
              className="w-full aspect-video bg-black"
            />
            {!hasAccess && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-center p-6">
                <div>
                  <p className="font-black text-lg mb-2">수강권이 필요한 강의입니다</p>
                  <Link href="/pricing" className="inline-flex bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700">
                    이용권 보기
                  </Link>
                </div>
              </div>
            )}
          </div>

          {continueNotice && savedStart && (
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-blue-100">
                지난 학습 위치 <strong>{formatTimestamp(savedStart)}</strong>부터 이어봅니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  seekTo(0);
                  setContinueNotice(false);
                }}
                className="text-xs font-bold bg-white/10 hover:bg-white/15 px-3 py-2 rounded-lg"
              >
                처음부터
              </button>
            </div>
          )}

          <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 font-medium">퀴즈 타임라인</p>
              <p className="text-[11px] text-gray-500">
                {formatTimestamp(Math.floor(currentTime))} / {formatTimestamp(Math.floor(duration || video.durationSec))}
              </p>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
              {cuePoints.map((cue) => {
                const base = duration > 0 ? duration : video.durationSec;
                const left = base > 0 ? (cue.timestampSec / base) * 100 : 0;
                const done = !!responses[cue.id];
                const correct = responses[cue.id]?.isCorrect;
                return (
                  <button
                    key={cue.id}
                    onClick={() => seekTo(cue.timestampSec)}
                    title={`${formatTimestamp(cue.timestampSec)} — ${cue.quiz.question}`}
                    className={`absolute -top-1.5 w-5 h-5 rounded-full border-2 border-white transition-transform hover:scale-125 ${
                      done
                        ? correct
                          ? 'bg-green-500'
                          : 'bg-red-500'
                        : 'bg-yellow-400'
                    }`}
                    style={{ left: `calc(${left}% - 10px)` }}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" /> 대기
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> 정답
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> 오답
              </span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-bold mb-2">{video.title}</h2>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {video.instructor}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {Math.ceil(video.durationSec / 60)}분
              </span>
              <span className="flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" /> 퀴즈 {totalCues}개
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{video.description}</p>
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">퀴즈 큐포인트</h3>
              <span className="text-[11px] text-gray-400">
                {answered}/{totalCues} 완료
              </span>
            </div>
            <div className="space-y-2">
              {cuePoints.map((cue, i) => {
                const r = responses[cue.id];
                const status: 'pending' | 'correct' | 'wrong' | 'skipped' = r
                  ? r.skipped
                    ? 'skipped'
                    : r.isCorrect
                    ? 'correct'
                    : 'wrong'
                  : 'pending';
                return (
                  <button
                    key={cue.id}
                    onClick={() => seekTo(cue.timestampSec)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-3 flex items-start gap-3 transition-colors"
                  >
                    <span
                      className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        status === 'correct'
                          ? 'bg-green-500/20 text-green-400'
                          : status === 'wrong'
                          ? 'bg-red-500/20 text-red-400'
                          : status === 'skipped'
                          ? 'bg-gray-500/20 text-gray-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {status === 'correct' ? '✓' : status === 'wrong' ? '✕' : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-gray-500">
                          {formatTimestamp(cue.timestampSec)}
                        </span>
                        {cue.isRequired && (
                          <span className="text-[9px] font-bold text-red-400 border border-red-400/40 px-1.5 py-0.5 rounded">
                            필수
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-200 line-clamp-2 leading-snug">
                        {cue.quiz.question}
                      </p>
                    </div>
                  </button>
                );
              })}
              {cuePoints.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-6">
                  이 영상에는 등록된 퀴즈가 없습니다.
                </p>
              )}
            </div>
          </div>

          {siblings.length > 1 && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
              <h3 className="font-bold text-sm mb-4">{subject?.name} 강의 목록</h3>
              <div className="space-y-2">
                {siblings.map((s) => {
                  const isCurrent = s.id === video.id;
                  return (
                    <Link
                      key={s.id}
                       href={`/video/${s.id}`}
                      className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                        isCurrent
                          ? 'bg-blue-500/20 border border-blue-500/40'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <PlayCircle className={`h-5 w-5 shrink-0 ${isCurrent ? 'text-blue-400' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{s.title}</p>
                        <p className="text-[10px] text-gray-500">{Math.ceil(s.durationSec / 60)}분 · 퀴즈 {s.cuePoints.length}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

      <VideoQuizModal
        isOpen={!!activeCue}
        cue={activeCue}
        onComplete={handleCueComplete}
      />
    </div>
  );
}
