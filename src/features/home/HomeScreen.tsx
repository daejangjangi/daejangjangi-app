import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'expo-router';
import styled from 'styled-components/native';
import HomeHeader from '@/src/features/home/components/HomeHeader';

const S = {
  Container: styled.View`
    flex: 1;
  `,
};

export default function HomeScreen() {
  return (
    <S.Container>
      <HomeHeader />

      {/* <Link href='/(home)/card-news'>카드 뉴스</Link> */}
      {/* <Link href='/(home)/cartoon'>대장툰</Link> */}
      {/* <Link href='/(home)/news-letter'>뉴스레터</Link> */}
      {/* <Link href='/(home)/reels'>릴스</Link> */}
    </S.Container>
  );
}
