import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';
import {CardNewsListItem} from '@/src/api/types/cardnews.type';

const S = {
  Container: styled.TouchableOpacity`
    padding: 20px 0;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  `,

  CardNewsThumbnail: styled(Image)`
    width: 108px;
    height: 82px;
    border-radius: 12px;
    background-color: ${props => props.theme.colors.textLight};
  `,
};

interface CardNewsItemProps {
  info: CardNewsListItem;
  onSelect: (id: number) => void;
}

export default function CardNewsItem({info, onSelect}: CardNewsItemProps) {
  return (
    <S.Container onPress={() => onSelect(info.id)}>
      <S.CardNewsThumbnail source={info.profile} />
      <AppText textType='B1'>{info.title}</AppText>
    </S.Container>
  );
}
