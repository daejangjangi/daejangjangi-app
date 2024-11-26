import React from 'react';
import styled from 'styled-components/native';
import ProductItem from '../components/ProductItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,

  ProductItemList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `,
};

export default function FavoriteScreen() {
  return (
    <S.Container>
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
