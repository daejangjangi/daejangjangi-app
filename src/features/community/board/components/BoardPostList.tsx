import React, {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {Board} from '@/src/api/types/post.type';
import {usePostsByBoardInfinite} from '@/src/hooks/queries/board';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';
import PostItem from '../../components/PostItem';

const S = {
  FlatList: styled.FlatList`
    flex: 1;
    margin-bottom: 40px;
    background-color: #fbfcfe;
  `,
};

interface BoardPostsProps {
  board: Board | '인기';
}

export default function BoardPosts({board}: BoardPostsProps) {
  const router = useRouter();
  const PAGE_SIZE = 3;

  const {refetch, data, fetchNextPage, hasNextPage, isFetchingNextPage} = usePostsByBoardInfinite(
    board as Board,
    PAGE_SIZE,
  );

  const posts = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page?.posts ?? []);
  }, [data?.pages]);

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
  }, [board, refetch]);

  return (
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
  );
}
