import React, {useState} from 'react';
import {AppText, AppTextInput} from '@/src/common/AppComponents';
import styled from 'styled-components/native';

type InputStatus = 'success' | 'error' | 'none';

const S = {
  Container: styled.View`
    flex: 1;
  `,

  Header: styled.View`
    margin-top: 24px;
  `,

  HeaderText: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  Body: styled.View`
    margin-top: 168px;
    justify-content: center;
  `,

  Description: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  Input: styled.TextInput<{$status?: InputStatus}>`
    margin-top: 20px;
    padding: 16px;
    border: 1px solid
      ${props => {
        switch (props.$status) {
          case 'success':
            return '#20CE6C';
          case 'error':
            return props.theme.colors.main;
          default:
            return props.theme.colors.textLight;
        }
      }};
    border-radius: 8px;

    font-family: Pretendard-Medium;
    font-size: 19px;
    color: ${props => props.theme.colors.text};
  `,
};

export default function SignUpNickName() {
  const [input, setInput] = useState('');

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText textType='T4'>대장장이에 가입해주셔서 감사합니다 :)</S.HeaderText>
      </S.Header>

      <S.Body>
        <S.Description textType='T3'>우선 닉네임을 정해주세요.</S.Description>
        <S.Input placeholder='텍스트입력' />
      </S.Body>
    </S.Container>
  );
}
