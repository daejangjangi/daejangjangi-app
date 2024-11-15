import React from 'react';
import {useCommentedPosts} from '@/src/hooks/queries/post';
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

export default function CommentedPostsScreen() {
  const router = useRouter();
  const {data} = useCommentedPosts(0, 10);
  const commentedPosts = data?.posts || [];

  const handlePostPress = (postId: number) => {
    router.push({
      pathname: '/(tabs)/community/post',
      params: {id: postId},
    });
  };

  return (
    <S.Container>
      <S.Posts>
        {commentedPosts.length > 0 ? (
          commentedPosts.map(post => (
            <PostItem key={post.id} {...post} onPress={() => handlePostPress(post.id)} />
          ))
        ) : (
          <AppText textType='B1' colorType='textMedium'>
            댓글 단 게시글이 없습니다.
          </AppText>
        )}
      </S.Posts>
    </S.Container>
  );
}
