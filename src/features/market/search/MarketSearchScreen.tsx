import React, {useEffect} from 'react';
import {AppText} from '@/src/common/AppComponents';
import {useProductSearchStore} from '@/src/stores/product-search';
import styled from 'styled-components/native';
import MarketRecentSearches from './components/MarketRecentSearches';
import ProductSortOptions from './components/ProductSortOptions';
import ProductItem from '../components/ProductItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  ProductionSortOptionsContainer: styled.View`
    padding: 12px 20px;
  `,

  ProductItemList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
    padding: 20px;
  `,
};

export default function MarketSearchScreen() {
  const {
    keyword,
    recentKeywords,
    setKeyword,
    removeRecentKeyword,
    initializeRecentKeywords,
    isFocused,
  } = useProductSearchStore();

  useEffect(() => {
    initializeRecentKeywords();
  }, [initializeRecentKeywords]);

  useEffect(() => {
    if (keyword) {
      // TODO: 검색 기능 API 연동
    }
  }, [keyword]);

  return (
    <S.Container>
      {isFocused && (
        <MarketRecentSearches
          recentKeywords={recentKeywords}
          onKeywordPress={setKeyword}
          onRemoveKeyword={removeRecentKeyword}
        />
      )}

      <S.ProductionSortOptionsContainer>
        <ProductSortOptions />
      </S.ProductionSortOptionsContainer>

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
