'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { bannerSlides } from '../data/banners';

const AUTO_ADVANCE_MS = 5000;

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const total = bannerSlides.length;
  const slide = bannerSlides[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    if (paused || showAll) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, showAll, total]);

  const content = (
    <>
      <div className="relative z-10">
        <span className="inline-block border border-white/30 text-white/90 text-xs px-3 py-1 rounded-md mb-4">
          {slide.badge}
        </span>
        <h2 className="text-4xl font-bold text-white leading-tight mb-2 whitespace-pre-line">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-white/80 text-sm mt-3">{slide.subtitle}</p>
        )}
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
        <div className="bg-black/30 text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
            className="hover:text-white px-1"
            aria-label="이전 배너"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
            className="hover:text-white px-1"
            aria-label="다음 배너"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPaused((p) => !p);
            }}
            className="hover:text-white px-1 border-l border-white/20 ml-1 pl-2"
            aria-label={paused ? '재생' : '일시정지'}
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowAll(true);
          }}
          className="bg-black/30 text-white/80 text-xs px-3 py-1.5 rounded-full hover:bg-black/40 backdrop-blur-sm"
        >
          전체보기
        </button>
      </div>
    </>
  );

  return (
    <>
      {slide.link ? (
        <Link
           href={slide.link}
          style={{ backgroundColor: slide.bgColor }}
          className="col-span-12 md:col-span-12 lg:col-span-7 lg:order-2 rounded-2xl relative overflow-hidden flex flex-col justify-center p-6 md:p-10 shadow-sm transition-colors min-h-[220px] md:min-h-[280px]"
        >
          {content}
        </Link>
      ) : (
        <div
          style={{ backgroundColor: slide.bgColor }}
          className="col-span-12 md:col-span-12 lg:col-span-7 lg:order-2 rounded-2xl relative overflow-hidden flex flex-col justify-center p-6 md:p-10 shadow-sm min-h-[220px] md:min-h-[280px]"
        >
          {content}
        </div>
      )}

      <AllBannersModal
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        activeIndex={index}
        onSelect={(i) => {
          setIndex(i);
          setShowAll(false);
        }}
      />
    </>
  );
}

function AllBannersModal({
  isOpen,
  onClose,
  activeIndex,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-[880px] overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                전체 배너 ({bannerSlides.length})
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bannerSlides.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onSelect(i)}
                    style={{ backgroundColor: b.bgColor }}
                    className={`relative text-left rounded-xl p-6 shadow-sm transition-transform hover:scale-[1.01] ${
                      i === activeIndex ? 'ring-4 ring-blue-400' : ''
                    }`}
                  >
                    <span className="inline-block border border-white/30 text-white/90 text-[11px] px-2 py-0.5 rounded mb-3">
                      {b.badge}
                    </span>
                    <h4 className="text-xl font-bold text-white leading-snug whitespace-pre-line mb-2">
                      {b.title}
                    </h4>
                    {b.subtitle && (
                      <p className="text-white/80 text-xs">{b.subtitle}</p>
                    )}
                    <div className="absolute top-3 right-3 bg-black/40 text-white/80 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm tabular-nums">
                      {i + 1} / {bannerSlides.length}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
