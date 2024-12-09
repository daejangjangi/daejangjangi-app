import React from 'react';
import styled from 'styled-components/native';
import CategoryHeader from './components/CategoryHeader';
import WeeklyHotProducts from './components/WeeklyHotProducts';
import MarketBanner from './components/MarketBanner';
import PersonalProducts from './components/PersonalProducts';

const S = {
  Container: styled.ScrollView`
    flex: 1;
  `,

  Splitter: styled.View`
    height: 5px;
    background-color: ${props => props.theme.colors.textLight};
  `,
};

export default function MarketScreen() {
  return (
    <S.Container>
      {/* <CategoryHeader /> */}
      {/* <S.Splitter /> */}
      <WeeklyHotProducts />
      <MarketBanner />
      <PersonalProducts />
    </S.Container>
  );
}
