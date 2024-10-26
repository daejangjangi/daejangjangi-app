import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {useLocalSearchParams} from 'expo-router';

const S = {
  Container: styled.View``,
};

interface CartoonDetailScreenProps {}

export default function CartoonDetailScreen({}: CartoonDetailScreenProps) {
  const {episode} = useLocalSearchParams();

  return (
    <S.Container>
      <AppText>카툰 디테일 {episode}</AppText>
    </S.Container>
  );
}
