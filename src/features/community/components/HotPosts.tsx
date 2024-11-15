import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';
import {useHotPosts} from '@/src/hooks/queries/post';
import PostItem from './PostItem';

const S = {
  Container: styled.View`
    padding: 16px;
  `,

  HotPosts: styled.View`
    gap: 12px;
    margin-bottom: 12px;
  `,

  Title: styled(AppText)`
    margin-bottom: 16px;
  `,

  Button: styled.Pressable`
    background-color: ${props => props.theme.colors.mainLight};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 16px;
  `,
};

export default function HotPosts() {
  const router = useRouter();
  const {data} = useHotPosts(0, 3);
  const hotPosts = data?.posts;

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  const handleMorePress = () => {
    router.push({
      pathname: '/(tabs)/community/board',
      params: {board: '인기'},
    });
  };

  return (
    <S.Container>
      <S.Title textType='T1'>인기게시글</S.Title>
      <S.HotPosts>
        {hotPosts && hotPosts.length > 0 ? (
          hotPosts.map(post => (
            <PostItem
              key={post.id}
              title={post.title}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              createdAt={post.createdAt}
              isPopular={post.isPopular}
              onPress={() => handlePostPress(post.id)}
            />
          ))
        ) : (
          <AppText textType='B1'>최근 인기게시글이 없습니다.</AppText>
        )}
      </S.HotPosts>
      <S.Button onPress={handleMorePress}>
        <AppText textType='B2Bold' colorType='main'>
          더보기
        </AppText>
      </S.Button>
    </S.Container>
  );
}
