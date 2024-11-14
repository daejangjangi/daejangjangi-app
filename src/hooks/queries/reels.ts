import {useQuery} from '@tanstack/react-query';
import {ReelsApi} from '@/src/api/reels.api';

export const reelsKeys = {
  all: ['reels'] as const,
  lists: () => [...reelsKeys.all, 'list'] as const,
  detail: (id: number) => [...reelsKeys.all, 'detail', id] as const,
};

// 릴스 목록 조회
export function useReelsList() {
  return useQuery({
    queryKey: reelsKeys.lists(),
    queryFn: () => ReelsApi.getReelsList(),
  });
}

// 릴스 상세 조회
export function useReelsDetail(id: number) {
  return useQuery({
    queryKey: reelsKeys.detail(id),
    queryFn: () => ReelsApi.getReelsDetail(id),
  });
}
