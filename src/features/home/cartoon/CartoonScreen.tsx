import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {useCartoonLatestChapter, useCartoons} from '@/src/hooks/queries/cartoon';
import {CartoonEpisodeList} from './components/CartoonEpisodeList';
import {CartoonThumbnail} from './components/CartoonThumbnail';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fff;
  `,

  Header: styled.View`
    padding: 12px 36px;
    gap: 8px;
    background-color: #fff;
  `,

  Title: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  Author: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,

  Description: styled(AppText)`
    padding: 0 36px 20px 36px;
    color: ${props => props.theme.colors.textMedium};
    background-color: #fff;
  `,
};

export default function CartoonScreen() {
  const {data: cartoons} = useCartoons();
  const {data: latestEpisode} = useCartoonLatestChapter();

  return (
    <S.Container>
      <CartoonThumbnail episode={latestEpisode} />

      <S.Header>
        <S.Title textType='T2'>{cartoons?.title}</S.Title>
        <S.Author textType='C2'>정수아 • 매주 {cartoons?.yoil}요일 연재</S.Author>
      </S.Header>

      <S.Description textType='C2'>{cartoons?.overview}</S.Description>

      <CartoonEpisodeList episodes={cartoons?.chapters ?? []} />
    </S.Container>
  );
}
