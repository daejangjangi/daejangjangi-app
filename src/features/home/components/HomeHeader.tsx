import React from 'react';
import styled from 'styled-components/native';
import {LinearGradient} from 'expo-linear-gradient';
import HomeBanner from '@/src/features/home/components/HomeBanner';
import HomeHeaderBar from '@/src/features/home/components/HomeHeaderBar';

const S = {
  Container: styled(LinearGradient)`
    padding-top: 30px;
    background-color: skyblue;

    border-bottom-right-radius: 43px;
  `,

  BannerContainer: styled.View`
    padding: 18px 20px;
  `,
};

export default function HomeHeader() {
  return (
    <S.Container colors={['rgba(255, 238, 243, 0.8)', 'rgba(255, 124, 163, 0.8)']}>
      <HomeHeaderBar />
      <HomeBanner />
    </S.Container>
  );
}
