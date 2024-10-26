import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import CartoonListItem from '@/src/features/home/cartoon/components/CartoonListItem';

const S = {
  Container: styled.View``,

  Header: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 20px;
    gap: 4px;
  `,

  ListContainer: styled.View`
    padding: 0 20px;
  `,

  Line: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.textLight};
  `,
};

const TEMP_DATA = [
  {
    episode: 4,
    title: '치핵이 뭔데? 2',
    viewCount: 350,
    likeCount: 120,
    previewImageUrl: 'https://placehold.co/200',
  },
  {
    episode: 3,
    title: '치핵이 뭔데? 1',
    viewCount: 350,
    likeCount: 120,
    previewImageUrl: 'https://placehold.co/200',
  },
  {
    episode: 2,
    title: '대장을 사랑한 남자, 가우디',
    viewCount: 350,
    likeCount: 120,
    previewImageUrl: 'https://placehold.co/200',
  },
  {
    episode: 1,
    title: '우울증 해결의 비밀이 장에서 온다고?ㅇㄹㅇㄹㅇㄹ',
    viewCount: 350,
    likeCount: 120,
    previewImageUrl: 'https://placehold.co/200',
  },
];

export default function CartoonList() {
  // @Todo: 실제 데이터 삽입 필요
  const [cartoons, setCartoons] = useState(TEMP_DATA);

  return (
    <S.Container>
      <S.Header>
        <AppText textType='B2' colorType='textMedium'>
          총
        </AppText>
        <AppText textType='B2'>{cartoons.length}화</AppText>
      </S.Header>

      {cartoons.map(cartoon => (
        <CartoonListItem key={cartoon.episode} {...cartoon} />
      ))}
    </S.Container>
  );
}
