import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {AppText} from '@/src/common/AppComponents';
import {IcHeartColorEmpty, IcHeartColorFill} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';
import {Product} from '@/src/api/types/product.type';
import {useLikeProduct} from '@/src/hooks/queries/product';
import {Alert, Linking} from 'react-native';

const S = {
  Container: styled.Pressable`
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

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({product}: ProductItemProps) {
  const {mutate: likeProduct} = useLikeProduct();
  const [isLiked, setIsLiked] = useState(product.isLiked);

  const discountedPrice =
    product.discountRate > 0
      ? Math.floor((product.regularPrice * ((100 - product.discountRate) / 100)) / 10) * 10
      : product.regularPrice;

  const handleClickProduct = async () => {
    try {
      const supported = await Linking.canOpenURL(product.saleLink);

      if (supported) {
        await Linking.openURL(product.saleLink);
      } else {
        Alert.alert('오류', '이 링크를 열 수 없습니다.');
      }
    } catch (err) {
      Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <S.Container onPress={handleClickProduct}>
      <S.ImageContainer>
        <S.Image source={product.profile} />
        <S.LikeButton
          onPress={() => {
            likeProduct(product.id);
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? (
            <IcHeartColorFill width={24} height={24} color={theme.colors.textLight} />
          ) : (
            <IcHeartColorEmpty width={24} height={24} color={theme.colors.textLight} />
          )}
        </S.LikeButton>
      </S.ImageContainer>

      <AppText textType='B1'>{product.name}</AppText>

      <S.PriceContainer>
        {product.discountRate > 0 && (
          <AppText textType='C2' colorType='main'>
            {product.discountRate}%
          </AppText>
        )}
        <AppText textType='B1'>{discountedPrice.toLocaleString()}원</AppText>
      </S.PriceContainer>
    </S.Container>
  );
}
