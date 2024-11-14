import React, {useState, useMemo, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import {useRouter} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import {usePostsByBoardInfinite} from '@/src/hooks/queries/board';
import {Board} from '@/src/api/types/post.type';
import PostItem from '../components/PostItem';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fbfcfe;
  `,

  CategoriesContainer: styled.View``,

  Categories: styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  })`
    background-color: #fff;
    padding: 16px 20px;
  `,

  CategoriesContent: styled.View`
    flex-direction: row;
    padding-right: 40px;
    gap: 8px;
  `,

  Category: styled.Pressable<{isSelected: boolean}>`
    padding: 8px 16px;
    background-color: ${({isSelected, theme}) =>
      isSelected ? theme.colors.main : theme.colors.textLight};
    border-radius: 20px;
  `,

  CategoryText: styled(AppText)<{isSelected: boolean}>`
    color: ${({isSelected, theme}) => (isSelected ? '#fff' : theme.colors.text)};
  `,

  FlatList: styled.FlatList`
    flex: 1;
    margin-bottom: 40px;
    background-color: #fbfcfe;
  `,
};

const BOARD_CATEGORIES = [
  '인기',
  ...Object.values(Board).map(disease => disease.replace('\n', ' ')),
];

export default function BoardScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(BOARD_CATEGORIES[0]);
  const PAGE_SIZE = 3;

  const {data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage} = usePostsByBoardInfinite(
    selectedCategory as Board,
    PAGE_SIZE,
  );

  const posts = useMemo(
    () => data?.pages.flatMap(page => page?.content ?? []) ?? [],
    [data?.pages],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <AppText textType='C2' style={{textAlign: 'center', padding: 10}}>
          로딩중...
        </AppText>
      );
    }
    return null;
  }, [isFetchingNextPage]);

  const handleCategoryPress = useCallback(board => {
    setSelectedCategory(board);
  }, []);

  const handlePostPress = useCallback(
    (postId: number) => {
      router.push({
        pathname: '/(tabs)/community/post',
        params: {id: postId},
      });
    },
    [router],
  );

  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);

  return (
    <S.Container>
      <S.CategoriesContainer>
        <S.Categories>
          <S.CategoriesContent>
            {BOARD_CATEGORIES.map(board => (
              <S.Category
                key={board}
                isSelected={board === selectedCategory}
                onPress={() => handleCategoryPress(board)}
              >
                <S.CategoryText textType='C2' isSelected={board === selectedCategory}>
                  {board}
                </S.CategoryText>
              </S.Category>
            ))}
          </S.CategoriesContent>
        </S.Categories>
      </S.CategoriesContainer>

      <S.FlatList
        data={posts}
        renderItem={({item}) => <PostItem {...item} onPress={() => handlePostPress(item.id)} />}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{padding: 20, gap: 12}}
        ListEmptyComponent={() => <AppText textType='C2'>게시글이 없습니다.</AppText>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </S.Container>
  );
}
