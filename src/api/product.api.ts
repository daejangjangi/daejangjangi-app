import httpInstance from './http';
import {RecommendProduct} from './types/product.type';

// 추천 상품 조회
async function getRecommendProducts(count: number = 6) {
  const response = await httpInstance.get<{
    recommendedProducts: RecommendProduct[];
  }>(`/v1/products/recommend?count=${count}`);

  return response.data;
}

export const ProductApi = {
  getRecommendProducts,
};
