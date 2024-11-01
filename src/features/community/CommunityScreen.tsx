import React from 'react';
import styled from 'styled-components/native';
import HotPosts from './components/HotPosts';
import MyPosts from './components/MyPosts';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fbfcfe;
  `,
};

export default function CommunityScreen() {
  return (
    <S.Container>
      <HotPosts />
      <MyPosts />
    </S.Container>
  );
}
