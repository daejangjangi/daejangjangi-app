import React from 'react';
import styled from 'styled-components/native';
import {useMyFavoriteProductsInfinityScroll} from '@/src/hooks/queries/product';
import {AppText} from '@/src/common/AppComponents';
import ProductItem from '../components/ProductItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  FlatList: styled.FlatList`
    flex: 1;
    background-color: #fff;
  `,
};

export default function FavoriteScreen() {
  const {data, status, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useMyFavoriteProductsInfinityScroll(10);
  const products = data?.pages.flatMap(page => page.myProductInfoList) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <S.Container>
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
              관심 상품이 없습니다.
            </AppText>
          )
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </S.Container>
  );
}
