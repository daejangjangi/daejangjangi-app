import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';
import KakaoLoginbutton from '@/src/features/signin/components/KakaoLoginbutton';

const S = {
  Container: styled.View`
    gap: 8px;
  `,

  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,

  Line: styled.View`
    width: 130px;
    height: 0.5px;
    background-color: ${props => props.theme.colors.textMedium};
  `,

  Title: styled(AppText)`
    color: ${props => props.theme.colors.textMedium};
  `,

  Buttons: styled.View``,
};

export default function SocialLoginForm() {
  return (
    <S.Container>
      <S.Header>
        <S.Line />
        <S.Title textType='C2'>간편 로그인</S.Title>
        <S.Line />
      </S.Header>

      <S.Buttons>
        <KakaoLoginbutton />
      </S.Buttons>
    </S.Container>
  );
}
