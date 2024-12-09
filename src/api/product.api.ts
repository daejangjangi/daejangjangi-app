import httpInstance from './http';
import {Pagination} from './types/pagination.type';
import {Product, ProductSortKey, RecommendProduct} from './types/product.type';

// 추천 상품 조회(메인)
async function getRecommendProductsMain(count: number = 6) {
  const response = await httpInstance.get<{
    recommendedProducts: RecommendProduct[];
  }>(`/v1/products/recommend/main?count=${count}`);

  return response.data;
}

// 추천 상품 조회(대장간)
async function getRecommendProductsDaejanggan(count: number = 6) {
  const response = await httpInstance.get<{
    pageFields: Pagination;
    myProductInfoList: Product[];
  }>(`/v1/products/recommend/daejanggan?count=${count}`);

  return response.data;
}

// 최근 인기상품 조회
async function getRecentPopularProducts() {
  const response = await httpInstance.get<{
    myProductInfoList: Product[];
  }>('/v1/products/popular');

  return response.data;
}

// 검색 및 정렬된 상품 목록 조회
async function searchProducts(
  keyword: string,
  sortKey: ProductSortKey,
  productGroup: string,
  page: number,
  size: number,
) {
  const searchParams = new URLSearchParams();

  if (keyword) searchParams.append('keyword', keyword);
  if (productGroup) searchParams.append('productGroup', productGroup);
  if (sortKey) searchParams.append('sortKey', sortKey);
  if (page) searchParams.append('page', page.toString());
  if (size) searchParams.append('size', size.toString());

  const response = await httpInstance.get<{
    myProductInfoList: Product[];
    pageFields: Pagination;
  }>(`/v1/products/search?${searchParams.toString()}`);

  return response.data;
}

// 관심 상품 목록 조회
async function getMyFavoriteProducts(page: number, size: number) {
  const response = await httpInstance.get<{
    myProductInfoList: Product[];
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
  getRecommendProductsDaejanggan,
  getRecentPopularProducts,
  searchProducts,
  getMyFavoriteProducts,
  likeProduct,
};
