import httpInstance from './http';
import {CardNews, CardNewsListItem} from './types/cardnews.type';

// 목록 조회
async function getCardNewsList() {
  const response = await httpInstance.get<{
    cardnewsItems: CardNewsListItem[];
  }>('/v1/cardnews');

  return response;
}

// 상세 조회
async function getCardNewsDetail(id: number) {
  const response = await httpInstance.get<CardNews>(`/v1/cardnews/${id}`);

  return response;
}

// 최신 조회
async function getCardNewsLatest() {
  const response = await httpInstance.get<CardNews>('/v1/cardnews/latest');

  return response;
}

export const CardNewsApi = {
  getCardNewsList,
  getCardNewsDetail,
  getCardNewsLatest,
};
