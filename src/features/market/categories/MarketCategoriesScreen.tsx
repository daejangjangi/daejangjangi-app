import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {ProductCategories, ProductSortKey} from '@/src/api/types/product.type';
import {useProductsByCategoryInfinityScroll} from '@/src/hooks/queries/product';
import {useLocalSearchParams} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import MarketCategoriesHeader from './components/MarketCategoriesHeader';
import ProductSortOptions from '../search/components/ProductSortOptions';
import ProductItem from '../components/ProductItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  Main: styled.View`
    flex: 1;
  `,

  ProductSortOptionsContainer: styled.View`
    padding: 12px 20px;
  `,

  FlatList: styled.FlatList`
    flex: 1;
    background-color: #fff;
  `,
};

export default function MarketCategoriesScreen() {
  const [sortKey, setSortKey] = useState<ProductSortKey>(ProductSortKey.POPULAR);
  const {category} = useLocalSearchParams<{category: ProductCategories}>();

  const {data, status, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useProductsByCategoryInfinityScroll(category, sortKey, 10);
  const products = data?.pages.flatMap(page => page.myProductInfoList) ?? [];

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
      <MarketCategoriesHeader />
      <S.Main>
        <S.ProductSortOptionsContainer>
          <ProductSortOptions sortKey={sortKey} onSelectSortKey={setSortKey} />
        </S.ProductSortOptionsContainer>

        <S.FlatList
          data={products}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{paddingHorizontal: 20}}
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
      </S.Main>
    </S.Container>
  );
}
