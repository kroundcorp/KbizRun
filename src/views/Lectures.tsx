import Link from 'next/link';
import { BookOpen, CheckCircle2, ChevronRight, ClipboardList, FileText, PlayCircle } from 'lucide-react';
import { videos } from '../data/videos';

const lectureTracks = [
  {
    title: '필기',
    description: 'CBT 객관식 시험 대비를 위한 정규 강의 흐름입니다.',
    color: 'blue',
    items: ['기본이론', '핵심요약+문제풀이(CBT, 객관식)', '모의고사&최종마무리'],
  },
  {
    title: '실기',
    description: '필답형 답안 작성과 최종 실전 감각을 함께 준비합니다.',
    color: 'purple',
    items: ['기본이론', '핵심요약+문제풀이(필답형)', '모의고사&최종마무리'],
  },
];

const iconMap = [
  <BookOpen key="basic" className="h-5 w-5" />,
  <FileText key="summary" className="h-5 w-5" />,
  <ClipboardList key="final" className="h-5 w-5" />,
];

export default function Lectures() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-6 py-9 md:px-10 md:py-12 text-white mb-8">
        <p className="text-blue-200 font-bold text-sm mb-3">VIDEO LECTURES</p>
        <h1 className="text-3xl md:text-5xl font-black mb-4">영상 강의 전체 보기</h1>
        <p className="text-sm md:text-lg text-blue-50 max-w-3xl leading-relaxed">
          필기 CBT 객관식부터 실기 필답형까지 기본이론, 핵심요약+문제풀이, 모의고사&최종마무리 순서로 학습합니다.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        {lectureTracks.map((track) => (
          <article key={track.title} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{track.title}</h2>
                <p className="text-sm text-gray-500">{track.description}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${
                  track.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}
              >
                정규 과정
              </span>
            </div>
            <div className="space-y-3">
              {track.items.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      track.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}
                  >
                    {iconMap[index]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{index + 1}단계 강의</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">등록된 강의</h2>
            <p className="text-sm text-gray-500">현재 데모 강의 목록입니다. 수강권 보유 시 강의 플레이어에서 이어볼 수 있습니다.</p>
          </div>
          <Link href="/pricing" className="hidden sm:inline-flex bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700">
            수강권 보기
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <Link key={video.id} href={`/video/${video.id}`} className="group rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300">
              <div className="aspect-video bg-gradient-to-br from-[#1a103c] to-[#37257a] flex items-center justify-center text-white">
                <PlayCircle className="h-12 w-12 opacity-90 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-4">
                <p className="font-bold text-gray-900 group-hover:text-blue-600">{video.title}</p>
                <p className="text-xs text-gray-500 mt-1">{video.instructor} · {Math.ceil(video.durationSec / 60)}분</p>
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">{video.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                  강의 보기 <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
