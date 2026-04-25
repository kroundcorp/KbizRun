import { CheckCircle2 } from 'lucide-react';

export default function ProfessorProfile() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 lg:p-12 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-[#f0f4f8] rounded-2xl overflow-hidden border border-gray-100">
          <img
            src="/hong.png"
            alt="홍순후 교수"
            className="absolute bottom-0 w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <span className="text-blue-600 font-bold text-xs md:text-sm bg-blue-50 px-3 py-1 rounded-full mb-3 md:mb-4 inline-block border border-blue-100">국내 유일, 조달 전문가 검수</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3">홍순후 교수</h2>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 leading-tight">대체 불가능한 40년 경력의 조달 전문가 × AI 기술의 결합</p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            국내 유일, 조달 전문가 직접 검수한 콘텐츠로<br className="hidden md:block" />
            <span className="md:hidden"> </span>시험에 나오는 것만 정확하게 학습합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 약력
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2024 - 현재</span><span className="text-gray-800 font-medium">법무법인 이제 고문</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2023 - 2024</span><span className="text-gray-800 font-medium">(사)정부조달컴퓨터협회 부회장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2018 - 2020</span><span className="text-gray-800 font-medium">조달청 조달교육원 원장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">2017 - 2018</span><span className="text-gray-800 font-medium">조달청 조달품질원 조사분석과장</span></li>
              <li className="flex gap-3 md:gap-4"><span className="text-gray-500 w-20 md:w-24 font-mono text-xs md:text-sm shrink-0">1989 - 2017</span><span className="text-gray-800 font-medium">조달청</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 학습 시스템
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                '핵심만 요약한 전용 교재',
                '영상 강의 중 적시 문제 출제',
                '실전과 동일한 환경의 모의고사',
                '조달 전문가의 노하우를 학습한 AI 챗봇',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" /> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
