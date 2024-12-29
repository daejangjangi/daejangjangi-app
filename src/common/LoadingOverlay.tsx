import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {AppText} from './AppComponents';

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  align-items: center;
  gap: 12px;
`;

interface Props {
  message?: string;
}

export function LoadingOverlay({message = '로딩 중...'}: Props) {
  return (
    <Overlay>
      <Container>
        <ActivityIndicator size='large' />
        <AppText textType='B2'>{message}</AppText>
      </Container>
    </Overlay>
  );
}
