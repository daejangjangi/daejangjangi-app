import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {Alert, Linking} from 'react-native';

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
    max-width: 65%;
  `,

  BannerItemTitle: styled(AppText)`
    border-bottom-width: 0.5px;
    border-bottom-color: ${props => props.theme.colors.textMedium};
  `,

  BannerItemImage: styled(Image)`
    border-radius: 8px;
    width: 120px;
    height: 120px;
  `,
};

interface HomeBannerItemProps {
  name: string;
  description: string;
  imageUrl: string;
  saleLink: string;
}

export default function HomeBannerItem({
  name,
  description,
  imageUrl,
  saleLink,
}: HomeBannerItemProps) {
  const handleClickBannerItem = async () => {
    try {
      const supported = await Linking.canOpenURL(saleLink);

      if (supported) {
        await Linking.openURL(saleLink);
      } else {
        Alert.alert('오류', '이 링크를 열 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.');
    }
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
