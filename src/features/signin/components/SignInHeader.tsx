import React from 'react';
import styled from 'styled-components/native';
import {IcDaejangjangi} from '@/assets/images/icons';

const S = {
  Container: styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  `,

  Main: styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,

  Title: styled.Text`
    font-family: NanumSquareNeo-ExtraBold;
    font-size: 40px;
    line-height: 44.2px;
    color: #000;
  `,

  Description: styled.Text`
    font-family: NanumSquareNeo-ExtraBold;
    font-size: 16px;
    line-height: 17.68px;
    color: #000;
  `,
};

export default function SignInHeader() {
  return (
    <S.Container>
      <S.Main>
        <IcDaejangjangi width={38.38} height={38.38} />
        <S.Title>대장장이</S.Title>
      </S.Main>
      <S.Description>대장항문건강에 한 걸음 더 가까이.</S.Description>
    </S.Container>
  );
}
