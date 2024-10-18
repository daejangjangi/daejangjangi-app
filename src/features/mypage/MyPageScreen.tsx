import React from 'react';
import styled from 'styled-components/native';
import MyPageProfile from '@/src/features/mypage/components/MyPageProfile';
import MyPageMyActivity from '@/src/features/mypage/components/MyPageMyActivity';
import MyPageEtc from '@/src/features/mypage/components/MyPageEtc';

const S = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
  `,

  Divider: styled.View`
    height: 8px;
    background-color: #fbfbfe;
  `,

  Main: styled.View`
    padding: 42px 20px;
    gap: 32px;
  `,
};

export default function MyPageScreen() {
  return (
    <S.Container>
      <MyPageProfile />

      <S.Divider />

      <S.Main>
        <MyPageMyActivity />
        <MyPageEtc />
      </S.Main>
    </S.Container>
  );
}
