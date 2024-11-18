import React from 'react';

import styled from 'styled-components/native';
import CareProfile from './components/CareProfile';
import CareCalendars from './components/CareCalendars';
import TodayLogs from './components/TodayLogs';

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
    gap: 8px;

    background-color: #f6f5f4;
  `,
};

export default function CareScreen() {
  return (
    <S.Container>
      <CareProfile />
      <CareCalendars />
      <TodayLogs />
    </S.Container>
  );
}
