import {AppText} from '@/src/common/AppComponents';
import React from 'react';
import styled from 'styled-components/native';

const S = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
};

export default function NotificationScreen() {
  return (
    <S.Container>
      <AppText textType='B1'>알림이 없습니다.</AppText>
    </S.Container>
  );
}
