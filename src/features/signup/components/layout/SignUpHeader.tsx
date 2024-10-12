import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import styled from 'styled-components/native';
import {theme} from '@/src/styles/theme';
import {IcNext} from '@/assets/images/icons';
import {AppText} from '@/src/common/AppComponents';

const S = {
  SafeAreaContainer: styled(SafeAreaView)`
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${props => props.theme.colors.textLight};
  `,

  HeaderContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 8px;
    height: 64px;
  `,

  BackButton: styled.Pressable`
    position: absolute;
    left: 10px;
  `,

  Title: styled(AppText)`
    color: ${theme.colors.text};
  `,
};

export default function SignUpHeader() {
  const router = useRouter();

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <S.BackButton onPress={() => router.back()}>
          <IcNext width='48px' height='48px' color={theme.colors.text} />
        </S.BackButton>

        <S.Title textType='B2'>회원가입</S.Title>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
