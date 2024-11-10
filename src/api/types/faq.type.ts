import {QnaCategory} from './qna.type';

export interface Faq {
  id: number;
  category: QnaCategory;
  question: string;
  answer: string;
}
