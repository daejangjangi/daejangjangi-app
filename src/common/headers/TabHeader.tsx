import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {IcBell, IcDaejangjangi, IcUser} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';
import styled from 'styled-components/native';

const S = {
  SafeAreaContainer: styled(SafeAreaView)`
    background-color: #fff;
  `,

  HeaderContainer: styled.View`
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 64px;
  `,

  HeaderMain: styled.View`
    flex-direction: row;
    gap: 13px;
    align-items: center;
  `,

  HeaderTitle: styled.Text`
    font-family: NanumSquareNeo-ExtraBold;
    font-size: 20px;
    line-height: 22.1px;
  `,

  Buttons: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  Button: styled.Pressable`
    justify-content: center;
    align-content: center;
  `,
};

interface CustomHeaderProps {
  title: string;
}

export default function TabHeader({title}: CustomHeaderProps) {
  const router = useRouter();
  const isHome = title === '홈';

  return (
    <S.SafeAreaContainer>
      <S.HeaderContainer>
        <S.HeaderMain>
          <IcDaejangjangi />
          {!isHome && <S.HeaderTitle>{title}</S.HeaderTitle>}
        </S.HeaderMain>

        <S.Buttons>
          <S.Button onPress={() => router.push('/(mypage)')}>
            <IcUser color={theme.colors.textMedium} />
          </S.Button>
          <S.Button onPress={() => router.push('/(notification)')}>
            <IcBell color={theme.colors.textMedium} />
          </S.Button>
        </S.Buttons>
      </S.HeaderContainer>
    </S.SafeAreaContainer>
  );
}
