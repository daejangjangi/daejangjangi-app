import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import {MemberApi} from '@/src/api/member.api';
import {Alert} from 'react-native';
import {useUpdateMemberInfo, useMemberInfo} from '@/src/hooks/queries/member';

type ValidationStatus = 'none' | 'success' | 'error';

const S = {
  Container: styled.View`
    padding: 16px 20px;
    background-color: #fff;
    border-radius: 12px;
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
  Input: styled.TextInput`
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
  Footer: styled.View`
    margin-top: 20px;
    flex-direction: row;
    gap: 8px;
  `,
  Button: styled.Pressable<{$sub?: boolean}>`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${props =>
      props.$sub ? props.theme.colors.textLight : props.theme.colors.main};
  `,
  ButtonText: styled(AppText)<{$sub?: boolean}>`
    color: ${props => (props.$sub ? props.theme.colors.textMedium : '#fff')};
  `,
};

interface EditNicknameModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentNickname: string;
}

export default function EditNicknameModal({
  isVisible,
  onClose,
  currentNickname,
}: EditNicknameModalProps) {
  const {data: memberInfo} = useMemberInfo();
  const {mutate: updateMemberInfo} = useUpdateMemberInfo();

  const [input, setInput] = useState(currentNickname);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('none');
  const [message, setMessage] = useState<string>('');
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  useEffect(() => {
    setValidationStatus('none');
    setMessage('');
    setIsDuplicateChecked(false);
  }, [input]);

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleDuplicateCheck = async () => {
    if (!input.trim()) {
      setValidationStatus('error');
      setMessage('닉네임을 입력해주세요.');
      return;
    }

    if (input === currentNickname) {
      setValidationStatus('error');
      setMessage('현재 사용중인 닉네임입니다');
      return;
    }

    try {
      await MemberApi.checkNicknameDuplicated(input);
      setValidationStatus('success');
      setMessage('사용 가능한 닉네임입니다.');
      setIsDuplicateChecked(true);
    } catch (error) {
      setValidationStatus('error');
      setMessage('이미 사용 중인 닉네임입니다.');
      setIsDuplicateChecked(false);
    }
  };

  const handleSubmit = () => {
    if (!isDuplicateChecked) {
      Alert.alert('알림', '닉네임 중복확인을 해주세요');
      return;
    }

    if (!memberInfo) return;

    updateMemberInfo(
      {
        ...memberInfo,
        nickname: input,
      },
      {
        onSuccess: () => {
          onClose();
          Alert.alert('알림', '닉네임이 변경되었습니다.');
        },
        onError: error => {
          console.error('닉네임 변경 실패', error);
          Alert.alert('오류', '닉네임 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <AppText textType='B2'>닉네임</AppText>

        <S.InputContainer $status={validationStatus}>
          <S.Input
            placeholder='닉네임을 입력해주세요'
            value={input}
            onChangeText={handleInputChange}
          />
          <S.DuplicateCheckButton onPress={handleDuplicateCheck}>
            <S.DuplicateCheckText>중복확인</S.DuplicateCheckText>
          </S.DuplicateCheckButton>
        </S.InputContainer>

        {message && (
          <S.Message textType='B2' $status={validationStatus}>
            {message}
          </S.Message>
        )}

        <S.Footer>
          <S.Button $sub onPress={onClose}>
            <S.ButtonText $sub textType='B2'>
              취소
            </S.ButtonText>
          </S.Button>
          <S.Button onPress={handleSubmit}>
            <S.ButtonText textType='B2'>저장</S.ButtonText>
          </S.Button>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}
