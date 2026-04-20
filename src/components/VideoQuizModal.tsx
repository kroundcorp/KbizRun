'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import type { VideoCuePoint } from '../data/videos';

interface VideoQuizModalProps {
  isOpen: boolean;
  cue: VideoCuePoint | null;
  onComplete: (result: { cueId: string; selectedId: string | null; isCorrect: boolean; responseMs: number; skipped: boolean }) => void;
}

export default function VideoQuizModal({ isOpen, cue, onComplete }: VideoQuizModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [startAt, setStartAt] = useState<number>(0);

  useEffect(() => {
    if (isOpen && cue) {
      setSelectedId(null);
      setSubmitted(false);
      setStartAt(Date.now());
    }
  }, [isOpen, cue]);

  if (!cue) return null;

  const quiz = cue.quiz;
  const isCorrect = submitted && selectedId === quiz.correctId;
  const canSkip = !cue.isRequired;

  const handleSubmit = () => {
    if (!selectedId) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete({
      cueId: cue.id,
      selectedId,
      isCorrect: selectedId === quiz.correctId,
      responseMs: Date.now() - startAt,
      skipped: false,
    });
  };

  const handleSkip = () => {
    onComplete({
      cueId: cue.id,
      selectedId: null,
      isCorrect: false,
      responseMs: Date.now() - startAt,
      skipped: true,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          >
            <div className="bg-gradient-to-r from-[#1a103c] to-[#37257a] px-8 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-purple-200 font-medium">영상 속 퀴즈</p>
                  <h3 className="font-bold">학습 내용 확인해볼까요?</h3>
                </div>
              </div>
              {cue.isRequired ? (
                <span className="bg-red-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">필수</span>
              ) : (
                <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">권장</span>
              )}
            </div>

            <div className="p-8">
              <p className="text-lg text-gray-900 leading-relaxed mb-6 whitespace-pre-line font-medium">
                {quiz.question}
              </p>

              <div className="space-y-2.5 mb-6">
                {quiz.choices.map((choice, i) => {
                  const isSelected = selectedId === choice.id;
                  const isAnswer = choice.id === quiz.correctId;
                  const showCorrect = submitted && isAnswer;
                  const showWrong = submitted && isSelected && !isAnswer;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => !submitted && setSelectedId(choice.id)}
                      disabled={submitted}
                      className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : showWrong
                          ? 'border-red-500 bg-red-50 text-red-900'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-800'
                      } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                          showCorrect
                            ? 'bg-green-600 text-white'
                            : showWrong
                            ? 'bg-red-600 text-white'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1 leading-relaxed">{choice.text}</span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
                      {showWrong && <XCircle className="h-5 w-5 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-5 mb-6 border ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <p className="font-bold text-green-900">정답입니다!</p>
                        {quiz.points ? (
                          <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                            +{quiz.points}pt
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <p className="font-bold text-red-900">아쉽네요, 다시 정리해볼까요?</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className={`h-4 w-4 mt-0.5 shrink-0 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} />
                    <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {quiz.explanation}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                {canSkip && !submitted ? (
                  <button
                    onClick={handleSkip}
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                  >
                    건너뛰기
                  </button>
                ) : (
                  <span />
                )}

                {submitted ? (
                  <button
                    onClick={handleContinue}
                    className="flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    계속 시청하기 <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedId}
                    className="bg-[#2563eb] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    정답 제출
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
