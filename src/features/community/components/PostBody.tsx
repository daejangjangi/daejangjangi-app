import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcSpeechBubble, IcHeartColorEmpty, IcEye} from '@/assets/images/icons';

const S = {
  Title: styled(AppText)`
    margin-bottom: 2px;
  `,

  Content: styled(AppText)`
    margin-bottom: 4px;
  `,

  Footer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  IconContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
  `,
};

interface PostBodyProps {
  title: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
}

export function PostBody({title, content, likes, comments, views}: PostBodyProps) {
  return (
    <>
      <S.Title textType='B2Bold'>{title}</S.Title>
      <S.Content textType='B1' numberOfLines={2}>
        {content}
      </S.Content>

      <S.Footer>
        <S.IconContainer>
          <IcEye width={16} height={16} />
          <AppText textType='C1' colorType='textMedium'>
            {views}
          </AppText>
        </S.IconContainer>

        <S.IconContainer>
          <IcHeartColorEmpty width={16} height={16} />
          <AppText textType='C1' colorType='main'>
            {likes}
          </AppText>
        </S.IconContainer>

        <S.IconContainer>
          <IcSpeechBubble width={16} height={16} />
          <AppText textType='C1' colorType='textMedium'>
            {comments}
          </AppText>
        </S.IconContainer>
      </S.Footer>
    </>
  );
}
