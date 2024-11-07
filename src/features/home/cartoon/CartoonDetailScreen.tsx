import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'expo-image';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {IcListButton, IcNext, IcHeartColorEmpty} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';
import {useCartoonChapterDetail, useCartoons, useCartoonLike} from '@/src/hooks/queries/cartoon';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  Content: styled.ScrollView`
    flex: 1;
  `,

  WebtoonImage: styled(Image)`
    width: 100%;
    aspect-ratio: 0.7;
  `,

  LikeContainer: styled.View`
    padding: 20px 32px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,

  LikeButton: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 4px;
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

  NextCartoonContainer: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border: 1px solid ${props => props.theme.colors.textLight};
    border-radius: 8px;
    padding: 12px 8px;
    margin: 12px 20px;
    background-color: #fbfbfe;
  `,

  NextCartoonImage: styled(Image)`
    width: 108px;
    height: 73px;
    border-radius: 8px;
  `,

  NextCartoonTexts: styled.View`
    gap: 4px;
  `,
};

export default function CartoonDetailScreen() {
  const {episode} = useLocalSearchParams<{episode: string}>();
  const {data: cartoons} = useCartoons();
  const {data: cartoonChapterDetail} = useCartoonChapterDetail(Number(episode));
  const {mutate: likeCartoon} = useCartoonLike(Number(episode));
  const router = useRouter();

  const currentChapter = cartoonChapterDetail?.chapter ?? 0;
  const nextCartoon = cartoons?.chapters.find(chapter => chapter.chapter === Number(episode) + 1);

  const canMoveToNextEpisode = () => (cartoons?.chapters?.length ?? 0) > currentChapter;
  const canMoveToPrevEpisode = () => currentChapter > 1;

  const handleLike = () => {
    likeCartoon();
  };

  const handleNextEpisode = () => {
    if (canMoveToNextEpisode()) {
      const nextEpisode = cartoons?.chapters[currentChapter];
      router.replace({
        pathname: '/home/cartoon/[episode]',
        params: {
          episode: (currentChapter + 1).toString(),
          title: nextEpisode?.title ?? '',
        },
      });
    }
  };

  const handlePrevEpisode = () => {
    if (canMoveToPrevEpisode()) {
      const prevEpisode = cartoons?.chapters[currentChapter - 2];
      router.replace({
        pathname: '/home/cartoon/[episode]',
        params: {
          episode: (currentChapter - 1).toString(),
          title: prevEpisode?.title ?? '',
        },
      });
    }
  };

  return (
    <S.Container>
      <S.Content>
        {cartoonChapterDetail?.toonImages.map(image => (
          <S.WebtoonImage key={image} source={image} contentFit='contain' />
        ))}

        <S.LikeContainer>
          <S.LikeButton onPress={handleLike}>
            <IcHeartColorEmpty />
            <AppText textType='B2'>{cartoonChapterDetail?.likeCount ?? 0}</AppText>
          </S.LikeButton>
        </S.LikeContainer>

        {nextCartoon && (
          <S.NextCartoonContainer onPress={handleNextEpisode}>
            <S.NextCartoonImage source={nextCartoon.profile} contentFit='cover' />
            <S.NextCartoonTexts>
              <AppText textType='B1'>다음화 보기</AppText>
              <AppText textType='C1'>
                {nextCartoon.chapter}화 {nextCartoon.title}
              </AppText>
            </S.NextCartoonTexts>
          </S.NextCartoonContainer>
        )}
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
