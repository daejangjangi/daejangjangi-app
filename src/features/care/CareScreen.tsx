import React from 'react';

import styled from 'styled-components/native';
import CareProfile from './components/CareProfile';
import CareCalendars from './components/CareCalendars';
import TodayLogs from './components/TodayLogs';

const S = {
  Container: styled.ScrollView`
    flex: 1;
    background-color: #f6f5f4;
  `,
  Content: styled.View`
    padding: 20px;
    gap: 8px;
  `,
};

export default function CareScreen() {
  return (
    <S.Container>
      <S.Content>
        <CareProfile />
        <CareCalendars />
        <TodayLogs />
      </S.Content>
    </S.Container>
  );
}
