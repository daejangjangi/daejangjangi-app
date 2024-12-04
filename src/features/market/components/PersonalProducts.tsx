import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {useMemberInfo} from '@/src/hooks/queries/member';
import ProductItem from './ProductItem';
import {useRecommendProductsDaejanggan} from '@/src/hooks/queries/product';

const S = {
  Container: styled.View`
    background-color: #fff;
    padding: 20px;
  `,

  ProductItemList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  `,

  MoreButton: styled.TouchableOpacity`
    margin-top: 16px;
    justify-content: center;
    align-items: center;
  `,
};

export default function PersonalProducts() {
  const {data} = useMemberInfo();
  const nickname = data?.nickname;

  const {data: recommendProducts, refetch} = useRecommendProductsDaejanggan();
  const recommendProductsData = recommendProducts?.myProductInfoList;

  return (
    <S.Container>
      <AppText textType='T1'>{nickname}님을 위한 장건강 상품</AppText>

      <S.ProductItemList>
        {recommendProductsData?.map(product => <ProductItem key={product.id} product={product} />)}
      </S.ProductItemList>
    </S.Container>
  );
}
