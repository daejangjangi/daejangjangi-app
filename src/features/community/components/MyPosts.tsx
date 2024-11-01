import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import SmallPostItem from './SmallPostItem';

const S = {
  Container: styled.View`
    padding: 16px;
  `,

  MyPosts: styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
  })``,

  PostContainer: styled.View`
    margin-right: 12px;
    width: 221px;
  `,

  Title: styled(AppText)`
    margin-bottom: 16px;
  `,
};

const TEMP_POSTS = [
  {
    id: 1,
    title: 'title',
    content:
      '망포 20대 초반/여 과민성대장증후군 /평소에 배가 자주 아픈 사람입니다. 계속 앉아서 지내다 보니 가스가 자주 차고 배가 아파요. 이런 과민성대장증후군 증상은 어떻게 치료해야 하나요?',
    likes: 10,
    comments: 10,
    views: 10,
    createdAt: '2024-01-01',
    isUnread: true,
  },
  {
    id: 2,
    title: 'title',
    content: 'content',
    likes: 10,
    comments: 10,
    views: 10,
    createdAt: '2024-01-01',
    isUnread: false,
  },
];

export default function MyPosts() {
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
      <S.Title textType='T1'>내가 쓴 글</S.Title>
      <S.MyPosts>
        {TEMP_POSTS.map(post => (
          <S.PostContainer key={post.id}>
            <SmallPostItem
              title={post.title}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              views={post.views}
              isUnread={post.isUnread}
              onPress={() => handlePostPress(post.id)}
            />
          </S.PostContainer>
        ))}
      </S.MyPosts>
    </S.Container>
  );
}
