'use client';

import React, { useState } from 'react';
import { Star, Calendar, MessageCircle, Check } from 'lucide-react';
import { createMentoringBooking, getMentoringBookings, type MentoringBooking } from '../lib/demoStore';

const MENTORS = [
  { name: '홍순후', role: '조달청 前 조달교육원장', exp: '40년', rating: 4.9, sessions: 218 },
  { name: '김합격', role: '제4회 공공조달관리사 최연소 합격', exp: '3년', rating: 4.8, sessions: 96 },
  { name: '박실무', role: '법무법인 이제 선임 컨설턴트', exp: '12년', rating: 4.9, sessions: 154 },
];

export default function Mentoring() {
  const [selectedMentor, setSelectedMentor] = useState(MENTORS[0].name);
  const [topic, setTopic] = useState('학습 계획 상담');
  const [preferredTime, setPreferredTime] = useState('평일 저녁');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState<MentoringBooking[]>(() => getMentoringBookings());

  const submitBooking = () => {
    const booking = createMentoringBooking({
      mentorName: selectedMentor,
      topic,
      preferredTime,
      message: message.trim() || '상담 전 학습 현황을 공유하겠습니다.',
    });
    setBookings([booking, ...bookings]);
    setMessage('');
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-10 text-white mb-8 md:mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>
          <h1 className="text-3xl md:text-4xl font-black mt-3 mb-2">1:1 멘토링</h1>
          <p className="text-blue-100 text-base md:text-lg mb-5 md:mb-6">합격자·실무 전문가와 밀착 코칭, 막힌 부분을 뚫어드립니다.</p>
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
            {['주 1회 줌 세션', '무제한 메시지', '학습 계획 리포트'].map((t) => (
              <span key={t} className="flex items-center gap-2 bg-white/15 rounded-full px-3 md:px-4 py-1.5 md:py-2 whitespace-nowrap">
                <Check className="h-3.5 w-3.5 md:h-4 md:w-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">멘토 소개</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {MENTORS.map((m) => (
          <div key={m.name} className="bg-white rounded-3xl border border-gray-200 p-6 hover:border-blue-300 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-black text-2xl mb-4">
              {m.name.slice(0, 1)}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{m.name} 멘토</h3>
            <p className="text-xs text-gray-500 mb-4">{m.role}</p>
            <div className="flex gap-3 text-xs text-gray-600 mb-6">
              <span>경력 {m.exp}</span>
              <span className="flex items-center gap-0.5 text-yellow-500"><Star className="h-3 w-3 fill-current" /> {m.rating}</span>
              <span>세션 {m.sessions}회</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMentor(m.name)}
              className={`w-full font-bold py-3 rounded-xl transition-colors ${
                selectedMentor === m.name ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
              }`}
            >
              상담 신청
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-5">멘토링 신청서</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold text-gray-500">선택 멘토</span>
              <select value={selectedMentor} onChange={(event) => setSelectedMentor(event.target.value)} className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
                {MENTORS.map((mentor) => <option key={mentor.name}>{mentor.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold text-gray-500">상담 주제</span>
              <input value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-gray-500">희망 시간</span>
              <input value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </label>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="현재 고민이나 요청사항을 입력하세요" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[100px] resize-none" />
            <button type="button" onClick={submitBooking} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">
              멘토링 신청 저장
            </button>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-5">신청 내역</h3>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500">아직 신청 내역이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="font-bold text-gray-900">{booking.mentorName} 멘토</p>
                    <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded">신청 완료</span>
                  </div>
                  <p className="text-sm text-gray-600">{booking.topic} · {booking.preferredTime}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(booking.createdAt).toLocaleDateString('ko-KR')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <Calendar className="h-6 w-6 text-blue-500 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">세션 예약 방법</h3>
          <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
            <li>멘토 프로필 선택 후 상담 신청</li>
            <li>가능한 시간대 선택</li>
            <li>줌 링크 수신 및 입장</li>
          </ol>
        </div>
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <MessageCircle className="h-6 w-6 text-purple-500 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">세션 후 지원</h3>
          <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
            <li>학습 리포트 제공</li>
            <li>7일간 카톡 Q&A</li>
            <li>다음 시험까지 액션 플랜</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
