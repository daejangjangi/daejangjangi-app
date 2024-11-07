import {useQuery} from '@tanstack/react-query';
import {CardNewsApi} from '@/src/api/cardnews';

export const cardNewsKeys = {
  all: ['cardnews'] as const,
  lists: () => [...cardNewsKeys.all, 'list'] as const,
  detail: (id: number) => [...cardNewsKeys.all, 'detail', id] as const,
  latest: () => [...cardNewsKeys.all, 'latest'] as const,
};

// 카드뉴스 목록 조회
export function useCardNewsList() {
  return useQuery({
    queryKey: cardNewsKeys.lists(),
    queryFn: () => CardNewsApi.getCardNewsList().then(res => res.data),
  });
}

// 카드뉴스 상세 조회
export function useCardNewsDetail(id: number) {
  return useQuery({
    queryKey: cardNewsKeys.detail(id),
    queryFn: () => CardNewsApi.getCardNewsDetail(id).then(res => res.data),
  });
}

// 최신 카드뉴스 조회
export function useCardNewsLatest() {
  return useQuery({
    queryKey: cardNewsKeys.latest(),
    queryFn: () => CardNewsApi.getCardNewsLatest().then(res => res.data),
  });
}
