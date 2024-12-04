import httpInstance from './http';
import {BannerInfo} from './types/banner.type';

// 배너 목록 조회
async function getBanners() {
  const response = await httpInstance.get<{bannerInfoList: BannerInfo[]}>('/v1/banners');

  return response.data;
}

export const BannerApi = {
  getBanners,
};
