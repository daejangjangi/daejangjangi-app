import React from 'react';
import styled from 'styled-components/native';
import {IcPencilFill} from '@/assets/images/icons';
import {useRouter} from 'expo-router';
import HotPosts from './components/HotPosts';
import MyPosts from './components/MyPosts';
import BoardPosts from './components/BoardPosts';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #fbfcfe;
  `,
  WriteButton: styled.TouchableOpacity`
    position: absolute;
    bottom: 32px;
    right: 26px;

    background-color: ${({theme}) => theme.colors.main};
    width: 68px;
    height: 68px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
  `,
};

export default function CommunityScreen() {
  const router = useRouter();

  return (
    <>
      <S.Container>
        <HotPosts />
        <MyPosts />
        <BoardPosts />
      </S.Container>

      <S.WriteButton onPress={() => router.push('/community/write')}>
        <IcPencilFill />
      </S.WriteButton>
    </>
  );
}
