import React from 'react';
import {NewsLetter} from '@/src/api/types/news-letter.type';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useRouter} from 'expo-router';

const S = {
  Container: styled.Pressable`
    padding: 20px 16px;
    gap: 12px;
    background-color: #fff;
    border-radius: 12px;
  `,

  Badge: styled.View`
    align-self: flex-start;
    padding: 4px 8px;
    background-color: ${props => props.theme.colors.textLight};
    border-radius: 4px;
  `,
};

interface NewsLetterListItemProps {
  item: NewsLetter;
}

export default function NewsLetterListItem({item}: NewsLetterListItemProps) {
  const router = useRouter();

  return (
    <S.Container onPress={() => router.push(`/home/news-letter/${item.id}`)}>
      <S.Badge>
        <AppText textType='C2'>{item.category}</AppText>
      </S.Badge>

      <AppText textType='B2Bold'>{item.title}</AppText>
    </S.Container>
  );
}
