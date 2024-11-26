import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import {IcHeartColorEmpty, IcHeartColorFill} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';

const S = {
  Container: styled.View`
    margin-bottom: 16px;
    width: 160px;
  `,

  ImageContainer: styled.View`
    width: 160px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  `,

  Image: styled(Image)`
    width: 100%;
    height: 100%;
  `,

  PriceContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  LikeButton: styled.TouchableOpacity`
    width: 37px;
    height: 37px;
    border-radius: 100px;
    background-color: rgba(45, 53, 65, 0.5);

    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 6px;
    right: 6px;
  `,
};

const TEMP_DATA = {
  id: 1,
  name: '조이케어 공기방울 무선 버블 좌욕기 + 약쑥 60p',
  regularPrice: 15000,
  discountRate: 3,
  saleLink: 'https://placeholder.com/160',
  profile: 'https://placeholder.com/160',
  isLiked: false,
};

export default function ProductItem() {
  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image source={TEMP_DATA.profile} />
        <S.LikeButton>
          {TEMP_DATA.isLiked ? (
            <IcHeartColorFill width={24} height={24} color={theme.colors.textLight} />
          ) : (
            <IcHeartColorEmpty width={24} height={24} color={theme.colors.textLight} />
          )}
        </S.LikeButton>
      </S.ImageContainer>

      <AppText textType='B1'>{TEMP_DATA.name}</AppText>

      <S.PriceContainer>
        {TEMP_DATA.discountRate && (
          <AppText textType='C2' colorType='main'>
            {TEMP_DATA.discountRate}%
          </AppText>
        )}
        <AppText textType='B1'>{TEMP_DATA.regularPrice.toLocaleString()}원</AppText>
      </S.PriceContainer>
    </S.Container>
  );
}
