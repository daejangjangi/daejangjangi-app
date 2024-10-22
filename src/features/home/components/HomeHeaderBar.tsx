import React from 'react';
import styled from 'styled-components/native';
import {IcBell, IcDaejangjangi, IcUser} from '@/assets/images/icons';
import {theme} from '@/src/styles/theme';
import {useRouter} from 'expo-router';

const S = {
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

  Buttons: styled.View`
    flex-direction: row;
    gap: 8px;
  `,

  Button: styled.Pressable`
    justify-content: center;
    align-content: center;
  `,
};

export default function HomeHeaderBar() {
  const router = useRouter();

  return (
    <S.HeaderContainer>
      <S.HeaderMain>
        <IcDaejangjangi />
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
  );
}
