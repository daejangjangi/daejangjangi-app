import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {useBanners} from '@/src/hooks/queries/banner';

const S = {
  BannerImageContainer: styled.Pressable`
    width: 100%;
  `,

  BannerImage: styled(Image)`
    width: 100%;
    height: 150px;
  `,
};

export default function MarketBanner() {
  const {data} = useBanners();
  const banners = data?.bannerInfoList ?? [];

  const randomIndex = Math.floor(Math.random() * banners.length);
  const randomBanner = banners[randomIndex];

  return (
    randomBanner && (
      <S.BannerImageContainer onPress={() => Linking.openURL(randomBanner.saleLink)}>
        <S.BannerImage source={randomBanner.bannerImage} />
      </S.BannerImageContainer>
    )
  );
}
