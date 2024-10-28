import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useLocalSearchParams} from 'expo-router';

const S = {
  Container: styled.View``,
};

export default function CartoonDetailScreen() {
  const {episode, title} = useLocalSearchParams<{episode: string; title: string}>();
  console.log('CartoonDetailHeader params:', {episode, title});

  return (
    <S.Container>
      <AppText>
        카툰 디테일 {episode} {title}
      </AppText>
    </S.Container>
  );
}
