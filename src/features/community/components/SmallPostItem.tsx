import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import PostBody from './PostBody';

const S = {
  Container: styled.Pressable`
    flex-direction: row;
    padding: 16px 12px;
    background-color: #fff;
    gap: 12px;
    max-width: 221px;
    border: 1px solid ${props => props.theme.colors.textLight};
    border-radius: 8px;
  `,

  UnreadDot: styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.main};
    margin-top: 8px;
  `,

  PostContainer: styled.View`
    gap: 2px;
  `,
};

interface SmallPostItemProps {
  title: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  isUnread?: boolean;
  onPress?: () => void;
}

export default function SmallPostItem({
  title,
  content,
  likes,
  comments,
  views,
  isUnread = false,
  onPress,
}: SmallPostItemProps) {
  return (
    <S.Container onPress={onPress}>
      {isUnread && <S.UnreadDot />}
      <S.PostContainer>
        <PostBody title={title} content={content} likes={likes} comments={comments} views={views} />
      </S.PostContainer>
    </S.Container>
  );
}
