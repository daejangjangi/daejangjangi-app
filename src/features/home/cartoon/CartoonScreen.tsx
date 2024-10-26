import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import NewCartoonPreview from '@/src/features/home/cartoon/components/NewCartoonPreview';
import CartoonList from '@/src/features/home/cartoon/components/CartoonList';
import CartoonIntroduce from '@/src/features/home/cartoon/components/CartoonIntroduce';

const S = {
  Container: styled.View``,
};

export default function CartoonScreen() {
  return (
    <S.Container>
      <NewCartoonPreview />
      <CartoonIntroduce />
      <CartoonList />
    </S.Container>
  );
}
