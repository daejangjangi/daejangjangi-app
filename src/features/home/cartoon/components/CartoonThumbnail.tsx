import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import styled from 'styled-components/native';
import {IcHeartColorEmpty, IcEye, IcSpeechBubble} from '@/assets/images/icons';

const truncateText = (text: string, maxLength: number = 15) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const S = {
  ThumbnailContainer: styled.View`
    width: 100%;
  `,

  ThumbnailGradient: styled(LinearGradient)`
    position: absolute;
    width: 100%;
    height: 300px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 124px;
  `,

  ThumbnailContent: styled.View`
    margin: 20px auto;
    width: 80%;
    height: 300px;
    background-color: #f6f5f4;
    border-radius: 12px;
    overflow: hidden;
  `,

  ThumbnailImage: styled(Image)`
    width: 100%;
    height: 200px;
    background-color: #fff;
  `,

  ThumbnailInfo: styled.View`
    padding: 12px;
  `,

  NewBadge: styled(AppText)`
    color: ${props => props.theme.colors.main};
    margin-bottom: 4px;
  `,

  ThumbnailTitle: styled(AppText)`
    margin-bottom: 8px;
  `,

  StatsContainer: styled.View`
    flex-direction: row;
    gap: 12px;
  `,

  StatText: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,

  StatItem: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,
};

interface CartoonThumbnailProps {
  episode: {
    id: number;
    title: string;
    previewImageUrl: string;
    views: number;
    likes: number;
    comments: number;
  };
}

export function CartoonThumbnail({episode}: CartoonThumbnailProps) {
  return (
    <S.ThumbnailContainer>
      <S.ThumbnailGradient colors={['rgba(244, 15, 84, 1)', 'rgba(255, 163, 208, 1)']} />
      <S.ThumbnailContent>
        <S.ThumbnailImage source={episode.previewImageUrl} />
        <S.ThumbnailInfo>
          <S.NewBadge textType='C1'>신규</S.NewBadge>
          <S.ThumbnailTitle textType='B2Bold'>
            [{episode.id}화] {truncateText(episode.title)}
          </S.ThumbnailTitle>
          <S.StatsContainer>
            <S.StatItem>
              <IcEye />
              <S.StatText textType='C1'>{episode.views}</S.StatText>
            </S.StatItem>
            <S.StatItem>
              <IcHeartColorEmpty />
              <S.StatText textType='C1'>{episode.likes}</S.StatText>
            </S.StatItem>
            <S.StatItem>
              <IcSpeechBubble />
              <S.StatText textType='C1'>{episode.comments}</S.StatText>
            </S.StatItem>
          </S.StatsContainer>
        </S.ThumbnailInfo>
      </S.ThumbnailContent>
    </S.ThumbnailContainer>
  );
}
