import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {AppText} from '@/src/common/AppComponents';
import FormButton from '@/src/common/form/FormButton';

const S = {
  Container: styled.View`
    border-radius: 12px;
    background-color: #fff;
    padding: 32px 24px;
  `,

  Content: styled.ScrollView`
    margin-top: 16px;

    height: 195px;
  `,

  Title: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  SubTitle: styled(AppText)`
    color: ${props => props.theme.colors.text};
  `,

  Body: styled(AppText)`
    margin-top: 20px;
    color: ${props => props.theme.colors.text};
  `,

  Buttons: styled.View`
    margin-top: 20px;
  `,
};

interface PersonalDataAgreementModalProps {
  title: string;
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function SignUpModal({
  title,
  children,
  isVisible,
  onClose,
}: PersonalDataAgreementModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <S.Container>
        <S.Title textType='T1'>{title}</S.Title>

        <S.Content>{children}</S.Content>

        <S.Buttons>
          <FormButton title='확인' onPress={onClose} />
        </S.Buttons>
      </S.Container>
    </Modal>
  );
}
