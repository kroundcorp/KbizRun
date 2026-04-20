export interface VideoQuizChoice {
  id: string;
  text: string;
}

export interface VideoQuiz {
  id: string;
  question: string;
  choices: VideoQuizChoice[];
  correctId: string;
  explanation: string;
  points?: number;
}

export type InterruptType = 'hard' | 'soft' | 'overlay';

export interface VideoCuePoint {
  id: string;
  timestampSec: number;
  interruptType: InterruptType;
  isRequired: boolean;
  quiz: VideoQuiz;
}

export interface VideoLecture {
  id: string;
  subjectId: string;
  index: number;
  title: string;
  instructor: string;
  durationSec: number;
  videoUrl: string;
  posterUrl?: string;
  description: string;
  cuePoints: VideoCuePoint[];
}

const BIG_BUCK_BUNNY = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const FOR_BIGGER_ESCAPES = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
const SUBARU_OUTBACK = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4';
const ELEPHANTS_DREAM = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export const videos: VideoLecture[] = [
  {
    id: 'procurement-laws-1',
    subjectId: 'procurement-laws',
    index: 1,
    title: '조달법규 1강 — 국가계약법 체계 개관',
    instructor: '홍순후 교수',
    durationSec: 596,
    videoUrl: BIG_BUCK_BUNNY,
    description:
      '국가계약법·시행령·시행규칙과 계약예규의 위계를 정리하고, 공공조달의 기본 원칙(공정성·경쟁성·경제성)을 짚어봅니다.',
    cuePoints: [
      {
        id: 'proc1-cue-1',
        timestampSec: 30,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'proc1-q1',
          question: '국가계약법의 최상위 규범으로서 공공계약의 근거가 되는 법령은 무엇입니까?',
          choices: [
            { id: 'a', text: '국가를 당사자로 하는 계약에 관한 법률' },
            { id: 'b', text: '지방자치단체를 당사자로 하는 계약에 관한 법률' },
            { id: 'c', text: '조달사업에 관한 법률' },
            { id: 'd', text: '공공기관의 운영에 관한 법률' },
          ],
          correctId: 'a',
          explanation:
            '국가가 당사자가 되는 공공계약의 기본법은 「국가를 당사자로 하는 계약에 관한 법률」(국가계약법)입니다. 시행령·시행규칙·계약예규가 하위 규범으로 이를 구체화합니다.',
          points: 10,
        },
      },
      {
        id: 'proc1-cue-2',
        timestampSec: 75,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'proc1-q2',
          question: '국가계약법령상 공공조달의 3대 기본원칙에 해당하지 않는 것은?',
          choices: [
            { id: 'a', text: '공정성' },
            { id: 'b', text: '경쟁성' },
            { id: 'c', text: '경제성' },
            { id: 'd', text: '비밀성' },
          ],
          correctId: 'd',
          explanation:
            '공공조달의 3대 원칙은 공정성·경쟁성·경제성입니다. 오히려 투명성(공개) 원칙이 강조되며, 비밀성은 기본원칙에 포함되지 않습니다.',
          points: 10,
        },
      },
      {
        id: 'proc1-cue-3',
        timestampSec: 150,
        interruptType: 'hard',
        isRequired: false,
        quiz: {
          id: 'proc1-q3',
          question: '다음 중 국가계약법의 하위 규범이 아닌 것은?',
          choices: [
            { id: 'a', text: '국가계약법 시행령' },
            { id: 'b', text: '국가계약법 시행규칙' },
            { id: 'c', text: '기획재정부 계약예규' },
            { id: 'd', text: '지방계약법 시행령' },
          ],
          correctId: 'd',
          explanation:
            '지방계약법 시행령은 「지방자치단체를 당사자로 하는 계약에 관한 법률」의 하위 규범이며, 국가계약법 체계와는 별개의 계통입니다.',
          points: 10,
        },
      },
    ],
  },
  {
    id: 'procurement-laws-2',
    subjectId: 'procurement-laws',
    index: 2,
    title: '조달법규 2강 — 경쟁입찰의 종류',
    instructor: '홍순후 교수',
    durationSec: 653,
    videoUrl: FOR_BIGGER_ESCAPES,
    description:
      '일반경쟁·제한경쟁·지명경쟁·수의계약의 차이와 각 제도의 적용 요건을 사례 중심으로 살펴봅니다.',
    cuePoints: [
      {
        id: 'proc2-cue-1',
        timestampSec: 40,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'proc2-q1',
          question: '국가계약법상 원칙적인 계약방법은 무엇입니까?',
          choices: [
            { id: 'a', text: '수의계약' },
            { id: 'b', text: '일반경쟁입찰' },
            { id: 'c', text: '지명경쟁입찰' },
            { id: 'd', text: '제한경쟁입찰' },
          ],
          correctId: 'b',
          explanation:
            '국가계약법은 일반경쟁입찰을 원칙으로 하고, 제한경쟁·지명경쟁·수의계약은 법령이 정한 요건에 해당할 때만 예외적으로 허용합니다.',
          points: 10,
        },
      },
      {
        id: 'proc2-cue-2',
        timestampSec: 120,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'proc2-q2',
          question: '제한경쟁입찰의 제한 사유로 가장 거리가 먼 것은?',
          choices: [
            { id: 'a', text: '시공능력평가액' },
            { id: 'b', text: '법인의 주된 영업소 소재지' },
            { id: 'c', text: '특정 상표의 지정' },
            { id: 'd', text: '유자격자명부 등록' },
          ],
          correctId: 'c',
          explanation:
            '특정 상표의 지정은 경쟁 제한이 아닌 규격 차별에 해당하여 제한경쟁의 적법한 사유가 되지 않습니다.',
          points: 10,
        },
      },
    ],
  },
  {
    id: 'contract-general-1',
    subjectId: 'contract-general',
    index: 1,
    title: '계약일반 1강 — 계약의 체결과 성립',
    instructor: '홍순후 교수',
    durationSec: 588,
    videoUrl: SUBARU_OUTBACK,
    description: '계약의 성립요건, 계약서 작성 시점, 계약보증금·입찰보증금의 차이를 정리합니다.',
    cuePoints: [
      {
        id: 'con1-cue-1',
        timestampSec: 45,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'con1-q1',
          question: '국가계약법령상 계약이 유효하게 성립하는 시점은 언제입니까?',
          choices: [
            { id: 'a', text: '낙찰 결정 통지 시' },
            { id: 'b', text: '계약서를 작성한 때' },
            { id: 'c', text: '계약보증금을 납부한 때' },
            { id: 'd', text: '착공계를 제출한 때' },
          ],
          correctId: 'b',
          explanation:
            '국가계약법 제11조에 따라 계약은 계약서를 작성함으로써 확정됩니다. 낙찰 통지만으로는 계약이 성립하지 않습니다.',
          points: 10,
        },
      },
      {
        id: 'con1-cue-2',
        timestampSec: 130,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'con1-q2',
          question: '입찰보증금과 계약보증금의 차이를 가장 적절히 설명한 것은?',
          choices: [
            { id: 'a', text: '둘 다 낙찰자가 계약 이행 중 납부한다.' },
            { id: 'b', text: '입찰보증금은 입찰 참가 시, 계약보증금은 계약 체결 시 납부한다.' },
            { id: 'c', text: '계약보증금은 예정가격의 5% 이내다.' },
            { id: 'd', text: '입찰보증금은 계약 해지 시 전액 귀속된다.' },
          ],
          correctId: 'b',
          explanation:
            '입찰보증금은 입찰 참가 단계에서 낙찰자의 계약체결 의무 이행을 담보하기 위해, 계약보증금은 계약 체결 이후 계약의 이행을 담보하기 위해 납부합니다.',
          points: 10,
        },
      },
    ],
  },
  {
    id: 'contract-general-2',
    subjectId: 'contract-general',
    index: 2,
    title: '계약일반 2강 — 계약의 이행과 변경',
    instructor: '홍순후 교수',
    durationSec: 672,
    videoUrl: ELEPHANTS_DREAM,
    description: '계약 이행 중 설계변경, 물가변동, 기타 계약내용 변경 사유를 구분합니다.',
    cuePoints: [
      {
        id: 'con2-cue-1',
        timestampSec: 50,
        interruptType: 'hard',
        isRequired: true,
        quiz: {
          id: 'con2-q1',
          question: '국가계약법령상 물가변동으로 인한 계약금액 조정이 가능한 최소 기간과 등락률 요건은?',
          choices: [
            { id: 'a', text: '계약 체결 후 30일 경과, 등락률 1% 이상' },
            { id: 'b', text: '계약 체결 후 90일 경과, 등락률 3% 이상' },
            { id: 'c', text: '계약 체결 후 180일 경과, 등락률 5% 이상' },
            { id: 'd', text: '계약 체결 후 1년 경과, 등락률 10% 이상' },
          ],
          correctId: 'b',
          explanation:
            '국가계약법 시행령 제64조에 따라 계약 체결일로부터 90일 이상 경과하고 품목·비목 조정률이 3% 이상 증감된 경우 물가변동에 따른 계약금액 조정이 가능합니다.',
          points: 10,
        },
      },
    ],
  },
];

export function getVideo(id: string): VideoLecture | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosForSubject(subjectId: string): VideoLecture[] {
  return videos
    .filter((v) => v.subjectId === subjectId)
    .sort((a, b) => a.index - b.index);
}

export function formatTimestamp(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
