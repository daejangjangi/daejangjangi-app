import {useQuery} from '@tanstack/react-query';
import {ProductApi} from '@/src/api/product.api';

export const productKeys = {
  all: ['product'] as const,
  recommend: () => [...productKeys.all, 'recommend'] as const,
};

// 추천 상품 조회
export function useRecommendProducts() {
  return useQuery({
    queryKey: productKeys.recommend(),
    queryFn: () => ProductApi.getRecommendProducts(),
  });
}
