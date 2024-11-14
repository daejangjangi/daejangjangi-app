import {useQuery} from '@tanstack/react-query';
import {NewsLetterApi} from '@/src/api/news-letter.api';

export const newsLetterKeys = {
  all: ['newsletter'] as const,
  lists: () => [...newsLetterKeys.all, 'list'] as const,
  detail: (id: number) => [...newsLetterKeys.all, 'detail', id] as const,
};

// 뉴스레터 목록 조회
export function useNewsLetterList() {
  return useQuery({
    queryKey: newsLetterKeys.lists(),
    queryFn: () => NewsLetterApi.getNewsLetterList(),
  });
}

// 뉴스레터 상세 조회
export function useNewsLetterDetail(id: number) {
  return useQuery({
    queryKey: newsLetterKeys.detail(id),
    queryFn: () => NewsLetterApi.getNewsLetterDetail(id),
  });
}
