import httpInstance from './http';
import {NewsLetter} from './types/news-letter.type';

// 뉴스레터 목록 조회
async function getNewsLetterList() {
  const response = await httpInstance.get<{
    newsletterInfoList: NewsLetter[];
  }>('/v1/newsletters');

  return response.data;
}

// 뉴스레터 상세 조회
async function getNewsLetterDetail(id: number) {
  const response = await httpInstance.get<NewsLetter>(`/v1/newsletters/${id}`);

  return response.data;
}

export const NewsLetterApi = {
  getNewsLetterList,
  getNewsLetterDetail,
};
