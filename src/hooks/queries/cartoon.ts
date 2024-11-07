import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CartoonApi} from '@/src/api/cartoon';

export const cartoonKeys = {
  all: ['cartoon'] as const,
  lists: () => [...cartoonKeys.all, 'list'] as const,
  detail: (chapter: number) => [...cartoonKeys.all, 'detail', chapter] as const,
  latest: () => [...cartoonKeys.all, 'latest'] as const,
};

// 대장툰 목록 조회
export function useCartoonList() {
  return useQuery({
    queryKey: cartoonKeys.lists(),
    queryFn: () => CartoonApi.getCartoonList().then(res => res.data),
  });
}

// 대장툰 상세 조회
export function useCartoonDetail(chapter: number) {
  return useQuery({
    queryKey: cartoonKeys.detail(chapter),
    queryFn: () => CartoonApi.getCartoonDetail(chapter).then(res => res.data),
  });
}

// 최신 대장툰 조회
export function useCartoonLatest() {
  return useQuery({
    queryKey: cartoonKeys.latest(),
    queryFn: () => CartoonApi.getCartoonLatest().then(res => res.data),
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
