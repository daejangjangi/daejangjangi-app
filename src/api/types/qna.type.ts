export enum QnaCategory {
  '기능제안' = '기능제안',
  '문의사항' = '문의사항',
}

export enum QnaStatus {
  '답변대기' = '답변대기',
  '답변완료' = '답변완료',
}

export interface Question {
  category: QnaCategory;
  question: string;
}

export type Answer = Question & {
  id: number;
  status: QnaStatus;
  answer?: string;
};
