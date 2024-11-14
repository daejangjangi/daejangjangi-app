import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CartoonApi} from '@/src/api/cartoon.api';

export const cartoonKeys = {
  all: ['cartoon'] as const,
  lists: () => [...cartoonKeys.all, 'list'] as const,
  detail: (chapter: number) => [...cartoonKeys.all, 'detail', chapter] as const,
  latest: () => [...cartoonKeys.all, 'latest'] as const,
};

// 대장툰 목록 조회
export function useCartoons() {
  return useQuery({
    queryKey: cartoonKeys.lists(),
    queryFn: () => CartoonApi.getCartoons().then(res => res.data),
  });
}

// 대장툰 상세 조회
export function useCartoonChapterDetail(chapter: number) {
  return useQuery({
    queryKey: cartoonKeys.detail(chapter),
    queryFn: () => CartoonApi.getCartoonChapterDetail(chapter).then(res => res.data),
  });
}

// 최신 대장툰 조회
export function useCartoonLatestChapter() {
  return useQuery({
    queryKey: cartoonKeys.latest(),
    queryFn: () => CartoonApi.getCartoonLatestChapter().then(res => res.data),
  });
}

// 대장툰 좋아요
export function useCartoonLike(chapter: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => CartoonApi.likeCartoon(chapter).then(res => res.data),
    onSuccess: () => {
      // 모든 관련 쿼리 무효화
      queryClient.invalidateQueries({queryKey: cartoonKeys.lists()});
      queryClient.invalidateQueries({queryKey: cartoonKeys.detail(chapter)});
      queryClient.invalidateQueries({queryKey: cartoonKeys.latest()});
    },
  });
}
