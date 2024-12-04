import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {useProductSearchStore} from '@/src/stores/product-search';
import styled from 'styled-components/native';
import {useSearchProductsInfinityScroll} from '@/src/hooks/queries/product';
import {ProductSortKey} from '@/src/api/types/product.type';
import {AppText} from '@/src/common/AppComponents';
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

  FlatList: styled.FlatList`
    flex: 1;
    background-color: #fff;
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
  const [sortKey, setSortKey] = useState<ProductSortKey>(ProductSortKey.POPULAR);
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, status} =
    useSearchProductsInfinityScroll(keyword, sortKey, '', 10);

  const products = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page?.myProductInfoList ?? []);
  }, [data?.pages]);

  useEffect(() => {
    initializeRecentKeywords();
  }, [initializeRecentKeywords]);

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (status === 'pending') {
      return (
        <AppText textType='C2' style={{textAlign: 'center', padding: 10}}>
          로딩중...
        </AppText>
      );
    }
    return null;
  }, [status]);

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
        <ProductSortOptions sortKey={sortKey} onSelectSortKey={setSortKey} />
      </S.ProductionSortOptionsContainer>

      <S.FlatList
        data={products}
        renderItem={({item}) => <ProductItem product={item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{padding: 20}}
        ListEmptyComponent={() =>
          status !== 'pending' && (
            <AppText textType='C2' style={{textAlign: 'center'}}>
              검색 결과가 없습니다.
            </AppText>
          )
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </S.Container>
  );
}
