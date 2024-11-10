import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {getTimeAgo} from '@/src/utils/date';
import PostBody from './PostBody';

const S = {
  Container: styled.Pressable`
    border-radius: 8px;
    padding: 12px 16px;
    background-color: #fff;
    border: 1px solid #f6f5f4;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  `,

  Badge: styled.View`
    padding: 5px 8px;
    border-radius: 4px;
    background-color: ${props => props.theme.colors.mainLight};
  `,

  BadgeText: styled(AppText)``,

  Dot: styled.View`
    width: 2px;
    height: 2px;
    border-radius: 1px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  Empty: styled.View`
    width: 2px;
    height: 2px;
  `,
};

interface PostItemProps {
  title: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  isPopular?: boolean;
  onPress?: () => void;
}

export default function PostItem({
  title,
  content,
  likes,
  comments,
  views,
  createdAt,
  isPopular = false,
  onPress,
}: PostItemProps) {
  const timeAgo = getTimeAgo(createdAt);

  return (
    <S.Container onPress={onPress}>
      <S.Header>
        {isPopular ? (
          <>
            <S.Badge>
              <S.BadgeText textType='C1' colorType='main'>
                인기
              </S.BadgeText>
            </S.Badge>
            <S.Dot />
          </>
        ) : (
          <S.Empty />
        )}
        <AppText textType='C1' colorType='textMedium'>
          {timeAgo}
        </AppText>
      </S.Header>

      <PostBody title={title} content={content} likes={likes} comments={comments} views={views} />
    </S.Container>
  );
}
