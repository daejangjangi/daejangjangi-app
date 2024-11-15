import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';
import {useMyPosts} from '@/src/hooks/queries/post';
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

  Button: styled.Pressable`
    margin-top: 12px;
    background-color: ${props => props.theme.colors.mainLight};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 16px;
  `,
};

export default function MyPosts() {
  const router = useRouter();
  const {data} = useMyPosts(0, 3);
  const posts = data?.posts;

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  const handleMorePress = () => {
    router.push({
      pathname: '/(tabs)/community/my-posts',
    });
  };

  return (
    <S.Container>
      <S.Title textType='T1'>내가 쓴 글</S.Title>
      <S.MyPosts>
        {posts && posts.length > 0 ? (
          posts?.map(post => (
            <S.PostContainer key={post.id}>
              <SmallPostItem
                title={post.title}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
                onPress={() => handlePostPress(post.id)}
              />
            </S.PostContainer>
          ))
        ) : (
          <AppText textType='B1'>작성한 게시글이 없습니다.</AppText>
        )}
      </S.MyPosts>
      <S.Button onPress={handleMorePress}>
        <AppText textType='B2Bold' colorType='main'>
          더보기
        </AppText>
      </S.Button>
    </S.Container>
  );
}
