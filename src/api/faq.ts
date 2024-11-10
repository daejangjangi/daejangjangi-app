import httpInstance from './http';
import {Faq} from './types/faq.type';

// 자주 묻는 질문 목록 조회
async function getFaqList() {
  const response = await httpInstance.get<{faqItems: Faq[]}>('/v1/faqs');

  return response.data;
}

export const FaqApi = {
  getFaqList,
};
