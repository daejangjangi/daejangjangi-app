export enum ProductSortKey {
  POPULAR = '인기순',
  LOW_PRICE = '낮은가격순',
}

export interface RecommendProduct {
  id: number;
  name: string;
  comment: string;
  saleLink: string;
  profile: string;
}

export interface Product {
  id: number;
  name: string;
  regularPrice: number;
  discountRate: number;
  saleLink: string;
  profile: string;
  isLiked: boolean;
}
