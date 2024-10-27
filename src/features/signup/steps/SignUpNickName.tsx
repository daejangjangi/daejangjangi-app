import React, {useState} from 'react';
import {AppText, AppTextInput} from '@/src/common/AppComponents';
import styled from 'styled-components/native';
import {MemberApi} from '@/src/api/member';
import {useSignUpStore} from '@/src/stores';

type ValidationStatus = 'none' | 'success' | 'error';

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

  InputContainer: styled.View<{$status: ValidationStatus}>`
    flex-direction: row;
    align-items: center;
    gap: 8px;

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

  ErrorMessage: styled(AppText)`
    margin-top: 8px;
    color: ${props => props.theme.colors.main};
  `,

  Message: styled(AppText)<{$status: ValidationStatus}>`
    margin-top: 8px;
    color: ${props => {
      switch (props.$status) {
        case 'success':
          return '#20CE6C';
        case 'error':
          return props.theme.colors.main;
        default:
          return props.theme.colors.text;
      }
    }};
  `,
};

export default function SignUpNickName() {
  const [input, setInput] = useState('');
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('none');
  const [message, setMessage] = useState<string>('');
  const {updateNickname} = useSignUpStore(state => state);

  const handleInputChange = (text: string) => {
    setInput(text);
    setValidationStatus('none');
    setMessage('');
  };

  const handleDuplicateCheck = async () => {
    if (!input.trim()) {
      setValidationStatus('error');
      setMessage('닉네임을 입력해주세요.');
      return;
    }

    try {
      await MemberApi.checkNicknameDuplicated(input);
      setValidationStatus('success');
      setMessage('사용 가능한 닉네임입니다.');
      updateNickname(input);
    } catch (error) {
      setValidationStatus('error');
      setMessage('이미 사용 중인 닉네임입니다.');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderText textType='T4'>대장장이에 가입해주셔서 감사합니다 :)</S.HeaderText>
      </S.Header>

      <S.Body>
        <S.Description textType='T3'>우선 닉네임을 정해주세요.</S.Description>
        <S.InputContainer $status={validationStatus}>
          <S.Input placeholder='텍스트입력' value={input} onChangeText={handleInputChange} />
          <S.DuplicateCheckButton onPress={handleDuplicateCheck}>
            <S.DuplicateCheckText>중복확인</S.DuplicateCheckText>
          </S.DuplicateCheckButton>
        </S.InputContainer>
        {message && (
          <S.Message textType='B2' $status={validationStatus}>
            {message}
          </S.Message>
        )}
      </S.Body>
    </S.Container>
  );
}
