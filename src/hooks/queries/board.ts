import {useMutation, useQuery, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import {BoardApi} from '@/src/api/board.api';
import type {Board} from '@/src/api/types/post.type';

export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  pinned: () => [...boardKeys.all, 'pinned'] as const,
  posts: (board: Board) => [...boardKeys.all, 'posts', board] as const,
};

// 관심 게시판 조회
export function usePinnedBoards() {
  return useQuery({
    queryKey: boardKeys.pinned(),
    queryFn: () => BoardApi.getPinnedBoards(),
  });
}

// 게시판별 게시글 조회
export function usePostsByBoardInfinite(board: Board, size: number) {
  return useInfiniteQuery({
    queryKey: boardKeys.posts(board),
    queryFn: ({pageParam = 0}) => BoardApi.getPostsByBoard(board, pageParam, size),
    getNextPageParam: lastPage => {
      if (lastPage?.last) return undefined;
      return (lastPage?.pageable.pageNumber ?? -1) + 1;
    },
    initialPageParam: 0,
  });
}

export function usePostsByBoard(board: Board, size: number) {
  return useQuery({
    queryKey: boardKeys.posts(board),
    queryFn: () => BoardApi.getPostsByBoard(board, 0, size),
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
