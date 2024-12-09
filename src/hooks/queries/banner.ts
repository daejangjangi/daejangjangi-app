import {BannerApi} from '@/src/api/banner.api';
import {useQuery} from '@tanstack/react-query';

export const bannerKeys = {
  all: ['banner'] as const,
};

export function useBanners() {
  return useQuery({
    queryKey: bannerKeys.all,
    queryFn: () => BannerApi.getBanners(),
  });
}
