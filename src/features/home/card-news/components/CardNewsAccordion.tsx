import React, {useState} from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {IcArrowRightS} from '@/assets/images/icons';
import CardNewsContent from './CardNewsContent';
import CardNewsAccordionItem from './CardNewsAccordionItem';

const S = {
  Container: styled.View`
    margin-bottom: 16px;
  `,

  Header: styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  `,

  Content: styled.View`
    gap: 16px;
  `,
};

interface CardNewsAccordionProps {
  category: string;
  items: {
    id: number;
    title: string;
    date: string;
    images: string[];
  }[];
  onSelect: (news: any) => void;
}

export default function CardNewsAccordion({category, items, onSelect}: CardNewsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Container>
      <S.Header onPress={() => setIsOpen(prev => !prev)}>
        <AppText textType='B1'>{category}</AppText>
        <IcArrowRightS rotation={isOpen ? 270 : 90} />
      </S.Header>

      {isOpen && (
        <S.Content>
          {items.map(item => (
            <CardNewsAccordionItem key={item.id} onSelect={onSelect} {...item} />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}
