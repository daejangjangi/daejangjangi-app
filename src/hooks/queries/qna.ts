import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QnaApi} from '@/src/api/qna.api';
import type {Question} from '@/src/api/types/qna.type';

export const qnaKeys = {
  all: ['qna'] as const,
  lists: () => [...qnaKeys.all, 'list'] as const,
};

// QnA 목록 조회
export function useQnaList() {
  return useQuery({
    queryKey: qnaKeys.lists(),
    queryFn: () => QnaApi.getQnaList(),
  });
}

// QnA 등록
export function useCreateQna() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (question: Question) => QnaApi.createQna(question),
    onSuccess: () => {
      // QnA 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: qnaKeys.lists(),
      });
    },
  });
}
