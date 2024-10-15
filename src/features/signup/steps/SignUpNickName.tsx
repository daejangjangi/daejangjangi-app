import React, {useState} from 'react';
import {AppText, AppTextInput} from '@/src/common/AppComponents';
import styled from 'styled-components/native';

type InputSuccess = boolean | undefined;

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

  InputContainer: styled.View<{$status?: InputSuccess}>`
    flex-direction: row;
    align-items: center;
    gap: 8px;

    margin-top: 20px;
    padding: 16px;
    border: 1px solid
      ${props => {
        switch (props.$status) {
          case true:
            return '#20CE6C';
          case false:
            return props.theme.colors.main;
          default:
            return props.theme.colors.textLight;
        }
      }};
    border-radius: 8px;
  `,

  Input: styled.TextInput<{$status?: InputSuccess}>`
    flex: 1;
    font-family: Pretendard-Medium;
    font-size: 19px;
    color: ${props => props.theme.colors.text};
  `,

  DuplicateCheckButton: styled.Pressable`
    padding: 4px 8px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.textLight};
  `,

  DuplicateCheckText: styled.Text`
    font-family: Pretendard-Medium;
    font-size: 13px;
    line-height: 15.51px;
  `,
};

export default function SignUpNickName() {
  const [input, setInput] = useState('');
  const [inputSuccess, setInputSuccess] = useState<InputSuccess>();

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText textType='T4'>대장장이에 가입해주셔서 감사합니다 :)</S.HeaderText>
      </S.Header>

      <S.Body>
        <S.Description textType='T3'>우선 닉네임을 정해주세요.</S.Description>
        <S.InputContainer $status={inputSuccess}>
          <S.Input placeholder='텍스트입력' />
          <S.DuplicateCheckButton>
            <S.DuplicateCheckText>중복확인</S.DuplicateCheckText>
          </S.DuplicateCheckButton>
        </S.InputContainer>
      </S.Body>
    </S.Container>
  );
}
