import React from 'react';

import styled from 'styled-components/native';
import CareProfile from './components/CareProfile';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;

    background-color: #f6f5f4;
  `,
};

export default function CareScreen() {
  return (
    <S.Container>
      <CareProfile />
    </S.Container>
  );
}
