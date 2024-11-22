import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import React from 'react';
import styled from 'styled-components/native';
import {IcHeartColorEmpty, IcEye, IcHeartColorFill} from '@/assets/images/icons';
import {CartoonChapter} from '@/src/api/types/cartoon.type';
import {theme} from '@/src/styles/theme';

const truncateText = (text: string, maxLength: number = 15) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

const S = {
  EpisodeList: styled.View`
    padding: 20px;
    gap: 16px;
    background-color: #fff;
  `,

  EpisodeTitle: styled(AppText)`
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.textLight};
    padding: 20px;
  `,

  Episode: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  EpisodeImage: styled(Image)`
    width: 108px;
    height: 73px;
    border-radius: 8px;
    background-color: #f6f5f4;
  `,

  EpisodeInfo: styled.View`
    flex: 1;
  `,

  EpisodeStats: styled.View`
    flex-direction: row;
    gap: 8px;
    margin-top: 4px;
  `,

  Line: styled.View`
    height: 1px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  StatItem: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  StatText: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,
};

interface CartoonEpisodeListProps {
  episodes: CartoonChapter[];
}

export function CartoonEpisodeList({episodes}: CartoonEpisodeListProps) {
  const router = useRouter();

  return (
    <>
      <S.EpisodeTitle textType='B2'>총 {episodes.length}화</S.EpisodeTitle>
      <S.EpisodeList>
        {episodes.map(episode => (
          <React.Fragment key={episode.id}>
            <S.Episode
              onPress={() =>
                router.push({
                  pathname: '/home/cartoon/[episode]',
                  params: {
                    episode: episode.chapter.toString(),
                    title: episode.title,
                  },
                })
              }
            >
              <S.EpisodeImage source={episode.profile} />
              <S.EpisodeInfo>
                <AppText textType='B1'>{`[${episode.chapter}화] ${truncateText(episode.title)}`}</AppText>
                <S.EpisodeStats>
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
                </S.EpisodeStats>
              </S.EpisodeInfo>
            </S.Episode>
            <S.Line />
          </React.Fragment>
        ))}
      </S.EpisodeList>
    </>
  );
}
