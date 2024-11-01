import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
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

const TEMP_POSTS = [
  {
    id: 1,
    title: 'title',
    content: 'content',
    likes: 10,
    comments: 10,
    views: 10,
    createdAt: '2024-01-01',
    isPopular: true,
  },
  {
    id: 2,
    title: 'title',
    content: 'content',
    likes: 10,
    comments: 10,
    views: 10,
    createdAt: '2024-01-01',
    isPopular: true,
  },
];

export default function HotPosts() {
  // @TODO: 인기게시글 데이터 조회
  // @TODO: 게시글 상세 페이지 이동
  const handlePostPress = (postId: number) => {
    // router.push(`/(tabs)/community/post/${postId}`);
  };

  const handleMorePress = () => {
    // @TODO: 인기게시글 페이지 이동
  };

  return (
    <S.Container>
      <S.Title textType='T1'>인기게시글</S.Title>
      <S.HotPosts>
        {TEMP_POSTS.map(post => (
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
        ))}
      </S.HotPosts>
      <S.Button onPress={handleMorePress}>
        <AppText textType='B2Bold' colorType='main'>
          더보기
        </AppText>
      </S.Button>
    </S.Container>
  );
}
