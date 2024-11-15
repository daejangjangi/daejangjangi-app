import React from 'react';
import {useMyPosts} from '@/src/hooks/queries/post';
import styled from 'styled-components/native';
import {useRouter} from 'expo-router';
import {AppText} from '@/src/common/AppComponents';
import PostItem from '../components/PostItem';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fbfcfe;
  `,

  Posts: styled.View`
    padding: 20px 16px;
    gap: 12px;
  `,
};

export default function MyPostsScreen() {
  const router = useRouter();
  const {data} = useMyPosts(1, 100);
  const myPosts = data?.posts || [];

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  return (
    <S.Container>
      <S.Posts>
        {myPosts.length > 0 ? (
          myPosts.map(post => (
            <PostItem key={post.id} {...post} onPress={() => handlePostPress(post.id)} />
          ))
        ) : (
          <AppText textType='B1' colorType='textMedium'>
            작성한 게시글이 없습니다.
          </AppText>
        )}
      </S.Posts>
    </S.Container>
  );
}
