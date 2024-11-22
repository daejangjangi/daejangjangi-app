import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import ProductItem from './ProductItem';
import {useMemberInfo} from '@/src/hooks/queries/member';

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

  return (
    <S.Container>
      <AppText textType='T1'>{nickname}님을 위한 장건강 상품</AppText>

      <S.ProductItemList>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </S.ProductItemList>
    </S.Container>
  );
}
