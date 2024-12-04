import httpInstance from './http';
import {Pagination} from './types/pagination.type';
import {Product, ProductSortKey, RecommendProduct} from './types/product.type';

// 추천 상품 조회
async function getRecommendProductsMain(count: number = 6) {
  const response = await httpInstance.get<{
    recommendedProducts: RecommendProduct[];
  }>(`/v1/products/recommend/main?count=${count}`);

  return response.data;
}

// 검색 및 정렬된 상품 목록 조회
async function searchProducts(
  keyword: string,
  sortKey: ProductSortKey,
  page: number,
  size: number,
) {
  const response = await httpInstance.get<{
    myProductLikeList: Product[];
    pageFields: Pagination;
  }>(`/v1/products/search?keyword=${keyword}&sortKey=${sortKey}&page=${page}&size=${size}`);

  return response.data;
}

// 관심 상품 목록 조회
async function getMyFavoriteProducts(page: number, size: number) {
  const response = await httpInstance.get<{
    myProductLikeList: Product[];
    pageFields: Pagination;
  }>(`/v1/products/likes?page=${page}&size=${size}`);

  return response.data;
}

// 상품 좋아요
async function likeProduct(productId: number) {
  const response = await httpInstance.post<null, null>(`/v1/products/${productId}/likes`);

  return response.data;
}

export const ProductApi = {
  getRecommendProductsMain,
  searchProducts,
  getMyFavoriteProducts,
  likeProduct,
};
