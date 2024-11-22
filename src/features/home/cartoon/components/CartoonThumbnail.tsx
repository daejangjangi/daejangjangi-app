import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components/native';
import {IcHeartColorEmpty, IcEye, IcHeartColorFill} from '@/assets/images/icons';
import {CartoonChapter} from '@/src/api/types/cartoon.type';
import {useRouter} from 'expo-router';
import {theme} from '@/src/styles/theme';

const truncateText = (text: string, maxLength: number = 15) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

const S = {
  ThumbnailContainer: styled.Pressable`
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

  ThumbnailSkeleton: styled.View`
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
  `,
};

interface CartoonThumbnailProps {
  episode?: CartoonChapter;
}

export function CartoonThumbnail({episode}: CartoonThumbnailProps) {
  const router = useRouter();

  const handleThumbnailPress = () => {
    router.push({
      pathname: '/home/cartoon/[episode]',
      params: {
        episode: episode?.chapter?.toString() ?? '',
        title: episode?.title ?? '',
      },
    });
  };

  return (
    <S.ThumbnailContainer onPress={handleThumbnailPress}>
      <S.ThumbnailGradient colors={['rgba(244, 15, 84, 1)', 'rgba(255, 163, 208, 1)']} />
      <S.ThumbnailContent>
        {episode && (
          <>
            <S.ThumbnailImage source={episode.profile} />
            <S.ThumbnailInfo>
              <S.NewBadge textType='C1'>신규</S.NewBadge>
              <S.ThumbnailTitle textType='B2Bold'>
                [{episode.chapter}화] {truncateText(episode.title)}
              </S.ThumbnailTitle>
              <S.StatsContainer>
                <S.StatItem>
                  <IcEye />
                  <S.StatText textType='C1'>{episode.hit}</S.StatText>
                </S.StatItem>
                <S.StatItem>
                  {episode.isLiked ? (
                    <IcHeartColorFill color={theme.colors.main} />
                  ) : (
                    <IcHeartColorEmpty color={theme.colors.main} />
                  )}
                  <S.StatText textType='C1'>{episode.likeCount}</S.StatText>
                </S.StatItem>
              </S.StatsContainer>
            </S.ThumbnailInfo>
          </>
        )}
        {!episode && (
          <S.ThumbnailSkeleton>
            <AppText textType='B3'>최신화가 없습니다.</AppText>
          </S.ThumbnailSkeleton>
        )}
      </S.ThumbnailContent>
    </S.ThumbnailContainer>
  );
}
