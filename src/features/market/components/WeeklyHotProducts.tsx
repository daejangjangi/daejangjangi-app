import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import ProductItem from './ProductItem';

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

export default function WeeklyHotProducts() {
  return (
    <S.Container>
      <AppText textType='T1'>🔥이번주 인기상품🔥</AppText>

      <S.ProductItemList>
        {/* <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem /> */}
      </S.ProductItemList>

      <S.MoreButton>
        <AppText textType='B1' colorType='main'>
          더보기
        </AppText>
      </S.MoreButton>
    </S.Container>
  );
}
