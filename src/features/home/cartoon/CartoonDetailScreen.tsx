import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {IcListButton, IcNext} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  Content: styled.View`
    flex: 1;
  `,

  WebtoonImage: styled(Image)`
    width: 100%;
    height: 100%;
  `,

  NavigationBar: styled.View`
    height: 84px;
    background-color: rgba(251, 251, 254, 1);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top-width: 0.5px;
    border-top-color: ${props => props.theme.colors.textMedium};
  `,

  NavButton: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,

  MenuButton: styled.TouchableOpacity`
    padding: 8px;
  `,
};

export default function CartoonDetailScreen() {
  const {episode, title} = useLocalSearchParams<{episode: string; title: string}>();
  const router = useRouter();
  const currentEpisode = Number(episode);

  // 실제 에피소드 데이터
  const episodes = [
    {
      id: 4,
      title: '치핵이 뭔데? 2',
      previewImageUrl: 'https://placehold.co/200',
      views: 350,
      likes: 120,
      comments: 12,
    },
    {
      id: 3,
      title: '치핵이 뭔데? 1',
      previewImageUrl: 'https://placehold.co/200',
      views: 350,
      likes: 120,
      comments: 12,
    },
    {
      id: 2,
      title: '대장을 사랑한 남자, 가우디',
      previewImageUrl: 'https://placehold.co/200',
      views: 350,
      likes: 120,
      comments: 12,
    },
    {
      id: 1,
      title: '우울증 해결의 비밀이 장에서 온다고?',
      previewImageUrl: 'https://placehold.co/200',
      views: 350,
      likes: 120,
      comments: 12,
    },
  ];

  // 현재 에피소드의 인덱스 찾기
  const currentEpisodeIndex = episodes.findIndex(ep => ep.id === currentEpisode);

  const canMoveToNextEpisode = () => currentEpisodeIndex > 0;
  const canMoveToPrevEpisode = () => currentEpisodeIndex < episodes.length - 1;

  const handleNextEpisode = () => {
    if (canMoveToNextEpisode()) {
      const nextEpisode = episodes[currentEpisodeIndex - 1];
      router.replace({
        pathname: '/home/cartoon/[episode]',
        params: {
          episode: nextEpisode.id.toString(),
          title: nextEpisode.title,
        },
      });
    }
  };

  const handlePrevEpisode = () => {
    if (canMoveToPrevEpisode()) {
      const prevEpisode = episodes[currentEpisodeIndex + 1];
      router.replace({
        pathname: '/home/cartoon/[episode]',
        params: {
          episode: prevEpisode.id.toString(),
          title: prevEpisode.title,
        },
      });
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.WebtoonImage source='https://placehold.co/400x600' contentFit='contain' />
      </S.Content>

      <S.NavigationBar>
        <S.NavButton onPress={handlePrevEpisode}>
          <IcNext color={canMoveToPrevEpisode() ? theme.colors.text : theme.colors.textMedium} />
        </S.NavButton>

        <S.MenuButton>
          <IcListButton />
        </S.MenuButton>

        <S.NavButton onPress={handleNextEpisode}>
          <IcNext
            color={canMoveToNextEpisode() ? theme.colors.text : theme.colors.textMedium}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </S.NavButton>
      </S.NavigationBar>
    </S.Container>
  );
}
