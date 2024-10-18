import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';

const S = {
  Container: styled.View`
    padding: 16px 20px;
    background-color: #fff;
    border-radius: 12px;
  `,

  Header: styled.View``,

  Main: styled.View`
    margin-top: 12px;
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

interface MyPageQuestionModalProps {
  isVisible: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
}

export default function MyPageQuestionModal({
  isVisible,
  onClose,
  onConfirm,
  title,
  body,
}: MyPageQuestionModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <S.Header>
          <AppText textType='B2'>{title}</AppText>
        </S.Header>

        <S.Main>
          <AppText textType='B1'>{body}</AppText>
        </S.Main>

        <S.Footer>
          {onClose && (
            <S.Button $sub onPress={onClose}>
              <S.ButtonText $sub>취소</S.ButtonText>
            </S.Button>
          )}
          <S.Button onPress={onConfirm}>
            <S.ButtonText>확인</S.ButtonText>
          </S.Button>
        </S.Footer>
      </S.Container>
    </Modal>
  );
}
