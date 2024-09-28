import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import styled from 'styled-components/native';
import {theme} from '@/src/styles/theme';
import {IcNext} from '@/assets/images/icons';

const S = {
  SafeAreaContainer: styled(SafeAreaView)`
    background-color: #fff;
  `,

  HeaderContainer: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 12px;
  `,

  Title: styled.Text`
    font-family: 'Pretendard-Bold';
    font-size: 22px;
    line-height: 33px;
    color: ${theme.colors.text};
  `,
};

interface CustomHeaderProps {
  title: string;
}

export default function DetailHeader({title}: CustomHeaderProps) {
  const router = useRouter();

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => router.back()}>
          <IcNext width='48px' height='48px' color={theme.colors.text} />
        </TouchableOpacity>

        <S.Title>{title}</S.Title>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
