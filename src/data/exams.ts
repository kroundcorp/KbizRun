export interface Question {
  id: number;
  subject: string;
  stem: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  round: number;
  year: number;
  title: string;
  durationMin: number;
  questions: Question[];
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    subject: '조달법규',
    stem: '국가계약법 시행령 제26조에 따라 수의계약을 체결할 수 있는 경우가 아닌 것은?',
    choices: [
      '계약의 목적·성질상 경쟁이 불가능한 경우',
      '재난 발생 시 긴급한 계약이 필요한 경우',
      '단순히 업체가 하나뿐이라는 이유로 체결하는 경우',
      '특수한 기술·설비가 필요하여 특정인과 계약해야 하는 경우',
    ],
    answer: 2,
    explanation: '단순히 업체가 하나뿐이라는 이유만으로는 수의계약 사유가 되지 않으며, 경쟁의 가능성을 객관적으로 검토해야 합니다.',
  },
  {
    id: 2,
    subject: '조달법규',
    stem: '국가계약법령상 \'제한경쟁입찰\' 적용 기준으로 가장 거리가 먼 것은?',
    choices: [
      '시공능력 또는 실적 제한',
      '법인의 주된 영업소 소재지 제한',
      '특정 상표의 지정',
      '유자격자명부 등록 제한',
    ],
    answer: 2,
    explanation: '특정 상표의 지정은 경쟁 제한이 아니라 규격 차별이며, 제한경쟁의 적법한 제한 사유가 아닙니다.',
  },
  {
    id: 3,
    subject: '조달법규',
    stem: '공공계약의 담합행위에 대한 제재로 적절한 것은?',
    choices: [
      '경고장 발부',
      '입찰참가자격 제한 처분',
      '계약대금 30% 감액',
      '민사조정 회부',
    ],
    answer: 1,
    explanation: '담합행위는 부정당업자 제재 사유로 입찰참가자격 제한 처분 대상입니다.',
  },
  {
    id: 4,
    subject: '조달법규',
    stem: '계약의 변경에 관한 설명 중 옳지 않은 것은?',
    choices: [
      '설계변경으로 계약금액이 증액될 수 있다',
      '물가변동에 의한 계약금액 조정이 가능하다',
      '단가계약은 변경이 전혀 불가능하다',
      '기타계약 내용 변경으로 계약금액이 조정될 수 있다',
    ],
    answer: 2,
    explanation: '단가계약도 관련 규정에 따라 변경이 가능합니다.',
  },
  {
    id: 5,
    subject: '조달법규',
    stem: '공공기관이 공고해야 할 입찰 정보에 해당하지 않는 것은?',
    choices: [
      '입찰에 부치는 사항',
      '낙찰자 결정 방법',
      '입찰 예정 참여자 명단',
      '입찰 참가 자격',
    ],
    answer: 2,
    explanation: '참여자 명단 공고는 공정한 경쟁을 저해하므로 공고 사항이 아닙니다.',
  },
];

export const exams: Exam[] = [
  {
    id: 'procurement-laws-r5-2024',
    subjectId: 'procurement-laws',
    round: 5,
    year: 2024,
    title: '제5회 공공조달관리사 기출문제',
    durationMin: 60,
    questions: sampleQuestions,
  },
  {
    id: 'procurement-laws-r4-2023',
    subjectId: 'procurement-laws',
    round: 4,
    year: 2023,
    title: '제4회 공공조달관리사 기출문제',
    durationMin: 60,
    questions: sampleQuestions,
  },
  {
    id: 'procurement-laws-r3-2022',
    subjectId: 'procurement-laws',
    round: 3,
    year: 2022,
    title: '제3회 공공조달관리사 기출문제',
    durationMin: 60,
    questions: sampleQuestions,
  },
  {
    id: 'procurement-laws-r2-2021',
    subjectId: 'procurement-laws',
    round: 2,
    year: 2021,
    title: '제2회 공공조달관리사 기출문제',
    durationMin: 60,
    questions: sampleQuestions,
  },
];

export function getExam(id: string): Exam | undefined {
  return exams.find((e) => e.id === id);
}

export function getExamsForSubject(subjectId: string): Exam[] {
  return exams.filter((e) => e.subjectId === subjectId);
}
