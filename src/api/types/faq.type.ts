import {QnaCategory} from './qna.type';

export interface Faq {
  faqList: {
    id: number;
    category: QnaCategory;
    question: string;
    answer: string;
  }[];
}
