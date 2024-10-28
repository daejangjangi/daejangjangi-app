import React from 'react';
import {AppText} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
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
  // @todo: 실제 데이터 변경 필요
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

  const latestEpisode = episodes[0];

  return (
    <S.Container>
      <CartoonThumbnail episode={latestEpisode} />

      <S.Header>
        <S.Title textType='T2'>대장툰</S.Title>
        <S.Author textType='C2'>정수아 • 매주 화요일 연재</S.Author>
      </S.Header>

      <S.Description textType='C2'>
        본 캐릭을 회상하시면 됩니다-Lorem ipsum dolor sit amet consectetur. Euismod dentean
        adipiscing vel urna sit amet. Aenean sed duis ultricies massa sit moncus. Eget proin tempor
        velit nec et morbi risus. Ut ipsum egestas suspendisse viverra ornare ornates et.
      </S.Description>

      <CartoonEpisodeList episodes={episodes} />
    </S.Container>
  );
}
