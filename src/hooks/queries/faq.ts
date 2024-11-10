import {useQuery} from '@tanstack/react-query';
import {FaqApi} from '@/src/api/faq';

export const faqKeys = {
  all: ['faq'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
};

// FAQ 목록 조회
export function useFaqList() {
  return useQuery({
    queryKey: faqKeys.lists(),
    queryFn: () => FaqApi.getFaqList(),
  });
}
