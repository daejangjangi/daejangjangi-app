import React from 'react';
import styled from 'styled-components/native';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    width: 100%;
    height: 150px;
    background-color: ${props => props.theme.colors.main};
    justify-content: center;
    align-items: center;
  `,
};

export default function MarketBanner() {
  return (
    <S.Container>
      <AppText textType='B1' colorType='mainLight'>
        배너 자리
      </AppText>
    </S.Container>
  );
}
