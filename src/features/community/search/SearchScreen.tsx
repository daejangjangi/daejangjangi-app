import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useSearchPosts} from '@/src/hooks/queries/post';
import {useRouter} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import {useSearchStore} from '@/src/stores/search';
import {IcClose} from '@/assets/images/icons';
import PostItem from '../components/PostItem';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  Content: styled.View`
    padding: 20px 16px;
    gap: 12px;
  `,

  RecentSearches: styled.View`
    padding: 20px 16px;
  `,

  RecentTitle: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,

  KeywordList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,

  KeywordItem: styled.Pressable`
    flex-direction: row;
    padding: 4px 6px;
    align-items: center;
    background-color: ${props => props.theme.colors.textLight};
    border-radius: 4px;
    gap: 4px;
  `,

  RemoveButton: styled.Pressable`
    padding: 4px;
  `,
};

export default function SearchScreen() {
  const router = useRouter();
  const {keyword, recentKeywords, setKeyword, removeRecentKeyword, initializeRecentKeywords} =
    useSearchStore();

  const {data: searchResults, refetch} = useSearchPosts(0, 10, keyword);

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  const handleKeywordPress = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    refetch();
  };

  useEffect(() => {
    initializeRecentKeywords();
  }, [initializeRecentKeywords]);

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <S.Container>
      <S.RecentSearches>
        <S.RecentTitle>
          <AppText textType='B2Bold'>최근 검색어</AppText>
        </S.RecentTitle>
        <S.KeywordList>
          {recentKeywords.map(k => (
            <S.KeywordItem key={k} onPress={() => handleKeywordPress(k)}>
              <AppText textType='C2'>{k}</AppText>
              <S.RemoveButton onPress={() => removeRecentKeyword(k)}>
                <IcClose />
              </S.RemoveButton>
            </S.KeywordItem>
          ))}
        </S.KeywordList>
      </S.RecentSearches>

      <S.Content>
        {searchResults?.posts?.length ? (
          searchResults.posts.map(post => (
            <PostItem
              key={post.id}
              title={post.title}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              createdAt={post.createdAt}
              onPress={() => handlePostPress(post.id)}
            />
          ))
        ) : (
          <AppText textType='B1' colorType='textMedium'>
            {keyword ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
          </AppText>
        )}
      </S.Content>
    </S.Container>
  );
}
