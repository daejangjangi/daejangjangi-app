import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ProductApi} from '@/src/api/product.api';
import {ProductSortKey} from '@/src/api/types/product.type';

export const productKeys = {
  all: ['product'] as const,
  recommend: () => [...productKeys.all, 'recommend'] as const,
  recommendDaejanggan: () => [...productKeys.all, 'recommendDaejanggan'] as const,
  popular: () => [...productKeys.all, 'popular'] as const,
  search: (keyword: string, sortKey: ProductSortKey) =>
    [...productKeys.all, 'search', keyword, sortKey] as const,
  favorite: () => [...productKeys.all, 'favorite'] as const,
};

// 추천 상품 조회
export function useRecommendProducts(count?: number) {
  return useQuery({
    queryKey: productKeys.recommend(),
    queryFn: () => ProductApi.getRecommendProductsMain(count),
  });
}

// 추천 상품 조회(대장간)
export function useRecommendProductsDaejanggan(count?: number) {
  return useQuery({
    queryKey: productKeys.recommendDaejanggan(),
    queryFn: () => ProductApi.getRecommendProductsDaejanggan(count),
    staleTime: 0,
  });
}

// 최근 인기상품 조회
export function useRecentPopularProducts() {
  return useQuery({
    queryKey: productKeys.popular(),
    queryFn: () => ProductApi.getRecentPopularProducts(),
  });
}

// 상품 검색
export function useSearchProductsInfinityScroll(
  keyword: string,
  sortKey: ProductSortKey,
  productGroup: string,
  size: number,
) {
  return useInfiniteQuery({
    queryKey: productKeys.search(keyword, sortKey),
    queryFn: ({pageParam = 1}) =>
      ProductApi.searchProducts(keyword, sortKey, productGroup, pageParam, size),
    enabled: keyword.length > 0,
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;

      if (lastPage.pageFields.pageNumber < lastPage.pageFields.totalPages) {
        return lastPage.pageFields.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

// 관심 상품 목록 조회
export function useMyFavoriteProductsInfinityScroll(size: number) {
  return useInfiniteQuery({
    queryKey: productKeys.favorite(),
    queryFn: ({pageParam = 1}) => ProductApi.getMyFavoriteProducts(pageParam, size),
    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;

      if (lastPage.pageFields.pageNumber < lastPage.pageFields.totalPages) {
        return lastPage.pageFields.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

// 상품 좋아요
export function useLikeProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => ProductApi.likeProduct(productId),
    onSuccess: () => {
      // 관련된 모든 상품 쿼리 무효화
      // queryClient.invalidateQueries({queryKey: productKeys.all});
      queryClient.invalidateQueries({queryKey: productKeys.favorite()});
    },
  });
}
