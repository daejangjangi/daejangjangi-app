import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {useBanners} from '@/src/hooks/queries/banner';

const S = {
  Container: styled.View`
    width: 100%;
    height: 150px;
    background-color: ${props => props.theme.colors.main};
    justify-content: center;
    align-items: center;
  `,

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
    <S.Container>
      <S.BannerImageContainer onPress={() => Linking.openURL(randomBanner.saleLink)}>
        <S.BannerImage source={{uri: randomBanner.bannerImage}} />
      </S.BannerImageContainer>
    </S.Container>
  );
}
