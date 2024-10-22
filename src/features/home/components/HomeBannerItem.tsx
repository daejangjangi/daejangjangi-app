import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {Alert} from 'react-native';

const S = {
  BannerItemContainer: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 16px 20px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    gap: 16px;
  `,

  BannerItemLeft: styled.View`
    gap: 16px;
  `,

  BannerItemTitle: styled(AppText)`
    border-bottom-width: 0.5px;
    border-bottom-color: ${props => props.theme.colors.textMedium};
  `,

  BannerItemImage: styled(Image)`
    border-radius: 8px;
    width: 125px;
    height: 120px;
  `,
};

interface HomeBannerItemProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function HomeBannerItem({name, description, imageUrl}: HomeBannerItemProps) {
  // @Todo: 상품 페이지 이동 구현
  const handleClickBannerItem = () => {
    Alert.alert('상품 페이지 이동 구현해야합니다!');
  };

  return (
    <S.BannerItemContainer onPress={handleClickBannerItem}>
      <S.BannerItemLeft>
        <S.BannerItemTitle textType='B2Bold'>{name}</S.BannerItemTitle>
        <AppText textType='C2'>{description}</AppText>
      </S.BannerItemLeft>

      <S.BannerItemImage source={imageUrl} />
    </S.BannerItemContainer>
  );
}
