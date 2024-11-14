import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {BoardApi} from '@/src/api/board';
import type {Board} from '@/src/api/types/post.type';

export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  pinned: () => [...boardKeys.all, 'pinned'] as const,
  posts: (board: Board, page: number, size: number) =>
    [...boardKeys.all, 'posts', board, page, size] as const,
};

// 관심 게시판 조회
export function usePinnedBoards() {
  return useQuery({
    queryKey: boardKeys.pinned(),
    queryFn: () => BoardApi.getPinnedBoards(),
  });
}

// 게시판별 게시글 조회
export function usePostsByBoard(board: Board, page: number, size: number) {
  return useQuery({
    queryKey: boardKeys.posts(board, page, size),
    queryFn: () => BoardApi.getPostsByBoard(board, page, size),
  });
}

// 관심 게시판 수정
export function useUpdatePinnedBoards() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boards: Board[]) => BoardApi.updatePinnedBoards(boards),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: boardKeys.pinned()});
    },
  });
}
