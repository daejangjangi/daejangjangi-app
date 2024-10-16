import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import {Link} from 'expo-router';

const S = {
  Container: styled.View`
    flex-direction: row;
    gap: 16px;
    padding: 24px 20px;
  `,

  // @Todo: Image로 변경
  ProfileImage: styled.View`
    width: 76px;
    height: 76px;
    border-radius: 38px;
    background-color: ${props => props.theme.colors.textLight};
  `,

  Info: styled.View`
    gap: 4px;
  `,
};

// @Todo: 실제 데이터 연동 추가 필요
export default function MyPageProfile() {
  return (
    <Link href='/(mypage)/profile'>
      <S.Container>
        <S.ProfileImage />

        <S.Info>
          <AppText textType='B2Bold'>김지원님</AppText>
          <AppText textType='B1'>여 21세</AppText>
        </S.Info>
      </S.Container>
    </Link>
  );
}
