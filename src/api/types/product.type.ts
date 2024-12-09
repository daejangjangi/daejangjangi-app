export enum ProductSortKey {
  POPULAR = '인기순',
  LOW_PRICE = '낮은가격순',
}

export enum ProductCategories {
  POPULAR = '',
  PROBIOTICS = '유산균',
  LOW_FODMAP = '저포드맵',
  LIVING = '생활용품.리빙',
  DIETARY_FIBER = '식이섬유',
  SNACKS = '간식',
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
  tagList: string[];
}
