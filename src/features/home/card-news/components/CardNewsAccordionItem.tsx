import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Image} from 'expo-image';

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

interface CardNewsAccordionItemProps {
  title: string;
  date: string;
  images: string[];
  onSelect: (news: any) => void;
}

export default function CardNewsAccordionItem({
  title,
  date,
  images,
  onSelect,
}: CardNewsAccordionItemProps) {
  return (
    <S.Container onPress={() => onSelect({title, date, images})}>
      <S.CardNewsThumbnail source={images[0]} />
      <AppText textType='B1'>{title}</AppText>
    </S.Container>
  );
}
