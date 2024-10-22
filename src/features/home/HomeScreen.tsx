import React from 'react';
import styled from 'styled-components/native';
import HomeHeader from '@/src/features/home/components/HomeHeader';
import HomeMenu from '@/src/features/home/components/HomeMenu';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.textLight};
  `,

  Main: styled.View`
    padding: 18px 20px;
  `,
};

export default function HomeScreen() {
  return (
    <S.Container>
      <HomeHeader />

      <S.Main>
        <HomeMenu />
      </S.Main>
    </S.Container>
  );
}
